'use strict';

// Helpers

const redirectWebsite = "https://www.tele.pe"

const StreamingService = {
  NETFLIX: 'netflix',
  HULU: 'hulu',
  DISNEY_PLUS: 'disney',
  HBO_EPISODE: 'hbo_episode',
  HBO_FEATURE: 'hbo_feature',
  HBO_EXTRA: 'hbo_extra',
  HBO_NOW: 'hbo_now'
}

const unsupportedSites = [
  '.hotstar.',
  '.hbogola.'
];

var isUnsupportedSite = function(url) {
  return unsupportedSites.some(str => url.hostname.includes(str));
}

var isHboParty = function (url) {
  return (url.hostname.includes('.hbomax.') || url.hostname.includes('.hbonow.')) && (getHBOVideoType(url.pathname) !== 'none');
}

var isHuluParty = function (url) {
  return url.hostname.includes('.hulu.') && url.pathname.includes('/watch');
}

var isDisneyPlusParty = function (url) {
  return url.hostname.includes('.disneyplus.') && url.pathname.includes('/video'); ;
}

var isNetflixParty = function (url) {
  return url.hostname.includes('.netflix.') && url.pathname.includes('/watch'); ;
}

var getHBOVideoType = function(url) {
  if(url.includes('urn:hbo:feature')) { 
    console.log('this is an hbo feature');
    return 'feature';
  } else if(url.includes('urn:hbo:episode')) {
    console.log('this is an hbo episode');
    return 'episode';
  } else if(url.includes('urn:hbo:extra')) {
    console.log('this is an hbo extra');
    return 'extra';
  } else {
    return 'none';
  }
}

var getURLParameter = function(url, key) {
  var searchString = '?' + url.split('?')[1];
  if (searchString === undefined) {
    return null;
  }
  var escapedKey = key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  var regex = new RegExp('[?|&]' + escapedKey + '=' + '([^&]*)(&|$)');
  var match = regex.exec(searchString);
  if (match === null) {
    return null;
  }
  return decodeURIComponent(match[1]);
};

function validateId(id) {
  return typeof id === 'string' && id.length === 16;
}

var getHuluSessionId = function(url) {
  if(url.includes('hulu/')) {
    var sessionId = url.split('hulu/')[1].split('?')[0];
    if(validateId(sessionId)) {
      return sessionId;
    }
  }
  return null;
  // console.log('sessionId: ' + sessionId);
};

// Represents the site the user is on.
// Takes in the users current url ex: 'https://netflix.com/video/...'
// Defines properties for popup script
function UserSite(urlString,id) {
  this.url = new URL(urlString);
  const url = this.url;
  this.id = id;
  this.serverId = '';
  if (isHuluParty(url)) {
    this.videoId = url.pathname.match(/^.*\/([a-z\-0-9]+)\??.*/)[1]
    this.serviceType = StreamingService.HULU;
  } else if (isHboParty(url)) {
      const videoType = getHBOVideoType(url.pathname)
      this.serviceType = videoType === 'feature' ? StreamingService.HBO_FEATURE : videoType === 'episode' ? StreamingService.HBO_EPISODE : StreamingService.HBO_EXTRA
      if (url.hostname.includes('.hbonow.')) {
        this.serviceType = StreamingService.HBO_NOW;
      }
      var videoUrnType = 'urn:hbo:' + getHBOVideoType(url.pathname) + ':';
      var hboQueryString = url.pathname.split(videoUrnType)
      var hboParseIds = (hboQueryString != null ** hboQueryString.length > 1 && hboQueryString[1] != undefined) ? hboQueryString[1].match(/^([a-zA-Z\-\_0-9]+)\??.*/) : null;
      var hboVideoId = (hboParseIds != null && hboParseIds.length !== 0) ? url.pathname.split(videoUrnType)[1].match(/^([a-zA-Z\-\_0-9]+)\??.*/)[1] : null
      this.videoId = hboVideoId;
  } else if (isNetflixParty(url)) {
    this.videoId =  parseInt(url.pathname.match(/^.*\/([0-9]+)\??.*/)[1]);
    this.serviceType = StreamingService.NETFLIX
  } else if (isDisneyPlusParty(url)) {
    this.videoId = url.pathname.match(/^.*\/([a-z\-0-9]+)\??.*/)[1];
    this.serviceType = StreamingService.DISNEY_PLUS;
  } else {
    return;
  }

  this.joinSessionId = getURLParameter(url.search, 'npSessionId');
  
  switch (this.serviceType) {
    case StreamingService.NETFLIX:
      this.contentScripts = ['content_scripts/netflix/netflix_content_script.js'];
      break;
    case StreamingService.HULU:
      this.contentScripts = ['content_scripts/hulu/hulu_content_script_netflix.js'];
      break;
    case StreamingService.HBO_NOW:
      this.contentScripts = ['content_scripts/hbo_now/hbo_browse.js', 'content_scripts/hbo_now/hbo_content_script.js'];
      break;
    case StreamingService.HBO_EPISODE:
    case StreamingService.HBO_FEATURE:
    case StreamingService.HBO_EXTRA:
      this.contentScripts = ['content_scripts/hbo_max/hbo_browse.js', 'content_scripts/hbo_max/hbo_content_script.js'];
      break;
    case StreamingService.DISNEY_PLUS:
      this.contentScripts = ['content_scripts/disney/disney_content_script.js'];
      break;
  }
  
  //Returns link to share with party from popup
  this.urlWithSessionId = function (sessionId) {
    switch(this.serviceType) {
      case StreamingService.HULU:
        return `${redirectWebsite}/hulu/${sessionId}?s=${this.serverId}`;
      case StreamingService.HBO_FEATURE:
      case StreamingService.HBO_EPISODE:
      case StreamingService.HBO_EXTRA:
      case StreamingService.HBO_NOW:
        return `${redirectWebsite}/hbo/${sessionId}?s=${this.serverId}`;
      case StreamingService.DISNEY_PLUS:
        return `${redirectWebsite}/disney/${sessionId}?s=${this.serverId}`;
      case StreamingService.NETFLIX:
        return `${redirectWebsite}/netflix/${sessionId}?s=${this.serverId}`;
    }
  };


}







//////////////////////////////////////////////////////////////////////////
// Google Analytics                                                     //
//////////////////////////////////////////////////////////////////////////

// inject Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-71812070-2']);
_gaq.push(['_trackPageview']); // todo: change to remove popup page views?
_gaq.push(['_setSampleRate', '2.5']); // added sample rate

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

//////////////////////////////////////////////////////////////////////////
// Autoupdate                                                           //
//////////////////////////////////////////////////////////////////////////
chrome.runtime.onUpdateAvailable.addListener(function(details) {
  // console.log("updating to version " + details.version);
  // _gaq.push(['_trackEvent', 'auto-update ->' + details.version, 'clicked']); // changed not necessary to track auto updates twice
  chrome.runtime.reload();
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.test) {
      console.log(JSON.stringify(request.summary));

      sendResponse({farewell: "goodbye"});
    }
  }
);


//////////////////////////////////////////////////////////////////////////
// User Event logging                                                   //
//////////////////////////////////////////////////////////////////////////

// send over permId when sending events over to SQL data server
var permId;
chrome.storage.local.get(['userId'], function(data) {
  if(data.userId) {
    permId = data.userId;
  }
});

window.loadedUrl = false;

// log events
function logEvent(eventType, sessionId, serviceName) {
  try {
    if(permId) {
      var data = {
        userId: permId,
        eventType: eventType,
        sessionId: sessionId,
        serviceName: serviceName
      }

      console.log("event: " + JSON.stringify(data));

      var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
      xmlhttp.open("POST", "https://data3.netflixparty.com/log-event");
      xmlhttp.setRequestHeader("Content-Type", "application/json");
      xmlhttp.send(JSON.stringify(data));
    }    
  } catch(e) {
    console.log("log event error");
  }
}



//////////////////////////////////////////////////////////////////////////
// Popup Logic                                                          //
//////////////////////////////////////////////////////////////////////////

var $ = jQuery;
$(function() {
  // get the current tab
  chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs) {
      // send active tab over to background.js
      chrome.runtime.sendMessage({tab: tabs[0]}, function() {
        console.log("popup -> background script received active tab");
      });

     

      // error handling
      var showError = function(err, showButton = true) {
        $('.some-error').removeClass('hidden');
        $('.no-error').addClass('hidden');
        $('#error-msg').html(err);
        if (showButton) {
          $('#close-error').removeClass('hidden')
        }else {
          $('#close-error').addClass('hidden')
        }
      };


      // set up the spinner
      var startSpinning = function() {
        $('#control-lock').prop('disabled', true);
        $('#create-session').prop('disabled', true);
        $('#leave-session').prop('disabled', true);
      };

      var stopSpinning = function() {
        $('#control-lock').prop('disabled', false);
        $('#create-session').prop('disabled', false);
        $('#leave-session').prop('disabled', false);
      };

      // send a message to the content script
      var sendMessage = function(type, data, callback) {
        startSpinning();
        chrome.tabs.executeScript(userSite.id, {
          file: 'lib/tp_libraries_min.js'
        }, () => {
          Promise.all(userSite.contentScripts.map((script) => {
            return chrome.tabs.executeScript(userSite.id, { file: script} )
          })).then(() =>{
            chrome.tabs.sendMessage(userSite.id, {
              type: type,
              data: data
            }, function(response) {
              if (chrome.runtime.lastError) {
                console.log("Eror contacting content script")
                sendInitialMessage();
                return;
              }
              stopSpinning();
              if (response.errorMessage) {
                if (response.showButton != undefined)
                {
                  console.log(response)
                  showError(response.errorMessage, response.showButton);
                  return;
                }
                console.log(response)
                showError(response.errorMessage);
                return;
              }
              if (callback) {
                callback(response);
              }
            });
          });
        });
      };

      var joinSession = function() {
        console.log("Join Session Id: " + userSite.joinSessionId);

        sendMessage('joinSession', {
          sessionId: userSite.joinSessionId,
          videoId: userSite.videoId
        }, function(response) {
          showConnected(userSite.joinSessionId);
          _gaq.push(['_trackEvent', 'join-session', 'clicked', userSite.serviceType]);
          logEvent('join-session', userSite.joinSessionId, userSite.serviceType);
        });          
      };

      var createSession = function() {
        sendMessage('createSession', {
          controlLock: $('#control-lock').is(':checked'),
          videoId: userSite.videoId
        }, function(response) {
          showConnected(response.sessionId);
          _gaq.push(['_trackEvent', 'create-session', 'clicked', userSite.serviceType]);
          logEvent('create-session', response.sessionId, userSite.serviceType);
        });
      };

      var learnMore = function() {
        chrome.tabs.create({url: 'https://www.netflixparty.com/support'});
      }

      var learnMoreTeleparty = function() {
        chrome.tabs.create({url: 'https://www.netflixparty.com/introducing-teleparty'});
      }

      var leaveSession = function() {
        sendMessage('leaveSession', {}, function() {
          // We need to make sure that getInitData is called before a session is created.
          window.close();
          // showDisconnected();
        });
      };

      var showChat = function() {
        sendMessage('showChat', { visible: $('#show-chat').is(':checked') }, null);
      };

      // Clicks on the close error button
      $('#close-error').click(function() {
        $('.no-error').removeClass('hidden');
        $('.some-error').addClass('hidden');
      });

      // listen for clicks on the "Create session" button
      $('#create-session').click(createSession);

      $('#learn-more').click(learnMore);
      $('#learn-more-teleparty').click(learnMoreTeleparty);

      // listen for clicks on the "Leave session" button
      $('#leave-session').click(leaveSession);

      // listen for clicks on the "Show chat" checkbox
      $('#show-chat').change(showChat);

      // listen for clicks on the share URL box
      $('#share-url').click(function(e) {
        var sessionIdFromShareUrl = getURLParameter($('#share-url').val(), 'npSessionId', 1);
        if(sessionIdFromShareUrl) showConnected(sessionIdFromShareUrl);
        e.stopPropagation();
        e.preventDefault();
        $('#share-url').select();
      });

      // listen for clicks on the "Copy URL" link
      $('#copy-btn').click(function(e) {
        console.log('click');
        var sessionIdFromShareUrl = getURLParameter($('#share-url').val(), 'npSessionId', 1);
        if(sessionIdFromShareUrl) showConnected(sessionIdFromShareUrl);
        e.stopPropagation();
        e.preventDefault();
        $('#share-url').select();
        document.execCommand('copy');
        $('#copy-btn').parent().css("background","#24D154");
        $('#copy-btn').text("Copied!")
      });

      // // send a message to the content script
      // var sendTestMessage = function(type, data, callback) {
      //   chrome.tabs.sendMessage(tabs[0].id, {
      //     type: type,
      //     data: data
      //   }, function(response) {
      //     chrome.extension.getBackgroundPage().console.log(JSON.stringify(response));
      //     if (callback) {
      //       callback(response);
      //     }
      //   });
      // };

      // connected/disconnected state
      var showConnected = function(sessionId) {
        $('.disconnected').addClass('hidden');
        $('.connected').removeClass('hidden');
        $('#show-chat').prop('checked', true);
        $('#share-url').val(userSite.urlWithSessionId(sessionId)).focus().select();
      };

      var showDisconnected = function() {
        $('.disconnected').removeClass('hidden');
        $('.connected').addClass('hidden');
        $('#control-lock').prop('checked', false);
      };       

      // get the session if there is one
      var sendInitialMessage = function() {

        // sendMessage('getInitData', {
        //   version: chrome.app.getDetails().version,
        //   videoId: userSite.videoId
        // }, function(initData) {
        //   console.log("videoId: " + userSite.videoId);
          
        //   userSite.serverId = initData.serverId;
          
        //   if (initData.sessionId === null) {
        //     if (userSite.sessionIdFromUrl) {
        //       joinSession();
        //     }



        //   } else {
        //     showConnected(initData.sessionId);
        //   }
          
        //   $('#show-chat').prop('checked', initData.chatVisible);    
        // });


        // START INSERT
        // get the session if there is one
        sendMessage('getInitData', {
          version: chrome.app.getDetails().version,
          videoId: userSite.videoId
        }, function(initData) {
          
          if (initData.videoId != null) {
            userSite.videoId = initData.videoId
          }

          console.log("videoId: " + userSite.videoId);
          
          userSite.serverId = initData.serverId;


          if (initData.sessionId === null) {
            if(initData.referrer) {
              console.log("join checking for referrer: "+ initData.referrer);
              userSite.joinSessionId = getHuluSessionId(initData.referrer);    
              console.log("join session id: " + userSite.joinSessionId);        
            }

            // modify joinSessionId to parse referrer;
            if (userSite.joinSessionId) {
              joinSession();
            }

            // if(userSite.serviceType != StreamingService.NETFLIX) {
            //   $('.comingSoon').removeClass('hidden');
            //   $('.disconnected').addClass('hidden');
            //   switch (userSite.serviceType) {
            //     case StreamingService.HULU:
            //       $('#service-type').text("\nCome back in a few days to enjoy Hulu Parties.");
            //       break;
            //     case StreamingService.HBO_EPISODE:
            //     case StreamingService.HBO_FEATURE:
            //     case StreamingService.HBO_EXTRA:
            //       $('#service-type').text("Come back in a few days to enjoy HBO Parties.");
            //       break;
            //     case StreamingService.DISNEY_PLUS:
            //       $('#service-type').text("Come back in a few days to enjoy Disney Plus Parties.");
            //       break;
            //   }

            //   return;
            // }

          } else {
            showConnected(initData.sessionId);
          }

          $('#show-chat').prop('checked', initData.chatVisible);    
        });
        // END INSERT

      }
      // choose content script - hbo/netflix based on url parameter
      var userSite;
      try {
        userSite = new UserSite(tabs[0].url, tabs[0].id);
        // TODO: Show message when user enables extension and isn't on a video? Might neeed to get rid of declarative content
        if (!userSite.serviceType) {
          if (isUnsupportedSite(userSite.url)) {
            $('.unsupportedSite').removeClass('hidden');
          }else {
            $('.wrongSite').removeClass('hidden');
          }
          $('.disconnected').addClass('hidden');
          return;
        }
        sendInitialMessage();
      } catch(e) {
        $('.wrongSite').removeClass('hidden');
        $('.disconnected').addClass('hidden');
        return;
      }
    }
  );
});
