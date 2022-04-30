const ipc = require("electron").ipcRenderer;
const fs = require("fs");
const jimp = require('jimp');
const imageCompression = require("browser-image-compression");

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("file_upload").addEventListener("change", (e) => { });

  document.getElementById("submit").addEventListener("click", async (_) => {
    for (const file of document.getElementById("file_upload").files) {
      console.log('file', file);
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: false,
      };
      try {
        const compressed = await imageCompression(file, options);
        const buffer = Buffer.from(await c.arrayBuffer());
        if (!fs.existsSync('compressedImages')) {
          fs.mkdirSync('compressedImages');
        }
        fs.writeFile(`compressedImages/${compressed.name}`, buffer, () => console.log("image saved"));
      } catch (err) {
        console.log(err);
      }
    }
  });

  /**
   * Converts images to desired type.
   */
  document.getElementById('convert').addEventListener('click', (_) => {
    if (!fs.existsSync('convertedImages')) {
      fs.mkdirSync('convertedImages');
    }

    const fileType = document.getElementById('file-type').value;

    for (const file of document.getElementById('file_upload').files) {
      jimp.read(file.path, (err, convert) => {
        if (err) console.log(err);

        let filename = file.name.split('.')[0];
        convert.write(`convertedImages/${filename}.${fileType}`);
      });
    }
  });
});
