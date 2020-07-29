export interface QuestionResponse {
    response: Array<Response>;
}

export interface Response {
    question_id: number;
    answer_id:   number | null;
    extra:       string;
}