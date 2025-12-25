function getBaseTemplate() {
  return `
<div class="chinese-gender">
  <div class="gg-container">
    <h1>Chinese Gender Calendar</h1>
    <p class="subtitle">
      Use the traditional Chinese Gender Calendar to guess your baby’s gender.
    </p>
    <div class="form-box">
      <label>
        Mother’s Age at Conception
        <input type="number" id="ageInput" min="18" max="45" placeholder="e.g. 28">
      </label>
      <label>
        Month of Conception
        <select id="monthInput">
          <option value="">Select Month</option>
          <option value="1">Jan</option>
          <option value="2">Feb</option>
          <option value="3">Mar</option>
          <option value="4">Apr</option>
          <option value="5">May</option>
          <option value="6">Jun</option>
          <option value="7">Jul</option>
          <option value="8">Aug</option>
          <option value="9">Sep</option>
          <option value="10">Oct</option>
          <option value="11">Nov</option>
          <option value="12">Dec</option>
        </select>
      </label>
      <button id="predictBtn">Predict Gender</button>
    </div>
    <div id="result" class="result"></div>
    <div class="table-wrapper">
      <table id="genderTable"></table>
    </div>
    <p class="disclaimer">
      ⚠️ Disclaimer: This tool is based on traditional Chinese beliefs and is for
      entertainment purposes only. It is not medically or scientifically accurate.
    </p>
  </div>
</div>
`;
}

function renderTable(calendar, table) {
  const months = [
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
  ];
  table.innerHTML = "";

  const header = document.createElement("tr");
  months.forEach((m) => {
    const th = document.createElement("th");
    th.textContent = m;
    header.appendChild(th);
  });
  table.appendChild(header);

  Object.keys(calendar.chart).forEach((age) => {
    const tr = document.createElement("tr");
    tr.dataset.age = age;

    const ageTd = document.createElement("td");
    ageTd.textContent = age;
    tr.appendChild(ageTd);

    calendar.chart[age].forEach((g, i) => {
      const td = document.createElement("td");
      td.textContent = g === "B" ? "Boy" : "Girl";
      td.className = g === "B" ? "boy" : "girl";
      td.dataset.month = i + 1;
      tr.appendChild(td);
    });

    table.appendChild(tr);
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

function addDataInputEventListeners(calendar, table) {
  document.getElementById("predictBtn").addEventListener("click", () => {
    document
      .querySelectorAll(".highlight")
      .forEach((el) => el.classList.remove("highlight"));

    const age = document.getElementById("ageInput").value;
    const month = document.getElementById("monthInput").value;
    const result = document.getElementById("result");

    if (!calendar.chart[age] || !month) {
      result.textContent = "Please enter valid age and month.";
      return;
    }

    const gender = calendar.chart[age][month - 1];
    const genderText = gender === "B" ? "Boy 💙" : "Girl 💖";

    result.textContent = `Predicted Gender: ${genderText}`;

    const row = table.querySelector(`tr[data-age="${age}"]`);
    const cell = row.querySelector(`td[data-month="${month}"]`);
    cell.classList.add("highlight");
  });
}

function initChineseGenderCalci(target) {
  const el = document.querySelector(target);
  el.innerHTML = getBaseTemplate();
  const calendar = new ChineseGenderCalendar();
  const table = document.getElementById("genderTable");
  renderTable(calendar, table);
  addDataInputEventListeners(calendar, table)
}

document.addEventListener("DOMContentLoaded", function () {
  initChineseGenderCalci("#chinese-gender-target");
});
