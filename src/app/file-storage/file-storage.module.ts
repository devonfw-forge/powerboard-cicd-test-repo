import { Module } from '@nestjs/common';
import { CloudFileStorageService } from './services/cloud-file-storage.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'IFileStorageService',
      useClass: CloudFileStorageService,
    },
  ],
  exports: ['IFileStorageService'],
})
export class FileStorageModule {}
