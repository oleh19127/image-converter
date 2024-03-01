import { globby } from 'globby';
import { join } from 'node:path';
import { rootImagesFolder, sourceImagesFolder } from '../../paths/paths.js';

export const getImageFromSoursFolder = async () => {
  return await globby(join(rootImagesFolder, sourceImagesFolder), {
    onlyFiles: true,
  });
};
