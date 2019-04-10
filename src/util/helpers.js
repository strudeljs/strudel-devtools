// Append function or script URL passed as parameter to inspected window as script
export const installScript = (arg) => {
  const script = document.createElement('script');

  if (typeof arg === 'function') {
    script.textContent = ';(' + arg.toString() + ')(window)';
  } else if (typeof arg === 'string') {
    script.src = arg;
  }

  document.documentElement.appendChild(script);
  script.parentNode.removeChild(script);
};

// Set global variable in inspected window
export const installGlobal = (name, val) => {
  const script = document.createElement('script');
  script.textContent = `window.${name} = ${val}`;
  (document.head||document.documentElement).appendChild(script);
  script.parentNode.removeChild(script);
}

// Append script to inspected window from dev tools panel
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
