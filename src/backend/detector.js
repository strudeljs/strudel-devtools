import { installScript } from '../util/helpers';

window.addEventListener('message', e => {
  if (e.source === window && e.data.strudelDetected) {
    chrome.runtime.sendMessage(e.data);
  }
});

function detect(win) {
  const all = document.querySelectorAll('*')
  let el;

  for (let i = 0; i < all.length; i++) {
    if (all[i].__strudel__) {
      el = all[i];
      break;
    }
  }

  if (el) {
    let Strudel = el.__strudel__.getInstance();

    win.postMessage({
      devtoolsEnabled: Strudel && Strudel.config.devtools,
      strudelDetected: true
    }, '*');
  }
}

setTimeout(() => {
  installScript(detect);
}, 0);

document.addEventListener('strudel:loaded', () => {
  installScript(detect);
}, { once: true });
