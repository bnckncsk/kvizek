import { QuestionType } from "./questiontype.js";
import {SelectManager} from "./selectmanager.js"

class PlayArea {
    /**
     * @type {HTMLDivElement}
     */
    #div;

    /**
     * @type {SelectManager}
     */
    #manager;

    /**
     * @param {SelectManager} manager 
     */
    constructor(manager) {
        this.#manager = manager;
        this.#div = document.createElement('div');
    }

    get manager() {
        return this.#manager;
    }

    get div() {
        return this.#div;
    }

    /**
     * 
     * @param {HTMLElement} parent 
     */
    replaceContent(parent) {
        parent.innerText = "";
        parent.appendChild(this.#div);
    }
}

class CardArea extends PlayArea{
    /**
     * 
     * @param {SelectManager} manager 
     * @param {QuestionType[]} question 
     */
    constructor(manager, question) {
        super(manager);

        const igaz = document.createElement('button');
        igaz.textContent = question.question;
        igaz.classList.add('card-true');
        igaz.addEventListener('click', () => this.manager.nextQuestion(true))

        const hamis = document.createElement('button');
        hamis.textContent = question.question;
        hamis.classList.add('card-false');
        hamis.addEventListener('click', () => this.manager.nextQuestion(false))

        this.div.appendChild(igaz);
        this.div.appendChild(hamis);
    }
}

class ResultArea extends PlayArea {
    /**
     * 
     * @param {SelectManager} manager 
     * @param {string[]} results 
     */
    constructor(manager, results) {
        super(manager);

        let correctAnswers = 0;

        for (let i = 0; i < results.length; i++) {
            const result = results[i];

            const correct = result.selected == result.rightAnswer 

            if (correct) {
                correctAnswers++;
            }

            const div = document.createElement('div');
            div.classList.add(correct ? 'green-bg' : 'red-bg');

            const selectedLabel  = result.selected ? 'igaz' : 'hamis';
            const response = correct ? 'Helyes' : 'Helytelen';

            div.innerText = `${result.question} ${response} válasz ${selectedLabel}`;
            this.div.appendChild(div);
        }

        const score = document.createElement('p');
        score.innerText = `${results.length}/${correctAnswers} helyes`
        this.div.appendChild(score);

        const restart = document.createElement('button');
        restart.innerText = "Újrakezdés";
        restart.addEventListener('click', () => this.manager.reset());
        this.div.appendChild(restart);
    }
}

export {PlayArea, ResultArea, CardArea}