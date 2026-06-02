/**
 * @callback NextQuestionCallback
 * @param {QuestionType} question
 * @returns {void}
 * 
 * @callback FinishCallback
 * @param {string[]} resultArray
 * @returns {void}
 */

import { QuestionType } from "./questiontype.js";

class SelectManager{
    /**
     * @type {number}
     */
    #questionNumber;

    /**
     * @type {QuestionType[]}
     */
    #questions;

    /**
     * @type {boolean[]}
     */
    #questionAnswers;

    /**
     * @type {NextQuestionCallback}
     */
    #nextQuestionCallback;

    /**
     * @type {FinishCallback}
     */
    #finishCallback;

    /**
     * 
     * @param {QuestionType[]} questions 
     */
    constructor(questions) {
        this.#questions = questions;
    }

    /**
     * @returns {void}
     */
    play() {
        this.#questionNumber = 0;
        this.#questionAnswers = [];
        if (this.#nextQuestionCallback && this.#questions.length > 0) {
            this.#nextQuestionCallback(this.#questions[this.#questionNumber])
        }
    }

    /**
     * @returns {void}
     */
    reset() {
        this.play();
    }

    /**
     * 
     * @param {boolean} answer
     * @returns {void} 
     */
    nextQuestion(answer) {
        this.#questionAnswers.push(answer);
        this.#questionNumber++;
        
        if (this.#questionNumber < this.#questions.length && this.#nextQuestionCallback) {
            this.#nextQuestionCallback(this.#questions[this.#questionNumber])
        } else if (this.#finishCallback) {
            const results = [];
            for (let i = 0; i <this.#questions.length; i++){
                results.push({
                    question: this.#questions[i].question,
                    selected: this.#questionAnswers[i],
                    rightAnswer: this.#questions[i].valid
                });
            }
            this.#finishCallback(results);
        }
    }

    /**
     * @param {NextQuestionCallback} value
     */
    set nextQuestionCallback(value) {
        this.#nextQuestionCallback = value;
    }

    /**
     * @param {FinishCallback} value
     */
    set finishCallback(value) {
        this.#finishCallback = value;
    }
}

export {SelectManager}