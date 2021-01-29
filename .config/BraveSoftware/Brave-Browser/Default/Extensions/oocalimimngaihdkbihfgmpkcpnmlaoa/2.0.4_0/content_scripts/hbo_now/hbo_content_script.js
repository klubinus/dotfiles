// can't use strict mode for this file because of socket.io
var injectContentScript = function () {

    //////////////////////////////////////////////////////////////////////////
    // Version                                                              //
    //////////////////////////////////////////////////////////////////////////
  
    var version = null;
  
    var defaultServerOptions = [
      's110', 's111', 's112', 's113', 's114', 's115', 's116', 's117', 's118', 's119', 
      's120', 's121', 's122', 's123', 's125', 's126', 's127', 's128', 's129', 
      's130', 's131', 's132', 's133', 's134', 's135', 's136', 's137', 's138', 's139',
      's140', 's141', 's142', 's143', 's144', 's145', 's146', 's147', 's148', 's149',
      's150', 's151', 's152', 's153', 's154', 's155', 's156', 's157', 's158', 's159',
      's160', 's161', 's162', 's163', 's164', 's165', 's166', 's167', 's168', 's169'
    ];
  
    // hardcoded server config for auto scaling in case cloud config isn't available
    var serversConfig = {
      "load":true, "undefined":true, "wpseth":true, "sundefined":true, "s1":true, "s2":true, "s3":true, "s4":true, "s5":true, "s6":true, "s7":true, "s8":true, "s9":true, 
      "s10":true, "s11":true, "s12":true, "s13":true, "s14":true, "s15":true, "s16":true, "s17":true, "s18":true, "s19":true, 
      "s20":true, "s21":true, "s22":true, "s23":true, "s24":true, "s25":true, "s26":true, "s27":true, "s28":true, "s29":true, 
      "s30":true, "s31":true, "s32":true, "s33":true, "s34":true, "s35":true, "s36":true, "s37":true, "s38":true, "s39":true, 
      "s40":true, "s41":true, "s42":true, "s43":true, "s44":true, "s45":true, "s46":true, "s47":true, "s48":true, "s49":true,
      "s50":true, "s51":true, "s52":true, "s53":true, "s54":true, "s55":true, "s56":true, "s57":true, "s58":true, "s59":true,
      "s60":true, "s61":true, "s62":true, "s63":true, "s64":true, "s65":true, "s66":true, "s67":true, "s68":true, "s69":true,
      "s70":true, "s71":true, "s72":true, "s73":true, "s74":true, "s75":true, "s76":true, "s77":true, "s78":true, "s79":true,
      "s80":true, "s81":true, "s82":true, "s83":true, "s84":true, "s85":true, "s86":true, "s87":true, "s88":true, "s89":true,
      "s90":true, "s91":true, "s92":true, "s93":true, "s94":true, "s95":true, "s96":true, "s97":true, "s98":true, "s99":true,
      "s100":true, "s101":true, "s102":true, "s103":true, "s104":true, "s105":true, "s106":true, "s107":true, "s108":true, "s109":true, 
      "s110":true, "s111":true, "s112":true, "s113":true, "s114":true, "s115":true, "s116":true, "s117":true, "s118":true, "s119":true, 
      "s120":true, "s121":true, "s122":true, "s123":true, "s124":true, "s125":true, "s126":true, "s127":true, "s128":true, "s129":true, 
      "s130":true, "s131":true, "s132":true, "s133":true, "s134":true, "s135":true, "s136":true, "s137":true, "s138":true, "s139":true, 
      "s140":true, "s141":true, "s142":true, "s143":true, "s144":true, "s145":true, "s146":true, "s147":true, "s148":true, "s149":true,
      "s150":true, "s151":true, "s152":true, "s153":true, "s154":true, "s155":true, "s156":true, "s157":true, "s158":true, "s159":true,
      "s160":true, "s161":true, "s162":true, "s163":true, "s164":true, "s165":true, "s166":true, "s167":true, "s168":true, "s169":true,
      "s170":true, "s171":true, "s172":true, "s173":true, "s174":true, "s175":true, "s176":true, "s177":true, "s178":true, "s179":true,
      "s180":true, "s181":true, "s182":true, "s183":true, "s184":true, "s185":true, "s186":true, "s187":true, "s188":true, "s189":true,
      "s190":true, "s191":true, "s192":true, "s193":true, "s194":true, "s195":true, "s196":true, "s197":true, "s198":true, "s199":true,
      "s200":true, "s201":true, "s202":true, "s203":true, "s204":true, "s205":true, "s206":true, "s207":true, "s208":true, "s209":true, 
      "s210":true, "s211":true, "s212":true, "s213":true, "s214":true, "s215":true, "s216":true, "s217":true, "s218":true, "s219":true, 
      "s220":true, "s221":true, "s222":true, "s223":true, "s224":true, "s225":true, "s226":true, "s227":true, "s228":true, "s229":true, 
      "s230":true, "s231":true, "s232":true, "s233":true, "s234":true, "s235":true, "s236":true, "s237":true, "s238":true, "s239":true, 
      "s240":true, "s241":true, "s242":true, "s243":true, "s244":true, "s245":true, "s246":true, "s247":true, "s248":true, "s249":true,
      "s250":true, "s251":true, "s252":true, "s253":true, "s254":true, "s255":true, "s256":true, "s257":true, "s258":true, "s259":true,
      "s260":true, "s261":true, "s262":true, "s263":true, "s264":true, "s265":true, "s266":true, "s267":true, "s268":true, "s269":true,
      "s270":true, "s271":true, "s272":true, "s273":true, "s274":true, "s275":true, "s276":true, "s277":true, "s278":true, "s279":true,
      "s280":true, "s281":true, "s282":true, "s283":true, "s284":true, "s285":true, "s286":true, "s287":true, "s288":true, "s289":true,
      "s290":true, "s291":true, "s292":true, "s293":true, "s294":true, "s295":true, "s296":true, "s297":true, "s298":true, "s299":true,
      "s300":true, "s301":true, "s302":true, "s303":true, "s304":true, "s305":true, "s306":true, "s307":true, "s308":true, "s309":true, 
      "s310":true, "s311":true, "s312":true, "s313":true, "s314":true, "s315":true, "s316":true, "s317":true, "s318":true, "s319":true, 
      "s320":true, "s321":true, "s322":true, "s323":true, "s324":true, "s325":true, "s326":true, "s327":true, "s328":true, "s329":true, 
      "s330":true, "s331":true, "s332":true, "s333":true, "s334":true, "s335":true, "s336":true, "s337":true, "s338":true, "s339":true, 
      "s340":true, "s341":true, "s342":true, "s343":true, "s344":true, "s345":true, "s346":true, "s347":true, "s348":true, "s349":true,
      "s350":true, "s351":true, "s352":true, "s353":true, "s354":true, "s355":true, "s356":true, "s357":true, "s358":true, "s359":true,
      "s360":true, "s361":true, "s362":true, "s363":true, "s364":true, "s365":true, "s366":true, "s367":true, "s368":true, "s369":true,
      "s370":true, "s371":true, "s372":true, "s373":true, "s374":true, "s375":true, "s376":true, "s377":true, "s378":true, "s379":true,
      "s380":true, "s381":true, "s382":true, "s383":true, "s384":true, "s385":true, "s386":true, "s387":true, "s388":true, "s389":true,
      "s390":true, "s391":true, "s392":true, "s393":true, "s394":true, "s395":true, "s396":true, "s397":true, "s398":true, "s399":true,
      "s400":true, "s401":true, "s402":true, "s403":true, "s404":true, "s405":true, "s406":true, "s407":true, "s408":true, "s409":true, 
      "s410":true, "s411":true, "s412":true, "s413":true, "s414":true, "s415":true, "s416":true, "s417":true, "s418":true, "s419":true, 
      "s420":true, "s421":true, "s422":true, "s423":true, "s424":true, "s425":true, "s426":true, "s427":true, "s428":true, "s429":true, 
      "s430":true, "s431":true, "s432":true, "s433":true, "s434":true, "s435":true, "s436":true, "s437":true, "s438":true, "s439":true, 
      "s440":true, "s441":true, "s442":true, "s443":true, "s444":true, "s445":true, "s446":true, "s447":true, "s448":true, "s449":true,
      "s450":true, "s451":true, "s452":true, "s453":true, "s454":true, "s455":true, "s456":true, "s457":true, "s458":true, "s459":true,
      "s460":true, "s461":true, "s462":true, "s463":true, "s464":true, "s465":true, "s466":true, "s467":true, "s468":true, "s469":true,
      "s470":true, "s471":true, "s472":true, "s473":true, "s474":true, "s475":true, "s476":true, "s477":true, "s478":true, "s479":true,
      "s480":true, "s481":true, "s482":true, "s483":true, "s484":true, "s485":true, "s486":true, "s487":true, "s488":true, "s489":true,
      "s490":true, "s491":true, "s492":true, "s493":true, "s494":true, "s495":true, "s496":true, "s497":true, "s498":true, "s499":true,
      "s500":true, "s501":true, "s502":true, "s503":true, "s504":true, "s505":true, "s506":true, "s507":true, "s508":true, "s509":true, 
      "s510":true, "s511":true, "s512":true, "s513":true, "s514":true, "s515":true, "s516":true, "s517":true, "s518":true, "s519":true, 
      "s520":true, "s521":true, "s522":true, "s523":true, "s524":true, "s525":true, "s526":true, "s527":true, "s528":true, "s529":true, 
      "s530":true, "s531":true, "s532":true, "s533":true, "s534":true, "s535":true, "s536":true, "s537":true, "s538":true, "s539":true, 
      "s540":true, "s541":true, "s542":true, "s543":true, "s544":true, "s545":true, "s546":true, "s547":true, "s548":true, "s549":true,
      "s550":true, "s551":true, "s552":true, "s553":true, "s554":true, "s555":true, "s556":true, "s557":true, "s558":true, "s559":true,
      "s560":true, "s561":true, "s562":true, "s563":true, "s564":true, "s565":true, "s566":true, "s567":true, "s568":true, "s569":true,
      "s570":true, "s571":true, "s572":true, "s573":true, "s574":true, "s575":true, "s576":true, "s577":true, "s578":true, "s579":true,
      "s580":true, "s581":true, "s582":true, "s583":true, "s584":true, "s585":true, "s586":true, "s587":true, "s588":true, "s589":true,
      "s590":true, "s591":true, "s592":true, "s593":true, "s594":true, "s595":true, "s596":true, "s597":true, "s598":true, "s599":true,
      "s600":true, "s601":true, "s602":true, "s603":true, "s604":true, "s605":true, "s606":true, "s607":true, "s608":true, "s609":true, 
      "s610":true, "s611":true, "s612":true, "s613":true, "s614":true, "s615":true, "s616":true, "s617":true, "s618":true, "s619":true, 
      "s620":true, "s621":true, "s622":true, "s623":true, "s624":true, "s625":true, "s626":true, "s627":true, "s628":true, "s629":true, 
      "s630":true, "s631":true, "s632":true, "s633":true, "s634":true, "s635":true, "s636":true, "s637":true, "s638":true, "s639":true, 
      "s640":true, "s641":true, "s642":true, "s643":true, "s644":true, "s645":true, "s646":true, "s647":true, "s648":true, "s649":true,
      "s650":true, "s651":true, "s652":true, "s653":true, "s654":true, "s655":true, "s656":true, "s657":true, "s658":true, "s659":true,
      "s660":true, "s661":true, "s662":true, "s663":true, "s664":true, "s665":true, "s666":true, "s667":true, "s668":true, "s669":true,
      "s670":true, "s671":true, "s672":true, "s673":true, "s674":true, "s675":true, "s676":true, "s677":true, "s678":true, "s679":true,
      "s680":true, "s681":true, "s682":true, "s683":true, "s684":true, "s685":true, "s686":true, "s687":true, "s688":true, "s689":true,
      "s690":true, "s691":true, "s692":true, "s693":true, "s694":true, "s695":true, "s696":true, "s697":true, "s698":true, "s699":true,
      "s700":true, "s701":true, "s702":true, "s703":true, "s704":true, "s705":true, "s706":true, "s707":true, "s708":true, "s709":true, 
      "s710":true, "s711":true, "s712":true, "s713":true, "s714":true, "s715":true, "s716":true, "s717":true, "s718":true, "s719":true, 
      "s720":true, "s721":true, "s722":true, "s723":true, "s724":true, "s725":true, "s726":true, "s727":true, "s728":true, "s729":true, 
      "s730":true, "s731":true, "s732":true, "s733":true, "s734":true, "s735":true, "s736":true, "s737":true, "s738":true, "s739":true, 
      "s740":true, "s741":true, "s742":true, "s743":true, "s744":true, "s745":true, "s746":true, "s747":true, "s748":true, "s749":true,
      "s750":true, "s751":true, "s752":true, "s753":true, "s754":true, "s755":true, "s756":true, "s757":true, "s758":true, "s759":true,
      "s760":true, "s761":true, "s762":true, "s763":true, "s764":true, "s765":true, "s766":true, "s767":true, "s768":true, "s769":true,
      "s770":true, "s771":true, "s772":true, "s773":true, "s774":true, "s775":true, "s776":true, "s777":true, "s778":true, "s779":true,
      "s780":true, "s781":true, "s782":true, "s783":true, "s784":true, "s785":true, "s786":true, "s787":true, "s788":true, "s789":true,
      "s790":true, "s791":true, "s792":true, "s793":true, "s794":true, "s795":true, "s796":true, "s797":true, "s798":true, "s799":true            
    };
  
  
  
      // log interaction events with permanent userId
    var permId;
    var changingVideo = false;
    const verbose = false;
      chrome.storage.local.get(['userId'], function(data) {
        if(data.userId) {
          permId = data.userId;
        }
    });
    
    const closeImage = chrome.extension.getURL('img/x-circle.svg');
  
    var getCustomMessageWithButton = function(options) {
      return `
      <div id="alert-dialog-wrapper">
        <div id="alert-dialog-container">
          <div id="alert-title-wrapper">
              <div class="alert-title">
                  <p id="alert-title-txt" class="extension-title">
                      ${options.title}
                  </p>
                  <button id="alert-x-btn">
                      <img src="${closeImage}" alt="close" />
                  </button>
              </div>
              <div class="extension-border-bot">
                  
              </div>
          </div>
          <div id="alert-description">
              <p id="alert-content-txt" class="extension-txt">
                ${options.content}
              </p>
              <button id="alert-return-btn" class="extension-btn">${options.buttonTitle}</button>
          </div>
        </div>
      </div>
      `;
    }
  
    var ownerOnlyNextEpisodeModal = {
      title: 'Teleparty | Disconnected from party',
      content: `Only the owner of this party can change the episode. Click the button below to be redirected to the party, then click on the red Tp icon to rejoin.`,
      buttonTitle: `Return to Party`
    }
  
    var invalidNextEpisodeModal = {
      title: 'Teleparty | Disconnected from party',
      content: `Sorry, long parties only work for consecutive episodes for now. Please share a new Teleparty to continue watching together, or click the button below to rejoin the party.`,
      buttonTitle: `Return to Party`
    }
  
    var failedNextEpisodeModal = {
      title: 'Teleparty | Disconnected from party',
      content: `It looks like someone changed the video and we weren't able to connect you. Click the button below to be redirected to the party, then click on the red Tp icon to rejoin.`,
      buttonTitle: `Return to Party`
    }
  
    var lostConnectionModal = {
      title: 'Teleparty | Disconnected from party',
      content: `It looks like you lost connection to the server. Click the button below to be redirected to the party, then click on the red Tp icon to rejoin.`,
      buttonTitle: `Return to Party`
    }
    
  
    var showButtonMessage = function(options, redirectUrl) {
      const modalTemplate = getCustomMessageWithButton(options);
      document.body.insertAdjacentHTML("afterbegin", modalTemplate);
      jQuery('#alert-x-btn').click(() => {
        document.querySelector('#alert-dialog-wrapper').remove();
      })
  
      jQuery('#alert-return-btn').click(() => {
        document.querySelector('#alert-dialog-wrapper').remove();
        window.location.href = redirectUrl;
      })
    }
  
  
      //////////////////////////////////////////////////////////////////////////
      // Helpers                                                              //
      //////////////////////////////////////////////////////////////////////////
  
  
      var logMessage = function(message, logTime = false) {
        if (verbose && logTime) {
          const time = new Date();
          const timeStatus = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ":" + time.getMilliseconds();
          console.log(`Teleparty: ${timeStatus} : ${message}`);
        }else if(verbose) {
          console.log("Teleparty: " + message);
        }
      }
      // returns an action which delays for some time
      var delay = function(milliseconds) {
        return function(result) {
          return new Promise(function(resolve, reject) {
            setTimeout(function() {
              resolve(result);
            }, milliseconds);
          });
        };
      };
  
      var escapeStr = function(str) {
        return str.replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      }
  
      // returns an action which delays for some time
      var delay = function(milliseconds) {
        return function(result) {
          return new Promise(function(resolve, reject) {
            setTimeout(function() {
              resolve(result);
            }, milliseconds);
          });
        };
      };
  
      // returns an action which waits until the condition thunk returns true,
      // rejecting if maxDelay time is exceeded
      var delayUntil = function(condition, maxDelay) {
        return function(result) {
          var delayStep = 250;
          var startTime = (new Date()).getTime();
          var checkForCondition = function() {
            if (condition()) {
              return Promise.resolve(result);
            }
            if (maxDelay != null && (new Date()).getTime() - startTime > maxDelay) {
              return Promise.reject(Error('delayUntil timed out'));
            }
            return delay(delayStep)().then(checkForCondition);
          };
          return checkForCondition();
        };
      };
  
      // add value to the end of array, and remove items from the beginning
      // such that the length does not exceed limit
      var shove = function(array, value, limit) {
        array.push(value);
        if (array.length > limit) {
          array.splice(0, array.length - limit);
        }
      };
  
      // compute the mean of an array of numbers
      var mean = function(array) {
        return array.reduce(function(a, b) { return a + b; }) / array.length;
      };
  
      // compute the median of an array of numbers
      var median = function(array) {
        return array.concat().sort()[Math.floor(array.length / 2)];
      };
  
      // swallow any errors from an action
      // and log them to the console
      // returns a function that takes in a previous promise result arg that is passed down to swallowed action
      var swallow = function(action) {
        return function(result) {
          return action(result).catch(function(e) {
            console.error(e);
          });
        };
      };
  
      // promise.ensure(fn) method
      // note that this method will not swallow errors
      Promise.prototype.ensure = function(fn) {
        return this.then(fn, function(e) {
          fn();
          throw e;
        });
      };
  
      // inject a script onto the Netflix window DOM outside of CRX sandbox
      // with full access to window context
      var injectScript = function(script) {
        var s = document.createElement('script');
        s.textContent = script;
        (document.head||document.documentElement).after(s);
        // s.remove();
      }
  
      //////////////////////////////////////////////////////////////////////////
      // HBO API                                                              //
      //////////////////////////////////////////////////////////////////////////
  
      var uiEventsHappening = 0;
  
      // video duration in milliseconds
      // hbo video durations include "after the episode" video recaps
      // TODO: fix;
      var lastDuration = 60 * 60 * 1000;
      
      // periodically renew hbo divs
      var hboDivs = jQuery("div");
      setInterval(function() {
        hboDivs = jQuery("div");
        if(logState) {
        }
      }, 1500);
      
      
      // TODO: inefficient to call hbo div every time
      // TODO: pause button loading state is very confusing
      var getState = function() {
        if (jQuery("video").length == 0 || (playItem && playItem.type === 'PROMO')) {
          return 'notready';
        }else if(jQuery("video").length == 0) {
         return 'none'; 
        }else if (jQuery("video")[0].readyState < 4) {
          return 'loading';
        }else if (jQuery("video")[0].paused) {
          return 'paused';
        } else {
          return 'playing';
        }
      };   
      
      var seek = function(milliseconds) {
        logMessage('Seek called', true);
        return new Promise(async function (resolve, reject) {
          uiEventsHappening += 1;
          try {
            video.currentTime = milliseconds / 1000
            await delay(300)()
            await delayUntil( () => { return getState() !== 'loading'}, 1000)();
            resolve();
          } catch (error) {
            reject(error);
          } finally {
            uiEventsHappening -= 1;
          }
        });
      };
  
      var pause = function() {
        return new Promise( async (resolve,reject) => {
          console.log("Attempting to pause")
          uiEventsHappening += 1;
          try {
            const pauseEvent = new CustomEvent('tpVideoNode', {detail: {type: 'pause'}});
            window.dispatchEvent(pauseEvent);
            await delayUntil( () => { return getState() === 'paused'}, 1000)();
            resolve();
          } catch (error) {
            reject(error);
          } finally {
            uiEventsHappening -= 1;
          }
        });
      }
      
      var play = function() {
        return new Promise( async (resolve,reject) => {
          console.log("Attempting to play")
          uiEventsHappening += 1;
          try {
            const playEvent = new CustomEvent('tpVideoNode', {detail: {type: 'play'}});
            window.dispatchEvent(playEvent);
            await delayUntil( () => { return getState() === 'playing'}, 1000)();
            resolve();
          } catch (error) {
            reject(error);
          } finally {
            uiEventsHappening -= 1;
          }
        });
      }
  
      /**
       * Return the remaining time on the video (miliseconds)
       */
      var getRemainingTime = function() {
        return getDuration() - getPlaybackPosition()
      }
  
      var formatTime = function(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return [
          h,
          m > 9 ? m : (h ? '0' + m : m || '0'),
          s > 9 ? s : '0' + s
        ].filter(Boolean).join(':');
      }
      
      /**
       * Returns a string version of the remaining time
       */
      var getRemainingTimeText = function() {
        return formatTime(getRemainingTime());
      };
  
      /**
       * Returns the duration of the video (miliseconds), ignoring promo
       */
      var getDuration = function() {
        return Math.floor(video.duration * 1000);
      };
  
      /**
       * Returns the current position of the video (miliseconds), ignoring promo
       */
      var getPlaybackPosition = function() {
        return Math.floor((video.currentTime * 1000) - (videoTimeOffset));
      };
  
      // Video Events
      // var onLoadingChange = function() {
      //   if(!sessionId || changingVideo) {return;}
      //   if (getState() == 'loading') {
      //     onBuffer();
      //   }else {
      //     videoCanPlay();
      //   }
      // }
      var onBuffer = function() {
        if(!sessionId || changingVideo) {return;}
        console.log("Buffering")
        socket.emit('buffering', { buffering: true }, () => {});
      }
  
      var onCanPlay = function() {
        if(!sessionId || changingVideo) {return;}
        console.log("Done buffering")
        socket.emit('buffering', { buffering: false }, () => {});
      }
  
      /**
       * Setup video events for a src video
       */
      var loadVideoHandlers = (src) => {
        video = src
        videoDuration = getDuration();
        video.onwaiting = onBuffer;
        video.oncanplay = onCanPlay;
        video.onplay = onVideoChange;
        video.onpause = onVideoChange;
        video.onseeking = onVideoChange;
      }
  
      // wake up from idle mode
      var wakeUp = function() {
        uiEventsHappening += 1;
  
        return delay(1)().ensure(function() {
          uiEventsHappening -= 1;
        });
      };
  
          // show the playback controls (hides controls after 2.5 secs)
      var showControls = async function() {
        uiEventsHappening += 1;
        jQuery("video").addClass("videoObject");
        var videoObject = document.querySelector(".videoObject");
        if (videoObject) {
          var mouseX = 100; // relative to the document
          var mouseY = 100; // relative to the document
          var eventOptions = {
            'bubbles': true,
            'button': 0,
            'screenX': mouseX - jQuery(window).scrollLeft(),
            'screenY': mouseY - jQuery(window).scrollTop(),
            'clientX': mouseX - jQuery(window).scrollLeft(),
            'clientY': mouseY - jQuery(window).scrollTop(),
            'offsetX': mouseX,
            'offsetY': mouseY,
            'pageX': mouseX,
            'pageY': mouseY,
            'currentTarget': videoObject
          };
          videoObject.dispatchEvent(new MouseEvent('mousemove', eventOptions));
        }
        uiEventsHappening -= 1;
      };
  
      // hide the playback controls
      var hideControls = function() {
        uiEventsHappening += 1;
        return delay(1)().ensure(function() {
          uiEventsHappening -= 1;
        });
      };
  
  
      // freeze playback for some time and then play
      var freeze = function(milliseconds) {
        return function() {
          uiEventsHappening += 1;
          // jQuery('.button-nfplayerPause').click();
          var video = jQuery("video")[0];
          video.pause();
          return delay(milliseconds)().then(function() {
            // jQuery('.button-nfplayerPlay').click();
            video.play();
          }).then(hideControls).ensure(function() {
            uiEventsHappening -= 1;
          });
        };
      };
  
      //////////////////////////////////////////////////////////////////////////
      // Socket                                                               //
      //////////////////////////////////////////////////////////////////////////
  
      // connection to the server
      // var socket = io('https://netflixparty-server.herokuapp.com');
      // var socket = io('https://activity.netflixparty.com/');    
  
      var getHboVideoId = function(url) {
          var key = 'urn:hbo:episode';
          var queryIndex = 1;
          var searchString = url.split('/episode/')[queryIndex];
          if (searchString === undefined) {
            return null;
          }
          logMessage("search String: " + searchString);		
          var escapedKey = key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
          logMessage("escaped Key: " + escapedKey);
          var regex = new RegExp(escapedKey + ':' + '([^&]*)(&|$)');
          var match = regex.exec(searchString);
          if (match === null) {
            return null;
          }
          return decodeURIComponent(match[1]);
      };    
  
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
  
  
      var getURLParameter = function(url, key, queryIndex) {
          var searchString = '?' + url.split('?')[queryIndex];
          if (searchString === undefined) {
            return null;
          }
          logMessage("search String: " + searchString);
          var escapedKey = key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
          logMessage("escaped Key: " + escapedKey);
          var regex = new RegExp('[?|&]' + escapedKey + '=' + '([^&]*)(&|$)');
          var match = regex.exec(searchString);
          if (match === null) {
            return null;
          }
          return decodeURIComponent(match[1]);
      };  
  
      var socket;
      var url = window.location.href;
      logMessage('content script url: ' + url);
      var episodeIdFromUrl = getHboVideoId(url);
      var sessionIdFromUrl = getURLParameter(url, 'npSessionId', 1);
      var npServerIdFromUrl = getURLParameter(url, 'npServerId', 1);
      // var servers = {'s1':true, 's2':true, 's3':true, 's4':true, 's5':true, 's6':true, 's7':true, 's8':true, 's9':true};
    var servers = serversConfig;
      // var defaultServer = 'wpseth';
    var defaultServer = defaultServerOptions[Math.floor(Math.random() * defaultServerOptions.length)];
    // var servers = serversConfig;
    var serverId = npServerIdFromUrl ? npServerIdFromUrl : defaultServer;
  
      //socket = io('http://127.0.0.1:3005/');
      
      // Using ws transport vs default preflight XHR requests fixes CORS cross-domain Chrome issues
      // Read more at http://maxprog.net.pl/node-js/socket-io-and-cross-domain-communication/
      // https://stackoverflow.com/questions/28238628/socket-io-1-x-use-websockets-only
      var corsOptions = {transports: ['websocket']};
    // socket = io('https://' + serverId + '.netflixparty.com/',corsOptions);
      if (!npServerIdFromUrl) {
          // default server
          socket = io('https://' + defaultServer + '.netflixparty.com/', corsOptions);
          logMessage('socket: https://' + defaultServer + '.netflixparty.com/');	
      } else if (servers[npServerIdFromUrl]) {
          socket = io('https://' + npServerIdFromUrl + '.netflixparty.com/', corsOptions);
          logMessage('socket: https://' + npServerIdFromUrl + '.netflixparty.com/');
          // socket = io('http://localhost:3000/');
          // logMessage('socket: https://localhost:3000/');
      } else {
          socket = io('https://netflixparty-server.herokuapp.com', corsOptions);
          logMessage('socket: https://netflixparty-server.herokuapp.com');
          herokuSocket = true;
      }  
  
      // connection to file server
      // var fileSocket = io('http://127.0.0.1:3000/');
  
      // get the userId from the server
      var userId = null;
      socket.on('userId', function(data) {
        logMessage('userId: ' + JSON.stringify(data));
        if (userId === null) {
          userId = data;
        }
      });
  
  
      //////////////////////////////////////////////////////////////////////////
      // Ad   Settings                                                        //
      //////////////////////////////////////////////////////////////////////////
  
      var adPlacements = []; // list of all ad times in current video
      var currAdTimer = 0; // list of ad timer for currently playing ad
  
      var userAds = {}; // map of userid: Ad when ads get active
      var usersPlayingAds = []; // list of userIds playing ads
      var fastestAd = 0; // timer for fastest Ad in userAds
  
  
      var setUserAd = function(userAd) {
          if(userAd.userId) {
              userAds[userAd.userId] = userAd;
              usersPlayingAds.push(userAd.userId);
          }
  
  
      }
  
  
  
      // respond to update settings from the server
      socket.on('updateActiveAd', function(data) {
        // pushTask(receive(data));
        logMessage(JSON.stringify(data));
        if(data.userAd)  setUserAd(data.userAd);
        // if(data.userSettings.userIcon) setUserIcon(data.userSettings.userId, data.userSettings.userIcon, false);
        // if(data.userSettings.userNickname) setUserNickname(data.userSettings.userId, data.userSettings.userNickname, false);
      });
  
      //////////////////////////////////////////////////////////////////////////
      // User Settings                                                        //
      //////////////////////////////////////////////////////////////////////////
  
      // icon state
      // BUGFIX: fix content verification errors due to case insensitivity (https://groups.google.com/a/chromium.org/forum/#!searchin/chromium-extensions/%E2%80%9CThis$20extension$20may$20have$20been$20corrupted%E2%80%9D$20%7Csort:date/chromium-extensions/DrSVKXkPCSU/Zw4dg_4MBgAJ)
      var oldIcons = ["Batman.svg","DeadPool.svg", "CptAmerica.svg", "Wolverine.svg", "IronMan.svg", "Goofy.svg", "Alien.svg", "Mulan.svg", "Snow-White.svg", "Poohbear.svg", "Sailormoon.svg", "Sailor Cat.svg", "Pizza.svg", "Cookie.svg", "Chocobar.svg", "hotdog.svg", "Hamburger.svg", "Popcorn.svg", "IceCream.svg", "ChickenLeg.svg"]

  var newIcons = ["General/Alien.svg","General/Batman.svg","General/ChickenLeg.svg","General/Chocobar.svg","General/Cookie.svg","General/CptAmerica.svg","General/DeadPool.svg","General/Goofy.svg","General/Hamburger.svg","General/hotdog.svg","General/IceCream.svg","General/IronMan.svg","General/Mulan.svg","General/Pizza.svg","General/Poohbear.svg","General/Popcorn.svg","General/Sailor Cat.svg","General/Sailormoon.svg","General/Snow-White.svg","General/Wolverine.svg","Christmas/angel.svg","Christmas/bell.svg","Christmas/box.svg","Christmas/cane.svg","Christmas/flake.svg","Christmas/gingerbread.svg","Christmas/gingerbread_F.svg","Christmas/gingerbread_M.svg","Christmas/gloves_blue.svg","Christmas/gloves_red.svg","Christmas/hat.svg","Christmas/ornament.svg","Christmas/raindeer.svg","Christmas/reef.svg","Christmas/santa_F.svg","Christmas/santa_M.svg","Christmas/snowglobe.svg","Christmas/snowman.svg","Christmas/sock.svg","Christmas/tree.svg"];
  var iconMap = {"General":["Alien.svg","Batman.svg","ChickenLeg.svg","Chocobar.svg","Cookie.svg","CptAmerica.svg","DeadPool.svg","Goofy.svg","Hamburger.svg","hotdog.svg","IceCream.svg","IronMan.svg","Mulan.svg","Pizza.svg","Poohbear.svg","Popcorn.svg","Sailor Cat.svg","Sailormoon.svg","Snow-White.svg","Wolverine.svg"],"Christmas":["angel.svg","bell.svg","box.svg","cane.svg","flake.svg","gingerbread.svg","gingerbread_F.svg","gingerbread_M.svg","gloves_blue.svg","gloves_red.svg","hat.svg","ornament.svg","raindeer.svg","reef.svg","santa_F.svg","santa_M.svg","snowglobe.svg","snowman.svg","sock.svg","tree.svg"],};

  // Pick a random old Icon to use with older versions.
  var defaultIcon = oldIcons[Math.floor(Math.random() * oldIcons.length)];
      var iconsInUse = [];
      var userIcons = {};
  
      var userNicknames = {};
      var nicknamesInUse = [];
  
      var userSettings = {};
  
      var addIconButton = function(iconPath,iconHolder) {
        var iconButton = jQuery(`
          <a class="image-button">
            <img class="img-class" src='${chrome.runtime.getURL('img/icons/' + iconPath)}'>
          </a>
      `).appendTo(iconHolder).data('icon', iconPath);
      }
    
      var loadIconMap = function() {
        //Not used in the code, but can be run in development to update the HardCoded Icon Map
        return new Promise((resolve,reject) => {
          chrome.runtime.sendMessage({type: 'getIconMap'}, function(response) {
            iconMap = response;
            console.log(iconMap);
            resolve();
          });
        })
      }
    
      var addIconSelector = function() {
        Object.keys(iconMap).forEach(function (categoryName) {
            var icons = iconMap[categoryName];
            var iconHolder = jQuery(`
              <ul id="icon-holder"></ul>
            `);
            for (var icon of icons) {
              addIconButton(`${categoryName}/${icon}`, iconHolder)
            }
            var categorySection = jQuery(`
              <div class="icon-holder-wrap">
                <p class="extension-txt-indicator">${categoryName}</p>
              </div>
            `)
            iconHolder.appendTo(categorySection);
            categorySection.appendTo(jQuery('#icon-holder-template'));
        });
      }
    
      // TODO: save icon url for userSettings in chrome storage?
      // FIX: escape icon URL
      var getUserIconURL = function(userId, userIcon) {
        if(userIcons[userId]) {
          return userIcons[userId] 
              return userIcons[userId] 
          return userIcons[userId] 
        } else {
          var iconURL = null;
          if (userIcon) {
            if (userIcon.includes('?newIconUrl=')) {
              var parsedIcon = userIcon.split('?newIconUrl=')[1];
              var oldIcon = userIcon.split('?newIconUrl=')[0];
              if (newIcons.includes(parsedIcon)) {
                iconURL = chrome.runtime.getURL('img/icons/' + parsedIcon);
              }else if(oldIcons.includes(oldIcon)) {
                iconURL = chrome.runtime.getURL('img/icons/General/' + oldIcon);
              }
            }else {
              if (newIcons.includes(userIcon)) {
                // Work with new icons that don't use the query for future versions
                iconURL = chrome.runtime.getURL('img/icons/' + userIcon);
              }else if(oldIcons.includes(userIcon)) {
                // Work with Old version icons
                iconURL = chrome.runtime.getURL('img/icons/General/' + userIcon);
              }
            }
          }  
          if (iconURL == null) {
            // Load default icon for user.
            iconURL = chrome.runtime.getURL('img/icons/General/' + oldIcons[Math.floor(Math.random() * oldIcons.length)]);
            if (iconsInUse.length < iconMap["General"].length) {
              while (iconsInUse.hasOwnProperty(iconURL)) {
                iconURL = chrome.runtime.getURL('img/icons/General/' + oldIcons[Math.floor(Math.random() * oldIcons.length)]);
              }
            }
          }
          userIcons[userId] = iconURL;
          iconsInUse.push(iconURL);
          return userIcons[userId];
        }
      }
    
      var getUserNickname = function(userId, userNickname) {
        if(userNicknames[userId]) {
          return userNicknames[userId]
              return userNicknames[userId] 
          return userNicknames[userId]
        } else {
          if(userNickname) {
          userNicknames[userId] = userNickname;
          nicknamesInUse.push(userNickname);
          return userNicknames[userId];
                  return userNicknames[userId];    			
          return userNicknames[userId];
          }
        }
      }
    
    
      // when user clicks on icon selector button, calls this function
      // if (saveToChrome) adds icon as userIcon to chrome storage (async)
      // adds userId: userIcon to userIcons map
      // add userIcon to userSettings map
      // re-renders sidebar based on usersettings map
      var setUserIcon = function(userId, userIcon, saveToChrome) {
        var userIcon = escapeStr(userIcon);
        var render = userIcons[userId];
      if(saveToChrome) {
        if (userIcon.includes("/")) {
          var iconName = userIcon.split("/")[1];
          if (oldIcons.includes(iconName)) {
            //Selected an old icon - use old icon
            userIcon = `${iconName}?newIconUrl=${userIcon}`;
            defaultIcon = iconName;
          }else {
            //Attach new icon as query
            userIcon = `${defaultIcon}?newIconUrl=${userIcon}`;
          }
        }
        chrome.storage.local.set({"userIcon": userIcon}, function(data) {
          if(chrome.runtime.lastError)
          {
              /* error */
              console.log(chrome.runtime.lastError.message);
              return;
          }
          console.log('set user icon chrome storage data: ' + JSON.stringify(data));
          console.log('userIcon saved into settings chrome storage: ' + userIcon);
        });
        userSettings.userIcon = userIcon;
        console.log('new user settings after set user icon: ' + JSON.stringify(userSettings));
        socket.emit('broadcastUserSettings', { userSettings: userSettings }, function() {});
      }
      var iconURL = "";
    
      if (userIcon.includes('?newIconUrl=')) {
        var parsedIcon = userIcon.split('?newIconUrl=')[1];
        var oldIcon = userIcon.split('?newIconUrl=')[0];
        if (newIcons.includes(parsedIcon)) {
          iconURL = chrome.runtime.getURL('img/icons/' + parsedIcon);
        }else if(oldIcons.includes(oldIcon)) {
          iconURL = chrome.runtime.getURL('img/icons/General/' + oldIcon);
        }
      }else {
        if (newIcons.includes(userIcon)) {
          // Work with new icons that don't use the query for future versions
          iconURL = chrome.runtime.getURL('img/icons/' + userIcon);
        }else if(oldIcons.includes(userIcon)) {
          // Work with Old version icons
          iconURL = chrome.runtime.getURL('img/icons/General/' + userIcon);
        }
      }
    
      if (iconURL == null) {
        // Load default icon for user.
        iconURL = chrome.runtime.getURL('img/icons/General/' + oldIcons[Math.floor(Math.random() * oldIcons.length)]);
        if (iconsInUse.length < iconMap["General"].length) {
          while (iconsInUse.hasOwnProperty(iconURL)) {
            iconURL = chrome.runtime.getURL('img/icons/General/' + oldIcons[Math.floor(Math.random() * oldIcons.length)]);
          }
        }
      }
    
      userIcons[userId] = iconURL;
      iconsInUse.push(iconURL);
      logIcons();
      // if(render) {
        // delete old iconUrl from icons in use
        renderSidebar();
        // }
      }
    
  
      var setUserNickname = function(userId, userNickname, saveToChrome) {
          var render = userNicknames[userId];		
          if(saveToChrome) {
              chrome.storage.local.set({"userNickname": userNickname}, function(data) {
  
                     if(chrome.runtime.lastError)
                     {
                         /* error */
                         logMessage(chrome.runtime.lastError.message);
                         return;
                     }
                     logMessage('set user nickname chrome storage data: ' + JSON.stringify(data));
  
                     chrome.storage.local.get(['userNickname'], function(result) {
                        logMessage('Value currently is ' + result.key);
                      });
  
                  logMessage('userNickname saved into settings chrome storage: ' + userNickname);
              });
              userSettings.userNickname = userNickname;
              logMessage('new user settings after set user nickname: ' + JSON.stringify(userSettings));
              socket.emit('broadcastUserSettings', { userSettings: userSettings }, function() {});
          }
  
          userNicknames[userId] = userNickname;
          nicknamesInUse.push(userNickname);
              renderSidebar();
      }
  
      chrome.storage.onChanged.addListener(function(changes, areaName) {
          logMessage("storage change: " + JSON.stringify(changes) + " for " + JSON.stringify(areaName));
      });
  
      // re-renders sidebar based on userSettings map
      var renderSidebar = function() {
        var userIconURL = getUserIconURL(userSettings.userId, userSettings.userIcon);
        // console.log("call renderSidebar here: " + userIconURL);
        jQuery('#user-icon img').attr('src', userIconURL);
        jQuery('.user-icon img').attr('src', userIconURL);
    
        var msgs = jQuery('.msg');
        // console.log("msgs length: " + msgs.length);
        for(var i = 0; i < msgs.length; i++) {
          if(jQuery(msgs[i]).data('permId') && jQuery(msgs[i]).data('userIcon')) {
            if(userIcons[jQuery(msgs[i]).data('permId')] != jQuery(msgs[i]).data('userIcon')) {
              jQuery(msgs[i]).find("img").attr('src', userIcons[jQuery(msgs[i]).data('permId')]);
              jQuery(msgs[i]).data('userIcon', userIcons[jQuery(msgs[i]).data('permId')]);
            }
          }
    
          if(jQuery(msgs[i]).data('permId') && jQuery(msgs[i]).data('userNickname') == '') {
            if(userNicknames[jQuery(msgs[i]).data('permId')] != jQuery(msgs[i]).data('userNickname')) {
              if(userNicknames[jQuery(msgs[i]).data('permId')]) {
                // jQuery(msgs[i]).find("p .msg-nickname").text(userNicknames[jQuery(msgs[i]).data('permId')]);
    
                // console.log("render message data: " + JSON.stringify(jQuery(msgs[i]).data('message')));
    
                var message = jQuery(msgs[i]).data('message');
                var permId = jQuery(msgs[i]).data('permId');
                var userIcon = userIcons[jQuery(msgs[i]).data('permId')];
                var userNickname = userNicknames[jQuery(msgs[i]).data('permId')]
    
                var nicknameMessage = jQuery(`
                  <div class="msg-container">
                      <div class="icon-name">
                        <div class="icon">
                          <img src="${jQuery(msgs[i]).data('userIcon')}">
                        </div>
                      </div>
                      <div class="msg-txt message${ message.isSystemMessage ? '-system' : '-txt' }">
                                    <h3>${userNicknames[jQuery(msgs[i]).data('permId')].replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</h3>
                        <p>${message.body.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
                      </div>
                    </div>
                `)
    
                jQuery(msgs[i]).replaceWith(nicknameMessage);
                jQuery(nicknameMessage).data('permId', permId).data('userIcon', userIcon).data('userNickname', userNickname);
    
                // jQuery(msgs[i]).hide();
              }
              // replace msg nickname w new nickname
            }
          }
        }
    
        var msgs = jQuery('.msg-container');
        // console.log("msgs length: " + msgs.length);
        for(var i = 0; i < msgs.length; i++) {
          // console.log('msgs data for ' + i + ': ' + jQuery(msgs[i]).data('permId') + ', ' + jQuery(msgs[i]).data('userIcon'));
          if(jQuery(msgs[i]).data('permId') && jQuery(msgs[i]).data('userIcon')) {
            if(userIcons[jQuery(msgs[i]).data('permId')] != jQuery(msgs[i]).data('userIcon')) {
              jQuery(msgs[i]).find("img").attr('src', userIcons[jQuery(msgs[i]).data('permId')]);
              jQuery(msgs[i]).data('userIcon', userIcons[jQuery(msgs[i]).data('permId')]);
            }
          }
    
          if(jQuery(msgs[i]).data('permId') && jQuery(msgs[i]).data('userNickname')) {
            if(userNicknames[jQuery(msgs[i]).data('permId')] != jQuery(msgs[i]).data('userNickname')) {
              if(userNicknames[jQuery(msgs[i]).data('permId')]) {
                jQuery(msgs[i]).find("h3").text(userNicknames[jQuery(msgs[i]).data('permId')]);
                jQuery(msgs[i]).data('userNickname', userNicknames[jQuery(msgs[i]).data('permId')]);
              }
              // replace msg nickname w new nickname
            }
          }
        }
      }
  
      var logIcons = function() {
          logMessage("Icons in use: " + JSON.stringify(iconsInUse));
          logMessage("user Icons: " + JSON.stringify(userIcons));
      }
  
      var getUserIdPromise = function() {
        console.log('user Id promise called: ' + userId);
        return delayUntil(function() {
              return userId;
            }, 25000)();
        }
  
        var getChromeStorage = function() {
          return function() {
            return new Promise(function(resolve, reject) {
          if(userSettings.userId && userSettings.userIcon) {
            resolve(userSettings);
          }
          chrome.storage.local.get(null, function(data) {
            if(!data.userId) {
              data.userId = userId;
              permId = userId;
            }
      
      
            console.log('icons:' + JSON.stringify(oldIcons));
            console.log('user icon:' + JSON.stringify(data.userIcon));
            var userIconFix = false;
            if (data.userIcon && data.userIcon.includes("?newIconUrl=")) {
              //Make sure both parts of userId are valid.
              userIconFix = !(newIcons.includes(data.userIcon.split("?newIconUrl=")[1]) && oldIcons.includes(data.userIcon.split("?newIconUrl=")[0]));
            }else {
              userIconFix = !oldIcons.includes(data.userIcon);
            }
            console.log('userIconFix: ' + userIconFix);
      
      
      
            console.log('get chrome storage finished userID: ' + userId);
            console.log("get chrome storage finished: " + JSON.stringify(data));
      
            if(!userIconFix && data.userId && data.userIcon) {
              userSettings = data
              defaultIcon = data.userIcon.split("?newIconUrl=")[0];
            } else if(userIconFix || data.userId && !data.userIcon) {
              var dataUserId = data.userId;
              var newIcon = defaultIcon;
      
              // getUserIconURL(userId, newIcon);
              userSettings = {'userId': dataUserId, 'userIcon': newIcon};
              setUserIcon(userSettings.userId, userSettings.userIcon, true);
              console.log("get chrome storage creating new icon: " + JSON.stringify(userSettings));
              resolve(userSettings);
            }
            resolve(userSettings);
          });
            });
          };
        }
      // getChromeStorage()();
  
      // respond to update settings from the server
      socket.on('updateSettings', function(data) {
        // pushTask(receive(data));
        logMessage(JSON.stringify(data));
        if(data.userSettings.userIcon) setUserIcon(data.userSettings.userId, data.userSettings.userIcon, false);
        if(data.userSettings.userNickname) setUserNickname(data.userSettings.userId, data.userSettings.userNickname, false);
      });
  
  
  
  
      //////////////////////////////////////////////////////////////////////////
      // Chat API                                                             //
      //////////////////////////////////////////////////////////////////////////
  
      // chat state
      var messages = [];
      var unreadCount = 0;
      var originalTitle = document.title;
  
      // UI constants (80% scale)
      // Area(video) before: [((1168+(1274-1168) - 360*0.8)^2)*9/16] = 470k px^2
      // Area(video) after: [((1168+(1274-1168) - 360)^2)*9/16] = 546k px^2
      var defaultScale = 0.8;
      var chatSidebarWidth = 360*defaultScale;
      var chatSidebarPadding = 16*defaultScale;
      var avatarSize = 20*defaultScale;
      var avatarPadding = 4*defaultScale;
      var avatarBorder = 2*defaultScale;
      var chatVericalMargin = 4*defaultScale;
      var chatInputBorder = 2*defaultScale;
      var chatMessageHorizontalPadding = 8*defaultScale;
      var chatMessageVerticalPadding = 8*defaultScale;
      var presenceIndicatorHeight = 30*defaultScale;
  
      // summary state
      var messagesCount = 0;
      var interactionsCount = 0;    
      var sessionStartTime; // duration
      var summarySent = false;
  
      var chatHTML2 = '';
      var setHTML = function() {
        chatHtml2 = `
        <style>
        @import"https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap";.r-m{margin:0 !important}.r-m-t{margin-top:0 !important}.r-p-t{padding-top:0 !important}.r-m-l{margin-left:0 !important}.r-p-l{padding-left:0 !important}.r-m-r{margin-right:0 !important}.r-p-r{padding-right:0 !important}.r-m-b{margin-bottom:0 !important}.r-p-b{padding-bottom:0 !important}.r-b-r{border-radius:0px !important}.r-boxshadow{box-shadow:none !important}:root{--patreon: #F96854;--base-red: #EF3E3A;--active-red: #ea0f0a;--base-blue: #4da9ff;--base-orange: #ff8d4c;--base-green: #24D154;--base-white: #FAFAFA;--white-5: #F0F0F0;--white-10: #DCDCDC;--white-15: #C8C8C8;--white-20: #B4B4B4;--white-25: #A0A0A0;--white-30: #8C8C8C;--white-35: #787878;--base-black: #191919;--black-5: #5A5A5A;--black-10: #464646;--black-15: #323232;--black-20: #282828;--black-25: #1e1e1e;--black-30: #0a0a0a}.base-white-bg{background-color:var(--base-white)}.white-5-bg{background-color:var(--white-5)}.white-10-bg{background-color:var(--white-10)}.white-15-bg{background-color:var(--white-15)}.white-20-bg{background-color:var(--white-20)}.white-25-bg{background-color:var(--white-25)}.white-30-bg{background-color:var(--white-30)}.white-35-bg{background-color:var(--white-35)}.base-black-bg{background-color:var(--base-black)}.black-5-bg{background-color:var(--black-5)}.black-10-bg{background-color:var(--black-10)}.black-15-bg{background-color:var(--black-15)}.black-20-bg{background-color:var(--black-20)}.black-25-bg{background-color:var(--black-25)}.black-30-bg{background-color:var(--black-30)}.black-35-bg{background-color:var(--black-35)}.base-red-bg{background-color:var(--base-red)}.active-red-bg{background-color:var(--active-red)}.base-orange-bg{background-color:var(--base-orange)}.base-blue-bg{background-color:var(--base-blue)}.base-green-bg{background-color:var(--base-green)}.patreon-bg{background-color:var(--patreon)}.txt-blue{color:var(--base-blue) !important}.txt-red{color:var(--base-red) !important}.txt-white{color:var(--base-white) !important}div,p,span,a,h1,h2,h3,h4,h5,h6,li,ul,button{word-wrap:break-word}:root{--regular: 400;--medium: 500;--semi-bold: 600;--bold: 700;--extra-bold: 800;--black: 900}.extension-title{font-family:"Poppins",sans-serif;font-weight:var(--medium);color:var(--base-red);font-size:16px;letter-spacing:.2px}.extension-txt{font-family:"Poppins",sans-serif;font-weight:var(--regular);color:#fff;font-size:14px}.extension-txt-indicator{font-family:"Poppins",sans-serif;font-weight:var(--regular);color:var(--white-35);font-size:11px}.extension-description{font-family:"Poppins",sans-serif;font-weight:var(--medium);color:var(--white-10);font-size:13px}.extension-border-bot{border-bottom:1px solid var(--black-10)}.extension-border-top{border-top:1px solid var(--black-10)}.extension-btn{width:100%;margin-top:10px;background:var(--base-red);color:var(--base-white);padding:10px 0px;border-radius:2px;font-family:"Poppins",sans-serif;font-weight:var(--medium);transition:background .3s ease;display:flex;flex-flow:wrap row;justify-content:center;font-size:14px}.extension-btn:hover{background:var(--active-red)}.extension-btn a{font-family:"Poppins",sans-serif;font-weight:var(--medium);color:var(--base-white)}#alert,#alert-dialog-wrapper{display:flex;flex-flow:wrap row;position:fixed;width:100%;height:100%;z-index:9999999999;align-items:center;box-shadow:8px 6px 20px 1px rgba(0,0,0,.2)}#alert-dialog-container{background:var(--base-black);max-width:400px;margin:0 auto;border-radius:4px}#alert-title-wrapper{padding:20px 20px 0px 20px}#alert-title-wrapper .alert-title{display:flex;flex-flow:wrap row;justify-content:space-between;align-items:center}#alert-title-wrapper .alert-title .alert-x{color:var(--base-white)}#alert-title-wrapper .extension-border-bot{padding-top:10px}#alert-description{padding:10px 20px 20px 20px}#alert-x-btn{background:none !important;border:none !important}#alert-content-txt{margin:0 !important}#alert-title-txt{margin:0 !important}#alert-return-btn{border:none !important}/*# sourceMappingURL=alert.min.css.map */
        </style>
        <style tpInjected>
          #chat-wrapper {
            width: ${chatSidebarWidth}px !important;
            height: 100% !important;
            background: #1a1a1a;
            position: fixed !important;
            top: 0 !important;
            left: auto !important;
            right: 0 !important;
            bottom: 0 !important;
            cursor: auto;
            user-select: text;
            -webkit-user-select: text;
            z-index: 9999999999 !important;
          }
    
          #chat-wrapper #chat-container {
            // width: 228px;
            height: 100%;
            position: relative;
            left: 0;
            right: 0;
            margin: 0 auto;
          }
    
          .with-chat {
            right: ${chatSidebarWidth}px !important;
            width: calc(100% - ${chatSidebarWidth}px) !important;
          }
    
    // Raymond's Styling Code
  @import url(https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap);body,html{font-size:16px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}*{box-sizing:border-box}a,body,button,h1,h2,h3,h4,h5,h6,html,li,ol,p,ul{padding:0}a,body,button,h1,h2,h3,h4,h5,h6,html,li,ol,p,ul{margin:0}a,li,ol,ul{text-decoration:none;list-style:none}button,input{border:none}body,h1,h2,h3,h4,h5,h6,html,p,span{user-select:text!important;cursor:auto!important}img{user-select:none!important}article,button,div,form,input,section{outline:0}a{display:block;width:fit-content}button,fieldset,form,input{background:0 0}button:hover{cursor:pointer}.r-m{margin:0!important}.r-m-t{margin-top:0!important}.r-p-t{padding-top:0!important}.r-m-l{margin-left:0!important}.r-p-l{padding-left:0!important}.r-m-r{margin-right:0!important}.r-p-r{padding-right:0!important}.r-m-b{margin-bottom:0!important}.r-p-b{padding-bottom:0!important}.r-b-r{border-radius:0!important}.r-boxshadow{box-shadow:none!important}:root{--patreon:#f96854;--base-red:#ef3e3a;--active-red:#ea0f0a;--base-blue:#4da9ff;--base-orange:#ff8d4c;--base-green:#24d154;--base-white:#fafafa;--white-5:#f0f0f0;--white-10:#dcdcdc;--white-15:#c8c8c8;--white-20:#b4b4b4;--white-25:#a0a0a0;--white-30:#8c8c8c;--white-35:#787878;--base-black:#191919;--black-5:#5a5a5a;--black-10:#464646;--black-15:#323232;--black-20:#282828;--black-25:#1e1e1e;--black-30:#0a0a0a}.base-white-bg{background-color:var(--base-white)}.white-5-bg{background-color:var(--white-5)}.white-10-bg{background-color:var(--white-10)}.white-15-bg{background-color:var(--white-15)}.white-20-bg{background-color:var(--white-20)}.white-25-bg{background-color:var(--white-25)}.white-30-bg{background-color:var(--white-30)}.white-35-bg{background-color:var(--white-35)}.base-black-bg{background-color:var(--base-black)}.black-5-bg{background-color:var(--black-5)}.black-10-bg{background-color:var(--black-10)}.black-15-bg{background-color:var(--black-15)}.black-20-bg{background-color:var(--black-20)}.black-25-bg{background-color:var(--black-25)}.black-30-bg{background-color:var(--black-30)}.black-35-bg{background-color:var(--black-35)}.base-red-bg{background-color:var(--base-red)}.active-red-bg{background-color:var(--active-red)}.base-orange-bg{background-color:var(--base-orange)}.base-blue-bg{background-color:var(--base-blue)}.base-green-bg{background-color:var(--base-green)}.patreon-bg{background-color:var(--patreon)}.txt-blue{color:var(--base-blue)!important}.txt-red{color:var(--base-red)!important}.txt-white{color:var(--base-white)!important}a,button,div,h1,h2,h3,h4,h5,h6,li,p,span,ul{word-wrap:break-word}:root{--regular:400;--medium:500;--semi-bold:600;--bold:700;--extra-bold:800;--black:900}.extension-title{font-family:Poppins,sans-serif;font-weight:var(--medium);color:var(--base-red);font-size:16px;letter-spacing:.2px}.extension-txt{font-family:Poppins,sans-serif;font-weight:var(--regular);color:var(--white-15);font-size:14px}.extension-txt-indicator{font-family:Poppins,sans-serif;font-weight:var(--regular);color:var(--white-35);font-size:11px}.extension-description{font-family:Poppins,sans-serif;font-weight:var(--medium);color:var(--white-10);font-size:13px}.extension-border-bot{border-bottom:1px solid var(--black-10)}.extension-border-top{border-top:1px solid var(--black-10)}.extension-btn{width:100%;margin-top:10px;background:var(--base-red);color:var(--base-white);padding:10px 0;border-radius:2px;font-family:Poppins,sans-serif;font-weight:var(--medium);transition:background .3s ease;display:flex;flex-flow:wrap row;justify-content:center;font-size:14px}.extension-btn:hover{background:var(--active-red)}.extension-btn a{font-family:Poppins,sans-serif;font-weight:var(--medium);color:var(--base-white)}::-webkit-scrollbar{width:2px}::-webkit-scrollbar-thumb{background:var(--base-red);border-radius:10px}#chat-wrapper{position:fixed;right:0;width:288px;height:100%;background:var(--base-black)}#chat-container{width:250px;height:100%;margin:0 auto;padding:12px 0}#chat-container .chat-header-container-active{height:100%}#chat-menu-container{display:flex;flex-flow:wrap row;justify-content:space-between;align-items:center}#chat-menu-container #title h1{font-family:Poppins,sans-serif;font-weight:var(--medium);color:var(--base-red);font-size:16px;letter-spacing:.5px}#chat-menu-container #function-user{display:flex;flex-flow:wrap row}#chat-menu-container #function-user #link-icon{display:flex;flex-flow:wrap row;align-items:center;padding-right:10px;cursor:pointer}#chat-menu-container #function-user #link-icon .chat-link{color:var(--base-white);width:18px;height:18px;transform:scale(1);transition:color .3s ease}#chat-menu-container #function-user #link-icon .chat-link:hover{color:var(--base-red);transform:scale(1.05)}#chat-menu-container #function-user #user-icon img{width:38px;height:38px;transform:scale(1);transition:transform .3s ease}#chat-menu-container #function-user #user-icon img:hover{transform:scale(1.05)}#chat-history-container{display:flex;flex-flow:wrap column;justify-content:flex-end;height:calc(100% - 136px)}#chat-history-container #chat-history{overflow:auto;width:100%;height:auto;padding-top:10px}#chat-history-container #chat-history .msg,#chat-history-container #chat-history .msg-container{display:flex;flex-flow:wrap row;justify-content:space-between;padding:5px 0;align-items:center}#chat-history-container #chat-history .msg-container{align-items:flex-start}#chat-history-container #chat-history .msg .icon img,#chat-history-container #chat-history .msg .icon-name img,#chat-history-container #chat-history .msg-container .icon img,#chat-history-container #chat-history .msg-container .icon-name img{width:36px;height:36px}#chat-history-container #chat-history .msg .msg-txt,#chat-history-container #chat-history .msg-container .msg-txt{display:flex;flex-flow:wrap column;width:80%}#chat-history-container #chat-history .msg .message,#chat-history-container #chat-history .msg .message-system,#chat-history-container #chat-history .msg .message-txt,#chat-history-container #chat-history .msg-container .message,#chat-history-container #chat-history .msg-container .message-system,#chat-history-container #chat-history .msg-container .message-txt{width:80%}#chat-history-container #chat-history .msg .message h3,#chat-history-container #chat-history .msg .message-system h3,#chat-history-container #chat-history .msg .message-txt h3,#chat-history-container #chat-history .msg-container .message h3,#chat-history-container #chat-history .msg-container .message-system h3,#chat-history-container #chat-history .msg-container .message-txt h3{font-family:Poppins,sans-serif;font-weight:var(--semi-bold);color:var(--base-white);font-size:14px;line-height:1.2;letter-spacing:.2px}#chat-history-container #chat-history .msg .message p,#chat-history-container #chat-history .msg .message-system p,#chat-history-container #chat-history .msg .message-txt p,#chat-history-container #chat-history .msg-container .message p,#chat-history-container #chat-history .msg-container .message-system p,#chat-history-container #chat-history .msg-container .message-txt p{font-family:Poppins,sans-serif;font-weight:var(--regular);font-size:14px;line-height:normal}#chat-history-container #chat-history .msg .message-txt p,#chat-history-container #chat-history .msg-container .message-txt p{color:#fff;word-break:break-word!important;line-height:normal}#chat-history-container #chat-history .msg .message-system p,#chat-history-container #chat-history .msg-container .message-system p{color:var(--white-35);font-style:italic;line-height:normal}#chat-input-container input{padding-top:5px;width:100%}#chat-input-container input:hover{cursor:auto!important}#chat-icon-container{display:flex;flex-flow:wrap column;flex-flow:column;height:100%;padding-top:10px}#chat-icon-container #icon-title-container{padding-bottom:10px}#chat-icon-container #icon-holder{display:flex;flex-flow:wrap row}#chat-icon-container #icon-holder .image-button{width:25%;padding:1px 3.75px}#chat-icon-container #icon-holder .image-button .img-class{width:100%;height:100%;transform:scale(.95);transition:transform .3s ease}#chat-icon-container #icon-holder .image-button .img-class:hover{transform:scale(1)}#icon-holder-container{height:calc(100% - 74px);overflow:auto}.icon-holder-wrap{padding:10px 0}.icon-holder-wrap:first-child{padding:0}.icon-holder-wrap p{padding-bottom:5px}.setting,.setting-container{display:flex;flex-flow:wrap column;display:none}.setting-usericon{width:100%;display:flex;flex-flow:wrap row;justify-content:center;padding-top:10px}.setting-usericon img{width:80px;height:80px;transform:scale(1);transition:transform .3s ease}.setting-usericon img:hover{transform:scale(1.05)}.setting-nickname{margin-top:10px}.setting-nickname .nickname,.setting-nickname .nickname-input,.setting-nickname .nickname-wrap{width:100%}.setting-nickname .nickname-wrap{display:flex;flex-flow:wrap column}.setting-nickname .nickname-input{margin-top:5px}.setting-nickname .nickname-input input{border-radius:2px;padding:8px 10px;width:100%;background:var(--black-15)}.setting-nickname .nickname-input input:hover{cursor:auto!important}#presence-indicator{display:block;padding-bottom:5px;height:20px}#patreon,#patreon-container,#patreon-link{display:flex;flex-flow:wrap row;justify-content:space-between;align-items:center;width:100%}#patreon-container{padding-top:10px}#patreon-link img{border-radius:20px;width:130px}#teleparty-blog-container{display:flex;flex-flow:wrap row;padding-top:10px;z-index:10}#teleparty-blog-btn{display:flex;flex-flow:wrap row;align-items:center;justify-content:space-between;width:100%;height:36px}#teleparty-blog-btn img{height:32px}#teleparty-blog-btn p{display:flex;flex-flow:wrap row;align-items:center;font-family:Poppins,sans-serif;font-weight:var(--medium);background:var(--base-red);color:var(--base-white);padding:6px 20px;border-radius:20px;height:100%}#teleparty-blog-btn p:hover{cursor:pointer!important}
   // Raymond's Styling Code
    
        </style>
    
        <script tpInjected>
        var script = document.createElement('script');
        script.src = 'https://code.jquery.com/jquery-1.11.0.min.js';
        document.getElementsByTagName('head')[0].appendChild(script);
    
    
        </script>
        <div id="notification-link" class="notification-links" tpInjected>
    
        </div>
    
        <div id="chat-wrapper" tpInjected>
          <div id="chat-container">
    
            <div id="chat-header-container">
    
              <ul id="chat-menu-container">
                <li id="function-title">
                  <div id="title">
                    <p class="extension-title">Teleparty</p>
                  </div>
                </li>
                <li id="function-user">
                  <div id="link-icon">
                    <img class="chat-link" src='${chrome.runtime.getURL("img/Link.svg")}'>
                    <input id="share-url" type="text" readonly="true" autocomplete="off" autofocus style="display:none;" />
                  </div>
                  <a id="user-icon">
                    <img src='${getUserIconURL(userSettings.userId, userSettings.userIcon)}'>
                  </a>
                </li>
              </ul>
    
              <div id="chat-link-container" style='display:none;'>
                <div id="chat-link">
                  <div id="chat-link-url">
                    <p>The url link goes here.</p>
                  </div>
                  <div id="chat-link-icon">
                    <img src='${chrome.runtime.getURL("img/Link.svg")}'>
                  </div>
                </div>
              </div>
    
              <div id="chat-icon-container" style="display:none">
                <div id="icon-title-container">
                  <div id="icon-title">
                    <p class="extension-description">Click to switch icon</p>
                  </div>
                </div>
                <div id="icon-holder-container">
                  <div id="icon-holder-template">
                    <div id="icon-holder-wrap">
                      <p class="extension-txt-indicator"></p>
                      <ul id="icon-holder"></ul>
                    </div>
                  </div>
                </div>
              </div>
    
            </div>
    
            <div id="setting-edit" class="chat-settings-container setting-container" style="display:none">
    
              <div class="setting-usericon">
                <div class="section-b-inner section-inner">
                  <a class="user-icon">
                    <img src='${getUserIconURL(userSettings.userId, userSettings.userIcon)}' />
                  </a>
                </div>
              </div>
    
              <div class="section-c setting-nickname">
                <div class="section-c-inner section-inner">
                  <div class="nickname-section row-wrap">
                    <div class="nickname-wrap row-one">
                      <p class="extension-description">Nickname</p>
                    </div>
                    <div class="nickname-input row-two">
                      <input id="nickname-edit" class="extension-txt" type="text" placeholder='${userSettings.userNickname ? escapeStr(userSettings.userNickname) : "Add a nickname"}'/>
                    </div>
                  </div>
                </div>
              </div>
    
            </div>
    
            <div id="settings-save" class="chat-settings-container setting-container" style="display:none">
              <div class="section-d">
                <div class="section-d-inner section-inner">
    
                  <div class="btns">
                    <button class='extension-btn'>Save Changes</button>
                  </div>
                </div>
              </div>
            </div>
    
            <div id="chat-history-container">
              <div id="chat-history">
              </div>
            </div>
    
            <div id="presence-indicator" class="extension-txt-indicator">
              <p class="extension-txt-indicator">People are currently typing...</p>
            </div>
    
            <div id="chat-input-container" class="extension-border-top">
              <input id="chat-input" class="extension-txt" type="text" placeholder="Type a message..." autocomplete="off"></input>
            </div>
    
            <div id="teleparty-blog-container">
              <a id="teleparty-blog-btn" target="none" href="https://www.netflixparty.com/introducing-teleparty">
                  <img src="${escapeStr(chrome.runtime.getURL('img/tp_logo.svg'))}" alt="">
                  <p class="extension-txt-indicator">Introducing Teleparty</p>
              </a>
            </div>
    
          </div>
        </div>
      `;
      }
  
  
      // this is used for the chat presence feature
      var typingTimer = null;
  
      var allowFullScreen = function() {
          // allow keyboard input on fullscreen
          var script = document.createElement( "script" );
          var fsCode = `
              // document.getElementsByClassName("sizing-wrapper")[0].webkitRequestFullScreen = function() {
              // 	logMessage("fullscreen test");
              // 	var fullScreenWrapper = document.getElementsByClassName("nf-kb-nav-wrapper")[0];
              // 	fullScreenWrapper.webkitRequestFullScreen(fullScreenWrapper.ALLOW_KEYBOARD_INPUT);
              // }
              // var fullScreenWrapper = document.getElementsByClassName("nf-kb-nav-wrapper")[0];
              // fullScreenWrapper.webkitRequestFullScreen(fullScreenWrapper.ALLOW_KEYBOARD_INPUT);
  
  
              // document.getElementsByClassName("sizing-wrapper")[0].requestFullScreen = function() {
              // 	logMessage("fullscreen test");
              // 	var fullScreenWrapper = document.getElementsByClassName("nf-kb-nav-wrapper")[0];
              // 	fullScreenWrapper.webkitRequestFullScreen(fullScreenWrapper.ALLOW_KEYBOARD_INPUT);
              // }
  
              document.getElementsByClassName("sizing-wrapper")[0].requestFullscreen = function() {logMessage('test');}
  
              logMessage("fullscreen loaded? :" + document.getElementsByClassName('button-nfplayerFullscreen').length);
  
              document.getElementsByClassName('button-nfplayerFullscreen')[0].onclick = function() {
                  logMessage('fullscreen click');
                  var fullScreenWrapper = document.getElementsByClassName("nf-kb-nav-wrapper")[0];
                  fullScreenWrapper.webkitRequestFullScreen(fullScreenWrapper.ALLOW_KEYBOARD_INPUT);
              }
              // 	var fullScreenWrapper = document.getElementsByClassName("nf-kb-nav-wrapper")[0];
              // 	fullScreenWrapper.webkitRequestFullScreen(fullScreenWrapper.ALLOW_KEYBOARD_INPUT);
              // }
          `;
          script.text = fsCode;
          document.head.appendChild( script );
      }
      var hboDivs = jQuery("div");
      var playButtonWrapper = jQuery(hboDivs.find(`[style*='overflow: hidden']`)[0])
  
    var video = null
      var initHboChat = function() {
          var hboDivs = jQuery("div");
          var summaryWrapper = jQuery(hboDivs.find(`[style*='user-select']`)[0]).next()
        jQuery('body').append(chatHtml2);
          summaryWrapper.hide();
      }
  
      var loadVideo = function() {
      var hboDivs = jQuery("div");
      logMessage("Starting video")
          if(jQuery(`[style*='play_large_initial']`).length > 0) {
        logMessage('video not started!');
        const playDiv = jQuery(`[style*='play_large_initial']`)[0].parentElement.parentElement
        playDiv.click();
          }
      }
  
  
  
      var resizeListener = function() {
          delay(100)().then(function() {
              var hboDivs = jQuery("div");
              if(hboDivs.find(`[style*='user-select']`).length > 0) {
                  logMessage('resize now');
                  jQuery(jQuery('#chat-wrapper')[0]).hide();
                  var summaryWrapper = jQuery(hboDivs.find(`[style*='user-select']`)[0]).next();
                  var summaryLeft = summaryWrapper.css('left'); 
                  var summaryWidth = summaryWrapper.css('width');
                  logMessage('summaryLeft, summaryWidth: ' + summaryLeft + ', ' + summaryWidth);
                  if(summaryLeft !== '0px') {
                      jQuery(jQuery('#chat-wrapper')[0]).css('left', summaryLeft);
                      jQuery(jQuery('#chat-wrapper')[0]).css('width', summaryWidth);		    	
                  }
            if (isChatVisible) {
              jQuery(jQuery('#chat-wrapper')[0]).show();
              jQuery('#chat-history').scrollTop(jQuery('#chat-history').prop('scrollHeight'));
            }
  
              } else {
                  logMessage('no resize fullscreenchange?');
        }
          });
    }
  
    var playItem = null;
    var playItemUpdatedAt = null;
    var videoTimeOffset = 0;
  
    var nodeListener = function (evt) {
      if (evt.detail.type == 'PlayItem') {
        playItem = evt.detail.playItem;
        playItemUpdatedAt = evt.detail.updatedAt;
        videoTimeOffset = (evt.detail.videoTimeOffset) * 1000;
      }
    }
  
    var videoNodeScript = `
      if (!window.nodeScriptLoaded) {
        window.nodeScriptLoaded = true;
        window.addEventListener('tpVideoNode', function(evt) {
            var type = evt.detail.type;
            var video = document.querySelector('video');
            if (type === 'seek') {
                if (video) {
                    video._dispNode._videoElementSetCurrentTime(evt.detail.time);
                }
            }else if (type === 'pause') {
                if (video) {
                    video._dispNode._videoElementPause();
                }
            }else if (type === 'play') {
                if (video) {
                    video._dispNode._videoElementPlay();
                }
            }else if(type == 'getPlayItem') {
                if (video != null) {
                    var playItem = video._dispNode._playItem;
                    var videoTimeOffset = video.currentTime - video._dispNode._position;
                    var evt = new CustomEvent('FromNode', {detail: {type: 'PlayItem', playItem: playItem, videoTimeOffset: videoTimeOffset, updatedAt: new Date().getTime()}});
                    window.dispatchEvent(evt);
                }
            }
        });
      }
    `;
    if (!window.nodeScriptLoaded) {
      injectScript(videoNodeScript);
    }
  
    window.addEventListener('FromNode', nodeListener);
      window.addEventListener('resize', resizeListener)
      window.document.addEventListener('webkitfullscreenchange', resizeListener)
  
    const redirectUrl = 'https://www.tele.pe'
  
    var getPartyUrl = function() {
      return redirectUrl + '/hbo/' + encodeURIComponent(sessionId) + '?s=' + encodeURIComponent(serverId);
    }
    
    // this is used for the chat presence feature
    var typingTimer = null;
    var isChatVisible = true;
  
    var linkIconListener = function(e) {
      if(sessionId && serverId) {
        const el = document.createElement('textarea');
        el.value = getPartyUrl();
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
    }
  
    var userIconListener = function(e) {
      logMessage("User icon clicked");
      toggleIconContainer();
    }
  
    
    // large user icon listener to go to icon holder menu
    var largeUserIconListener = function(e) {
      toggleLargeUserIconButton();
    }
    
    var userIconSelectorListener = function(e) {
      if(jQuery(this).data('icon')) {
        console.log('userIconSelector button clicked: ' + jQuery(this).data('icon'));
        setUserIcon(userSettings.userId, jQuery(this).data('icon'), true);
      }
      toggleIconContainer();
    }
    
    
    
    var saveChangesListener = function(e) {
      var nicknameText = jQuery('.nickname-input input').val().slice(0,25).replace(/^\s+|\s+$/g, '');
      
      if(nicknameText != '') {
        console.log('saveChanges button clicked: ' + nicknameText);
        setUserNickname(userSettings.userId, nicknameText, true);
      }
      toggleIconContainer();
    }
  
    var onNicknameKeyPressed = function(e) {
      e.stopPropagation();
      console.log("Stoped")
    }
    var onChatKeyPressed = function(e) {
      e.stopPropagation();
  
      if (e.which === 13) {
        // Enter key pressed
        const body = jQuery('#chat-input').val().replace(/^\s+|\s+$/g, '');
        if (body !== '') {
          if (typingTimer !== null) {
            clearTimeout(typingTimer);
            typingTimer = null;
            socket.emit('typing', { typing: false }, function() {});
          }
          
          jQuery('#chat-input').prop('disabled', true);
          socket.emit('sendMessage', { body: body }, function() {
            jQuery('#chat-input').val('').prop('disabled', false).focus();
          });
        }
      } else {
        // The callback of typingTimer will run if no key is presed within 500 miliseconds.
        if (typingTimer === null) {
          socket.emit('typing', { typing: true }, function() {});
        } else {
          clearTimeout(typingTimer);
        }
  
        typingTimer = setTimeout(function() {
          typingTimer = null;
          socket.emit('typing', { typing: false }, function() {});
        }, 500);
      }
    }
    var chatClicked = function (e) {
      e.stopPropagation();
    }
  
    var setupChatHandlers = function() {
      jQuery('.user-icon').click(largeUserIconListener);
      jQuery('#user-icon').click(userIconListener);
      jQuery('#link-icon').click(linkIconListener);
      jQuery('#chat-wrapper').mouseup(chatClicked)
      addIconSelector();
      jQuery('.image-button').click(userIconSelectorListener);
      jQuery('#chat-input').keyup(onChatKeyPressed);
      jQuery('.btns button').click(saveChangesListener);
      jQuery('#chat-input-container').click( () => jQuery('#chat-input').focus() );
      jQuery('#nickname-input').click(() => jQuery('#nickname-input').focus() );
      jQuery('#nickname-edit').keyup(onNicknameKeyPressed);
    };
  
    var coverCheckRunning = false
    var onCoverChanged = async function() {
      if (!coverCheckRunning)
      {
        coverCheckRunning = true;
        try {  
          await delayUntil(removeVideoCover,2500)();
          // The below code will only run if we found a video cover to remove
          await delay(500)();
          pushTask(skipPromo);
          pushTask(sync);
        } catch (e) {
        } finally {
          coverCheckRunning = false;
        }
      }
      
    }
  
    const coverChanged = function(mutationsList, observer) {
      onCoverChanged();
    };
  
    const coverObserver = new MutationObserver(coverChanged);
  
    var initChat = function() {
      if (jQuery('#chat-wrapper').length === 0) {
        initHboChat();
        setupChatHandlers();
      } else {
        jQuery('#chat-history').html('');
      } 
      var playCover = null
  
      if (jQuery("[style*='btn_play_large_initial']").length ) {
        playCover = document.querySelector("[style*='btn_play_large_initial']")
      }else if(jQuery("[style*='icn_tile_play_max_large_3']").length) {
        // For hbo max
        playCover = document.querySelector("[style*='icn_tile_play_max_large_3']")
      } 
      
      if (playCover) {
        coverObserver.observe(playCover, { childList: true, characterData: true, attributes: true, subtree: true })
      } else {
        console.log("Couldn't find play cover")
      }
      jQuery('#presence-indicator').data('typing', false);
      jQuery('#presence-indicator').data('buffering', false);
      setPresenceVisible(false); 
    };
  
  
    // query whether the chat sidebar is visible
    var getChatVisible = function() {
      return jQuery('#chat-wrapper').is(":visible");
    };
  
  
      var isChatVisible = true;
      // show or hide the chat sidebar
      var setChatVisible = function(visible) {
        isChatVisible = visible;
        var summaryWrapper = jQuery(hboDivs.find(`[style*='user-select']`)[0]).next()
        if (visible) {
          jQuery('#chat-wrapper').show();
          summaryWrapper.hide();
          if (!document.hasFocus()) {
            clearUnreadCount();
          }
        } else {
          jQuery('#chat-wrapper').hide();
          summaryWrapper.show();
          jQuery(window).resize()
        }
      };
  
      var toggleIconContainer = function() {
        if(jQuery("#chat-icon-container").data('active')) {
          jQuery("#chat-icon-container").data('active', false);
          jQuery("#chat-icon-container").hide();
          jQuery(".chat-settings-container").hide();
          jQuery("#chat-history-container").show();
          jQuery("#chat-input-container").show();
          jQuery("#teleparty-blog-container").show();
          jQuery('#presence-indicator').show();
          jQuery("#chat-header-container").removeClass("chat-header-container-active");
        } else {
          jQuery("#chat-icon-container").data('active', true);
          jQuery(".chat-settings-container").show();
          jQuery("#chat-icon-container").hide();
          jQuery("#chat-link-container").hide();
          jQuery("#chat-history-container").hide();
          jQuery("#chat-input-container").hide();
          jQuery("#teleparty-blog-container").hide();
          jQuery('#presence-indicator').hide();
        }
      };
    
      // show or hide the icon container
      var toggleLargeUserIconButton = function() {
        if(jQuery("#chat-icon-container").data('active')) {
          jQuery("#chat-icon-container").show();
          jQuery(".chat-settings-container").hide();
          jQuery("#chat-header-container").addClass("chat-header-container-active");
        }
      };
  
      // remove chat
      var removeChat = function() {
        clearUnreadCount();
        jQuery('#chat-container').remove();
        jQuery('#chat-wrapper').remove();
      };
  
      // show or hide the "People are typing..." indicator
      var setPresenceVisible = function(visible) {
        jQuery('#presence-indicator').data('typing', visible);
        setPresenceText();
      };
  
      // show or hide the "People are buffering..." indicator
      var setBufferingPresenceVisible = function(visible) {
        jQuery('#presence-indicator').data('buffering', visible);
        setPresenceText();
      };
  
      var setPresenceText = function() {
        var typing = jQuery('#presence-indicator').data('typing');
        var buffering = jQuery('#presence-indicator').data('buffering');
        var startVideoData = jQuery('#presence-indicator').data('startVideo');
        logMessage('setPresenceText called: ' + startVideoData);
        if(startVideoData) {
            jQuery('#presence-indicator').text('Loading: Play video to start party...')
        }
        else if(typing && buffering) {
            jQuery('#presence-indicator').text('People are typing and buffering...')
        } else if (typing) {
            jQuery('#presence-indicator').text('People are typing...')
        } else if(buffering) {
            jQuery('#presence-indicator').text('People are buffering...')
        } else {
              jQuery('#presence-indicator').text('')
        }
      }
  
      // var iconURL = chrome.runtime.getURL('img/' + icons[Math.floor(Math.random() * icons.length)]);
  
      // add a message to the chat history
      var addMessage = function(message, firstTime) {
  
        if(message.isSystemMessage && message.body === 'left') {
          console.log("trying to add left message");
          if(!(message.userIcon)) {
            // ignore invalid left message
            return;
          }
        }
  
        if (firstTime && message.isSystemMessage && message.body.indexOf('updated their user icon') > -1) {
          // Fixes the issue where nicknames are incorrect when someone joins
          if(message.userIcon) setUserIcon(message.permId, message.userIcon, false);
          if(message.userNickname) setUserNickname(message.permId, message.userNickname, false);
        }
    
        messages.push(message);
    
    
        var userIcon = message.userIcon ? getUserIconURL(message.permId, message.userIcon) : getUserIconURL(message.permId);
        var userNickname = message.userNickname ? getUserNickname(message.permId, message.userNickname) : '' // todo create getUserNickame method
    
          if(userNickname == '') {
          var message = jQuery(`
              <div class="msg">
                <div class="icon">
                  <img src="${escapeStr(userIcon)}"/>
                </div>
                <div class="message${ message.isSystemMessage ? '-system' : '-txt' }">
                  <p class="msg-nickname">${userNickname.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
                  <p>${message.body.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
                </div>
              </div>
          `).appendTo(jQuery('#chat-history')).data('permId', message.permId).data('userIcon', userIcon).data('userNickname', userNickname).data('message', message);
        } else {
          var nicknameMessage = jQuery(`
            <div class="msg-container">
                <div class="icon-name">
                  <div class="icon">
                    <img src="${escapeStr(userIcon)}">
                  </div>
                </div>
                <div class="msg-txt message${ message.isSystemMessage ? '-system' : '-txt' }">
                  <h3>${userNickname.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</h3>
                  <p>${message.body.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
                </div>
              </div>
          `).appendTo(jQuery('#chat-history')).data('permId', message.permId).data('userIcon', userIcon).data('userNickname', userNickname);
        }
    
        jQuery('#chat-history').scrollTop(jQuery('#chat-history').prop('scrollHeight'));
        unreadCount += 1;
        messagesCount += 1;
        if (!document.hasFocus()) {
          document.title = '(' + String(unreadCount) + ') ' + originalTitle;
        }
      };
  
      // clear the unread count
      var clearUnreadCount = function() {
        if (unreadCount > 0) {
          unreadCount = 0;
          document.title = originalTitle;
        }
      };
  
      // clear the unread count when the window is focused
      jQuery(window).focus(function() {
        if (getChatVisible()) {
          clearUnreadCount();
        }
      });
  
      // send summary statistics to data server
      function logSummary() {
        try {
          if(permId && sessionStartTime && sessionId && videoId && !summarySent) {
  
              var data = {
                  userId: permId,
                  sessionId: sessionId,
                  messagesCount: messagesCount,
                  interactionsCount: interactionsCount,
                  duration: new Date() - sessionStartTime,
                  videoId: videoId,
                  videoDuration: videoDuration
              }
              logMessage("summaryData: " + JSON.stringify(data));
  
              chrome.runtime.sendMessage({summary: data}, function(response) {
                    logMessage("background script sent xhr");
              });
  
              summarySent = true;
  
          }
     
        } catch(e) {
          logMessage("log event error");
        }
      }
  
      // send summary statistics to data server
      function sendUpdateNextEpisode() {
        try {
  
          var data = {
  
          }
  
          chrome.runtime.sendMessage({updateNextEpisode: data}, function(response) {
              logMessage("content script -> updateNextEpisode message to background.js: " + JSON.stringify(response));
          });
     
        } catch(e) {
          logMessage("log event error");
        }
      }
  
  
      var unloadInteraction = function (event) {
            logSummary();
      }
      window.addEventListener("unload", unloadInteraction , true);
  
  
      //////////////////////////////////////////////////////////////////////////
      // Next episode logic                                                   //
      //////////////////////////////////////////////////////////////////////////
  
      // whether a simulated next episode click is ongoing
      var simulClick = false;
  
      // whether the new episode is some other episode or the next episode
      var otherEpisode = false
  
      //Checks that the video changed correctly after 15 seconds
    function loadNewVideo() {
      var timeout = 15000;
      var start = performance.now();
      var now = 0;
      return new Promise(async function(resolve,reject) {
        var interval = setInterval(() => {
          if (videoId === nextEpisodeId) {
            var videoElement = document.querySelector('video');
            if (videoElement instanceof Element && jQuery('video').is(':visible')) {
              console.log("Loaded new video")
              clearInterval(interval);
              skipPromo().then(delayUntil(() => { return getState() !== 'loading'}, Infinity)).then(() => {
                if (lastUpdateEvent.getTime() <= videoChangeStartTime.getTime()) {
                  pushTask(broadcast);
                  console.log("PUSHING BORADSFSAF NEXT EPISODE")
                }else {
                  console.log("Not pushing broadcast")
                  pushTask(sync);
                }
                changingVideo = false;
                setChatVisible(isChatVisible);
                console.log("CHANGE EPISODE OVER")
                resolve();
              });
            }
          }
          now = performance.now();
  
          if (now - start >= timeout) {
            clearInterval(interval);
            logMessage("Could not load new video in time.");
            showButtonMessage(failedNextEpisodeModal, getPartyUrl())
            teardown();
            reject("Could not load new video in time.");
          }
        },100); 
      });
    }
  
    var clickAtProgress = function(target, progress, eventType) {  
      const { width, height, left, top } = target.getBoundingClientRect();
      const x = left + width * progress;
      const y = top + height / 2;  
      var clickEvent = document.createEvent('MouseEvents');
      clickEvent.initMouseEvent(eventType,true,true,window,0,0,0,x,y,false,false,false,false,0,null);
      target.dispatchEvent(clickEvent)
  }
  
  var clickUpNext = function(attempts) {
      return new Promise(async (resolve, reject) => {
        try {
          jQuery("video")[0].currentTime = jQuery("video")[0].duration
          await showControls();
          await delayUntil(() => {
            var isNextEpisodeVisible = jQuery("[style*='btn_close']").parent().parent().is(':visible') || jQuery("[style*='btn_arrow']").parent().parent().is(':visible');
            return isNextEpisodeVisible;
          },2000)();
          
          if (jQuery("[style*='btn_arrow_up']").is(':visible')) {
            jQuery("[style*='btn_arrow_up']").addClass('upArrow');
            var uparrow = document.querySelector(".upArrow")
            clickAtProgress(uparrow, '0.5','mousedown');
            clickAtProgress(uparrow, '0.5','mouseup');
            await delay(500)();
          }
  
          if( jQuery("[style*='btn_arrow']").length) {
            jQuery("[style*='btn_arrow']").parent().parent().parent().parent().addClass('nextEpisodeHolder');
          } else if(jQuery("[style*='btn_close']").length) {
            jQuery("[style*='btn_close']").parent().parent().parent().parent().addClass('nextEpisodeHolder');
          }
  
          var nextEpisodeHolder = document.querySelector(".nextEpisodeHolder");
  
          if (nextEpisodeHolder) {
            clickAtProgress(nextEpisodeHolder, '0.5','mousedown');
            clickAtProgress(nextEpisodeHolder, '0.5','mouseup');
          }
          // await delayUntil(() => {
          //   var isNextEpisodeVisible = jQuery("[style*='btn_close']").parent().parent().is(':visible') || jQuery("[style*='btn_arrow']").parent().parent().is(':visible');
          //   return !isNextEpisodeVisible;
          // },2000)();
          resolve();
        } catch (error) {
          if (attempts < 2) {
            console.error(error);
            console.log("Attempting next episode click again");
            try
            {
              await clickUpNext(attempts + 1);
              resolve();
            } catch (err) {
              console.error(err);
              reject();
            }
          }else {
            console.error(error);
            reject();
          }
        }  
      });
    }
  
    var continueNextEpisode = function () {  
      return new Promise(async function(resolve,reject) {
          uiEventsHappening += 1;
          changingVideo = true;
          if(videoId !== nextEpisodeId) {
            try
            {
              await clickUpNext(0);
            } catch(error) {
              console.log("Click next episode failed, but we will wait and see if the vidoe changes in time.")
            }
          }
          pushTask(loadNewVideo);
          resolve();
          uiEventsHappening -=1;
      });
    }
  
  
    // receive next episode updates from the server
    socket.on('jumpToNextEpisode', (data) => {
      logMessage('Received next episode event from server')
      videoChangeStartTime = new Date(new Date().getTime() - localTimeMinusServerTimeMedian);
      nextEpisodeId = data.nextEpisode
      pushTask(continueNextEpisode);
    });
  
      // listen to URL changes on the webpage when next episode changes
      // modifies the window.history.replaceScript API which Netflix uses in its SPA
      // https://stackoverflow.com/questions/4570093/how-to-get-notified-about-changes-of-the-history-via-history-pushstate
      // http://jsfiddle.net/UZHTW/1/
      var replaceStateScript = `
        if(!window.replaceScriptLoaded) {
              console.log("loaded script");
              window.replaceScriptLoaded = true;
            (function(history){
              var replaceState = history.replaceState;
              history.replaceState = function(state) {
                if (typeof history.onreplacestate == "function") {
                  history.onreplacestate({state: state});
                }
                return replaceState.apply(history, arguments);
              }
            })(window.history);
  
            var popInteraction = function(e) {
            // send message to content script w next episode
            window.postMessage({ type: "FROM_PAGE_POP", text: "next episode from the webpage!"}, "*");
          }
    
          var reloadInteraction = function(e) {
            // send message to content script w next episode
            window.postMessage({ type: "FROM_PAGE", text: "next episode from the webpage!"}, "*");
          }
          window.onpopstate = popInteraction;
          history.onreplacestate = history.onpushstate = reloadInteraction;
        }
      `;
      logMessage('replace script loaded: '+ window.replaceScriptLoaded);
      if(!window.replaceScriptLoaded) {
          logMessage('injecting replace script');
          injectScript(replaceStateScript);
      }
  
      var toggleVisible = function() {
        return jQuery("[style*='_add']").is(":visible") || jQuery("[style*='_remove']").is(":visible");
      }
  
      // listen for next episode events from webpage script via the postMessage API
      var replaceStateInteraction = function(event) {
        if (event.source != window) {
          return;
        }
        if (event.data.type && (event.data.type == "FROM_PAGE_POP")) {
          //We want to teardown if someone uses the back button.
          teardown();
          return;
        }
        if (event.data.type && (event.data.type == "FROM_PAGE")) {
            logMessage('***********************************');
          logMessage("Content script received: " + event.data.text);
  
          var episodePage = getHBOVideoType(window.location.href) !== 'none';
          logMessage(window.location.href)
          if (!episodePage || window.location.href.indexOf('page:home') > -1) {
              logMessage("time to teardown");
              teardown();
          } else {
            if (videoType !== 'episode' || getHBOVideoType(window.location.href) !== 'episode') {
              showButtonMessage(invalidNextEpisodeModal, getPartyUrl());
              teardown();
              return;
            }
            delayUntil(() => {
              // wait until the page changes
              const currentTitle = getVideoTitle()
              if (currentTitle != null && currentTitle !== videoTitle) {
                console.log("New current Title: " + currentTitle);
                return true;
                // if (toggleVisible()) {
                //   console.log("Buttons visible now")
                //   return true;
                // }else 
                // {
                //   console.log("Got new title but buttons not visible yet")
                //   return false;
                // }
              }
              return false;
            },5000)().then(updateVideoId).then(() => {
              if (!changingVideo) {
                changingVideo = true;
                console.log("&&&&&&&&&&&&&&&&&&&&&&&&& - Change Start")
                socket.emit('nextEpisode', { nextEpisode: videoId, simulClick: false, otherEpisode: false }, function (data) {
                  if(data != null && data.errorMessage != null && data.errorMessage == "Locked Session") {
                    delayUntil(function () {
                      return nextEpisodeId == videoId }, 5000)().catch((err) => {
                        // We wait 5 seconds to see if the owner changes the video. otherwise we remove the user and show them an alert.
                        showButtonMessage(ownerOnlyNextEpisodeModal, getPartyUrl());
                        teardown();
                      });
                  }else if(data != null && data.errorMessage != null) {
                    teardown();
                  }
                });
              }
            }).catch((err) => {
              console.error(err);
              if (changingVideo) {
                showButtonMessage(failedNextEpisodeModal, getPartyUrl());
              }else {
                showButtonMessage(invalidNextEpisodeModal, getPartyUrl());
              }
              teardown();
            });
  
          } 
        }
      }
      window.addEventListener("message", replaceStateInteraction, false);
  
      // listen to clicks on next episode button
      var nextEpisodeListener = function(e) {
        logMessage('next Episode button clicked');
      }
  
      // listen to clicks for other episodes
      var otherEpisodeListener = function() {
          // logMessage('listener triggered');
          // find() selects on all nested descendants, children() selects on children
          // if(jQuery(this).find('.can-play').length > 0) {
              logMessage('other episode clicked!');
              otherEpisode = true;
          // }
      }
  
      jQuery('.button-nfplayerNextEpisode').click(nextEpisodeListener);
      jQuery(document).on('click', '.nfp-episode-preview.expanded.can-play', otherEpisodeListener);
  
  
    //////////////////////////////////////////////////////////////////////////
    // HBO EpisodeId logic                                                  //
    //////////////////////////////////////////////////////////////////////////
    
  
  
    // listen for episode id data events from webpage script via the postMessage API
    var episodeDataInteraction = function(event) {
      if (event.source != window) { return; }
  
      if (event.data.type && (event.data.type == "EPISODE_ID")) {
        videoId = event.data.episodeId
        console.log("Got new Video ID: " + videoId);
        nextEpisodeUpdatedAt = new Date().getTime();
      }
  
    }
    window.addEventListener("message", episodeDataInteraction, false);
  
    var onVideoChange = function() {
      logMessage("Detected video update")
      if (hostOnly) {
        pushTask(sync);
        return;
      }
      if (uiEventsHappening <= 0 && sessionId &&!changingVideo) {
        pushTask(broadcast);
      } 
    }
  
    var removeVideoCover = function() {
      if (jQuery("[style*='btn_play_large_initial']").length && jQuery("[style*='btn_play_large_initial']").is(":visible")) {
        jQuery("[style*='btn_play_large_initial']").addClass('startPlay');
      }else if(jQuery("[style*='icn_tile_play_max_large_3']").length && jQuery("[style*='icn_tile_play_max_large_3']").is(":visible")) {
        // For hbo max
        jQuery("[style*='icn_tile_play_max_large_3']").addClass('startPlay');
      }else {
        return false;
      }
  
      var startPlay = document.querySelector('.startPlay');
      if (startPlay) {
        clickAtProgress(startPlay, '0.5', 'mousedown');
        clickAtProgress(startPlay, '0.5', 'mouseup');
        return true;
      }
      return false;
    }
  
    var getVideoTitle = function () {
      try {
        if (window.location.href.includes('hbomax')) {
          var videoContainer = document.querySelector('video') && document.querySelector('video').parentNode.parentNode.parentNode.parentNode;
          if (videoContainer) {
            return videoContainer.nextElementSibling.querySelector("span[style*='street2_book']").nextElementSibling.innerText
          }         
        }else {
          return document.querySelector("[style*='street2_thin']").children[1].innerText;
        }
      } catch(e) {
        return undefined;
      }
    };
  
    var updateVideoId = function() {
      return new Promise( async (resolve,reject) => {
        try {
          var startTime = new Date().getTime();
          const triggerEvent = new CustomEvent('TPBrowse', {detail: {type: 'TOGGLE_LIST'}});
          window.dispatchEvent(triggerEvent);
          await delayUntil(() => {
            return (nextEpisodeUpdatedAt != null && nextEpisodeUpdatedAt > startTime)
          },10000)();
          videoTitle = getVideoTitle();
          console.log("Got Video Title: " + videoTitle);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    }
  
  
      //////////////////////////////////////////////////////////////////////////
      // Main logic                                                           //
      //////////////////////////////////////////////////////////////////////////
  
      // the Netflix player be kept within this many milliseconds of our
      // internal representation for the playback time
      var maxTimeError = 2500;
      var maxFreezeTimeError = 1000;
  
      // the session
      var sessionId = null;
      var lastKnownTime = null;
      var lastKnownTimeUpdatedAt = null;
      var lastUpdateEvent = null;
      var ownerId = null;
      var hostOnly = false;
      var state = null;
      var videoId = null;
      var nextEpisodeId = null; 
      var nextEpisodeUpdatedAt = null;
      var videoTitle = null;
      var videoType = null;
      var videoDuration = null;
      var videoChangeStartTime = null;
      var currentPage = window.location.href;
  
      // ping the server periodically to estimate round trip time and client-server time offset
      var roundTripTimeRecent = [];
      var roundTripTimeMedian = 0;
      var localTimeMinusServerTimeRecent = [];
      var localTimeMinusServerTimeMedian = 0;
      var ping = function() {
        return new Promise(function(resolve, reject) {
          var startTime = (new Date()).getTime();
          socket.emit('getServerTime', { version: version }, function(serverTime) {
            var now = new Date();
  
            // compute median round trip time
            shove(roundTripTimeRecent, now.getTime() - startTime, 5);
            roundTripTimeMedian = median(roundTripTimeRecent);
  
            // compute median client-server time offset
            shove(localTimeMinusServerTimeRecent, (now.getTime() - Math.round(roundTripTimeMedian / 2)) - (new Date(serverTime)).getTime(), 5);
            localTimeMinusServerTimeMedian = median(localTimeMinusServerTimeRecent);
  
          });
          resolve();
        });
      };
  
      // this function should be called periodically to ensure the Netflix
      // player matches our internal representation of the playback state
      var sync = function() {
        if (sessionId === null || uiEventsHappening > 0 || changingVideo) {
          // console.log('sync promise resolved');
          return Promise.resolve();
        }
        // Call these tasks to make sure we are on teh correct play item and the cover isn't visible.
        fixPromo();
        onCoverChanged();
        return delayUntil(function() { return getState() !== 'loading'; }, Infinity,10)().then(function() {
          if (state === 'paused') {
            var promise = Promise.resolve();
            if (getState() !== 'paused') {
              promise = pause();
            }
            return promise.then(function() {
              if (Math.abs(lastKnownTime - getPlaybackPosition()) > maxTimeError) {
                // console.log('seek event while paused added to promiseChain due to local time exceeding server time');
                return seek(lastKnownTime);
              }
            });
          } else {
              var localTime = getPlaybackPosition();
              var serverTime = lastKnownTime + (state === 'playing' ? ((new Date()).getTime() - (lastKnownTimeUpdatedAt.getTime() + localTimeMinusServerTimeMedian)) : 0);
              
              var promise = Promise.resolve()
              if (getState() === 'paused') {
                promise = play();
              }
    
              return promise.then(function() {
                if (Math.abs(localTime - serverTime) > maxTimeError) {
                  return seek(serverTime).then(function() {
                    var localTime = getPlaybackPosition();
                    var serverTime = lastKnownTime + (state === 'playing' ? ((new Date()).getTime() - (lastKnownTimeUpdatedAt.getTime() + localTimeMinusServerTimeMedian)) : 0);
                    if (localTime > serverTime && localTime <= serverTime + maxTimeError) {
                      return freeze(localTime - serverTime)();
                    }else {
                      return play();
                    }
                  });
                }
              });
            }
        });
      };
  
  
  
      const getPlayItemEvent = new CustomEvent('tpVideoNode', {detail: {type: 'getPlayItem'}});
  
      // var pressSkipButton = function() {
      //   return new Promise(async (resolve,reject) => {
      //     var upperCaseArray = Array.prototype.slice.call(document.querySelectorAll("[style*='uppercase']"));
      //     if (upperCaseArray != null) {
      //       var skipButton = upperCaseArray.find((x) => { return x.innerText === "SKIP"; });
      //       skipButton.classList.add('skip')
      //       var skipElement = document.querySelector(".skip");
      //       if (skipElement) {
      //         clickAtProgress(skipElement, '0.5', 'mousedown');
      //         clickAtProgress(skipElement, '0.5', 'mouseup');
      //       }
      //     }
      //   })
      // }
  
      var skipPromo = function() {
        return new Promise (async (resolve, reject) => {
          try
          {
            await delayUntil(() => {
              return document.querySelector("video") != null
            }, Infinity)();
            var startTime = new Date().getTime();
            window.dispatchEvent(getPlayItemEvent);
            removeVideoCover();
            await delayUntil(() => {
              window.dispatchEvent(getPlayItemEvent);
              return playItemUpdatedAt != null  && playItem != null && startTime <= playItemUpdatedAt
            },2000)();
            if (playItem.type === 'MAIN') {
              loadVideoHandlers(jQuery('video')[0]);
              playCheckRunning = false;
              resolve();
            }else if (playItem.type === 'PROMO') {
                console.log("Skipping promo video")
                const playEvent = new CustomEvent('tpVideoNode', {detail: {type: 'play'}});
                window.dispatchEvent(playEvent);
                const seekEvent = new CustomEvent('tpVideoNode', {detail: {type: 'seek', time: playItem.duration}});
                window.dispatchEvent(seekEvent);
                // Need to use seek event here incase the video isn't defined or is wrong.
                await delayUntil(() => {
                  window.dispatchEvent(getPlayItemEvent);
                  return (playItem != null && playItem.type === 'MAIN');
                },2500)();
                loadVideoHandlers(jQuery('video')[0]);
                playCheckRunning = false;
                resolve();
              }
          } catch (err) {
            await delayUntil(() => {
              // If the cover is visible it could mess this up, so we check and remove it
              onCoverChanged();
              return document.querySelector("video") && document.querySelector("video").readyState == 4
            }, Infinity)();
            await skipPromo();
            resolve();
          }
        });
      }
  
      var playCheckRunning = false;
      var fixPromo = async function() {
        if (!playCheckRunning) {
          playCheckRunning = true;
          try {
            await delayUntil(function() {
              window.dispatchEvent(getPlayItemEvent);
              return (playItem && playItem.type === "PROMO");
            },1500)();
            console.log("DETECTED PLAY ITEM CHANGE");
            if (!changingVideo) {
              pushTask(skipPromo);
              pushTask(sync);
              // We set playCheckRunning false in skip Promo
            }else {
              playCheckRunning = false;
            }
          } catch (e) {
            playCheckRunning = false;
          }
        }
      }
  
      var broadcast = function() {
        return new Promise (async (resolve, reject) => {
          if (changingVideo) { resolve(); }
          var bufferingState = getState() == 'loading';
          var now = new Date();
          var serverTime = lastKnownTime + (state === 'playing' ? (now.getTime() - (lastKnownTimeUpdatedAt.getTime() + localTimeMinusServerTimeMedian)) : 0);
          var newLastKnownTime = getPlaybackPosition();
          var newLastKnownTimeUpdatedAt = new Date(now.getTime() - localTimeMinusServerTimeMedian);
          var newState;
          if (getState() == "loading") {
            newState = video.paused ? 'paused' : 'playing';
          }else {
            newState = getState() === 'playing' ? 'playing' : 'paused';
          }
          if (state === newState && Math.abs(newLastKnownTime - serverTime) < 1) {
            resolve();
          } else {
            // No need to set the new values here, just do it in the receive function
            socket.emit('updateSession', {
              lastKnownTime: newLastKnownTime,
              lastKnownTimeUpdatedAt: newLastKnownTimeUpdatedAt.getTime(),
              state: newState,
              lastKnownTimeRemaining: getRemainingTime(),
              lastKnownTimeRemainingText: getRemainingTimeText(),
              videoDuration: getDuration()
            }, function(data) {
              if (data != null && data.errorMessage != null) {
                // If we get an error, the update event was never sent so we don't need to fix the lastKnownTime/state
                reject();
              } else {
                resolve();
              }
            });
          }
        });
      }
      
      // this is called when data is received from the server
      var receive = function(data) {
        logMessage('received data: ' + JSON.stringify(data));
        lastKnownTime = data.lastKnownTime;
        lastKnownTimeUpdatedAt = new Date(data.lastKnownTimeUpdatedAt);
        state = data.state;
        return sync;
      };
  
      // the following allows us to linearize all tasks in the program to avoid interference
      var tasks = null;
      var taskArray = [];
      var tasksInFlight = 0;
  
      var pushTask = function(task) {
        if (tasksInFlight === 0) {
          // why reset tasks here? in case the native promises implementation isn't
          // smart enough to garbage collect old completed tasks in the chain.
          tasks = Promise.resolve();
          taskArray = [];
        }
  
        tasksInFlight += 1;
        taskArray.push(task);
        tasks = tasks.then(function() {
          if (getState() === 'idle') {
            swallow(wakeUp)();
          }
        }).then(swallow(task)).then(function() {
          taskArray.shift();
          tasksInFlight -= 1;
        });
      };
  
      var mouseupListener = function() {
        logMessage("mouseup");
        var sessionIdString = sessionId ? sessionId : 'null';
        logMessage('sessionId, uiEventsHappening, tasksInFlight: ' + sessionIdString + ', ' + uiEventsHappening + ', ' + tasksInFlight);
        if (sessionId != null && uiEventsHappening === 0) {
          fixPromo();
          onCoverChanged();
        }
        interactionsCount += 1;
      }
  
  
      //broadcast the playback state if there is any user activity
      jQuery(window).mouseup(mouseupListener);
  
      var scriptInterval = null;
      var teardown = function() {
        console.log("Tearing down");
        window.postMessage({ type: "teardown"}, "*");
        window.removeEventListener("message", replaceStateInteraction, false);
        window.removeEventListener("message", episodeDataInteraction, false);
        window.removeEventListener("unload", unloadInteraction , true);
  
        window.removeEventListener('FromNode', nodeListener);
        window.removeEventListener('resize', resizeListener)
        window.document.removeEventListener('webkitfullscreenchange', resizeListener)
        jQuery('[tpInjected]').remove();
        jQuery(window).off('mouseup', mouseupListener);
        if(sessionId) sessionId = null;		
        videoId = null;
        video = null;
        window.telepartyLoaded = false;
        chrome.runtime.onMessage.removeListener(popupInteraction);
        if(socket) socket.disconnect();
        if(scriptInterval) clearInterval(scriptInterval);
        coverObserver.disconnect();
        tasks = Promise.resolve();
        setChatVisible(false);
        removeChat();
        logState = false;
      }
  
      var logState = false;
      var oldState = getState();
  
      setInterval(function() {
          oldState = getState();
          if(logState) {
              logMessage('oldState: ' + oldState);
              var localTime = getPlaybackPosition() || "not defined";
              var serverTime = lastKnownTime + (state === 'playing' ? ((new Date()).getTime() - (lastKnownTimeUpdatedAt.getTime() + localTimeMinusServerTimeMedian)) : 0);
              logMessage("localtime, internal servertime, state: " + localTime + ", " + serverTime + ", " + state);
          }
      }, 100);
  
      socket.on('connect', function() {
        pushTask(ping);
        logMessage(currentPage);
  
        if (!scriptInterval) {
          scriptInterval = setInterval(function() {
            if (tasksInFlight === 0 && sessionId != null) {
              pushTask(ping);
              pushTask(sync);
            }
          }, 5000);
        }
      });
  
      // if the server goes down, it can reconstruct the session with this
      socket.on('reconnect', function() {
        if (sessionId != null) {
          logMessage("Reconnecting to server")
          socket.emit('reboot', {
            sessionId: sessionId,
            lastKnownTime: lastKnownTime,
            lastKnownTimeUpdatedAt: lastKnownTimeUpdatedAt.getTime(),
            messages: messages,
            userSettings: userSettings,
            state: state,
            videoService: 'hbo',
            ownerId: ownerId,
            userId: userId,
            videoId: videoId,
            videoType: getHBOVideoType(window.location.href),
            videoDuration: getDuration(), //change: sending over video duration
            permId: permId //change: sending over permId
          }, function(data) {
            if (!data.errorMessage) {
              if (data.videoIds && data.videoIds.pop() !== videoId) {
                showButtonMessage(failedNextEpisodeModal, getPartyUrl());
                teardown();
              }else {
                logMessage("Reconnect success");
                lastUpdateEvent = new Date(data.lastKnownTimeUpdatedAt)
                pushTask(receive(data));
              }
            }else {
              showButtonMessage(lostConnectionModal, getPartyUrl())
              teardown();
            }
          });
        }
      });
  
       // receive messages from the server
       socket.on('sendMessage', function(data) {
        logMessage('new message from server');
        addMessage(data, false);
      });
  
      // receive presence updates from the server
      socket.on('setPresence', function(data) {
        setPresenceVisible(data.anyoneTyping);
      });
  
      // receive buffering presence updates from the server
      socket.on('setBufferingPresence', function(data) {
  
        setBufferingPresenceVisible(data.anyoneBuffering);
        othersAreBuffering = data.anyoneBuffering;
  
        var time = new Date();
        var timeStatus = ' at' + time.getHours() + ':' + time.getMinutes() + ':' + time.getMilliseconds() + 'AM';
        logMessage('received buffering update: ' + data.anyoneBuffering + timeStatus);
        if(othersAreBuffering) logMessage('others are buffering: ' + othersAreBuffering + timeStatus);
      });
  
      // respond to updates from the server
      socket.on('update', function(data) {
        logMessage("Update event")
        lastUpdateEvent = new Date(data.lastKnownTimeUpdatedAt)
        pushTask(receive(data));
      });
  
      function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
          return true;
      }
      
      
      var waitUserIdReady = function() {
        logMessage('wait user id ready called: ');
        return function() {
            return new Promise(function(resolve, reject) {
              return delay(250)().then(delayUntil(function() {
                  return userId != null && videoId != null;
              }, Infinity)).then(delayUntil(function() {
                  // logMessage('wait video loading do
                  return !isEmpty(userSettings);
              }, Infinity)).then(function() {
                logMessage('userId and userSettings are ready!');
                // permId = userId;	
                resolve();
              });
            });
        };
      }
  
      // interaction with the popup
      var popupInteraction = function(request, sender, sendResponse) {
        if (request.type === 'getInitData') {
          console.log('Get Init data called')
  
          console.log("Video Title: " + getVideoTitle());
          version = request.data.version;
  
          if (!jQuery("[style*='_add']").length && !jQuery("[style*='_remove']").length) {
            if (jQuery('*:contains("SIGN IN")').length > 0 || jQuery('*:contains("Sign In")').length > 0) {
              sendResponse({
                errorMessage: "Please sign in to HBO and try again.",
                showButton: false
              });
            }else {
              console.log("Coudln't find add/remove buttons")
              sendResponse({
                errorMessage: "Couldn't find video, please try again.",
                showButton: false
              });
            }
            return true;
          }
          if (getHBOVideoType(window.location.href) == 'episode') {
            if (videoId === null) {
              updateVideoId();
            }
          }else {
            videoId = request.data.videoId;
          }
          sendResponse({
            sessionId: sessionId,
            serverId: serverId,
            chatVisible: getChatVisible()
          });
          return true;
        }
  
        // TODO: edit for optional create session data
        if (request.type === 'createSession') {
          removeVideoCover();
          waitUserIdReady()().then(skipPromo).then(function() {
            if (getDuration() < 300000) {
              // Don't allow videos shorter than 5 minutes, we assume that these are previews.
              sendResponse({
                errorMessage: 'Invalid video type',
                showButton: false
              });
              return;
            }
            socket.emit('createSession', {
              controlLock: request.data.controlLock,
              videoId: videoId,
              videoType: getHBOVideoType(window.location.href), //change: sending over video type (feature/episode)
              videoDuration: getDuration(), //change: sending over video duration
              videoService: 'hbo', //change: sending over video service
              permId: permId, //change: sending over permId
              userSettings: userSettings // change: add userSettings here
            }, function(data) {
              logMessage('createData: '+ JSON.stringify(data));
              if (data.errorMessage) {
                sendResponse({
                  errorMessage: data.errorMessage
                });
                return;
              }
              initChat();
              // getChromeStorage()().then(initChat);
              setChatVisible(true);
              lastKnownTime = data.lastKnownTime;
              lastKnownTimeUpdatedAt = new Date(data.lastKnownTimeUpdatedAt);
              lastUpdateEvent = new Date(data.lastKnownTimeUpdatedAt);
              messages = [];
              sessionId = data.sessionId;
              ownerId = request.data.controlLock ? userId : null;
              hostOnly = false;
              state = data.state;
              videoType = getHBOVideoType(window.location.href)
              videoDuration = getDuration();
              pushTask(broadcast);
  
              // summary state
              sessionStartTime = new Date();
              // setSessionEnbaled(false);
  
              sendResponse({
                sessionId: sessionId
              });
            });
          });
          return true;
        } 
        if (request.type === 'joinSession') { /* change: add permId here. before: socket.emit('joinSession', request.data.sessionId, function(data) {  */
          removeVideoCover();
          waitUserIdReady()().then(skipPromo).then(function() {
          var joinData = {
            sessionId: request.data.sessionId, 
            permId: permId, 
            userSettings: userSettings,
            videoService: 'hbo', 
            videoId: videoId
          } /* change: add usersettings here */
          logMessage('joinData: '+ JSON.stringify(joinData));
          socket.emit('joinSession', joinData, function(data) { 
            if (data.errorMessage) {
              sendResponse({
                errorMessage: data.errorMessage
              });
              return true;
            }
  
            initChat();
            // getChromeStorage()().then(initChat);
            setChatVisible(true);
            // pushTask(skipPromo);
            messages = [];
            for (var i = 0; i < data.messages.length; i += 1) {
              addMessage(data.messages[i], true);
            }
            lastKnownTime = data.lastKnownTime;
            lastKnownTimeUpdatedAt = new Date(data.lastKnownTimeUpdatedAt);
            lastUpdateEvent = new Date(data.lastKnownTimeUpdatedAt);
            sessionId = request.data.sessionId;
            ownerId = data.ownerId;
            hostOnly = data.ownerId != null && data.ownerId !== userId;
            state = data.state;
            videoType = getHBOVideoType(window.location.href);
            pushTask(receive(data));
            sendResponse({});
          });
        });
          return true;
        }
  
        if (request.type === 'leaveSession') {
          socket.emit('leaveSession', null, function(_) {
            logSummary();
            sessionId = null;
            videoId = null;
            video = null;
            hostOnly = false;
            changingVideo = false;
            setChatVisible(false);
            sendResponse({});
          });
          return true;
        }
  
        if (request.type === 'showChat') {
          // logMessage('showChat');
          if (request.data.visible) {
            setChatVisible(true);
          } else {
            setChatVisible(false);
          }
          sendResponse({});
        }
      } // end of popup interaciton
      getUserIdPromise()
      .then(getChromeStorage())
      .then(setHTML)
      .then(chrome.runtime.onMessage.addListener(popupInteraction));
  };
  
  if (!window.telepartyLoaded) {
    console.log('Teleparty: Injecting Content Script');
    window.telepartyLoaded = true;
    injectContentScript();
  }
  