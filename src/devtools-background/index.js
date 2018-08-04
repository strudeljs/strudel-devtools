let checkCount = 0;
let created = false;

chrome.devtools.network.onNavigated.addListener(createPanel);
const checkStrudel = setInterval(createPanel, 1000);
createPanel();

function createPanel() {
  if (created || checkCount++ > 10) {
    return;
  }
  chrome.devtools.inspectedWindow.eval('!!(window.__STRUDEL_DEVTOOLS_GLOBAL_HOOK__.Strudel)', (hasStrudel) => {
      if (!hasStrudel || created) {
        return;
      }
      clearInterval(checkStrudel);
      created = true;
      chrome.devtools.panels.create('Strudel', '../icons/128.png', '../devtools.html', (panel) => {

      });
    }
  )
}
