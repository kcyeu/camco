/**
 * @name        Castle Age Monster Code Openner
 * @filename    camco.js
 * @description A handy tool help you open monster code
 * @author      kmd (Kuo-Cheng Yeu)
 * @webpage     http://mikuru.tw
 */

function mcOnClick(info, tab) {
    code = info.selectionText;
    mc = parseMC(code);
    result = '';

    if(mc == false) return;

    switch(info.menuItemId) {
    case web3Item:
        result = "https://web3.castleagegame.com/castle_ws/battle_monster.php?mpool="+mc.mpool+"&casuser="+mc.id;
        break
    case fbItem:
        result = "https://apps.facebook.com/castle_age/battle_monster.php?mpool="+mc.mpool+"&casuser="+mc.id;
        break
    default:
        break;
    }
    window.open(result);
}

function parseMC(code) {
    i = code.indexOf(":");
    if(i == -1) {
        alert('Not a valid monster code.');
        return false;
    }

    id = parseInt(code.substring(0, i), 36);
    mpool = parseInt(code.substring(i + 1), 10);
    result = {'id': id.toString(), 'mpool': mpool.toString()};
    console.log('id: ' + result.id + ' mpool: ' + result.mpool);
    return result;
}

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

