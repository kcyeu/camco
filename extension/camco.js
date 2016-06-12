/**
 * @name        Castle Age Monster Code Opener
 * @filename    camco.js
 * @description A handy tool help you open monster code
 * @author      Gordon Yeu (Kuo-Cheng Yeu, aka kmd)
 * @webpage     http://mikuru.tw
 * @revision    $Format:%ci$ ($Format:%h$)
 */
/*global alert: false */
/*global chrome: false */
/*global window: false */
/*global web3Item: false */
/*global fbItem: false */
/*global copyItem: false */

function parseMC(code) {
  code = code.trim();
  var i = code.indexOf(":");
  if (i === -1) {
    return false;
  }

  var id = parseInt(code.substring(0, i), 36);
  var mpool = parseInt(code.substring(i + 1), 10);
  console.log('id: ' + id + ', mpool: ' + mpool);
  if (isNaN(id) || isNaN(mpool)) {
    return false;
  }

  var result = {
    id: id.toString(),
    mpool: mpool.toString(),
    mc: code.toString()
  };
  console.log('id: ' + result.id + ', mpool: ' + result.mpool);
  return result;
}

function filterMC(str) {
  var result = [];
  var patt = /\b([0-9]|[a-z]|[A-Z])+:(1|2|3|100|101)\b/g;
  var tmp;

  while ((tmp = patt.exec(str)) !== null) {
    result.push(tmp[0]);
  }

  if (result.length === 0) {
    return false;
  }
  return result;
}

function copyToClipboard(str) {
  var tmpNode = document.getElementById("camco_tmp");
  tmpNode.value = str;
  tmpNode.focus();
  tmpNode.select();
  document.execCommand("Copy", false, null);
}

function mcOnClick(info, tab) {
  var str = info.selectionText.trim();
  var codeArr = filterMC(str);
  if (codeArr === false) {
    alert(chrome.i18n.getMessage("monsterCodeNotFoundMsg"));
    return false;
  }

  var result = '';
  var key;
  var mc;
  for (key in codeArr) {
    mc = parseMC(codeArr[key]);

    if (mc === false) {
      console.log(chrome.i18n.getMessage("invalidMonsterCodeMsg"));
      continue;
    }

    switch (info.menuItemId) {
    case 'web3Item':
    case web3Item:
      result = "https://web3.castleagegame.com/castle_ws/battle_monster.php?mpool=" + mc.mpool + "&casuser=" + mc.id;
      chrome.tabs.create({"url": result});
      break;
    case 'fbItem':
    case fbItem:
      result = "https://apps.facebook.com/castle_age/battle_monster.php?mpool=" + mc.mpool + "&casuser=" + mc.id;
      chrome.tabs.create({"url": result});
      break;
    case 'copyItem':
    case copyItem:
      result += "Monster code - " + mc.mc + "\r\n";
      result += "https://apps.facebook.com/castle_age/battle_monster.php?mpool=" + mc.mpool + "&casuser=" + mc.id + "\r\n";
      result += "https://web3.castleagegame.com/castle_ws/battle_monster.php?mpool=" + mc.mpool + "&casuser=" + mc.id + "\r\n\r\n";
      copyToClipboard(result);
      break;
    default:
      console.log("Not a valid option");
      break;
    }
  }
  return true;
}
