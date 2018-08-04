export const INIT = 'INIT';

export const init = ({ version, components }) => {
  return { type: INIT, version, components }
}
