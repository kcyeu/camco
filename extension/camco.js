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
    //console.log(info);
    var mc = parseMC(code);
    var result = '';

    if(mc == false) {
        alert('Not a valid monster code.');
		return false;
	}

    switch(info.menuItemId) {
    case 'web3Item':
    case web3Item:
        result = "https://web3.castleagegame.com/castle_ws/battle_monster.php?mpool="+mc.mpool+"&casuser="+mc.id;
        window.open(result);
        break
    case 'fbItem':
    case fbItem:
        result = "https://apps.facebook.com/castle_age/battle_monster.php?mpool="+mc.mpool+"&casuser="+mc.id;
        window.open(result);
        break
    case 'web3CopyItem':
    case web3CopyItem:
        result = "https://web3.castleagegame.com/castle_ws/battle_monster.php?mpool="+mc.mpool+"&casuser="+mc.id;
        copyToClipboard(result);
        break
    case 'fbCopyItem':
    case fbCopyItem:
        result = "https://apps.facebook.com/castle_age/battle_monster.php?mpool="+mc.mpool+"&casuser="+mc.id;
        copyToClipboard(result);
        break
    default:
        return false;
        break;
    }
    return true;
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
	
    var result = {id: id.toString(), mpool: mpool.toString()};
    //console.log('id: ' + result.id + ', mpool: ' + result.mpool);
    return result;
}

function copyToClipboard(str) {
    var tmpNode = document.getElementById("camco_tmp");
    tmpNode.value = str;
    tmpNode.focus();
    tmpNode.select();
    document.execCommand("Copy", false, null);
}
