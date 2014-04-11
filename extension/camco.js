/**
 * @name        Castle Age Monster Code Opener
 * @filename    camco.js
 * @description A handy tool help you open monster code
 * @author      Gordon Yeu (Kuo-Cheng Yeu, aka kmd)
 * @webpage     http://mikuru.tw
 * @revision	$Format:%ci$ ($Format:%h$)
 */

function mcOnClick(info, tab) {
    var code = info.selectionText.trim();
	
    var mc = parseMC(code);
    var result = '';

    if(mc == false) {
        alert('Not a valid monster code.');
		return;
	}

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
    var i = code.indexOf(":");
    if(i == -1) {
        return false;
    }

    var id = parseInt(code.substring(0, i), 36);
    var mpool = parseInt(code.substring(i + 1), 10);
	if(isNaN(id) || isNaN(mpool)) {
        return false;
    }
	
    var result = {'id': id.toString(), 'mpool': mpool.toString()};
    //console.log('id: ' + result.id + ', mpool: ' + result.mpool);
    return result;
}

