import * as fs from 'node:fs';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  const readFile1 = fs.readFileSync(filepath1, 'utf-8');
  const readFile2 = fs.readFileSync(filepath2, 'utf-8');
  const parseFile1 = JSON.parse(readFile1);
  const parseFile2 = JSON.parse(readFile2);

  const getKeysFile1 = Object.keys(parseFile1);
  const getKeysFile2 = Object.keys(parseFile2);
  const getAllKeys = _.union(getKeysFile1, getKeysFile2);
  const sortAllKeys = _.sortBy(getAllKeys);

  const result = sortAllKeys.reduce((acc, key) => {
    if (Object.hasOwn(parseFile1, key) && !Object.hasOwn(parseFile2, key)) {
      acc.push([`${'- '}${key}`, parseFile1[key]]);
      return acc;
    }
    if (!Object.hasOwn(parseFile1, key) && Object.hasOwn(parseFile2, key)) {
      acc.push([`${'+ '}${key}`, parseFile2[key]]);
      return acc;
    }
    if (Object.hasOwn(parseFile1, key) && Object.hasOwn(parseFile2, key)) {
      if (parseFile1[key] === parseFile2[key]) {
        acc.push([`${'  '}${key}`, parseFile1[key]]);
        return acc;
      }
      acc.push([`${'- '}${key}`, parseFile1[key]]);
      acc.push([`${'+ '}${key}`, parseFile2[key]]);
      return acc;
    }
    return acc;
  }, []);

  return JSON.stringify(Object.fromEntries(result), null, 2);
};

// console.log(genDiff('./src/file1.json', './src/file2.json'));
export default genDiff;
