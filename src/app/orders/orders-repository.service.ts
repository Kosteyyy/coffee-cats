import { Injectable } from "@angular/core";
import { Order } from "./orders.model";
import { map } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../auth.service";
import { environment } from "src/environments/environment";

type OrdersResponse = { count: number; data: Order[] };
@Injectable({
    providedIn: "root",
})
export class OrdersRepositoryService {
    ordersList: Order[] = [];

    constructor(private http: HttpClient, private authSrv: AuthService) {
        this.ordersList = [
            // new Order('1', 'file 1', 'Первый заказ на обработку стенограммы', 'delayed'),
            // new Order('2', 'file 2', 'Срочный заказа на обработку видео в процессе', 'processing'),
            // new Order('3', 'file 3', 'Этот заказ завершет', 'complete')
        ];
    }

    getOrders$() {
        const url = environment.baseUrl + "/orders";
        // const token = this.authSrv.getToken();
        // const options = {
        //   headers: new HttpHeaders({
        //     "Authorization": `Bearer ${token}`
        //   })
        // }

        return this.http
            .get<OrdersResponse>(url)
            .pipe(
                map((response) =>
                    response.data
                        .map((order) => new Order(order))
                        .filter((order) => order.file)
                )
            );
    }

    getOrder$(id: string) {
        // const url = environment.baseUrl + "/orders/" + id.toString();
        const url = environment.baseUrl + "/orders/" + id.toString();
        // const token = this.authSrv.getToken();
        // const options = {
        //   headers: new HttpHeaders({
        //     "Authorization": `Bearer ${token}`
        //   })
        // }

        return this.http.get<any>(url);
    }
}
