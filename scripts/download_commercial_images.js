const fs = require('fs');
const https = require('https');
const path = require('path');

const images = {
  "farmacia-lujosa.jpg": "1580608511676-e3d06eb1af82", // Clean, bright medical/skincare retail
  "boutique-lujosa.jpg": "1441986300917-00dd1ea70669", // High-end boutique
  "oficina-lujosa.jpg": "1497366216548-37526070297c", // Modern luxury office
  "restaurante-lujosa.jpg": "1517248135467-4c7edcad34c4" // Luxury restaurant interior
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
