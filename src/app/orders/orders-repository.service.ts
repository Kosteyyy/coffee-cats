import { Injectable } from "@angular/core";
import { Order, Question } from "./orders.model";
import { BehaviorSubject, map, of } from "rxjs";
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
        // return of(
        //     new Order({
        //         id: "3",
        //         celery_status: "processing",
        //         celery_task: "Новая задача",
        //         date: "2023-04-12",
        //         description: "Эта задача кому надо задача...",
        //         questions: [
        //             {
        //                 question: "Задаю вопрос",
        //                 answer: "Получаю ответ",
        //                 conference_id: "3",
        //                 id: "10",
        //             },
        //         ],
        //         stenogram: `Заседание №1: Введение   Председатель: Уважаемые коллеги, мы начинаем наше заседание! Сегодня мы обсудим ряд важных вопросов, связанных с нашей работой. Надеюсь, что все присутствующие готовы активно участвовать в обсуждении. Коллега 1: Да, конечно, я готов!
        // Коллега 2: Я тоже здесь, чтобы помочь!
        // Председатель: Отлично! Тогда начнем с первого вопроса. Вопрос №1: Что такое “шуточное заседание”?
        // Коллега 3: Это когда мы все вместе смеемся и шутим!
        // (Смех в зале)
        // Председатель: Хорошо, это было забавно. Но давайте все же попытаемся дать более серьезное определение. Вопрос №2: Какие правила должны соблюдаться на шуточном заседании?
        // Коллега 4: На шуточном заседании можно нарушать все правила!
        // (Бурные аплодисменты)
        // Председатель: Замечательно! А теперь давайте перейдем к вопросу №3: Как мы можем улучшить нашу работу на шуточном заседании?
        // Коллега 5: Мы можем придумать новые шутки и смешные истории!
        // Председатель: Отличная идея! Но давайте не забывать о том, что наша главная задача - это все же работа.`,
        //         topic: "Тема встречи самая обычная",
        //         file: "fileName_example",
        //     })
        // );
        return this.http.get<any>(url);
    }

    getQuestion$(id: string) {
        // const url = environment.baseUrl + "/orders/" + id.toString();
        const url = environment.baseUrl + "/get_question/" + id.toString();
        return this.http.get<Question>(url);
    }

    postQuestion$(conference_id: string, question: string) {
        const url = environment.baseUrl + "/quests";
        return this.http.post<any>(url, {conference_id, question});
    }

    getFirstSummary$(order_id: string) {
        
        console.log("🚀 ~ OrdersRepositoryService ~ order_id:", order_id)
        return of("Это стенограмма полученная после первого вопроса!!!")
    }
}
