import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../orders.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent  implements OnInit {
  @Input() question: Question = {question: null, answer: null};

  constructor() { }

  ngOnInit() {}

  setQuestion(e: Event) {
    this.question.question = (e.target as HTMLTextAreaElement).value;
  }

  send() {
    console.log(this.question.question)
  }

}
