import { Component, Input, OnInit } from "@angular/core";
import { Question } from "../orders.model";
import { filter, interval, switchMap, take } from "rxjs";
import { OrdersRepositoryService } from "../orders-repository.service";

@Component({
    selector: "app-question",
    templateUrl: "./question.component.html",
    styleUrls: ["./question.component.scss"],
})
export class QuestionComponent implements OnInit {
    @Input() question: Question = {
        question: null,
        answer: null,
        conference_id: "",
    };

    constructor(private orderSrv: OrdersRepositoryService) {}

    ngOnInit() {
        if (this.question.question && !this.question.answer) {
            this.startCheckingForAnswer();
        }
    }

    startCheckingForAnswer() {
        if (!this.question.id) return;
        const checkInterval = 5000;
        interval(checkInterval)
            .pipe(
                switchMap((val) =>
                    this.orderSrv.getQuestion$(this.question.id as string)
                ),
                filter((val) => {
                    return val.answer ? true : false;
                }),
                take(1)
            )
            .subscribe((question) => {
                this.question.answer = question.answer;
            });
    }
}
