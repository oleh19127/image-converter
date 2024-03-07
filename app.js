import util from 'util';
import { exec as execCallback } from 'child_process';
import { parse, join } from 'node:path';
const exec = util.promisify(execCallback);
import { convertedImagesFolder, rootImagesFolder } from './paths/paths.js';
import { widths } from './static/arrays/widths.js';
import { extensions } from './static/arrays/extensions.js';
import { trimFilePaths } from './utils/trimFileNames/trimFileNames.js';
import { getImages } from './utils/getImages/getImages.js';
import { sortBy } from './utils/sortBy/sortBy.js';
import pLimit from 'p-limit';
import { logger } from './utils/logger/logger.js';

const app = async () => {
  try {
    await trimFilePaths();
    const imagePathsFromSourceImagesFolder = await getImages.fromSourceFolder();
    const allConvertedImages = [];
    const limit = pLimit(10);
    for (const imagePath of imagePathsFromSourceImagesFolder) {
      const { name } = parse(imagePath);
      for (const extension of extensions) {
        for (const width of widths) {
          const newFilePath = `${join(rootImagesFolder, convertedImagesFolder, name)}-${width}.${extension}`;
          allConvertedImages.push(
            limit(() =>
              exec(
                `magick convert ${imagePath} -resize ${width} -quality 100 ${newFilePath}`,
              ),
            ),
          );
        }
      }
    }
    await Promise.all(allConvertedImages);
    await sortBy.extension();
  } catch (error) {
    logger.error(error);
  }
};

app();
