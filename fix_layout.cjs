const fs = require('fs');

let content = fs.readFileSync('src/components/Layout.tsx', 'utf8');

// Remove extra UI components since HUD handles them now
content = content.replace('      <HUD />\n      <ActiveTravelers />\n      <MusicPlayer />', '      <HUD />');

fs.writeFileSync('src/components/Layout.tsx', content);
