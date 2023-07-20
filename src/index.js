import * as fs from 'node:fs';

const genDiff = (filepath1, filepath2) => {
  const readFile1 = fs.readFileSync(filepath1, 'utf-8');
  const readFile2 = fs.readFileSync(filepath2, 'utf-8');
  return [readFile1, readFile2];
  // return JSON.stringify(readFile1);
};

console.log(genDiff('./src/file1.json', './src/file2.json'));

export default genDiff;
