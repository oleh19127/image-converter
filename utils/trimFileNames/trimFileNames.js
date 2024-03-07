import { moveFile } from 'move-file';
import { getImages } from '../getImages/getImages.js';
import pLimit from 'p-limit';
import { logger } from '../logger/logger.js';
import { join, parse } from 'node:path';

export const trimFilePaths = async () => {
  const arrayOfPaths = await getImages.fromSourceFolder();
  const allTrimmedPaths = [];
  const arrayOfRegex = [/\(|\)/g, /\s/];
  const limit = pLimit(40);
  for (const path of arrayOfPaths) {
    const { dir, base } = parse(path);
    let fileName = base.trim();
    for (const regex of arrayOfRegex) {
      while (regex.test(fileName)) {
        fileName = fileName.replace(regex, '');
        logger.info(fileName);
        if (!regex.test(fileName)) {
          break;
        }
      }
    }
    allTrimmedPaths.push(limit(() => moveFile(path, join(dir, fileName))));
  }
  return await Promise.all(allTrimmedPaths);
};
