export function getGenderInfoTemplate() {
return `
<div class="guess-gender-info">
  <h1>Guess Your Baby's Gender</h1>
  <h2>Fun, Fast & Based on Old Wives' Tales!</h2>
  <div>Discover what centuries-old midwife observations, traditional pregnancy folklore, and classic symptom-based
    patterns might suggest about your baby’s gender.</div>
  <h4>Just for fun — these methods are not medically or scientifically proven.</h4>
  <button class="guess-btn">Guess Gender →</button>
</div>
</div>`;
}

export function getQuizContainerTemplate() {
return `
<div class="gq-wrapper">
  <div class="gq-progress">
    <div class="gq-bar"></div>
  </div>
  <div class="gq-stage"></div>
</div>`;
}

export function getQuizQuestionOption(opt, i){
  const value = JSON.stringify(opt.weight);
  return `
    <button class="gq-option" data-value='${value}'>
      ${opt.label}
    </button>`
}

export function getQuizQuestionTemplate(q, index, total) {
  const options = q.options.map(getQuizQuestionOption)
  const backBtn = index > 0 ? `<button class="gq-prev">← Back</button>` : ""
  return `
  <div class="gq-question">
    <h2>${q.question}</h2>
    <div class="gq-options">${options.join(" ")}</div>
    <div class="gq-nav">${backBtn}</div>
  </div>`;
}


export function getQuizResultTemplate(result){
  const outcome = result === "boy" ? "It's a Boy! 👶💙" : "It's a Girl! 🎀👶"
return `
<div class="gq-result">
  <h2 class="gq-title">${outcome}</h2>
  <div class="gq-desc">
    <p>This fun prediction is based on traditional pregnancy folklore and old wives' tales.</p>
    <p><strong>Not scientifically proven.</strong></p>
  </div>
  <div class="gq-affiliate-box">
    <h3>Affiliate Items</h3>
    <ul class="affiliate-list">
      <li><a href="https://www.amazon.in/s?k=baby+essentials+kit&tag=batta505-21" target="_blank">Baby Essentials Kit</a></li>
      <li><a href="https://www.amazon.in/s?k=organic+newborn+clothing&tag=batta505-21" target="_blank">Organic Newborn Clothing</a></li>
      <li><a href="https://www.amazon.in/s?k=pregnancy+comfort+pillow&tag=batta505-21" target="_blank">Pregnancy Comfort Pillow</a></li>
      <li><a href="https://www.amazon.in/s?k=nursing+pillow&tag=batta505-21" target="_blank">Nursing Pillow</a></li>
      <li><a href="https://www.amazon.in/s?k=baby+monitor&tag=batta505-21" target="_blank">Baby Monitor</a></li>
      <li><a href="https://www.amazon.in/s?k=breast+feeding+pump&tag=batta505-21" target="_blank">Breast Feeding Pump</a></li>
    </ul>
    <p>Disclaimer: Some links on this page are affiliate links. We may earn a small commission if you make a purchase at no extra cost to you.</p>
  </div>
  <button class="gq-restart bottom-break">Try Again</button>
</div>`
}
