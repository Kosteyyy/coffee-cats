import { Component, OnInit } from '@angular/core';
import { Order } from './orders.model';
import { OrdersRepositoryService } from './orders-repository.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent  implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrdersRepositoryService, private router: Router) { }

  ngOnInit() {
    this.orderService.getOrders$().subscribe(orders => this.orders = orders);
  }

  public gotoOrder(id: string) {
    if(id) this.router.navigate([`/order/${id}`]);
  }
}
