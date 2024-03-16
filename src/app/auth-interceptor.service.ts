import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() {}
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const acessToken = localStorage.getItem("id_token");
        console.log("🚀 ~ AuthInterceptor ~ acessToken:", acessToken);

        if (acessToken) {
            const cloned = req.clone({
                headers: req.headers.set(
                    "Authorization",
                    "Bearer " + acessToken
                ),
            });

            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}
