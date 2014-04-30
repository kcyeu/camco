/**
 * @name        Castle Age Monster Code Opener
 * @filename    contextMenu.js
 * @description Splitted part for context menu
 * @author      Gordon Yeu (Kuo-Cheng Yeu, aka kmd)
 * @webpage     http://mikuru.tw
 * @revision	$Format:%ci$ ($Format:%h$)
 */

// Create a menu item for web3 and fb
var web3Item = chrome.contextMenus.create({
    "title": chrome.i18n.getMessage("openMCinWeb3Msg"),
    "contexts": ["selection"],
    "onclick": mcOnClick
});
var fbItem = chrome.contextMenus.create({
    "title": chrome.i18n.getMessage("openMCinFbMsg"),
    "contexts": ["selection"],
    "onclick": mcOnClick
});

var web3CopyItem = chrome.contextMenus.create({
    "title": chrome.i18n.getMessage("copyMCtoWeb3URLMsg"),
    "contexts": ["selection"],
    "onclick": mcOnClick
});
var fbCopyItem = chrome.contextMenus.create({
    //"title": "Convert and copy fb URL to clipboard",
    "title": chrome.i18n.getMessage("copyMCtoFbURLMsg"),
    "contexts": ["selection"],
    "onclick": mcOnClick
});

