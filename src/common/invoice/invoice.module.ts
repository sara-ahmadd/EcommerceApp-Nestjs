import { Module } from '@nestjs/common';

import { Cloudinary } from '../providers/cloudinary.provider';
import { InvoiceService } from './invoice.service';

@Module({
  providers: [InvoiceService, Cloudinary],
  exports: [InvoiceService, Cloudinary],
})
export class InvoiceModule {}
