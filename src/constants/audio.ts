import { Playlist } from '../types';
import { getAssetUrl } from '../utils/assets';

export const MUSIC_PLAYLISTS: Playlist[] = [
  {
    id: 'all-songs',
    name: 'ALL SONGS (सभी गाने)',
    description: 'Complete 90s Indian Night Bus Collection (9 Songs)',
    icon: '📻',
    tracks: [
      { id: 'track-1', title: 'Ae Kash Ke Hum', artist: 'Kumar Sanu (Kabhi Haan Kabhi Naa)', src: getAssetUrl('/music/ae-kash-ke-hum.mp3') },
      { id: 'track-2', title: 'Chori Chori Dil Tera', artist: 'Kumar Sanu (90s Hits)', src: getAssetUrl('/music/chori-chori-dil-tera.mp3') },
      { id: 'track-3', title: 'Dil Cheer Ke Dekh', artist: 'Kumar Sanu (Rang)', src: getAssetUrl('/music/dil-cheer-ke-dekh.mp3') },
      { id: 'track-4', title: 'Dil Kehta Hai', artist: 'Kumar Sanu, Alka Yagnik (Akele Hum Akele Tum)', src: getAssetUrl('/music/dil-kehta-hai.mp3') },
      { id: 'track-5', title: 'Is Tarah Aashiqui Ka', artist: 'Kumar Sanu (Imtihan)', src: getAssetUrl('/music/is-tarah-aashiqui-ka.mp3') },
      { id: 'track-6', title: 'Pehli Pehli Baar Mohabbat Ki Hai', artist: 'Kumar Sanu, Alka Yagnik (Sirf Tum)', src: getAssetUrl('/music/pehli-pehli-baar-mohabbat.mp3') },
      { id: 'track-7', title: 'Sochenge Tumhe Pyar', artist: 'Kumar Sanu (Deewana)', src: getAssetUrl('/music/sochenge-tumhe-pyar.mp3') },
      { id: 'track-8', title: 'Tu Jo Hans Hans Ke', artist: 'Udit Narayan, Kavita K. (Raja Bhaiya)', src: getAssetUrl('/music/tu-jo-hans-hans-ke.mp3') },
      { id: 'track-9', title: 'Woh Meri Neend Mera Chain', artist: 'Sadhana Sargam (Hum Hain Rahi Pyar Ke)', src: getAssetUrl('/music/woh-meri-neend-mera-chain.mp3') },
    ]
  },
  {
    id: '90s-romantic',
    name: '90s ROMANTIC HITS',
    description: 'Evergreen romantic melodies for late night journey',
    icon: '❤️',
    tracks: [
      { id: 'rom-1', title: 'Pehli Pehli Baar Mohabbat Ki Hai', artist: 'Kumar Sanu, Alka Yagnik', src: getAssetUrl('/music/pehli-pehli-baar-mohabbat.mp3') },
      { id: 'rom-2', title: 'Dil Kehta Hai', artist: 'Kumar Sanu, Alka Yagnik', src: getAssetUrl('/music/dil-kehta-hai.mp3') },
      { id: 'rom-3', title: 'Ae Kash Ke Hum', artist: 'Kumar Sanu', src: getAssetUrl('/music/ae-kash-ke-hum.mp3') },
      { id: 'rom-4', title: 'Tu Jo Hans Hans Ke', artist: 'Udit Narayan, Kavita K.', src: getAssetUrl('/music/tu-jo-hans-hans-ke.mp3') },
      { id: 'rom-5', title: 'Chori Chori Dil Tera', artist: 'Kumar Sanu', src: getAssetUrl('/music/chori-chori-dil-tera.mp3') },
    ]
  },
  {
    id: 'sad-nights',
    name: 'DIL SE DIL TAK (सदाबहार यादें)',
    description: 'Emotional classics for quiet highways & thoughts after midnight',
    icon: '🌙',
    tracks: [
      { id: 'sad-1', title: 'Dil Cheer Ke Dekh', artist: 'Kumar Sanu', src: getAssetUrl('/music/dil-cheer-ke-dekh.mp3') },
      { id: 'sad-2', title: 'Is Tarah Aashiqui Ka', artist: 'Kumar Sanu', src: getAssetUrl('/music/is-tarah-aashiqui-ka.mp3') },
      { id: 'sad-3', title: 'Sochenge Tumhe Pyar', artist: 'Kumar Sanu', src: getAssetUrl('/music/sochenge-tumhe-pyar.mp3') },
      { id: 'sad-4', title: 'Woh Meri Neend Mera Chain', artist: 'Sadhana Sargam', src: getAssetUrl('/music/woh-meri-neend-mera-chain.mp3') },
    ]
  },
  {
    id: 'kumar-sanu-special',
    name: 'KUMAR SANU CASSETTE',
    description: 'The golden voice of 90s cassette player',
    icon: '📼',
    tracks: [
      { id: 'ks-1', title: 'Sochenge Tumhe Pyar', artist: 'Kumar Sanu', src: getAssetUrl('/music/sochenge-tumhe-pyar.mp3') },
      { id: 'ks-2', title: 'Ae Kash Ke Hum', artist: 'Kumar Sanu', src: getAssetUrl('/music/ae-kash-ke-hum.mp3') },
      { id: 'ks-3', title: 'Dil Kehta Hai', artist: 'Kumar Sanu, Alka Yagnik', src: getAssetUrl('/music/dil-kehta-hai.mp3') },
      { id: 'ks-4', title: 'Dil Cheer Ke Dekh', artist: 'Kumar Sanu', src: getAssetUrl('/music/dil-cheer-ke-dekh.mp3') },
      { id: 'ks-5', title: 'Is Tarah Aashiqui Ka', artist: 'Kumar Sanu', src: getAssetUrl('/music/is-tarah-aashiqui-ka.mp3') },
      { id: 'ks-6', title: 'Chori Chori Dil Tera', artist: 'Kumar Sanu', src: getAssetUrl('/music/chori-chori-dil-tera.mp3') },
    ]
  }
];

export const AMBIENT_TRACKS = {
  engine: getAssetUrl('/audio/engine.mp3'),
  rain: getAssetUrl('/audio/rain.mp3'),
  road: getAssetUrl('/audio/road.mp3'),
  horn: getAssetUrl('/audio/horn-03.mp3'),
};

export const HORN_TRACKS = [
  { id: 'horn-1', name: 'Tamil Nadu Express Horn', src: getAssetUrl('/audio/horn-01.mp3') },
  { id: 'horn-2', name: 'Private Bus Air Horn', src: getAssetUrl('/audio/horn-02.mp3') },
  { id: 'horn-3', name: 'Rajasthani Deluxe Horn', src: getAssetUrl('/audio/horn-03.mp3') },
];
