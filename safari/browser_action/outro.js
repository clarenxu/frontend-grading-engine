/*global waitChromeNS, chrome, safari, checkSiteStatus */

/**
 * @fileOverview This file contains the Safari closing statements for
 * the browser action page appended to the main file. This file
 * contains a function executed each 100ms to check if the `chrome`
 * module/namespace is fully loaded. If it’s already initialized, it
 * assign the _globalPage_ namespace as `chrome`, otherwise it
 * initializes it.
 * @name outro.js<browser_action>
 * @author Etienne Prud’homme
 * @license MIT
 */

  var main = document.getElementById('main');
  main.style.width = '400px';

  var label = document.getElementById('ud-label-loader');
  label.remove();

  safari.application.addEventListener('popover', function() {
    checkSiteStatus();
  });
  /* jshint ignore:start */
}
/* jshint ignore:end */

var handler = window.setInterval(function() {
  var contentWindow = safari.extension.globalPage.contentWindow;

  try {
    // If the module isn’t initialized, intialize it.
    if(typeof(contentWindow.chrome) === typeof(Function)) {
      chrome = contentWindow.chrome();
      window.clearInterval(handler);
      waitChromeNS();
    } else {
      // If the module is initialized, assign the module.
      if(contentWindow.chrome.initialized === true) {
        chrome = contentWindow.chrome;
        window.clearInterval(handler);
        waitChromeNS();
      } else {
        return;
      }
    }
  } catch(e) {
    return;
  }
}, 100);

// outro.js<browser_action> ends here
// browser_action.js ends here
