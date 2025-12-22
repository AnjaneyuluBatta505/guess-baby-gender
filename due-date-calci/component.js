class PregnancyJourney {
  constructor({ target }) {
    this.el =
      typeof target === "string" ? document.querySelector(target) : target;

    if (!this.el) throw "Target not found";

    this.PATH_D = `
      M 50 200
      C 150 60, 250 340, 350 200
      C 450 60, 550 340, 650 200
      C 750 60, 850 340, 950 200
    `;

    this.renderShell();
    this.bind();
  }

  renderShell() {
    this.el.innerHTML = `
      <div class="pc-app">
        <div class="pc-card pc-header">
          <label>
            Last Menstrual Period
            <input type="date" id="pcLmp" />
          </label>
        </div>

        <div id="pcResult"></div>
      </div>
    `;
  }

  bind() {
    this.lmpInput = this.el.querySelector("#pcLmp");
    this.result = this.el.querySelector("#pcResult");

    this.lmpInput.addEventListener("change", () => this.update());
  }

calculate(lmp) {
  const today = new Date();

  // Ensure lmp is a valid Date object
  if (!(lmp instanceof Date) || isNaN(lmp)) return null;

  // Difference in milliseconds, ensure non-negative
  const diffMs = Math.max(0, today - lmp);

  // Convert to days
  const daysPassed = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Weeks and remaining days
  const weeks = Math.floor(daysPassed / 7);
  const remDays = daysPassed % 7;

  // Days left in pregnancy
  const totalPregnancyDays = 280;
  const daysLeft = Math.max(0, totalPregnancyDays - daysPassed);

  // Pregnancy month mapping (1–9)
  const month = this.getPregnancyMonth(weeks, remDays);

  // Trimester mapping (1st/2nd/3rd)
  const trimester = this.getTrimester(weeks);

  // Progress along 40 weeks (0–1)
  const progress = Math.min(weeks / 40, 1);

  return { weeks, remDays, daysPassed, daysLeft, month, trimester, progress };
}



  getTrimester(weeks) {
    if (weeks <= 13) return "1st";
    if (weeks <= 27) return "2nd";
    return "3rd";
  }

  getPregnancyMonth(weeks) {
    if (weeks <= 4) return 1;
    if (weeks <= 8) return 2;
    if (weeks <= 13) return 3;
    if (weeks <= 17) return 4;
    if (weeks <= 22) return 5;
    if (weeks <= 27) return 6;
    if (weeks <= 31) return 7;
    if (weeks <= 35) return 8;
    return 9;
  }

  update() {
    if (!this.lmpInput.value) return;

    const lmp = new Date(this.lmpInput.value);
    const { weeks, daysLeft, remDays, month, progress } = this.calculate(lmp);
    const trimester = this.getTrimester(weeks);
    const summaryTable = this.renderSummaryTable({
      trimester,
      month,
      weeks,
      daysLeft
    });

    this.result.innerHTML = `
      ${summaryTable}
      <section class="pc-journey">
        <svg viewBox="0 0 1000 300" class="pc-journey-svg">
          <path d="${this.PATH_D}" class="pc-base-path"/>
          <path d="${
            this.PATH_D
          }" class="pc-progress-path" id="pcProgressPath"/>
          ${this.weekMarkers()}
          <g class="pc-baby-marker">
            <use href="/images/baby-icon.svg" width="34" height="34" class="pc-marker-icon"></use>
            <text class="pc-marker-label" text-anchor="middle">${weeks} week(s) ${remDays} days</text>
          </g>
      </section>
    `;
    this.positionWeekMarkers();
    this.animateProgress(progress, month, remDays);
  }

  weekMarkers() {
    return Array.from(
      { length: 40 },
      () => `
    <circle r="3" class="pc-week-marker"></circle>
  `
    ).join("");
  }

  positionWeekMarkers() {
    const pathEl = this.result.querySelector("#pcProgressPath");
    const totalLength = pathEl.getTotalLength();
    const markers = this.result.querySelectorAll(".pc-week-marker");

    markers.forEach((marker, i) => {
      const p = pathEl.getPointAtLength(((i + 1) / 40) * totalLength);
      marker.setAttribute("cx", p.x);
      marker.setAttribute("cy", p.y);
    });
  }

  animateProgress(targetProgress, months, remDays) {
    const pathEl = this.result.querySelector("#pcProgressPath");
    const baby = this.result.querySelector(".pc-baby-marker use");
    const label = this.result.querySelector(".pc-baby-marker text");

    const totalLength = pathEl.getTotalLength();

    let start = 0;
    const duration = 2200; // ms
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);

      // easeOut
      const eased = 1 - Math.pow(1 - t, 3);
      const progress = start + (targetProgress - start) * eased;

      // Path fill
      pathEl.style.strokeDasharray = totalLength;
      pathEl.style.strokeDashoffset = totalLength * (1 - progress);

      // Baby position
      const point = pathEl.getPointAtLength(progress * totalLength);
      baby.setAttribute("x", point.x - 17);
      baby.setAttribute("y", point.y - 34);

      label.setAttribute("x", point.x);
      label.setAttribute("y", point.y - 42);

      if (t < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  renderSummaryTable({ trimester, month, weeks, daysLeft }) {
    return `
    <table class="pc-summary-table">
      <thead>
        <tr>
          <th>Trimester</th>
          <th>Month</th>
          <th>Weeks</th>
          <th>Days Left</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${trimester}</td>
          <td>${month}</td>
          <td>${weeks}</td>
          <td>${daysLeft}</td>
        </tr>
      </tbody>
    </table>
  `;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  new PregnancyJourney({ target: "#due-date-calci" });
});
