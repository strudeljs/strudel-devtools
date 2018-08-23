export const INIT = 'INIT';
export const SELECTED = 'SELECTED';
export const EVENT = 'EVENT';
export const FLUSH_EVENT = 'FLUSH_EVENT';

export const init = ({ version, components }) => {
  return { type: INIT, version, components };
}

export const selected = (id) => {
  return { type: SELECTED, id };
}

export const eventTrigger = ({ event }) => {
  return { type: EVENT, event };
}

export const flushEvent = () => {
  return { type: FLUSH_EVENT };
}
