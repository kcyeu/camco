/**
 * @name        Castle Age Monster Code Opener
 * @filename    camco.js
 * @description A handy tool help you open monster code
 * @author      Gordon Yeu (Kuo-Cheng Yeu, aka kmd)
 * @webpage     http://mikuru.tw
 * @revision	$Format:%ci$ ($Format:%h$)
 */

function mcOnClick(info, tab) {
  var str = info.selectionText.trim();
  //console.log(info);
  var codeArr = filterMC(str);
  if (codeArr == false) {
    alert(chrome.i18n.getMessage("monsterCodeNotFoundMsg"));
  	return false;
  }

  var result = '';
console.log(codeArr);
  for (var key in codeArr) {
    var mc = parseMC(codeArr[key]);

    if(mc == false) {
      console.log(chrome.i18n.getMessage("invalidMonsterCodeMsg"));
      continue;
    }

    switch(info.menuItemId) {
      case 'web3ItemB':
      case web3ItemB:
        result = "https://web3.castleagegame.com/castle_ws/battle_monster.php?mpool=" + mc.mpool + "&casuser=" + mc.id;
        window.open(result);
        break
      case 'fbItemB':
      case fbItemB:
        result = "https://apps.facebook.com/castle_age/battle_monster.php?mpool=" + mc.mpool + "&casuser=" + mc.id;
        window.open(result);
        break
      case 'web3CopyItemB':
      case web3CopyItemB:
        result += "https://web3.castleagegame.com/castle_ws/battle_monster.php?mpool=" + mc.mpool + "&casuser=" + mc.id + " \r\n";
        copyToClipboard(result);
        break
      case 'fbCopyItemB':
      case fbCopyItemB:
        result += "https://apps.facebook.com/castle_age/battle_monster.php?mpool=" + mc.mpool + "&casuser=" + mc.id + " \r\n";
        copyToClipboard(result);
        break
      default:
        console.log("Not a valid option");
        break;
    }
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

function filterMC(str) {
  var result = new Array();
  var patt = /\b([0-9]|[a-z]|[A-Z])+:(1|2|3|101)\b/g;
  var tmp;

  while ((tmp = patt.exec(str)) != null) {
    result.push(tmp[0]);
  }

  if (result.length == 0) {
    return false;
  } else {
    return result;
  }
}

function copyToClipboard(str) {
    var tmpNode = document.getElementById("camco_tmp");
    tmpNode.value = str;
    tmpNode.focus();
    tmpNode.select();
    document.execCommand("Copy", false, null);
}
