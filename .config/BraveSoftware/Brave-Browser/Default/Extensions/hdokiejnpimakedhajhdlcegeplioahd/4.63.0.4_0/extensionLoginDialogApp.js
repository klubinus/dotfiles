var ExtensionLoginDialogApp=function(i){ExtensionLoginDialogSimple.call(this,i)};ExtensionLoginDialogApp.prototype=Object.create(ExtensionLoginDialogSimple.prototype),(ExtensionLoginDialogApp.prototype.constructor=ExtensionLoginDialogApp).prototype.federatedLoginStarted=function(){this.backgroundOverlay.show(!0),this.startLoginChecker(this.inputFields.disablePasswordManager.getValue()),this.inputFields.email.clear(),this.inputFields.email.focus()},ExtensionLoginDialogApp.prototype.initializeBackgroundOverlay=function(i){var o=this;return i.clickHandler=function(){o.backgroundOverlay.hide(),o.inputFields.email.focus()},new BackgroundOverlay(i)},ExtensionLoginDialogApp.prototype.handleLoggedIn=function(){};