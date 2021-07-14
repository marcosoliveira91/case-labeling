import { readdir, readFile } from 'fs/promises';
import path from 'path';

export const parseTxt = async (dirPath: string): Promise<{ name: string, content: string }[]> => {
  try {
    const files = await readdir(dirPath);

    const promises = files.map(file => readFile(path.join(dirPath, file)));
    const content = await Promise.all(promises);

    return files.map((file, i) => ({
      name: path.basename(file, '.txt'),
      content: content[i].toString(),
    }));
  } catch(error) {
    throw new Error(error);
  }
};
