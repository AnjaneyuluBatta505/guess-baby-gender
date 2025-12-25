function getBaseTemplate() {
  return `
      <div class="gbg-card">
        <h2>Am I in Labor?</h2>
        <p class="gbg-subtitle">Check common labor signs and contractions</p>

        <div class="gbg-field">
          <label>Contraction Frequency (minutes apart)</label>
          <input type="number" id="frequency" placeholder="e.g. 5" min="1">
        </div>

        <div class="gbg-field">
          <label>Contraction Duration (seconds)</label>
          <input type="number" id="duration" placeholder="e.g. 60" min="10">
        </div>

        <div class="gbg-field">
          <label>Contraction Intensity</label>
          <select id="intensity">
            <option value="">Select intensity</option>
            <option value="mild">Mild</option>
            <option value="moderate">Moderate</option>
            <option value="strong">Strong</option>
          </select>
        </div>

        <div class="gbg-symptoms">
          <label><input type="checkbox" id="backPain"> Lower back pain</label>
          <label><input type="checkbox" id="pelvicPressure"> Pelvic pressure</label>
          <label><input type="checkbox" id="bloodyShow"> Bloody show</label>
          <label><input type="checkbox" id="waterBreak"> Water has broken</label>
          <label><input type="checkbox" id="highBP"> High blood pressure (BP)</label>
        </div>

        <button id="checkLabor" class="gbg-btn">
          Check Labor Status
        </button>

        <div id="result" class="gbg-result"></div>

        <div class="disclosure">
          <strong>Medical Disclaimer</strong>
          <p>
            This calculator is for informational purposes only and does not
            provide medical advice, diagnosis, or treatment.
          </p>
          <p>
            Labor symptoms vary between individuals. If you believe you may be
            in labor or experience strong pain, bleeding, fluid leakage, or
            high blood pressure, contact your doctor or emergency services
            immediately.
          </p>
        </div>
      </div>`;
}

class LaborCalculator {
  constructor(container) {
    this.container = document.querySelector(container);
    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = getBaseTemplate();
  }

  bindEvents() {
    this.container
      .querySelector("#checkLabor")
      .addEventListener("click", () => this.calculate());
  }

  calculate() {
    const frequency = Number(this.container.querySelector("#frequency").value);
    const duration = Number(this.container.querySelector("#duration").value);
    const intensity = this.container.querySelector("#intensity").value;

    const backPain = this.container.querySelector("#backPain").checked;
    const pelvicPressure =
      this.container.querySelector("#pelvicPressure").checked;
    const bloodyShow = this.container.querySelector("#bloodyShow").checked;
    const waterBreak = this.container.querySelector("#waterBreak").checked;
    const highBP = this.container.querySelector("#highBP").checked;

    let score = 0;

    // Contractions
    if (frequency > 0 && frequency <= 5) score += 3;
    else if (frequency <= 10) score += 1;

    if (duration >= 60) score += 2;

    if (intensity === "moderate") score += 1;
    if (intensity === "strong") score += 3;

    // Symptoms
    if (backPain) score += 1;
    if (pelvicPressure) score += 2;
    if (bloodyShow) score += 2;
    if (waterBreak) score += 4;

    // ⚠️ High BP — medical risk
    if (highBP) score += 5;

    let resultHTML = "";

    if (highBP) {
      resultHTML = `
      <div class="gbg-alert active">
        <strong>High blood pressure detected.</strong>
        <p>High BP during pregnancy can be serious.</p>
        <p>Contact your doctor or go to the hospital immediately.</p>
      </div>
    `;
    } else if (score >= 8) {
      resultHTML = `
      <div class="gbg-alert active">
        <strong>You may be in active labor.</strong>
        <p>Contractions and symptoms strongly suggest labor.</p>
        <p>Contact your healthcare provider or go to the hospital.</p>
      </div>
    `;
    } else if (score >= 4) {
      resultHTML = `
      <div class="gbg-alert early">
        <strong>Early labor or labor starting.</strong>
        <p>Several labor signs are present.</p>
        <p>Monitor contractions and check again soon.</p>
      </div>
    `;
    } else {
      resultHTML = `
      <div class="gbg-alert notyet">
        <strong>You are likely not in labor yet.</strong>
        <p>Symptoms may be early or false labor.</p>
        <p>Recheck if contractions become regular or stronger.</p>
      </div>
    `;
    }

    this.container.querySelector("#result").innerHTML = resultHTML;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new LaborCalculator("#labor-calculator");
});
