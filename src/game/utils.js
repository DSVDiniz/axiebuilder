export const checkUniqueCount = (list, fieldName, amount) => {
  let aux = {};
  list.forEach((obj) => (aux[obj[fieldName]] = ""));
  return Object.keys(aux).length === amount && list.length === amount;
};

export const copyObj = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};
