import { QuestionType } from "./questiontype.js";
import { SelectManager } from "./selectmanager.js";
import { ViewElement } from "./viewelement.js";
import data from './data.json' with {type:'json'};

const questions = [];
for (let i = 0; i < data.questions.length; i++ ){
    questions.push(new QuestionType(data.questions[i].question, data.questions[i].valid));
}

const manager = new SelectManager(questions);
const view = new ViewElement(manager);
view.appendTo(document.body);

manager.play();