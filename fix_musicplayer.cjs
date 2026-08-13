const fs = require('fs');
let content = fs.readFileSync('src/components/MusicPlayer.tsx', 'utf8');

// Replace the absolute positioned container
content = content.replace(
  /className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-auto md:w-\[350px\] z-50 pointer-events-auto"/g,
  'className="pointer-events-auto w-full md:w-[350px] z-50 flex flex-col justify-end"'
);

// We should also replace the selector positioning so it goes up, which it already does because it's in a flex-col, wait...
content = content.replace(
  /className="absolute bottom-24 left-4 right-4 md:bottom-28 md:left-8 md:right-auto md:w-\[350px\] z-50"/g,
  'className="pointer-events-auto w-full md:w-[350px] z-50 mb-2"'
);

// Make sure both are not overlapping or absolutely positioned
fs.writeFileSync('src/components/MusicPlayer.tsx', content);
