const fs = require('fs');
let content = fs.readFileSync('src/store/JourneyContext.tsx', 'utf8');

const interfaceReplacement = `  isSharedView: boolean;
  setIsSharedView: (v: boolean) => void;
  
  isChaiBreak: boolean;
  setIsChaiBreak: (v: boolean) => void;

  isPlaying: boolean;`;

content = content.replace(
  /  isSharedView: boolean;\n  setIsSharedView: \(v: boolean\) => void;\n  isPlaying: boolean;/,
  interfaceReplacement
);

const stateReplacement = `  const [passengers, setPassengers] = useState(42);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isChaiBreak, setIsChaiBreak] = useState(false);`;

content = content.replace(
  /  const \[passengers, setPassengers\] = useState\(42\);\n  const \[isPlaying, setIsPlaying\] = useState\(false\);/,
  stateReplacement
);

const providerReplacement = `      passengers,
      isSharedView, setIsSharedView,
      isChaiBreak, setIsChaiBreak,
      isPlaying, setIsPlaying,`;

content = content.replace(
  /      passengers,\n      isSharedView, setIsSharedView,\n      isPlaying, setIsPlaying,/,
  providerReplacement
);

fs.writeFileSync('src/store/JourneyContext.tsx', content);
