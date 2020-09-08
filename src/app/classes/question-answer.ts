import { QuestionAnswerData } from './question-answer-data';
import { QuestionAnswerInterface } from './../interface/question-answer-interface';
export class QuestionAnswer implements QuestionAnswerInterface{
    /** 
     * This Class provides an array that can save
     * data on Questions and Answers from the MOVIE RECOMMENDATION SYSTEM
     * @param QuestionAnswerdataInterface this is the type of array variable
     */
    questionAnswersData: QuestionAnswerData [];

    constructor(){
        this.questionAnswersData = [];
    }
}
