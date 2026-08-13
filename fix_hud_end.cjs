const fs = require('fs');
let content = fs.readFileSync('src/components/ui/HUD.tsx', 'utf8');
if (!content.trim().endsWith('}')) {
  content = content + '\n}\n';
}
fs.writeFileSync('src/components/ui/HUD.tsx', content);
