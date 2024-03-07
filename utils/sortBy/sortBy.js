import { getImages } from '../getImages/getImages.js';
import { basename, extname, join } from 'node:path';
import arrayUnion from 'array-union';
import { convertedImagesFolder, rootImagesFolder } from '../../paths/paths.js';
import { dirWrapper } from '../dirWrapper/dirWrapper.js';
import { moveFile } from 'move-file';
import pLimit from 'p-limit';

class SortBy {
  limit = pLimit(40);

  async extension() {
    await this.createExtensionsFolders();
    const allImagesFromConvertedFolder = await getImages.fromConvertedFolder();
    const allImagesExtension = await this.getAllExtension();
    const allMovedFiles = [];
    for (const image of allImagesFromConvertedFolder) {
      for (const imageExtension of allImagesExtension) {
        const fileExtension = extname(image).replace('.', '').toLowerCase();
        if (fileExtension === imageExtension) {
          const fileName = basename(image);
          allMovedFiles.push(
            this.limit(() =>
              moveFile(
                image,
                join(
                  rootImagesFolder,
                  convertedImagesFolder,
                  imageExtension,
                  fileName,
                ),
              ),
            ),
          );
        }
      }
    }
    return await Promise.all(allMovedFiles);
  }

  async createExtensionsFolders() {
    const allExtension = await this.getAllExtension();
    const allCreatedFolders = [];
    for (const extension of allExtension) {
      const pathToExtensionFolder = join(
        rootImagesFolder,
        convertedImagesFolder,
        extension,
      );
      allCreatedFolders.push(
        this.limit(() => dirWrapper.createPath(pathToExtensionFolder)),
      );
    }

    return await Promise.all(allCreatedFolders);
  }

  async getAllExtension() {
    const allFilesFromConvertedImagesFolder =
      await getImages.fromConvertedFolder();
    const allExtensions = [];
    for (const file of allFilesFromConvertedImagesFolder) {
      const fileExtension = extname(file).replace('.', '').toLowerCase();
      allExtensions.push(this.limit(() => fileExtension));
    }
    return arrayUnion(await Promise.all(allExtensions));
  }
}

export const sortBy = new SortBy();
