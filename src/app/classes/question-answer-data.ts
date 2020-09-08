import { QuestionAnswerdataInterface } from './../interface/question-answer-interface';
export class QuestionAnswerData implements QuestionAnswerdataInterface{
    /**
     * This Class is to carry the question,
     * its id, answer given respective to that question
     * and id of answer.
     * @param questions contains the question in String format
     * @param question_id contains the id of that question
     * @param answers contains thr answer in String format
     * @param answer_id contains thr id of the answer to that particular question
     */
    questions: string;
    question_id: number;
    answers: string;
    answer_id: number;

    constructor(questions: string, question_id: number, answers: string, answer_id: number){
        this.questions = questions;
        this.question_id = question_id;
        this.answers = answers;
        this.answer_id = answer_id;
    }
}
