import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";
import * as moment from "moment";
import { map, of, shareReplay, tap } from "rxjs";
import { environment } from "src/environments/environment";

export type AuthResponse = {
    access_token: string;
    token_type: "bearer";
};

// const MOCK_TOKEN =
//     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MTA2MjUzNzEsImV4cCI6MTc0MjE2MTM3MSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.lWnVsHQqqJcem2A_Md8yj2NzywbfuocZKiVl0ffvJPg";
// const MOCK_RESPONSE = {
//     access_token: MOCK_TOKEN,
//     token_type: "bearer",
// };

@Injectable({
    providedIn: "root",
})
export class AuthService {
    // access_token: string | null = null;

    // get isLoggedIn() {
    //     return this.access_token !== null;
    // }

    constructor(private http: HttpClient, private router: Router) {}

    login(username: string, password: string) {
        let body = new URLSearchParams({
            username: username,
            password: password,
        });

        const url = environment.baseUrl + "/login/access-token";
        const headers = new HttpHeaders({
            "Content-type": "application/x-www-form-urlencoded",
        });
        return this.http
            .post<AuthResponse>(url, body, {
                headers: headers,
            })
            .pipe(
                tap(console.log),
                tap((res) => this.setSession(res)),
                // tap((response) => {
                //     console.log("RESPONSE: ", response);

                //     this.access_token = response.access_token
                //         ? response.access_token
                //         : null;
                //     console.log(this.access_token);
                // }),
                shareReplay()
            );
        // .subscribe(val => {
        //   if(this.access_token) {
        //     this.router.navigate(['home']);
        //   }
        // });
    }

    // getOptions() {
    //     return {
    //         headers: new HttpHeaders({
    //             Authorization: `Bearer ${this.access_token}`,
    //         }),
    //     };
    // }

    // getHeaders() {
    //     return new HttpHeaders({
    //         Authorization: `Bearer ${this.access_token}`,
    //     });
    // }

    // getToken() {
    //     return this.access_token;
    // }

    private setSession(authResult: AuthResponse) {
        console.log("🚀 ~ AuthService ~ setSession ~ authResult:", authResult);

        const expiresIn = jwtDecode(authResult.access_token).exp;
        const expiresAt = moment().add(expiresIn, "second");

        localStorage.setItem("id_token", authResult.access_token);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    }

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        this.router.navigateByUrl('/login')
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = expiration ? JSON.parse(expiration) : 1;
        return moment(expiresAt);
    }
}
