import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IonicModule } from "@ionic/angular";
import { FileUploadModule } from "./file-upload/file-upload.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { OrdersModule } from "./orders/orders.module";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthInterceptor } from "./auth-interceptor.service";

export function tokenGetter() {
    return localStorage.getItem("access_token");
}

@NgModule({
    declarations: [AppComponent, HomeComponent, LoginComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FileUploadModule,
        OrdersModule,
        IonicModule.forRoot({}),
        ReactiveFormsModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
