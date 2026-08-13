const fs = require('fs');
let content = fs.readFileSync('src/components/ui/ActiveTravelers.tsx', 'utf8');
content = content.replace(
  'className="pointer-events-auto absolute top-[110px] right-4 md:top-[130px] md:right-8 z-50 flex items-center justify-end"',
  'className="pointer-events-auto flex items-center justify-end"'
);
fs.writeFileSync('src/components/ui/ActiveTravelers.tsx', content);
