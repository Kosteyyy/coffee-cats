import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OrdersRepositoryService } from "../orders-repository.service";
import { Order, OrderStatus } from "../orders.model";
import { filter, interval, switchMap, take, tap } from "rxjs";

@Component({
    selector: "app-order",
    templateUrl: "./order.component.html",
    styleUrls: ["./order.component.scss"],
})
export class OrderComponent implements OnInit {
    statusColor: { [key in OrderStatus]: string } = {
        завершено: "success",
        ожидание: "medium",
        "в процессе": "warning",
    };

    // statusDict: { [key in OrderStatus]: string } = {
    //     complete: "Завершено",
    //     delayed: "Отложено",
    //     processing: "В обработке",
    // };
    id: string | null = null;
    order: Order | null = null;
    newQuestion: string = "";

    firstSummary: string = ""

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
        if(this.order?.questions.length === 0) this.tryGetFirstSummary();
        this.orderService.postQuestion$(this.order?.id || "", this.newQuestion).pipe(
            tap(val => console.log("Question sent: ", val))
        ).subscribe(val => {
            if(val) {
                this.order?.questions.push(val);
                this.newQuestion = "";
                console.log(this.textArea.nativeElement.value);
                this.textArea.nativeElement.value = "";
            }
        })
        
    }

    tryGetFirstSummary() {
        if (!this.order?.id) return;
        const checkInterval = 5000;
        interval(checkInterval)
            .pipe(
                switchMap((val) =>
                    this.orderService.getFirstSummary$(this.order?.id as string)
                ),
                filter((val) => {
                    return val ? true : false;
                }),
                take(1)
            )
            .subscribe((summary) => {
                this.firstSummary = summary;
            });
    }


}
