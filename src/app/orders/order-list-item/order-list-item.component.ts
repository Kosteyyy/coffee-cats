import { Component, Input, OnInit } from '@angular/core';
import { Order, OrderStatus } from '../orders.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list-item',
  templateUrl: './order-list-item.component.html',
  styleUrls: ['./order-list-item.component.scss'],
})
export class OrderListItemComponent  implements OnInit {
  statusColor: {[key in OrderStatus]: string} = {
    завершено: 'success' ,
    ожидание: 'medium',
    "в процессе": 'warning' 
  }

  // statusDict: {[key in OrderStatus]: string} = {
  //   complete: 'Завершено' ,
  //   delayed: 'Отложено',
  //   processing: 'В обработке' 
  // }

  @Input() order: Order | null = null;;
  constructor(private router: Router) { }

  ngOnInit() {}

  openOrder() {
    if(this.order) this.router.navigate([`order${this.order.id}`])
  } 

}
