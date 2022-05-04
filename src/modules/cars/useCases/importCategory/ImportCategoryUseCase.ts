import { parse } from 'csv-parse';
import fs from 'fs';

class ImportCategoryUseCase {
  execute(file: Express.Multer.File): void {
    const stream = fs.createReadStream(file.path);

    const parsedFile = parse();

    stream.pipe(parsedFile);

    parsedFile.on('data', async (line) => {
      console.time('line');
      console.log(line);
      console.timeEnd('line');
    })
  }
}

export { ImportCategoryUseCase };
