export function localStorage(namespace, data) {

  if (data) {
    return global.localStorage.setItem(namespace, JSON.stringify(data));
  } else if (data === null) {
    return global.localStorage.removeItem(namespace);
  }

  var store = global.localStorage.getItem(namespace);
  return (store && JSON.parse(store)) || null;
};
