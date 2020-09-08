export interface QuestionResponse {
    response: Array<Response>;
    locale: string;
}

export interface Response {
    question_id: number;
    answer_id:   number | null;
    extra:       string;
}