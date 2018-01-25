'use strict';

function getObjectLeaf(obj, path) {
  let temp = obj;

  for (let i = 0; i < path.length - 1; i++) {
    temp = temp[path[i]];
  }

  return temp;
}

/*
  Replaces every existing string in given objects under given paths with '***'.
  Mutates given object
*/
function hidePasswords(obj, paths) {
  if (typeof obj !== 'object' || obj === null) return;

  const pathsWithPassword = paths.filter(path => {
    let temp = obj;

    for (let i = 0; i < path.length; i++) {
      temp = temp[path[i]];

      if (temp === undefined) {
        return false;
      }
    }

    return typeof temp === 'string';
  });

  pathsWithPassword.forEach(path => {
    const leafKey = path[path.length - 1];
    const leaf = getObjectLeaf(obj, path);

    leaf[leafKey] = '***';
  });
}

module.exports = hidePasswords;
