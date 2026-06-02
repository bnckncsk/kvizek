import { QuizManager } from "./quizmanager.js";

class View extends QuizManager{
    /**
     * @type {QuizManager}
     */
    #manager;

    /**
     * @type {HTMLDivElement}
     */
    #container;

    /**
     * @param {QuizManager} manager 
     */
    constructor(manager) {
        super(manager);
        this.#manager = manager;

        const container = document.createElement("div");
        this.#container = container;

        this.#manager.nextQuestionCallback = (question) => {
            container.innerText = "";
            
            const questionDiv = document.createElement("div");
            questionDiv.classList.add("question");

            const span = document.createElement("span");
            span.innerText = question.question;
            questionDiv.appendChild(span);

            const answersDiv = document.createElement("div");
            answersDiv.classList.add("answers");

            for (const answer of question.answers) {
                const button = document.createElement("button");
                button.innerText = answer;
                button.addEventListener("click", () => {
                    this.#manager.nextQuestion(answer);
                });
                answersDiv.appendChild(button);
            }

            questionDiv.appendChild(answersDiv);
            this.#container.appendChild(questionDiv);
        };

        this.#manager.finishResultCallback = (result) => {
            this.#container.innerText = "";

            const resultDiv = document.createElement("div");
            resultDiv.classList.add("result");
            resultDiv.innerText = result;
            this.#container.appendChild(resultDiv);
        };
    }

    /**
     * 
     * @param {HTMLElement} parent 
     */
    appendTo(parent) {
        parent.appendChild(this.#container);
    }
}

export {View}