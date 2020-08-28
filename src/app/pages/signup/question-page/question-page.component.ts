import { Router } from '@angular/router';
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
  questionNumber = 0;
  minutes = 0;
  numberOfQuestionsAnswered = [];
  numberOfQuestionsAnsweredCount = 0;
  questionsOfnumberOfQuestionsAnswered = [];
  answersOfnumberOfQuestionsAnswered = [];
  searchValue: string = null;
  recommendationCheck = false;

  constructor(private SearchService: SearchService, private router: Router) {
    this.questionsResponse = {} as QuestionResponse;
    this.questionsResponse.response = [];
    for (let index = 0; index < 7; index++) {
      this.questionsResponse.response.push(new ResponseJson);
    }
    //  console.log(this.questionsResponse);
  }

  ngOnInit() {
    this.getQuestions();
  }
  recommendationReturned = [];
  listOfRecommendations = [];
  temporaryNumber: number = null;
  firsRecommendation: number = null;
  recommendationIterationIndex: number = 0;
  nextQuestionNumber(question: Datum) {
    if (this.questionNumber <= 6) {
      this.questionNumber += 1;
      this.buttonValue = 1;
    }

    // THIS PART SENDS THE QUESTIONS RESPONSE TO SERVER
    if (this.questionNumber == 7) {
      // console.log("question response: ",this.questionsResponse);
      console.log(this.SearchService.postResponseForRecommendation(this.questionsResponse).subscribe((result: any) => {
        console.log("result from upload: ", result);
      }));
      this.recommendationCheck = true;

      this.SearchService.getRecommendation().subscribe((result: any) => {
        // console.log("GOT RESULT: ", result);
        this.recommendationReturned = JSON.parse(result.data);
        // console.log("Recommendation RETURNED: ", this.recommendationReturned);

        for (let index = 0; index < this.recommendationReturned.length; index++) {
          // const element = this.recommendationReturned[index];
          // console.log("element",element);
          if (this.recommendationReturned[index] != ',') {
            // this.temporaryNumber = this.temporaryNumber * 10;
            const num: number = this.recommendationReturned[index];
            if (this.temporaryNumber === null) {
              this.temporaryNumber = num;
            } else {
              this.temporaryNumber = this.temporaryNumber + num;
            }

            // console.log("temporary number", this.temporaryNumber);
          } else {
            this.listOfRecommendations.push(this.temporaryNumber);
            if (this.recommendationIterationIndex == 0) {
              this.firsRecommendation = this.temporaryNumber;
            }
            this.temporaryNumber = null;
            this.recommendationIterationIndex += 1;
          }
        }
        console.log("First Recommendation: ", this.firsRecommendation);
        console.log("recommendation list: ", this.listOfRecommendations);
        localStorage.setItem("listOfRecommendation", JSON.stringify(this.listOfRecommendations));
      });

    }

    // console.log("questions of number of question answered: ", this.questionsOfnumberOfQuestionsAnswered);
    // console.log("answers of number of question answered: ", this.answersOfnumberOfQuestionsAnswered);
    // console.log("question number: ",this.questionNumber);
    // console.log("current question: ",question);
    // console.log("response: ", this.questionsResponse);
  }

  viewRecommendations() {
    this.router.navigate(['premium/premium-recommendation-page', this.firsRecommendation]);
  }

  sliderRangeUpdate(buttonValue: number, questionNumber: number, question_id: number) {
    this.buttonValue = buttonValue;
    this.questionsResponse.response[questionNumber].question_id = question_id;
    this.questionsResponse.response[questionNumber].extra = null;
    if (this.minutes >= 0 && this.minutes <= 90) {
      this.questionsResponse.response[questionNumber].answer_id = 1;
    }
    else if (this.minutes >= 91 && this.minutes <= 120) {
      this.questionsResponse.response[questionNumber].answer_id = 4;
    }
    else if (this.minutes >= 121 && this.minutes <= 180) {
      this.questionsResponse.response[questionNumber].answer_id = 5;
    }
    else if (this.minutes >= 180) {
      this.questionsResponse.response[questionNumber].answer_id = 7;
    }
    // console.log("minutes: ",this.minutes);
    // console.log(this.questionsResponse);
  }

  recordQuestionResponse(buttonValue: number, questionNumber: number, question_id: number, answer_id: number, question: string, answer: string) {
    this.questionsResponse.response[questionNumber].answer_id = answer_id;
    this.questionsResponse.response[questionNumber].question_id = question_id;
    this.questionsResponse.response[questionNumber].extra = null;
    this.buttonValue = buttonValue;

    this.questionsOfnumberOfQuestionsAnswered.push(question);
    this.answersOfnumberOfQuestionsAnswered.push(answer);
    this.numberOfQuestionsAnswered.push(this.numberOfQuestionsAnsweredCount);
    this.numberOfQuestionsAnsweredCount++;
    // console.log(this.questionsResponse.response[1]);
    // console.log("value", questionNumber);
    // console.log(this.questionsResponse);
  }

  recordFreeText(buttonValue: number, questionNumber: number, question_id: number) {
    if (this.searchValue != null) {
      this.buttonValue = buttonValue;
      this.questionsResponse.response[questionNumber].question_id = question_id;
      this.questionsResponse.response[questionNumber].answer_id = null;
      this.questionsResponse.response[questionNumber].extra = this.searchValue;
      this.searchValue = null;
      // console.log("question response: ",this.questionsResponse);
    }
  }

  questions: Datum[];
  getQuestions() {
    this.SearchService.getQuestion().subscribe((result: any) => {
      this.questions = JSON.parse(result.data);
      // console.log(this.questions[3].text);
      // console.log(this.questions[3].answers[0].answer_id);
      // console.log("length ",this.questions[3].answers.length);
      // console.log("questions: ",this.questions);
    });
  }
}