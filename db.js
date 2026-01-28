let db;

const request = indexedDB.open("PoolDB", 1);

request.onupgradeneeded = e => {
  db = e.target.result;

  db.createObjectStore("pools", { keyPath: "id" });
  db.createObjectStore("floats", { keyPath: "id", autoIncrement: true });
};

request.onsuccess = e => {
  db = e.target.result;
  init();
};

function addFloatEntry(entry) {
  const tx = db.transaction("floats", "readwrite");
  tx.objectStore("floats").add(entry);
}

function getFloats(poolId, date, callback) {
  const tx = db.transaction("floats", "readonly");
  const store = tx.objectStore("floats");
  const req = store.getAll();

  req.onsuccess = () => {
    const result = req.result.filter(
      f => f.poolId === poolId && f.date === date
    );
    callback(result);
  };
}
