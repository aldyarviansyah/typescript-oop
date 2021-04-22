import fs from 'fs';
import path from 'path';

const walkSync = (dir: any, filelist: string[] = []) => {
  fs.readdirSync(dir).map((file: any) => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });
  return filelist;
};

export default {
    walkSync
}