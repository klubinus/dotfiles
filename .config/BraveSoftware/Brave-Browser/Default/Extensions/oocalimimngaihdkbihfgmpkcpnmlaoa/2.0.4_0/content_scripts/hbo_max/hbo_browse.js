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
    
    var triggerMarkerRequest = function() {
        console.log("trigger marker request");
        if(document.querySelector('video') && document.querySelector('video')._dispNode && document.querySelector('video')._dispNode.position) {
            document.querySelector('video')._dispNode.position = document.querySelector('video')._dispNode.position - 0.1;
            document.querySelector('video')._dispNode.position = document.querySelector('video')._dispNode.position + 0.1;            
        }
    }

    var triggerCometRequest = function() {
        return new Promise(async (resolve, reject) => {
            try {
                // await pressListButton();
                triggerMarkerRequest();
                await delay(200)();
                resolve();
            } catch (e) {
                // console.log("Toggle failed, waiting then try again")
                // await delay(200)();
                // await triggerCometRequest();
                resolve();
            }
        });
    }
    
    
    // inject a script onto the Netflix window DOM outside of CRX sandbox
    // with full access to window context
    
    var injectScript = function(script) {
        var s = document.createElement('script');
        s.textContent = script;
        (document.head||document.documentElement).after(s);
        // s.remove();
        console.log("Script Injected");
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
            // pushTask(triggerCometRequest);
        }
    }
    window.addEventListener("TPBrowse", browseInteraction, false);
    
    
    const videoIdScript = `
    if(!window.videoIdScriptLoaded) {
        console.log("Browse script loaded");
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
                XMLHttpRequest.prototype.send = function(data){
                    // process the callback queue
                    // the xhr instance is passed into each callback but seems pretty useless
                    // you can't tell what its destination is or call abort() without an error
                    // so only really good for logging that a request has happened
                    // I could be wrong, I hope so...
                    // EDIT: I suppose you could override the onreadystatechange handler though
                    for( i = 0; i < XMLHttpRequest.callbacks.length; i++ ) {
                        XMLHttpRequest.callbacks[i]( this , data);
                    }
                    // call the native send()
                    // console.log("send data: " + JSON.stringify(data));
                    sendDataCallback(data);
                    oldSend.apply(this, arguments);
                }
            }
        }
        
        window.videoIds = {};
        
        var getVideoTitle = function () {
            try {
              if (window.location.href.includes('hbomax')) {
                // var videoContainer = document.querySelector('video') && document.querySelector('video').parentNode.parentNode.parentNode.parentNode;
                // if (videoContainer) {
                //   return videoContainer.nextElementSibling.querySelector("span[style*='street2_book']").nextElementSibling.innerText
                // } 
                return jQuery("[style*='metadata_pipe.png']").parent().next().children().children()[1].innerText;        
              }
              // else {
              //   return document.querySelector("[style*='street2_thin']").children[1].innerText;
              // }
            } catch(e) {
              return undefined;
            }
        };

        // listen to request payloads on hbo marker posts
        var sendDataCallback = function(vData) {
            // console.log(vData);
            if(vData !== undefined && typeof vData === "string") {
                var vJsonData = JSON.parse(vData);
                if(vJsonData.hasOwnProperty("events") && vJsonData["events"].length === 1 && vJsonData["events"][0].hasOwnProperty("cutId")) {
                    var epId = vJsonData["events"][0]["cutId"];
                    // var epTitle = getVideoTitle(); // does not include season info, undefined if not found

                    console.log("telegraph ep id:" + (epId));
                    window.postMessage({ type: "EPISODE_ID", videoId: epId}, "*");     
                }

                if(vJsonData.hasOwnProperty("cutId")) {
                    var epId = JSON.parse(vData).cutId;
                    // var epTitle = getVideoTitle(); // does not include season info, undefined if not found

                    console.log("data/id/title:" + (epId) + "/ " + epTitle + "/" + vData);
                    window.postMessage({ type: "EPISODE_ID", videoId: epId}, "*");     
                }  

            }          
        }

        var xhrLoad = function(xhrLoadEvent) {
            // if(xhrLoadEvent.currentTarget.responseURL && xhrLoadEvent.currentTarget.responseURL.includes("https://comet.api.hbo.com/watchlist")) {
            //     const url = xhrLoadEvent.currentTarget.responseURL;
            //     const episodeId = url.split("%3A")[3];
            //     window.postMessage({ type: "EPISODE_ID", episodeId: episodeId}, "*");
            // }
            try {
                // console.log(xhrLoadEvent.currentTarget);

                if(xhrLoadEvent.currentTarget.responseURL && xhrLoadEvent.currentTarget.responseURL.includes("https://comet.api.hbo.com/content") && xhrLoadEvent.currentTarget.responseText) {
                    Promise.resolve(xhrLoadEvent.currentTarget.responseText)
                    .then(JSON.parse)
                    .then(function(responseData) {
                            var updated = false;
                            for (var episodeData of responseData)
                            {
                                        if (responseData.length == 1 && episodeData.id && episodeData.id.includes('episode')) {
                                            var episodeId = episodeData.id.split('episode:')[1];
                                            window.postMessage({ type: "EPISODE_ID", videoId: episodeId}, "*");
                                            console.log("Found new Episode Id: " + episodeId);
                                            if (episodeData.body.manifests) {
                                                for (var manifest of episodeData.body.manifests) {
                                                    var videoId = manifest.videoId;
                                                    window.videoIds[videoId] = episodeId;
                                                }
                                                updated = true;
                                                console.log("Found Episode Id: " + episodeId);
                                            } else {
                                                console.log("NO MANIFESTS: " + JSON.stringify(responseData));
                                            }
                                        }
                                        if(episodeData.id && episodeData.id.includes('episode') && episodeData.body.titles) {
                                                // console.log('found a proper episodeId & title!');
                                                // console.log(episodeData);
                                                var episodeTitle = episodeData.body.titles.full;
                                                var seriesName = episodeData.body.seriesTitles.full
                                                var key = seriesName+":"+episodeTitle
                                                const episodeId = episodeData.id.split(':')[3];
                                                window.videoIds[key] = episodeId;
                                                updated = true;
                                        }
                                    
                            }
                            if (updated) {
                                window.postMessage({ type: "EPISODE_ID", videoIds: JSON.stringify(window.videoIds)}, "*");
                            }
                        });
                }
            } catch (e) {
                console.log("BIG ERROR: " + e);
            }
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
                                