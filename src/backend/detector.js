import { installScript } from '../util/helpers';

window.addEventListener('message', e => {
  if (e.source === window && e.data.strudelDetected) {
    chrome.runtime.sendMessage(e.data);
  }
});

function detect(win) {
  win.postMessage({
    devtoolsEnabled: Strudel && Strudel.config.devtools,
    strudelDetected: true
  }, '*');
}

installScript(detect);
