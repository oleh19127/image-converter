import { globby } from 'globby';
import { join } from 'node:path';
import {
  convertedImagesFolder,
  rootImagesFolder,
  sourceImagesFolder,
} from '../../paths/paths.js';

class GetImages {
  async fromSourceFolder() {
    return await globby(join(rootImagesFolder, sourceImagesFolder), {
      onlyFiles: true,
      ignore: ['**/*.Identifier'],
    });
  }

  async fromConvertedFolder() {
    return await globby(join(rootImagesFolder, convertedImagesFolder), {
      onlyFiles: true,
      ignore: ['**/*.Identifier'],
    });
  }
}

export const getImages = new GetImages();
