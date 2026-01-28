const todayStr = new Date().toISOString().slice(0,10);
document.getElementById("today").innerText = "Date: " + todayStr;

const pools = [
  { id: 1, name: "Pool A - CBD", salary: 1500 },
  { id: 2, name: "Pool B - Westlands", salary: 1200 }
];

function init() {
  const poolSelect = document.getElementById("poolSelect");

  pools.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.text = p.name;
    poolSelect.appendChild(opt);
  });

  poolSelect.onchange = loadData;
  loadData();
}

function addFloat() {
  const amount = prompt("Enter float amount:");
  if (!amount) return;

  addFloatEntry({
    poolId: Number(poolSelect.value),
    date: todayStr,
    amount: Number(amount),
    synced: false
  });

  loadData();
}

function loadData() {
  const poolId = Number(poolSelect.value);
  const pool = pools.find(p => p.id === poolId);

  document.getElementById("salary").innerText = pool.salary;

  getFloats(poolId, todayStr, floats => {
    const total = floats.reduce((s, f) => s + f.amount, 0);
    document.getElementById("totalFloat").innerText = total;
    document.getElementById("misc").innerText = 0;

    document.getElementById("savings").innerText =
      total - pool.salary;

    const list = document.getElementById("floatList");
    list.innerHTML = "";
    floats.forEach(f => {
      const li = document.createElement("li");
      li.innerText = "+ " + f.amount;
      list.appendChild(li);
    });
  });
}
