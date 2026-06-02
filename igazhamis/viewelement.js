
import {CardArea, ResultArea} from "./playarea.js"
import {SelectManager} from "./selectmanager.js"

class ViewElement{
    /**
     * @type {SelectManager}
     */
    #manager;

    /**
     * @type {HTMLDivElement}
     */
    #container;

    /**
     * 
     * @param {SelectManager} manager 
     */
    constructor(manager){
        this.#manager = manager;

        this.#container = document.createElement('div');

        const header = document.createElement('div');
        const igaz = document.createElement('span');
        igaz.innerText = 'Igaz';
        igaz.classList.add('green-bg');
        
        const or = document.createElement('span');
        or.innerText = " vagy "

        const hamis = document.createElement('span');
        hamis.classList.add('red-bg');
        hamis.innerText = 'Hamis';

        header.appendChild(igaz);
        header.appendChild(or)
        header.appendChild(hamis);

        const playarea = document.createElement('div');

        this.#container.appendChild(header);
        this.#container.appendChild(playarea);

        manager.nextQuestionCallback = (question) => {
            const cards = new CardArea(manager, question);
            cards.replaceContent(playarea);
        };

        manager.finishCallback = (results) => {
            const result = new ResultArea(manager, results);
            result.replaceContent(playarea);
        }
    }

    /**
     * 
     * @param {HTMLElement} parent 
     */
    appendTo(parent) {
        parent.appendChild(this.#container);
    }
}

export { ViewElement }