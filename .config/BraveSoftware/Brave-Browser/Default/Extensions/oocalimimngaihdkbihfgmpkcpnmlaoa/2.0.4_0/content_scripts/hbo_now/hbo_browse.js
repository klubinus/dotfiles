var injectBrowseScript = function() {
    
    var tasks = null;
    var tasksInFlight = 0;

    var delay = function(milliseconds) {
        return function(result) {
          return new Promise(function(resolve, reject) {
            setTimeout(function() {
              resolve(result);
            }, milliseconds);
          });
        };
    };

    var pushTask = function(task) {
      if (tasksInFlight === 0) {
        tasks = Promise.resolve();
      }

      tasksInFlight += 1;
      tasks = tasks.then(task).then(function() {
        tasksInFlight -= 1;
      });
    };

    jQuery(window).load(function () {
        console.log("LOADED PAGE")
    
    });
    
    var clickAtProgress = function(target, progress, eventType) {  
        const { width, height, left, top } = target.getBoundingClientRect();
        const x = left + width * progress;
        const y = top + height / 2;  
        var clickEvent = document.createEvent('MouseEvents');
        clickEvent.initMouseEvent(eventType,true,true,window,0,0,0,x,y,false,false,false,false,0,null);  
        target.dispatchEvent(clickEvent)
    }
    
    var pressListButton = function() {
        return new Promise(async (resolve, reject) => {
            console.log("Attempting to toggle")
            console.log(jQuery("video"))
            console.log(jQuery("video").is(":visible"))
            console.log(jQuery("[style*='_add']").is(":visible"))
            console.log(jQuery("[style*='_remove']").is(":visible"))
            if (jQuery("[style*='_add']").length && jQuery("[style*='_add']").is(":visible")) {
                console.log("toggling add ");
                jQuery("[style*='_add']").addClass('listToggle')
            }else if (jQuery("[style*='_remove']").length && jQuery("[style*='_remove']").is(":visible")) {
                console.log("toggling remove");
                jQuery("[style*='_remove']").addClass('listToggle')
            }else {
                console.log("No toggle")
                reject();
                return;
            }
            var toggleElement = document.querySelector(".listToggle");
            if (toggleElement)
            {
                clickAtProgress(toggleElement, 1,'mousedown');
                clickAtProgress(toggleElement, 1,'mouseup');
                resolve();
            }else {
                console.log("No toggle weird");
                reject();
            }
        })
    }

    var triggerCometRequest = function() {
        return new Promise(async (resolve, reject) => {
            try {
                await pressListButton();
                await delay(200)();
                resolve();
            } catch (e) {
                console.log("Toggle failed, waiting then try again")
                await delay(200)();
                await triggerCometRequest();
                resolve();
            }
        });
    }
    
    
    // inject a script onto the Netflix window DOM outside of CRX sandbox
    // with full access to window context
    var injectScript = function(script) {
        var s = document.createElement('script');
        s.textContent = script;
        (document.head||document.documentElement).appendChild(s);
        s.remove();
    };

    var teardown = function() {
        window.removeEventListener("TPBrowse",browseInteraction);
        window.removeEventListener("message", onmessage);
        window.telepartyBrowseLoaded = false;
    }

    console.log("Injected HBO Browse Script");   
    var onmessage = function(event) {
        if (event.source != window) { return; }
        if (event.data && event.data.type === "teardown") {
            console.log("Browse teardown");
            teardown();
        }
    }
    window.addEventListener("message", onmessage, false);
    var browseInteraction = function(event) {
        if (event.detail.type === "TOGGLE_LIST") {
            console.log("Received toggle list event: ");
            pushTask(triggerCometRequest);
            pushTask(triggerCometRequest);
        }
    }
    window.addEventListener("TPBrowse", browseInteraction, false);
    
    
    const videoIdScript = `   
    console.log("loaded video id script");
    if(!window.videoIdScriptLoaded) {

        window.videoIdScriptLoaded = true;
        
        //adds a callback to the browser default XMLHttpRequest implementation
        var addXMLRequestCallback = function(callback){
            var oldSend, i;
            if( XMLHttpRequest.callbacks ) {
                // we've already overridden send() so just add the callback
                XMLHttpRequest.callbacks.push( callback );
            } else {
                // create a callback queue
                XMLHttpRequest.callbacks = [callback];
                // store the native send()
                oldSend = XMLHttpRequest.prototype.send;
                // override the native send()
                XMLHttpRequest.prototype.send = function(){
                    // process the callback queue
                    // the xhr instance is passed into each callback but seems pretty useless
                    // you can't tell what its destination is or call abort() without an error
                    // so only really good for logging that a request has happened
                    // I could be wrong, I hope so...
                    // EDIT: I suppose you could override the onreadystatechange handler though
                    for( i = 0; i < XMLHttpRequest.callbacks.length; i++ ) {
                        XMLHttpRequest.callbacks[i]( this );
                    }
                    // call the native send()
                    oldSend.apply(this, arguments);
                }
            }
        }
        
        window.videoIds = {};
        
        var xhrLoad = function(xhrLoadEvent) {
            if(xhrLoadEvent.currentTarget.responseURL && xhrLoadEvent.currentTarget.responseURL.includes("https://comet.api.hbo.com/watchlist")) {
                const url = xhrLoadEvent.currentTarget.responseURL;
                const episodeId = url.split("%3A")[3];
                window.postMessage({ type: "EPISODE_ID", episodeId: episodeId}, "*");
            }
            // if(xhrLoadEvent.currentTarget.responseURL && xhrLoadEvent.currentTarget.responseURL.includes("https://comet.api.hbo.com/content") && xhrLoadEvent.currentTarget.responseText) {
                // Promise.resolve(xhrLoadEvent.currentTarget.responseText)
                // .then(JSON.parse)
                // .then(function(responseData) {
                    //     for (var episodeData of responseData)
                    //     {
                        //         try {
                            //             if(episodeData.id && episodeData.id.includes('episode') && episodeData.body.titles) {
                                //                 console.log('found a proper episodeId & title!');
                                //                 // console.log(episodeData);
                                //                 var episodeTitle = episodeData.body.titles.full;
                                //                 var seriesName = episodeData.body.seriesTitles.full
                                //                 var key = seriesName+":"+episodeTitle
                                //                     const episodeId = episodeData.id.split(':')[3];
                                //                     window.videoIds[key] = episodeId;
                                //                     window.postMessage({ type: "EPISODE_ID", videoIds: JSON.stringify(window.videoIds)}, "*");
                                //                     console.log('Dictionary id inserted for: ' + episodeTitle + ', ' + episodeId);
                                //             }
                                
                                //             // const nextEpisodeArray = episodeData.id.split(':episode:')
                                //             // if (nextEpisodeArray.length === 2)
                                //             // {
                                    //             //     const nextEpisode = nextEpisodeArray[1];
                                    //             //     alert('Got next episode: ' + nextEpisode);
                                    //             //     window.postMessage({ type: "EPISODE_DATA", text: "next episode from the webpage!", nextEpisode: nextEpisode}, "*");
                                    //             // }
                                    //         } catch (e) {
                                        
                                        //         }
                                        //     }
                                        // });
                                        // }
                                    }
            
            // e.g.
            addXMLRequestCallback( function( xhr ) {
                // console.log(xhr);
                xhr.addEventListener("load", xhrLoad); 
            });
            
            var videoIdContainer = document.createElement('script');
            videoIdContainer.className = 'videoIdContainer'
            videoIdContainer.textContent = '';
            (document.head||document.documentElement).appendChild(videoIdContainer);   
        }
        `;
            if (!window.videoIdScriptLoaded) {
                injectScript(videoIdScript);
            }
        }
        if (!window.telepartyBrowseLoaded) {
            window.telepartyBrowseLoaded = true;
            injectBrowseScript();
        }
                                