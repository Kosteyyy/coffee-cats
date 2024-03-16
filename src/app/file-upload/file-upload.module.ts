import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadComponent } from './file-upload.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [FileUploadComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  providers: [FileUploadService],
  exports: [FileUploadComponent]
})
export class FileUploadModule { }
