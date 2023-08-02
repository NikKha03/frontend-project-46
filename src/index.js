import * as fs from 'node:fs';
import path from 'path';
import makeTree from './makeTree.js';

const getPath = (nameFile) => path.resolve('fixtures', nameFile);

const genDiff = (file1, file2) => {
  const readFile1 = fs.readFileSync(getPath(file1), 'utf-8');
  const readFile2 = fs.readFileSync(getPath(file2), 'utf-8');
  const parseFile1 = JSON.parse(readFile1);
  const parseFile2 = JSON.parse(readFile2);

  return makeTree(parseFile1, parseFile2);
};

// console.log(genDiff('./src/file1.json', './src/file2.json'));
export default genDiff;
