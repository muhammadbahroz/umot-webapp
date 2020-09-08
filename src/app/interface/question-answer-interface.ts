// THE PURPOSE OF THIS INTERFACE IS TO PROVIDE WITH
// A MODEL TO SAVE QUESTIONS AND  ANSWERS RESPONSE GIVEN 
// BY USER
export interface QuestionAnswerInterface {
    /** 
     * This Interface provides an array that can save
     * data on Questions and Answers from the MOVIE RECOMMENDATION SYSTEM
     * @param QuestionAnswerdataInterface this is the type of array variable
     */
    questionAnswersData: QuestionAnswerdataInterface [];
    
}

export interface QuestionAnswerdataInterface{
    /**
     * This Interface is to carry the question,
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
}
