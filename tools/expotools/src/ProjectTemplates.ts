import path from 'path';
import fs from 'fs-extra';
import JsonFile from '@expo/json-file';

import { TEMPLATES_DIR } from './Constants';

interface Template {
  name: string;
  version: string;
  path: string;
}

export async function getAvailableProjectTemplatesAsync(): Promise<Template[]> {
  const templates = await fs.readdir(TEMPLATES_DIR);

  return Promise.all<Template>(
    templates.map(async template => {
      const packageJson = await JsonFile.readAsync(
        path.join(TEMPLATES_DIR, template, 'package.json')
      );

      return {
        name: packageJson.name,
        version: packageJson.version,
        path: path.join(TEMPLATES_DIR, template),
      };
    })
  );
}
