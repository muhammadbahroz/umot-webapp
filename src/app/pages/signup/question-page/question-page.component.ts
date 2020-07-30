import { ResponseJson } from './../../../classes/response-json';
import { QuestionResponse } from './../../../interface/question-response';
import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Datum } from 'src/app/interface/question';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss'],
})
export class QuestionPageComponent implements OnInit {

  questionsResponse: QuestionResponse;
  buttonValue = 1;
  questionNumber = 9;
  minutes = 0;
  searchValue: string = null;

  constructor(private SearchService: SearchService) {
    this.questionsResponse = {} as QuestionResponse;
    this.questionsResponse.response = [];
    for (let index = 0; index < 9; index++) {
      this.questionsResponse.response.push(new ResponseJson);
   }
  //  console.log(this.questionsResponse);
  }

  ngOnInit() {
    this.getQuestions();
  }

  nextQuestionNumber(question: Datum){
    if (this.questionNumber <= 8) {
      this.questionNumber+=1;
      this.buttonValue = 1;
    }

    if (this.questionNumber == 9) {
      console.log(this.SearchService.postResponseForRecommendation(this.questionsResponse).subscribe((result: any) => {
        console.log( "result from upload: ",result);}));
    }
    // console.log("question number: ",this.questionNumber);
    // console.log("current question: ",question);
    // console.log("response: ", this.questionsResponse);
  }

  sliderRangeUpdate(buttonValue: number, questionNumber: number, question_id: number)
  {
    this.buttonValue = buttonValue;
    this.questionsResponse.response[questionNumber].question_id = question_id;
    this.questionsResponse.response[questionNumber].extra = null;
    if (this.minutes >= 0 && this.minutes <= 90) {
      this.questionsResponse.response[questionNumber].answer_id = 1;
    }
    else if(this.minutes >= 91 && this.minutes <= 120){
      this.questionsResponse.response[questionNumber].answer_id = 4;
    }
    else if(this.minutes >= 121 && this.minutes <= 180){
      this.questionsResponse.response[questionNumber].answer_id = 5;
    }
    else if(this.minutes >= 180){
      this.questionsResponse.response[questionNumber].answer_id = 7;
    }
    // console.log("minutes: ",this.minutes);
    console.log(this.questionsResponse);
  }

  recordQuestionResponse(buttonValue: number, questionNumber: number, question_id: number, answer_id: number){
    this.questionsResponse.response[questionNumber].answer_id = answer_id;
    this.questionsResponse.response[questionNumber].question_id = question_id;
    this.questionsResponse.response[questionNumber].extra = null;
    this.buttonValue = buttonValue;
    // console.log(this.questionsResponse.response[1]);
    // console.log("value", questionNumber);
    console.log(this.questionsResponse);
  }

  recordFreeText(buttonValue: number, questionNumber: number, question_id: number){
    if (this.searchValue != null) {
      this.buttonValue = buttonValue;
      this.questionsResponse.response[questionNumber].question_id = question_id;
      this.questionsResponse.response[questionNumber].answer_id = null;
      this.questionsResponse.response[questionNumber].extra = this.searchValue;
      this.searchValue = null;
      console.log(this.questionsResponse); 
    }
  }

  questions: Datum[];
  getQuestions(){
    this.SearchService.getQuestion().subscribe((result: any) => {
      this.questions = JSON.parse(result.data);
      // console.log(this.questions[3].text);
      // console.log(this.questions[3].answers[0].answer_id);
      // console.log("length ",this.questions[3].answers.length);
      console.log("questions: ",this.questions);
    });
  }
}