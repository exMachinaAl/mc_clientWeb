// Web Worker Logger (browser-friendly)
self.onmessage = (event) => {
    const { level, message } = event.data;
    console.log(`[${level}] ${message}`);
  
    // Kirim ke backend jika perlu
    fetch("http://localhost:3002/api/reactLog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level, message }),
    }).catch((err) => console.error("Gagal mengirim log:", err));
  };
  