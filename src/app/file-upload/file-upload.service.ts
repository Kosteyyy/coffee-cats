import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth.service";

@Injectable({
    providedIn: "root",
})
export class FileUploadService {
    data: FormData = new FormData();

    constructor(private http: HttpClient, private authSrv: AuthService) {}

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
        });
    }
}
