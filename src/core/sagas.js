import { takeEvery, select, all } from 'redux-saga/effects';
import { TYPES, ALIAS_TYPES } from './actions';

const getActiveTabId = state => state.activeTabId;

export function* sendSelectedComponentMsg(action) {
  const activeTabId = yield select(getActiveTabId);
  chrome.tabs.sendMessage(activeTabId, { type: ALIAS_TYPES.SELECT_COMPONENT, id: action.id });
}

export function* sendScrollIntoViewMsg(action) {
  const activeTabId = yield select(getActiveTabId);
  chrome.tabs.sendMessage(activeTabId, { type: ALIAS_TYPES.SCROLL_INTO_VIEW, id: action.id });
}

export function* watchSelectComponent() {
  yield takeEvery(TYPES.SELECT_COMPONENT, sendSelectedComponentMsg);
}

export function* watchScrollIntoView() {
  yield takeEvery(TYPES.SCROLL_INTO_VIEW, sendScrollIntoViewMsg);
}

export default function* rootSaga() {
  yield all([
    watchSelectComponent(),
    watchScrollIntoView()
  ]);
}
