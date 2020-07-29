export interface Datum {
    question_id: number;
    text:        string;
    value:       number;
    group:       number;
    answers:     Answer[] | null;
}

export interface Answer {
    text:      string;
    value:     number;
    answer_id: number;
}