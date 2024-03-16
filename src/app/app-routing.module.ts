import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { OrderComponent } from "./orders/order/order.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
    { path: "order/:id", component: OrderComponent, canActivate: [AuthGuard] },
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "**", redirectTo: "login" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
