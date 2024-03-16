import { Component, OnInit } from '@angular/core';
import { FileUploadService } from './file-upload.service';
import { IonTextarea } from '@ionic/angular';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  file: File | null = null;
  description: string | null = '';

  get buttonTitle() {
    return this.file ? 'Загрузить другой файл' : 'Загрузить файл'
  }

  get fileSize() {
    let size: string | null;
    if (!this.file) return '';
    size = (this.file.size / 1024 / 1024).toFixed(2) + 'Мб';
    return size;
  }

  constructor(private fileUploadSrv: FileUploadService) { }

  ngOnInit() { }

  public onFileInput(e: Event) {
    console.log((e.target as HTMLInputElement).files);
    const files = (e.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      this.file = files[0];
      console.log("🚀 ~ FileUploadComponent ~ onFileInput ~ this.file :", this.file)

    }
  }

  public descriptionInput(e: Event) {
    const value = (e.target as HTMLIonTextareaElement).value;
    if(value!== undefined) {
      this.description = value;
      console.log("🚀 ~ FileUploadComponent ~ descriptionInput ~ this.description :", this.description )
    }
  }

  public uploadFile() {
    if(!this.file) return;
    this.fileUploadSrv.uploadFile$(this.file, this.description).subscribe();
  }

}
