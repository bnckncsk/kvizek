import {QuizManager} from "./quizmanager.js";
import {View} from "./view.js";
import data from "./data.json" with {type: "json"};

const manager = new QuizManager(data.questions);
const view = new View(manager);

view.appendTo(document.body);
manager.startQuiz();