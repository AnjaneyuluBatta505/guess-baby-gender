function getBaseTemplate() {
  return '\n<div class="chinese-gender">\n  <div class="gg-container">\n    <h1>Chinese Gender Calendar</h1>\n    <p class="subtitle">\n      Use the traditional Chinese Gender Calendar to guess your baby’s gender.\n    </p>\n    <div class="form-box">\n      <label>\n        Mother’s Age at Conception\n        <input type="number" id="ageInput" min="18" max="45" placeholder="e.g. 28">\n      </label>\n      <label>\n        Month of Conception\n        <select id="monthInput">\n          <option value="">Select Month</option>\n          <option value="1">Jan</option>\n          <option value="2">Feb</option>\n          <option value="3">Mar</option>\n          <option value="4">Apr</option>\n          <option value="5">May</option>\n          <option value="6">Jun</option>\n          <option value="7">Jul</option>\n          <option value="8">Aug</option>\n          <option value="9">Sep</option>\n          <option value="10">Oct</option>\n          <option value="11">Nov</option>\n          <option value="12">Dec</option>\n        </select>\n      </label>\n      <button id="predictBtn">Predict Gender</button>\n    </div>\n    <div id="result" class="result"></div>\n    <div class="table-wrapper">\n      <table id="genderTable"></table>\n    </div>\n    <p class="disclaimer">\n      ⚠️ Disclaimer: This tool is based on traditional Chinese beliefs and is for\n      entertainment purposes only. It is not medically or scientifically accurate.\n    </p>\n  </div>\n</div>\n';
}
function renderTable(e, n) {
  n.innerHTML = "";
  const t = document.createElement("tr");
  [
    "Age",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ].forEach((e) => {
    const n = document.createElement("th");
    (n.textContent = e), t.appendChild(n);
  }),
    n.appendChild(t),
    Object.keys(e.chart).forEach((t) => {
      const B = document.createElement("tr");
      B.dataset.age = t;
      const G = document.createElement("td");
      (G.textContent = t),
        B.appendChild(G),
        e.chart[t].forEach((e, n) => {
          const t = document.createElement("td");
          (t.textContent = "B" === e ? "Boy" : "Girl"),
            (t.className = "B" === e ? "boy" : "girl"),
            (t.dataset.month = n + 1),
            B.appendChild(t);
        }),
        n.appendChild(B);
    });
}
class ChineseGenderCalendar {
  constructor() {
    this.chart = {
      18: ["G", "B", "G", "B", "B", "G", "B", "B", "B", "G", "B", "G"],
      19: ["B", "G", "B", "G", "G", "B", "G", "G", "G", "B", "G", "B"],
      20: ["G", "B", "G", "B", "B", "G", "B", "B", "B", "G", "B", "G"],
      21: ["B", "G", "B", "G", "G", "B", "G", "G", "G", "B", "G", "B"],
      22: ["G", "B", "G", "B", "B", "G", "B", "B", "B", "G", "B", "G"],
      23: ["B", "G", "B", "G", "G", "B", "G", "G", "G", "B", "G", "B"],
      24: ["G", "B", "G", "B", "B", "G", "B", "B", "B", "G", "B", "G"],
      25: ["B", "G", "B", "G", "G", "B", "G", "G", "G", "B", "G", "B"],
      26: ["G", "B", "G", "B", "B", "G", "B", "B", "B", "G", "B", "G"],
      27: ["B", "G", "B", "G", "G", "B", "G", "G", "G", "B", "G", "B"],
      28: ["G", "B", "G", "B", "B", "G", "B", "B", "B", "G", "B", "G"],
      29: ["B", "G", "B", "G", "G", "B", "G", "G", "G", "B", "G", "B"],
      30: ["G", "B", "G", "B", "B", "G", "B", "B", "B", "G", "B", "G"],
      31: ["B", "G", "B", "G", "G", "B", "G", "G", "G", "B", "G", "B"],
      32: ["G", "B", "G", "B", "B", "G", "B", "B", "B", "G", "B", "G"],
      33: ["B", "G", "B", "G", "G", "B", "G", "G", "G", "B", "G", "B"],
      34: ["G", "B", "G", "B", "B", "G", "B", "B", "B", "G", "B", "G"],
      35: ["B", "G", "B", "G", "G", "B", "G", "G", "G", "B", "G", "B"],
      36: ["G", "B", "G", "B", "B", "G", "B", "B", "B", "G", "B", "G"],
      37: ["B", "G", "B", "G", "G", "B", "G", "G", "G", "B", "G", "B"],
      38: ["G", "B", "G", "B", "B", "G", "B", "B", "B", "G", "B", "G"],
      39: ["B", "G", "B", "G", "G", "B", "G", "G", "G", "B", "G", "B"],
      40: ["G", "B", "G", "B", "B", "G", "B", "B", "B", "G", "B", "G"],
      41: ["B", "G", "B", "G", "G", "B", "G", "G", "G", "B", "G", "B"],
      42: ["G", "B", "G", "B", "B", "G", "B", "B", "B", "G", "B", "G"],
      43: ["B", "G", "B", "G", "G", "B", "G", "G", "G", "B", "G", "B"],
      44: ["G", "B", "G", "B", "B", "G", "B", "B", "B", "G", "B", "G"],
      45: ["B", "G", "B", "G", "G", "B", "G", "G", "G", "B", "G", "B"],
    };
  }
}
function addDataInputEventListeners(e, n) {
  document.getElementById("predictBtn").addEventListener("click", () => {
    document
      .querySelectorAll(".highlight")
      .forEach((e) => e.classList.remove("highlight"));
    const t = document.getElementById("ageInput").value,
      B = document.getElementById("monthInput").value,
      G = document.getElementById("result");
    if (!e.chart[t] || !B)
      return void (G.textContent = "Please enter valid age and month.");
    const o = "B" === e.chart[t][B - 1] ? "Boy 💙" : "Girl 💖";
    G.textContent = `Predicted Gender: ${o}`;
    n.querySelector(`tr[data-age="${t}"]`)
      .querySelector(`td[data-month="${B}"]`)
      .classList.add("highlight");
  });
}
function initChineseGenderCalci(e) {
//   document.querySelector(e).innerHTML = getBaseTemplate();
  const n = new ChineseGenderCalendar(),
    t = document.getElementById("genderTable");
  renderTable(n, t), addDataInputEventListeners(n, t);
}
document.addEventListener("DOMContentLoaded", function () {
  initChineseGenderCalci("#chinese-gender-target");
});
