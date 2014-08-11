/**
 * @name        Castle Age Monster Code Opener
 * @filename    contextMenu.js
 * @description Splitted part for context menu
 * @author      Gordon Yeu (Kuo-Cheng Yeu, aka kmd)
 * @webpage     http://mikuru.tw
 * @revision	$Format:%ci$ ($Format:%h$)
 */

// Create a menu item for web3 and fb
var web3ItemB = chrome.contextMenus.create({
    "title": chrome.i18n.getMessage("openMCinWeb3MsgB"),
    "contexts": ["selection"],
    "onclick": mcOnClick
});
var fbItemB = chrome.contextMenus.create({
    "title": chrome.i18n.getMessage("openMCinFbMsgB"),
    "contexts": ["selection"],
    "onclick": mcOnClick
});

var copyItem = chrome.contextMenus.create({
    "title": chrome.i18n.getMessage("copyMCtoURLMsg"),
    "contexts": ["selection"],
    "onclick": mcOnClick
});

