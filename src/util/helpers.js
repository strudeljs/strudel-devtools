export const installScript = (fn) => {
  const script = document.createElement('script');
  script.textContent = ';(' + fn.toString() + ')(window)';
  document.documentElement.appendChild(script);
  script.parentNode.removeChild(script);
};

export const installGlobal = (name, val) => {
  const script = document.createElement('script');
  script.textContent = `window.${name} = ${val}`;
  (document.head||document.documentElement).appendChild(script);
  script.parentNode.removeChild(script);
}

export const injectScript = (scriptName, cb) => {
  const src = `
    (function() {
      var script = document.constructor.prototype.createElement.call(document, 'script');
      script.src = "${scriptName}";
      document.documentElement.appendChild(script);
      script.parentNode.removeChild(script);
    })()
  `;

  chrome.devtools.inspectedWindow.eval(src, function (res, err) {
    if (err) {
      console.log(err);
    }
    cb();
  })
};

const isNumeric = (str) => {
  return +str + '' === str;
}
