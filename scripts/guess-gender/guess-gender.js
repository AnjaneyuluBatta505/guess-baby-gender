import {questions} from "./questions_en.js"
import {
  // getGenderInfoTemplate,
  getQuizQuestionTemplate,
  getQuizContainerTemplate,
  getQuizResultTemplate,
} from "./templates.js";

export class GenderQuiz {
  constructor(element, questions = []) {
    this.root = element;
    this.questions = questions;
    this.index = 0;
    this.answers = [];
    this.renderContainer();
    this.renderQuestion();
  }

  renderContainer() {
    this.root.innerHTML = getQuizContainerTemplate();
    this.stage = this.root.querySelector(".gq-stage");
    this.progressBar = this.root.querySelector(".gq-bar");
  }

  updateProgress() {
    const percent = (this.index / this.questions.length) * 100;
    this.progressBar.style.width = percent + "%";
  }

  renderQuestion() {
    this.updateProgress();

    const q = this.questions[this.index];
    this.stage.innerHTML = getQuizQuestionTemplate(
      q,
      this.index,
      this.questions.length
    );

    this.stage.querySelectorAll(".gq-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.answers[this.index] = JSON.parse(btn.dataset.value);
        this.next();
      });
    });

    const prevBtn = this.stage.querySelector(".gq-prev");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => this.prev());
    }
  }

  next() {
    if (this.index < this.questions.length - 1) {
      this.index++;
      this.renderQuestion();
    } else {
      this.showResult();
    }
  }

  prev() {
    if (this.index > 0) {
      this.index--;
      this.renderQuestion();
    }
  }

  showResult() {
    // Simple scoring: majority wins
    const boyCount = this.answers.filter((x) => x.boy === 1).length;
    const girlCount = this.answers.filter((x) => x.girl === 1).length;

    const result = boyCount > girlCount ? "boy" : "girl";

    this.stage.innerHTML = getQuizResultTemplate(result);

    this.stage.querySelector(".gq-restart").addEventListener("click", () => {
      this.index = 0;
      this.answers = [];
      this.renderQuestion();
    });

    this.progressBar.style.width = "100%";
  }
}

export class GuessBabyGender {
  constructor(target) {
    this.target = target;
    this.init();
  }

  init() {
    // this.target.innerHTML = getGenderInfoTemplate();
    this.bindGenderGuessBtnClick();
  }

  bindGenderGuessBtnClick() {
    const btn = this.target.querySelector(".guess-btn");
    btn.addEventListener("click", this.renderGuessBabyGenderQuiz.bind(this));
  }

  renderGuessBabyGenderQuiz() {
    new GenderQuiz(this.target, questions)
  }
}

export function initGuessBabyGender() {
  const target = document.querySelector(".gbg-target");
  new GuessBabyGender(target);
}
