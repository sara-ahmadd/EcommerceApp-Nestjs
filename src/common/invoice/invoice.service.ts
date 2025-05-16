import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class InvoiceService {
  async generateInvoicePDF(invoiceData: {
    customerName: string;
    email: string;
    items: { description: string; amount: number }[];
    total: number;
    invoiceId: string;
  }): Promise<string> {
    const doc = new PDFDocument();
    const invoicePath = path.join(
      __dirname,
      `../../invoices/invoice-${invoiceData.invoiceId}.pdf`,
    );

    // Ensure the invoices directory exists
    fs.mkdirSync(path.dirname(invoicePath), { recursive: true });

    const writeStream = fs.createWriteStream(invoicePath);
    doc.pipe(writeStream);

    doc.fontSize(20).text('Invoice', { align: 'center' });
    doc.moveDown();
    doc.text(`Invoice ID: ${invoiceData.invoiceId}`);
    doc.text(`Customer: ${invoiceData.customerName}`);
    doc.text(`Email: ${invoiceData.email}`);
    doc.moveDown();

    doc.fontSize(14).text('Items:');
    invoiceData.items.forEach((item) => {
      doc.text(`${item.description}: $${(item.amount / 100).toFixed(2)}`);
    });

    doc.moveDown();
    doc.fontSize(16).text(`Total: $${(invoiceData.total / 100).toFixed(2)}`, {
      align: 'right',
    });

    doc.end();

    // Return a promise that resolves when the file is fully written
    return new Promise((resolve, reject) => {
      writeStream.on('finish', () => resolve(invoicePath));
      writeStream.on('error', reject);
    });
  }
}
