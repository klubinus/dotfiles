ExtensionBillingAddressNotification=function(e){var n=$(e.body),i,t;return{initialize:function(){var i=bg.get("g_uid")+"_billingInfoNotificationData",e=LPProxy.getAccountClass(),t=(new Date).getTime(),n=144e5,o;try{o=JSON.parse(bg.localStorage_getItem(i))}catch(e){console.error("Cannot parse json",bg.localStorage_getItem(i)),bg.localStorage_setItem(i,"")}if(o&&o.hasOwnProperty("shouldCheckFlagAndShowNotification")&&o.hasOwnProperty("lastCheck")&&o.hasOwnProperty("userAccountType")&&(o.shouldCheckFlagAndShowNotification||!bg.get("g_show_billing_address_notification"))){var s=o.lastCheck+n<t;(o.shouldCheckFlagAndShowNotification&&s&&!bg.get("g_show_billing_address_notification")||o.userAccountType!==e)&&bg.checkShouldShowBillingAddressNotification(function(){bg.localStorage_setItem(i,JSON.stringify({shouldCheckFlagAndShowNotification:bg.get("g_show_billing_address_notification"),lastCheck:t,userAccountType:e}))})}else bg.localStorage_setItem(i,JSON.stringify({shouldCheckFlagAndShowNotification:bg.get("g_show_billing_address_notification"),lastCheck:t,userAccountType:e}))},showBillingAddressNotification:function(){n.addClass("billingAddressNotification panelIsActive"),bg.sendLpImprove("billing_address_callout_shown",{source:"extension"}),userAccountType=LPProxy.getAccountClass();var e="Enterprise Admin"===userAccountType||"Teams Admin"===userAccountType,i=document.getElementById("billing-address-notification-description"),t;i.textContent=e?Strings.translateString("To ensure heightened payment security and continued service, add the billing information associated with your organization's payment card."):Strings.translateString("To ensure heightened payment security and continued service, add the billing information associated with your payment card."),$("#addBillingInfoButton").click(function(){bg.hideBillingAddressNotification(),bg.sendLpImprove("billing_address_callout_clicked",{source:"extension"}),e?bg.openURL(bg.get("base_url")+"company/#!settings/company-profile"):bg.openURL(bg.get("base_url")+"my.php?lpnorefresh=1&billing-info-message=true")})}}}(document);