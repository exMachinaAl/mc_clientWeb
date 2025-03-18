import LoggerWorker from "../../public/workers/loggerWorker.mjs?worker";

export class Logger {
  constructor() {
    this.reactModeDev = false;

    try {
      this.worker = new LoggerWorker();
      this.worker.onerror = (err) => console.error("❌ Worker Error:", err);
    } catch (err) {
      console.error("❌ Worker Tidak Bisa Dimuat:", err);
    }
  }

  log(level, message) {
    if (this.reactModeDev) {
      if (this.worker) {
        this.worker.postMessage({ level, message });
      } else {
        console.error("❌ Worker belum tersedia.");
      }
    }
  }

  devMode(stat = import.meta.env.VITE_REACT_DEV_LOG || null) {
    if (stat === "true" || stat === true) this.reactModeDev = true
    return this
  }
}

export const logger = new Logger();
