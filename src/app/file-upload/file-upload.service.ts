import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth.service";
import { LoadingController } from "@ionic/angular";

@Injectable({
    providedIn: "root",
})
export class FileUploadService {
    data: FormData = new FormData();
    fileUpload$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private http: HttpClient, private authSrv: AuthService, private loading: LoadingController) {}

    public uploadFile$(
        file: File,
        description: string | null
    ): Observable<any> {
        if (!description) {
            description = "Без описания";
        }

        const url = environment.baseUrl + "/orders";
        this.data.append("file", file);
        // const token = this.authSrv.getToken();
        // const headers = new HttpHeaders({
        //   "Authorization": `Bearer ${token}`,
        // })

        return this.http.post(url, this.data, {
            params: { descr: description },
        }).pipe(tap(val => {this.fileUpload$.next(true);
        }));
    }


  async showLoading() {
    const loading = await this.loading.create({
      message: 'Загружаем файл...',
    });

    loading.present();

    
  }
  
}
