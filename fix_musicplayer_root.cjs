const fs = require('fs');
let content = fs.readFileSync('src/components/MusicPlayer.tsx', 'utf8');

content = content.replace(
  'return (\n    <>',
  'return (\n    <div className="flex flex-col justify-end w-full md:w-[350px] pointer-events-none">'
);

content = content.replace(
  '</AnimatePresence>\n    </>',
  '</AnimatePresence>\n    </div>'
);

fs.writeFileSync('src/components/MusicPlayer.tsx', content);
