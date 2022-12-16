import { container } from 'tsyringe';

import { LocalStorageProvider } from './implementations/LocalStorageProvider';
import { S3StorageProvider } from './implementations/S3StorageProvider';
import { IStorageProvider } from './IStorageProvider';

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

const { STORAGE_DISK } = process.env;

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[STORAGE_DISK as keyof typeof diskStorage]
);
