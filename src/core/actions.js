export const INIT = 'INIT';
export const SELECT_COMPONENT = 'SELECT_COMPONENT';

export const init = ({ version, components }) => {
  return { type: INIT, version, components };
};

export const selectComponent = ({ id }) => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function(response) {
      console.log(response.farewell);
    });
  });
  return { type: SELECT_COMPONENT, id };
};