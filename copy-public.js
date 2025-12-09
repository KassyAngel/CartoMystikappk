import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicSrc = path.join(__dirname, 'public');
const publicDest = path.join(__dirname, 'dist', 'public');

console.log('📁 Copie du dossier public...');
console.log(`   Source: ${publicSrc}`);
console.log(`   Destination: ${publicDest}`);

function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) {
    console.error(`❌ Le dossier source n'existe pas: ${from}`);
    process.exit(1);
  }

  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }
  
  const files = fs.readdirSync(from);
  
  files.forEach(file => {
    const srcPath = path.join(from, file);
    const destPath = path.join(to, file);
    
    const stat = fs.statSync(srcPath);
    
    if (stat.isDirectory()) {
      copyFolderSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`   ✅ Copié: ${file}`);
    }
  });
}

try {
  copyFolderSync(publicSrc, publicDest);
  console.log('✅ Dossier public copié avec succès !');
} catch (error) {
  console.error('❌ Erreur lors de la copie:', error.message);
  process.exit(1);
}
