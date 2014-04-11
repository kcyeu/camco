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
    "title": "Open monster code in new web3 page",
    "contexts": ["selection"],
    "onclick": mcOnClick
});
var fbItem = chrome.contextMenus.create({
    "title": "Open monster code in new fb page",
    "contexts": ["selection"],
    "onclick": mcOnClick
});
