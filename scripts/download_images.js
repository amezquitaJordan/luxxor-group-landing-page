const fs = require('fs');
const https = require('https');
const path = require('path');

const images = {
  "antes-cocina.jpg": "1556910103-1c02745aae4d",
  "despues-cocina.jpg": "1600585154340-be6161a56a0c",
  "antes-sala.jpg": "1505691938895-1758d7feb511",
  "despues-sala.jpg": "1600210492486-724fe5c67fb0",
  "antes-bano.jpg": "1552321554-5fefe8c9ef14",
  "despues-bano.jpg": "1620626011761-996317b8d101",
  "antes-dormitorio.jpg": "1540518614846-7eded433c457",
  "despues-dormitorio.jpg": "1616594039964-ae9021a400a0"
};

const dir = path.join(__dirname, '../public/images');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

async function downloadImage(filename, id) {
  const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=1600`;
  const filepath = path.join(dir, filename);
  
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // Handle redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (redirectRes) => {
            const fileStream = fs.createWriteStream(filepath);
            redirectRes.pipe(fileStream);
            fileStream.on('finish', () => {
              fileStream.close();
              console.log(`Downloaded ${filename}`);
              resolve();
            });
        }).on('error', reject);
      } else {
          const fileStream = fs.createWriteStream(filepath);
          res.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            console.log(`Downloaded ${filename}`);
            resolve();
          });
      }
    }).on('error', reject);
  });
}

async function main() {
  for (const [filename, id] of Object.entries(images)) {
    try {
      await downloadImage(filename, id);
    } catch (e) {
      console.error(`Failed to download ${filename}:`, e);
    }
  }
}

main();
