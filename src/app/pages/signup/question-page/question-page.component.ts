import { QuestionAnswer } from './../../../classes/question-answer';
import { ActorName } from './../../../classes/actor-name';
import { Router } from '@angular/router';
import { ResponseJson } from './../../../classes/response-json';
import { QuestionResponse } from './../../../interface/question-response';
import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Datum } from 'src/app/interface/question';
import { QuestionAnswerData } from 'src/app/classes/question-answer-data';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss'],
})
export class QuestionPageComponent implements OnInit {

  questionsResponse: QuestionResponse;
  buttonValue = 1;
  minutes = 0;
  searchValue: string = "";
  answerRecorded: string;
  answerIdRecorded: number;

  // Values that can be altered to jump quesitons
  questionNumber = 0;
  recommendationCheck = false;

  constructor(private SearchService: SearchService, private router: Router) {
    this.questionsResponse = {} as QuestionResponse;
    this.questionsResponse.response = [];
    this.questionsResponse.locale = "en";
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

    /**
     * This snippet of "if" just repeats until all questions
     * have been gone through.
     * Selected answers recording for re-display on result page 
     */
    if (this.questionNumber <= 6) {
      if (this.questions[this.questionNumber].question_id != 2 && this.questions[this.questionNumber].question_id != 16 &&
        this.questions[this.questionNumber].question_id != 18 && this.questions[this.questionNumber].question_id != 17 &&
        this.questions[this.questionNumber].question_id != 19) {
          this.questionAnswerResponses.questionAnswersData.push(new QuestionAnswerData(this.questions[this.questionNumber].text,
            this.questions[this.questionNumber].question_id, this.answerRecorded, this.answerIdRecorded));
          console.log("Response Recorded: ", JSON.stringify(this.questionAnswerResponses.questionAnswersData));
      }

      this.questionNumber += 1;
      this.buttonValue = 1;
    }

    // THIS PART SENDS THE QUESTIONS RESPONSE TO SERVER
    if (this.questionNumber == 7) {
      console.log("question response: ", this.questionsResponse);
      console.log(this.SearchService.postResponseForRecommendation(this.questionsResponse).subscribe((result: any) => {
        console.log("result from upload: ", result);



        this.recommendationCheck = true;

      this.SearchService.getRecommendation().subscribe((result: any) => {
        console.log("GOT RESULT: ", result);
        this.recommendationReturned = JSON.parse(result.data);
        console.log("Recommendation RETURNED: ", this.recommendationReturned);

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
        // console.log("First Recommendation: ", this.firsRecommendation);
        // console.log("recommendation list: ", this.listOfRecommendations);
        localStorage.setItem("listOfRecommendation", JSON.stringify(this.listOfRecommendations));
      });

      }));
      

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

  questionAnswerResponses: QuestionAnswer = new QuestionAnswer();
  /**
   * This function records MOVIE RECOMMENDATION question responses
   * from user, Questions Response for submiting response to Backend
   * @param buttonValue carries the interger value for chaning the highlighted button
   * @param questionNumber carries the current question number
   * @param question_id this is the id of the question provided by the backend
   * @param answer_id this is the id of the answer provided by the backend
   * @param question this carries the question provided by the backend
   * @param answer this carries the answer provided by the backend
   */
  recordQuestionResponse(buttonValue: number, questionNumber: number, question_id: number, answer_id: number, question: string, answer: string) {
    this.questionsResponse.response[questionNumber].answer_id = answer_id;
    this.questionsResponse.response[questionNumber].question_id = question_id;
    this.questionsResponse.response[questionNumber].extra = null;
    this.buttonValue = buttonValue;

    this.answerRecorded = answer;
    this.answerIdRecorded = answer_id;
  }

  actorNameList: ActorName[];
  dropDownClose: boolean = true;
  searchFreeText(buttonValue: number) {
    if (this.searchValue != "") {
      /**
       * this part handles ACTOR SEARCH, searching api
       * 'en' id is 18
       * 'es' id is
       */
      if (this.questions[this.questionNumber].question_id === 18) {
        this.SearchService.getActorName(this.searchValue).subscribe((data: any) => {
          this.actorNameList = JSON.parse(data.data);
          this.dropDownClose = false;
          // console.log("actor name list: ",this.actorNameList);
        });
      }
      /**
       * this part handles TAG SEARCH, searching api
       * 'en' id is 16
       * 'es' id is
       */
      if (this.questions[this.questionNumber].question_id === 16) {
        this.SearchService.getTag(this.searchValue).subscribe((data: any) => {
          this.actorNameList = JSON.parse(data.data);
          this.dropDownClose = false;
          // console.log("actor name list: ",this.actorNameList);
        })
      }

      this.buttonValue = buttonValue;
    }
  }

  recordFreeText(questionNumber: number, actorId: number, actorName: string) {
    if (this.searchValue != "") {
      this.dropDownClose = true;
      this.questionsResponse.response[questionNumber].question_id = this.questions[questionNumber].question_id;
      this.questionsResponse.response[questionNumber].answer_id = null;
      this.questionsResponse.response[questionNumber].extra = actorId.toString();
      this.searchValue = actorName;

      // console.log("recorded response: ",this.questionsResponse.response[questionNumber].extra);
      // console.log("search value: ",this.searchValue);
    }
  }

  questions: Datum[];
  getQuestions() {
    this.SearchService.getQuestion().subscribe((result: any) => {
      this.questions = JSON.parse(result.data);

      // console.log(this.questions[3].text);
      // console.log(this.questions[3].answers[0].answer_id);
      // console.log("length ",this.questions[3].answers.length);
      console.log("questions: ", this.questions);
    });
  }
}