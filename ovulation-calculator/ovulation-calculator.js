function getOvulationTemplate() {
  return '\n    <div class="gbg-card">\n      <h1>Ovulation Calendar</h1>\n      <p class="gbg-subtitle">\n        Estimate your fertile window and ovulation day\n      </p>\n\n      <div class="gbg-field">\n        <label>First Day of Last Period</label>\n        <input type="date" id="lastPeriod">\n      </div>\n\n      <div class="gbg-field">\n        <label>Average Cycle Length (days)</label>\n        <input type="number" id="cycleLength" value="28" min="21" max="40">\n      </div>\n\n      <div class="gbg-field">\n        <label>Period Length (days)</label>\n        <input type="number" id="periodLength" value="5" min="3" max="10">\n      </div>\n\n      <button id="calculateOvulation" class="gbg-btn">\n        Calculate Ovulation\n      </button>\n\n      <div id="result" class="gbg-result"></div>\n\n      <div class="disclosure">\n        <strong>Medical Disclaimer</strong>\n        <p>\n          This ovulation calendar provides estimates based on average cycle data.\n          It is not a substitute for medical advice or fertility testing.\n        </p>\n        <p>\n          Ovulation timing can vary due to stress, illness, or hormonal changes.\n          Consult a healthcare provider for personalized guidance.\n        </p>\n      </div>\n    </div>\n  ';
}
class OvulationCalculator {
  constructor(e) {
    (this.container = document.querySelector(e)),
    //   this.render(),
      this.bindEvents();
  }
//   render() {
//     this.container.innerHTML = getOvulationTemplate();
//   }
  bindEvents() {
    this.container
      .querySelector("#calculateOvulation")
      .addEventListener("click", () => this.calculate());
  }
  calculate() {
    const e = this.container.querySelector("#lastPeriod").value,
      n = Number(this.container.querySelector("#cycleLength").value),
      t = Number(this.container.querySelector("#periodLength").value);
    if (!e)
      return void alert("Please select the first day of your last period.");
    this.container.querySelector("#result").classList.add("has-result");
    const a = new Date(e),
      i = new Date(a);
    i.setDate(a.getDate() + (n - 14));
    const l = new Date(i);
    l.setDate(i.getDate() - 5);
    const s = new Date(i);
    s.setDate(i.getDate() + 1);
    let r = '<div class="gbg-calendar">';
    for (let e = 0; e < 28; e++) {
      const n = new Date(a);
      n.setDate(a.getDate() + e);
      let o = "gbg-day";
      e < t && (o += " period"),
        n >= l && n <= s && (o += " fertile"),
        n.toDateString() === i.toDateString() && (o += " ovulation"),
        (r += `\n        <div class="${o}">\n          ${n.getDate()}\n        </div>\n      `);
    }
    (r += "</div>"),
      (this.container.querySelector(
        "#result"
      ).innerHTML = `\n      <div class="gbg-alert success">\n        <strong>Ovulation Day:</strong>\n        ${i.toDateString()}\n        <br>\n        <strong>Fertile Window:</strong>\n        ${l.toDateString()} – ${s.toDateString()}\n      </div>\n\n      ${r}\n\n      <div class="gbg-legend">\n        <div><span class="circle period"></span> <span>Period</span></div>\n        <div><span class="circle fertile"></span><span>Fertile</span></div>\n        <div><span class="circle ovulation"></span>Ovulation</span></div>\n      </div>\n    `);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  new OvulationCalculator("#ovulation-calculator");
});
