const injectId = () => {
  var script = document.createElement('script');
  script.textContent = "var extensionId = " + JSON.stringify(chrome.runtime.id);
  (document.head||document.documentElement).appendChild(script);
  script.parentNode.removeChild(script);
}

const injectScript = (file) => {
  const script = document.createElement('script');
  document.documentElement.appendChild(script);
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file);
  script.parentNode.removeChild(script);
}

injectId();
injectScript(chrome.extension.getURL('build/backend.js'));
