const injectScript = (file) => {
  const script = document.createElement('script');
  document.documentElement.appendChild(script);
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file);
  script.parentNode.removeChild(script);
}

injectScript(chrome.extension.getURL('build/backend.js'));
