import { Component, OnInit } from '@angular/core';
import { Order } from './orders.model';
import { OrdersRepositoryService } from './orders-repository.service';
import { Router } from '@angular/router';
import { FileUploadService } from '../file-upload/file-upload.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent  implements OnInit {
  orders: Order[] = [];

  fileUploadSbscrptn: Subscription = new Subscription();

  constructor(private orderService: OrdersRepositoryService, private router: Router, private fileUploadSrv: FileUploadService) { }

  ngOnInit() {
    this.orderService.getOrders$().subscribe(orders => this.orders = orders);
    this.fileUploadSbscrptn = this.fileUploadSrv.fileUpload$.subscribe(
      val => {if(val) {this.orderService.getOrders$().subscribe(orders => this.orders = orders);}} 
    )
  }

  ngOnDestroy() {
    if(this.fileUploadSbscrptn) this.fileUploadSbscrptn.unsubscribe();
  }

  public gotoOrder(id: string) {
    if(id) this.router.navigate([`/order/${id}`]);
  }
}
