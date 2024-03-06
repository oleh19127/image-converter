import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';

class DirWrapper {
  async createPath(path) {
    if (!existsSync(path)) {
      await mkdir(path, { recursive: true });
    }
  }
}

export const dirWrapper = new DirWrapper();
