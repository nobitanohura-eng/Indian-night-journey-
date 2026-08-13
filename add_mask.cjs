const fs = require('fs');
let content = fs.readFileSync('src/components/screens/VirtualTicket.tsx', 'utf8');

content = content.replace(
  'WebkitMaskPosition: \'bottom\'',
  'WebkitMaskPosition: \'bottom\', maskImage: \'radial-gradient(circle at 4px 4px, transparent 4px, black 4.5px)\', maskSize: \'8px 8px\', maskPosition: \'bottom\''
);

fs.writeFileSync('src/components/screens/VirtualTicket.tsx', content);
