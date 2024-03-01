import { moveFile } from 'move-file';
import { getImageFromSoursFolder } from '../getImageFromSoursFolder/getImageFromSoursFolder.js';

export const trimFilePaths = async () => {
  const arrayOfPaths = await getImageFromSoursFolder();
  const allTrimmedPaths = [];
  for (const path of arrayOfPaths) {
    if (/\s/.test(path)) {
      const newFilePath = path.replace(/\s/g, '');
      allTrimmedPaths.push(moveFile(path, newFilePath));
    }
  }
  return await Promise.all(allTrimmedPaths);
};
