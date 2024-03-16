import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { IonicModule } from '@ionic/angular';
import { OrderListItemComponent } from './order-list-item/order-list-item.component';
import { OrderComponent } from './order/order.component';
import { OrdersRepositoryService } from './orders-repository.service';
import { QuestionComponent } from './question/question.component';



@NgModule({
  declarations: [OrdersComponent, OrderListItemComponent, OrderComponent, QuestionComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [OrdersComponent],
  providers: [OrdersRepositoryService]
})
export class OrdersModule { }
