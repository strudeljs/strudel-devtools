document.addEventListener("DOMContentLoaded", () => {
  var versionInstances = document.getElementsByClassName("js-version");
  var version = chrome.runtime.getManifest().version;

  for (var i = 0; i < versionInstances.length; i++){
    versionInstances[i].innerHTML = "(" + version + ")";
  }
});
