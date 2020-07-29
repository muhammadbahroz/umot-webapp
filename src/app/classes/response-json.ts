import { Response } from './../interface/question-response';
export class ResponseJson implements Response{
    question_id: number;
    answer_id:   number | null;
    extra:       string;

    constructor(){
        this.question_id = -1;
        this.answer_id = null;
        this.extra = "";
    }
}
