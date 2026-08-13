const fs = require('fs');
let content = fs.readFileSync('src/components/ui/HUD.tsx', 'utf8');

// Add import
content = content.replace(
  "import { MusicPlayer } from '../MusicPlayer';",
  "import { MusicPlayer } from '../MusicPlayer';\nimport { CreatorCredit } from './CreatorCredit';"
);

// Add the CreatorCredit to the top right region
content = content.replace(
  /<div className="mt-2 text-right">\s*<span className="text-\[8px\] uppercase tracking-\[0.3em\] text-amber-500\/80 block drop-shadow-md">NEXT STOP<\/span>/,
  '<div className="mt-2 text-right">\n            <CreatorCredit />\n          </div>\n          <div className="mt-2 text-right">\n            <span className="text-[8px] uppercase tracking-[0.3em] text-amber-500/80 block drop-shadow-md">NEXT STOP</span>'
);

fs.writeFileSync('src/components/ui/HUD.tsx', content);
