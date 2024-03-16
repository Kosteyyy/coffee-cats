export type OrderStatus = 'delayed' | 'processing' | 'complete';
export type Question = { question: string | null, answer?: string | null};
export type Topic = any;
export type Stenogram = any;
export class Order {
    id: string;
    celery_status: OrderStatus;
    celery_task: string;
    date: string;
    description: string;
    file: string;
    questions: Question[];
    stenogram: Stenogram;
    topic: Topic;
    constructor(order: { id: string, celery_status: OrderStatus, celery_task: string, date: string, file: string, description: string, questions: Question[], stenogram: Stenogram, topic: Topic }) {
        this.id = order.id;
        this.celery_status = order.celery_status;
        this.celery_task = order.celery_task;
        this.date = order.date;
        this.file = order.file;
        this.description = order.description;
        this.questions = order.questions;
        this.stenogram = order.stenogram;
        this.topic = order.topic;
    }
}