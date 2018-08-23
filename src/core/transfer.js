export const encode = (data, replacer, list, seen) => {
  let stored, key, value, i, l;
  let seenIndex = seen.get(data);

  if (seenIndex != null) {
    return seenIndex;
  }

  let index = list.length;
  let proto = Object.prototype.toString.call(data);

  if (proto === '[object Object]') {
    stored = {};
    seen.set(data, index);
    list.push(stored);
    let keys = Object.keys(data);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      value = data[key];
      if (replacer) value = replacer.call(data, key, value);
      stored[key] = encode(value, replacer, list, seen);
    }
  } else if (proto === '[object Array]') {
    stored = [];
    seen.set(data, index);
    list.push(stored);
    for (i = 0, l = data.length; i < l; i++) {
      value = data[i];
      if (replacer) value = replacer.call(data, i, value);
      stored[i] = encode(value, replacer, list, seen);
    }
  } else {
    list.push(data);
  }
  return index;
}

export const decode = (list, reviver) => {
  let i = list.length;
  let j, k, data, key, value, proto;

  while (i--) {
    data = list[i]
    proto = Object.prototype.toString.call(data)
    if (proto === '[object Object]') {
      let keys = Object.keys(data)
      for (j = 0, k = keys.length; j < k; j++) {
        key = keys[j]
        value = list[data[key]]
        if (reviver) value = reviver.call(data, key, value)
        data[key] = value
      }
    } else if (proto === '[object Array]') {
      for (j = 0, k = data.length; j < k; j++) {
        value = list[data[j]]
        if (reviver) value = reviver.call(data, j, value)
        data[j] = value
      }
    }
  }
}

export const stringify = (data, replacer, space)  => {
  try {
    return arguments.length === 1 ? JSON.stringify(data) : JSON.stringify(data, replacer, space);
  } catch (e) {
    return stringifyStrict(data, replacer, space);
  }
}

export const parse = (data, reviver) => {
  let hasCircular = /^\s/.test(data);

  if (!hasCircular) {
    return arguments.length === 1 ? JSON.parse(data) : JSON.parse(data, reviver);
  } else {
    let list = JSON.parse(data);
    decode(list, reviver);
    return list[0];
  }
};

export const stringifyStrict = (data, replacer, space) => {
  let list = [];
  encode(data, replacer, list, new Map());
  return space ? ' ' + JSON.stringify(list, null, space) : ' ' + JSON.stringify(list)
}
