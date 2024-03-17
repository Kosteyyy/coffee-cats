import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OrdersRepositoryService } from "../orders-repository.service";
import { Order, OrderStatus } from "../orders.model";

@Component({
    selector: "app-order",
    templateUrl: "./order.component.html",
    styleUrls: ["./order.component.scss"],
})
export class OrderComponent implements OnInit {
    statusColor: { [key in OrderStatus]: string } = {
        complete: "success",
        delayed: "medium",
        processing: "warning",
    };

    statusDict: { [key in OrderStatus]: string } = {
        complete: "Завершено",
        delayed: "Отложено",
        processing: "В обработке",
    };
    id: string | null = null;
    order: Order | null = null;
    newQuestion: string = "";

    @ViewChild("textArea") textArea: ElementRef = {} as ElementRef;

    constructor(
        private route: ActivatedRoute,
        private orderService: OrdersRepositoryService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get("id");
        if (this.id) {
            this.orderService.getOrder$(this.id).subscribe((order) => {
                this.order = order ? new Order(order) : null;
            });
        }
    }

    close() {
        this.router.navigate(["/home"]);
    }

    setQuestion(e: Event) {
        this.newQuestion = (e.target as HTMLTextAreaElement).value;
    }

    send() {
        console.log(this.newQuestion);
        this.order?.questions.push({
            question: this.newQuestion,
            conference_id: this.order.id,
            id: "",
        });
        this.newQuestion = "";
        console.log(this.textArea.nativeElement.value);
        this.textArea.nativeElement.value = "";
    }
}
