/**
 * @callback NextQuestionCallback
 * @param {QuestionType} question
 * @returns {void}
 * 
 * @callback FinishResultCallback
 * @param {string} result
 * @returns {void}
 */

import { QuestionType } from "./questiontype.js";

class QuizManager{
    /**
     * @type {number}
     */
    #currentQuestionNumber;

    /**
     * @type {QuestionType[]}
     */
    #questions;

    /**
     * @type {string[]}
     */
    #questionAnswers;

    /**
     * @type {NextQuestionCallback}
     */
    #nextQuestionCallback;

    /**
     * @type {FinishResultCallback}
     */
    #finishResultCallback;

    /**
     * @param {QuestionType} questions 
     */
    constructor(questions) {
        this.#questions = questions;
        this.#currentQuestionNumber = 0;
        this.#questionAnswers = [];
    }

    /**
     * @returns {void}
     */
    startQuiz() {
        const current = this.#questions[this.#currentQuestionNumber];
        this.#nextQuestionCallback({
            question: current.question,
            answers: current.answers
        });
    }

    /**
     * @param {string} answer
     * @returns {void}
     */
    nextQuestion(answer) {
        this.#questionAnswers.push(answer);

        if (this.#currentQuestionNumber < this.#questions.length - 1) {
            this.#currentQuestionNumber++;
            const current = this.#questions[this.#currentQuestionNumber];
            this.#nextQuestionCallback({
                question: current.question,
                answers: current.answers
            });
        } else {
            let correct = 0;
            for (let i = 0; i < this.#questions.length; i++) {
                if (this.#questionAnswers[i] === this.#questions[i].rightAnswer) {
                    correct++;
                }
            }
            this.#finishResultCallback(`Ennyit sikerült eltalálni: ${correct}/${this.#questions.length}`);
        }
    }

    /**
     * @param {NextQuestionCallback} value
     * @returns {void}
     */
    set nextQuestionCallback(value) {
        this.#nextQuestionCallback = value;
    }

    /**
     * @param {FinishResultCallback} value
     * @returns {void}
     */
    set finishResultCallback(value) {
        this.#finishResultCallback = value;
    }
}

export {QuizManager}