const ipc = require("electron").ipcRenderer;
const fs = require("fs");
const imageCompression = require("browser-image-compression");

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("file_upload").addEventListener("change", (e) => {});

  document.getElementById("submit").addEventListener("click", async (_) => {
    for (const file of document.getElementById("file_upload").files) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: false,
      };
      try {
        const c = await imageCompression(file, options);
        const buffer = Buffer.from(await c.arrayBuffer());
        if (!fs.existsSync('compressedImages')){
          fs.mkdirSync('compressedImages');
        }
        fs.writeFile(`compressedImages/${compressed.name}`, buffer, () => console.log("image saved"));
      } catch (err) {
        console.log(err);
      }
    }
  });
});
