/*global chrome */

/**
 * @fileOverview This file contains the Firefox opening statements for
 * the content script prepended to the main file.
 * @name intro.js<inject>
 * @author Etienne Prud’homme
 * @license MIT
 */

// chrome = browser;
chrome.storage.sync = {};

/**
 * Gets one or more items from storage.
 * @param {string|string[]|object} [keys] - A single key to get, list
 * of keys to get, or a dictionary specifying default values (see
 * description of the object). An empty list or object will return an
 * empty result object. Pass in null to get the entire contents of
 * storage.
 * @param {function} callback - Callback with storage items, or on
 * failure (in which case runtime.lastError will be set).
 */
chrome.storage.sync.get = function(keys, callback) {

  function localHandleGet(response) {
    callback(response);
  }
  var message = {};
  message.data = keys;
  message.type = 'chrome.storage.local.get';

  chrome.runtime.sendMessage(null, message, {}, localHandleGet);
};

chrome.storage.sync.set = function(object, callback) {
  function localHandleSet(response) {
    if(response.status) {
      throw new Error('Error: ' + response.message);
    }
    callback();
  }

  var message = {};

  message.type = 'chrome.storage.local.set';
  message.data = object;
  chrome.runtime.sendMessage(null, message, {}, localHandleSet);
};

// intro.js<inject> ends here
