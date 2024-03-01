import util from 'util';
import { exec as execCallback } from 'child_process';
import { parse, join, basename } from 'node:path';
const exec = util.promisify(execCallback);
import cliProgress from 'cli-progress';
import { convertedImagesFolder, rootImagesFolder } from './paths/paths.js';
import { widths } from './static/arrays/widths.js';
import { extensions } from './static/arrays/extensions.js';
import { trimFilePaths } from './utils/trimFileNames/trimFileNames.js';
import { getImageFromSoursFolder } from './utils/getImageFromSoursFolder/getImageFromSoursFolder.js';

const app = async () => {
  await trimFilePaths();
  const imagePathsFromSourceImagesFolder = await getImageFromSoursFolder();
  const bar = new cliProgress.Bar({
    format: '{newFileName}: [{bar}] {percentage}% | {value}/{total}',
  });
  let count = 0;
  bar.start(
    imagePathsFromSourceImagesFolder.length * extensions.length * widths.length,
    0,
    {},
  );
  for (const imagePath of imagePathsFromSourceImagesFolder) {
    const { name } = parse(imagePath);
    for (const extension of extensions) {
      for (const width of widths) {
        const newFilePath = `${join(rootImagesFolder, convertedImagesFolder, name)}-${width}.${extension}`;
        const newFileName = basename(newFilePath);
        count++;
        bar.update(count, { newFileName });
        await exec(
          `magick convert ${imagePath} -resize ${width} -quality 100 ${newFilePath}`,
        );
      }
    }
  }
  bar.stop();
};

app();
