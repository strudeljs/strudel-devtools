import { takeEvery, select, all, put } from 'redux-saga/effects';
import { TYPES, ALIAS_TYPES, afterPageLoaded, flushTab } from './actions';

const getActiveTabId = state => state.activeTabId;
const getReloadedTabIds = state => state.reloadedTabIds;

export function* sendSelectedComponentMsg(action) {
  const activeTabId = yield select(getActiveTabId);
  chrome.tabs.sendMessage(activeTabId, { type: ALIAS_TYPES.SELECT_COMPONENT, id: action.id });
}

export function* sendScrollIntoViewMsg(action) {
  const activeTabId = yield select(getActiveTabId);
  chrome.tabs.sendMessage(activeTabId, { type: ALIAS_TYPES.SCROLL_INTO_VIEW, id: action.id });
}

export function* sendHighlightComponentMsg(action) {
  const activeTabId = yield select(getActiveTabId);
  chrome.tabs.sendMessage(activeTabId, { type: ALIAS_TYPES.HIGHLIGHT_COMPONENT, id: action.id });
}

export function* sendRemoveHighlight(action) {
  const activeTabId = yield select(getActiveTabId);
  chrome.tabs.sendMessage(activeTabId, { type: ALIAS_TYPES.REMOVE_HIGHLIGHT });
}

export function* sendInitRequest(action) {
  const reloadedTabIds = yield select(getReloadedTabIds);
  const loadedTabId = action._sender.tab.id;

  if (reloadedTabIds.includes(loadedTabId)) {
    yield put(flushTab({ id: loadedTabId }));
    chrome.tabs.sendMessage(loadedTabId, { type: ALIAS_TYPES.PAGE_LOADED });
  }

  yield put(afterPageLoaded());
}

export function* watchSelectComponent() {
  yield takeEvery(TYPES.SELECT_COMPONENT, sendSelectedComponentMsg);
}

export function* watchScrollIntoView() {
  yield takeEvery(TYPES.SCROLL_INTO_VIEW, sendScrollIntoViewMsg);
}

export function* watchHighlightComponent() {
  yield takeEvery(TYPES.HIGHLIGHT_COMPONENT, sendHighlightComponentMsg);
}

export function* watchRemoveHighlight() {
  yield takeEvery(TYPES.REMOVE_HIGHLIGHT, sendRemoveHighlight);
}

export function* watchPageLoaded() {
  yield takeEvery(TYPES.PAGE_LOADED, sendInitRequest);
}

export default function* rootSaga() {
  yield all([
    watchSelectComponent(),
    watchScrollIntoView(),
    watchHighlightComponent(),
    watchRemoveHighlight(),
    watchPageLoaded(),
  ]);
}
