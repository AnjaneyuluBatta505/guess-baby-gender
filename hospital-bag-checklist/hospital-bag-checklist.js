const STORAGE_KEY = "hospitalBagCSectionChecklist";

function getBaseTemplate() {
  return `
<div class="csection-card">
    <div id="progressText">0 of 0 items packed</div>
    <div class="progress-bar">
        <div class="progress-fill" id="progressFill"></div>
    </div>

    <div class="checklist">
        <h3>👩 Mom Essentials</h3>
        <label><input type="checkbox" class="item" /> Loose nightgowns / front-open
            dresses</label>
        <label><input type="checkbox" class="item" /> Maternity pads</label>
        <label><input type="checkbox" class="item" /> Nursing bras</label>
        <label><input type="checkbox" class="item" /> Slippers & socks</label>
        <label><input type="checkbox" class="item" /> Toiletries & lip balm</label>

        <h3>👶 Baby Essentials</h3>
        <label><input type="checkbox" class="item" /> Newborn clothes</label>
        <label><input type="checkbox" class="item" /> Swaddle / blanket</label>
        <label><input type="checkbox" class="item" /> Diapers & wipes</label>
        <label><input type="checkbox" class="item" /> Mittens & cap</label>

        <h3>🧍 Partner / Support Person</h3>
        <label><input type="checkbox" class="item" /> Change of clothes</label>
        <label><input type="checkbox" class="item" /> Phone charger</label>
        <label><input type="checkbox" class="item" /> Snacks & water bottle</label>

        <h3>📄 Documents</h3>
        <label><input type="checkbox" class="item" /> ID proofs</label>
        <label><input type="checkbox" class="item" /> Insurance documents</label>
        <label><input type="checkbox" class="item" /> Medical reports & scans</label>

        <h3>🏥 Hospital Essentials</h3>
        <label><input type="checkbox" class="item" /> Abdominal binder</label>
        <label><input type="checkbox" class="item" /> Sanitary disposal bags</label>
        <label><input type="checkbox" class="item" /> Small pillow</label>
    </div>
</div>
`;
}

function updateProgress({items, progressText, progressFill}) {
  const total = items.length;
  const checkedItems = [];

  items.forEach((item, index) => {
    if (item.checked) {
      checkedItems.push(index);
    }
  });

  const checkedCount = checkedItems.length;
  const percent = Math.round((checkedCount / total) * 100);

  progressText.textContent = `${checkedCount} of ${total} items packed`;
  progressFill.style.width = percent + "%";

  // Save to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
}

function initHospitalBagCheckList(t) {
  const target = document.querySelector(t);
  target.innerHTML = getBaseTemplate();
  const items = document.querySelectorAll(".item");
  const progressText = document.getElementById("progressText");
  const progressFill = document.getElementById("progressFill");

  // Load saved state
  const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  items.forEach((item, index) => {
    item.checked = savedState.includes(index);
  });
  
  const data = {items, progressText, progressFill}
  items.forEach((item) => {
    item.addEventListener("change", () => {
        updateProgress(data)
    });
  });

  updateProgress(data)
}

// DOM READY
document.addEventListener("DOMContentLoaded", function () {
  initHospitalBagCheckList("#hospital-bag-checklist");
});
