import _ from 'lodash';

const makeTree = (file1, file2) => {
  const getKeysFile1 = Object.keys(file1);
  const getKeysFile2 = Object.keys(file2);
  const getAllKeys = _.union(getKeysFile1, getKeysFile2);
  const sortAllKeys = _.sortBy(getAllKeys);

  const result = sortAllKeys.reduce((acc, key) => {
    if (Object.hasOwn(file1, key) && !Object.hasOwn(file2, key)) {
      acc.push([`${'- '}${key}`, file1[key]]);
      return acc;
    }
    if (!Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
      acc.push([`${'+ '}${key}`, file2[key]]);
      return acc;
    }
    if (Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
      if (file1[key] === file2[key]) {
        acc.push([`${'  '}${key}`, file1[key]]);
        return acc;
      }
      acc.push([`${'- '}${key}`, file1[key]]);
      acc.push([`${'+ '}${key}`, file2[key]]);
      return acc;
    }
    return acc;
  }, []);

  return JSON.stringify(Object.fromEntries(result), null, 2);
};

export default makeTree;
