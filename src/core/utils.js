export const omit = (object, key) => {
  const {[key]: deletedKey, ...otherKeys} = object;
  return otherKeys;
};
