/**
 * @name        Castle Age Monster Code Opener
 * @filename    camco.js
 * @description A handy tool help you open monster code
 * @author      Gordon Yeu (Kuo-Cheng Yeu, aka kmd)
 * @webpage     http://mikuru.tw
 * @revision    $Format:%ci$ ($Format:%h$)
 */
/*global alert:false */

//var clipboard = require("sdk/clipboard");
//var tabs = require("sdk/tabs");
//var data = require("sdk/self").data;
//var cm = require("sdk/context-menu");
//var _ = require("sdk/l10n").get;
//
//var cs = 'self.on("click", function () { self.postMessage(window.getSelection().toString());});';
//
//function openTab(url) {
//  tabs.open(url);
//}
//
//// borrow from Chrome version
//function parseMC(code) {
//  code = code.trim();
//  var i = code.indexOf(":");
//  if (i === -1) {
//    return false;
//  }
//  
//  var id = parseInt(code.substring(0, i), 36);
//  var mpool = parseInt(code.substring(i + 1), 10);
//  if (isNaN(id) || isNaN(mpool)) {
//    return false;
//  }
//
//  var result = {id: id.toString(), mpool: mpool.toString(), mc: code.toString()};
//  //console.log('id: ' + result.id + ', mpool: ' + result.mpool);
//  return result;
//}
//
//function filterMC(str) {
//  var result = [];
//  var patt = /\b([0-9]|[a-z]|[A-Z])+:(1|2|3|100|101)\b/g;
//  var tmp;
//
//  while ((tmp = patt.exec(str)) !== null) {
//    result.push(tmp[0]);
//  }
//
//  if (result.length === 0) {
//    return false;
//  }
//  return result;
//}
//
//function copyToClipboardFF(str) {
//  clipboard.set(str);
//}
//
//function processSelection(selection, mode) {
//  var str = selection.trim();
//  var codeArr = filterMC(str);
//  if (codeArr === false) {
//    alert(_("monsterCodeNotFoundMsg"));
//    return false;
//  }
//
//  var result = '';
//  var key;
//  var mc;
//  for (key in codeArr) {
//    mc = parseMC(codeArr[key]);
//
//    if (mc === false) {
//      //console.log(_("invalidMonsterCodeMsg"));
//      continue;
//    }
//
//    switch (mode) {
//    case 'web3Item':
//      result = "https://web3.castleagegame.com/castle_ws/battle_monster.php?mpool=" + mc.mpool + "&casuser=" + mc.id;
//      openTab(result);
//      break;
//    case 'fbItem':
//      result = "https://apps.facebook.com/castle_age/battle_monster.php?mpool=" + mc.mpool + "&casuser=" + mc.id;
//      openTab(result);
//      break;
//    case 'copyItem':
//      result += "Monster code - " + mc.mc + "\r\n";
//      result += "https://apps.facebook.com/castle_age/battle_monster.php?mpool=" + mc.mpool + "&casuser=" + mc.id + "\r\n";
//      result += "https://web3.castleagegame.com/castle_ws/battle_monster.php?mpool=" + mc.mpool + "&casuser=" + mc.id + "\r\n\r\n";
//      copyToClipboardFF(result);
//      break;
//    default:
//      //console.log("Not a valid option");
//      break;
//    }
//  }
//  return true;
//}
//
//
//var miMC2fb = cm.Item({
//  label: _("openMCinFbMsg"),
//  context: cm.SelectionContext(),
//  contentScript: cs,
//  onMessage: function (selectionText) {
//    processSelection(selectionText, 'fbItem');
//  }
//});
//
//var miMC2web3 = cm.Item({
//  label: _("openMCinWeb3Msg"),
//  context: cm.SelectionContext(),
//  contentScript: cs,
//  onMessage: function (selectionText) {
//    processSelection(selectionText, 'web3Item');
//  }
//});
//
//var miMCCopy = cm.Item({
//  label: _("copyMCtoURLMsg"),
//  context: cm.SelectionContext(),
//  contentScript: cs,
//  onMessage: function (selectionText) {
//    processSelection(selectionText, 'copyItem');
//  }
//});
//
//
//cm.Menu({
//  label: "Castle Age Monster Code Opener",
//  image: data.url("icon-32.png"),
//  context: cm.SelectionContext(),
//  items:  [
//    miMC2web3,
//    miMC2fb,
//    miMCCopy
//  ]
//});

browser.contextMenus.create({
    id: "monster-code-2-web3",
    title: "Open monster codes in new web3 pages",
    contexts: ["selection"],
});

//browser.contextMenus.create({
//    id: "monster-code-2-fb",
//    title: "Open monster codes in new fb pages",
//    contexts: ["selection"],
//});
//
//browser.contextMenus.create({
//    id: "monster-code-2-clipboard",
//    title: "Convert and copy URLs to clipboard",
//    contexts: ["selection"],
//});
//
browser.contextMenus.onClicked.addListener((info, tab) => {
	console.log("CLICKED");
    if (info.menuItemId === "monster-code-2-web3") {
        // Examples: text and HTML to be copied.
        const text = "This is text: " + info.linkUrl;
        // Always HTML-escape external input to avoid XSS.
        const safeUrl = ML(info.linkUrl);
        const html = `This is HTML: <a href="${safeUrl}">${safeUrl}</a>`;

        // The example will show how data can be copied, but since background
        // pages cannot directly write to the clipboard, we will run a content
        // script that copies the actual content.

        // clipboard-helper.js defines function copyToClipboard.
        const code = "copyToClipboard(" +
            JSON.stringify(text) + "," +
            JSON.stringify(html) + ");";

        browser.tabs.executeScript({
            code: "typeof copyToClipboard === 'function';",
        }).then((results) => {
            // The content script's last expression will be true if the function
            // has been defined. If this is not the case, then we need to run
            // clipboard-helper.js to define function copyToClipboard.
            if (!results || results[0] !== true) {
                return browser.tabs.executeScript(tab.id, {
                    file: "clipboard-helper.js",
                });
            }
        }).then(() => {
            return browser.tabs.executeScript(tab.id, {
                code,
            });
        }).catch((error) => {
            // This could happen if the extension is not allowed to run code in
            // the page, for example if the tab is a privileged page.
            console.error("Failed to copy text: " + error);
        });
    }
    elif (info.menuItemId === "monster-code-2-fb") {
	}
    elif (info.menuItemId === "monster-code-2-clipboard") {
	}
});


