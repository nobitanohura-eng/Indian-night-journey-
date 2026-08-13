import { Playlist } from '../types';

export const MUSIC_PLAYLISTS: Playlist[] = [
  {
    id: 'old-retro',
    name: 'OLD RETRO',
    description: 'Songs from another journey',
    icon: '📼',
    externalLinks: {"spotify": "https://open.spotify.com/search/old%20retro%20hindi"},
    tracks: [
      { id: 'old-retro-t0', title: 'Ae Kash Ke Hum', artist: 'Kumar Sanu', src: '/music/Ae_20Kash_20Ke_20Hum_20Full_20Video_20-_20Kabhi_20Haan_20Kabhi_20Naa_20_EF_BD_9C_20Shah_20Rukh_20Khan__20Suchitra_20_EF_BD_9C_20Kumar_20Sanu.mp3' },
      { id: 'old-retro-t1', title: 'Chori Chori Dil Tera', artist: 'Kumar Sanu', src: '/music/Chori_20Chori_20Dil_20Tera_20_HD__20-_20Kumar_20Sanu_20Songs_20-_20Romantic_20Songs_20-_2090_s_20Love_20Song.mp3' },
    ]
  },
  {
    id: '90s-era',
    name: '90s ERA',
    description: 'Cassette-era nights',
    icon: '📻',
    externalLinks: {"spotify": "https://open.spotify.com/search/90s%20hindi"},
    tracks: [
      { id: '90s-era-t0', title: 'Kitna Haseen Chehra', artist: 'Kumar Sanu', src: '/music/Kitna_20Haseen_20Chehra_20Full_20Lyrical_20Video_20Song_20_EF_BD_9C_20Dilwale_20_EF_BD_9C_20Ajay_20Devgan__20Raveena_20Tandon_20_EF_BD_9C_20Kumar_20Sanu.mp3' },
      { id: '90s-era-t1', title: 'Pehli Pehli Baar Mohabbat Ki Hai', artist: 'Kumar Sanu', src: '/music/Pehli_20Pehli_20Baar_20Mohabbat_20Ki_20Hai_20Full_20Video_20Song_20_EF_BD_9C_20Sirf_20Tum_EF_BD_9CKumar_20Sanu_Alka_20Yagnik_EF_BD_9CSanjay_20K__20Priya_20G.mp3' },
      { id: '90s-era-t2', title: 'Tu Jo Hans Hans Ke', artist: 'Udit Narayan', src: '/music/Tu_20Jo_20Hans_20Hans_20Ke_20HD_20_EF_BD_9C_20Govinda__20Aarti_20Chabria_20_EF_BD_9CUdit_20Narayan__20Kavita_20Krishnamurthy_20_EF_BD_9CRaja_20Bhaiya_20Song.mp3' },
    ]
  },
  {
    id: 'sad-nights',
    name: 'SAD NIGHTS',
    description: 'For quiet roads and thoughts after midnight',
    icon: '🌙',
    externalLinks: {"spotify": "https://open.spotify.com/search/sad%20hindi"},
    tracks: [
      { id: 'sad-nights-t0', title: 'Is Tarah Aashiqui Ka', artist: 'Kumar Sanu', src: '/music/Is_20Tarah_20Aashiqui_20Ka_20Lyrical_20_EF_BD_9C_20Imtihan_20_EF_BD_9C_20Kumar_20Sanu_20_EF_BD_9C_20Saif_20Ali_20Khan__20Raveena_20Tandon_20_EF_BD_9C_20Anu_20Malik.mp3' },
      { id: 'sad-nights-t1', title: 'Tumhein Dekhen Meri Aankhen', artist: 'Kumar Sanu', src: '/music/Tumhein_20Dekhen_20Meri_20Aankhen_20_EF_BD_9C_20Divya_20Bharti_20_EF_BD_9C_20Kumar_20Sanu_20_EF_BD_9C_20Alka_20Yagnik_20_EF_BD_9C_20Rang_20Song_20_EF_BD_9C_2090_s_20Sad_20Song.mp3' },
    ]
  },
  {
    id: 'love',
    name: 'LOVE',
    description: 'For late-night feelings',
    icon: '❤️',
    externalLinks: {"spotify": "https://open.spotify.com/search/love%20hindi"},
    tracks: [
      { id: 'love-t0', title: 'Mujhse Mohabbat Ka Izhaar', artist: 'Kumar Sanu', src: '/music/Mujhse_20Mohabbat_20Ka_20Izhaar_20_HD__EF_BD_9C_20Hum_20Hain_20Rahi_20Pyar_20Ke_20_1993__EF_BD_9C_20Aamir_20Khan_EF_BD_9C_20Juhi_20Chawla_EF_BD_9C_20Romantic_20Song.mp3' },
      { id: 'love-t1', title: 'Saaton Janam Main Tere', artist: 'Kumar Sanu', src: '/music/Saaton_20Janam_20Main_20Tere_20Full_20Lyrical_20_EF_BD_9CVideo_20Song_20_EF_BD_9C_20Dilwale_20_EF_BD_9C_20Ajay_20Devgan__20Raveena_20Tandon_20_EF_BD_9C_20Kumar_20Sanu.mp3' },
      { id: 'love-t2', title: 'Sochenge Tumhe Pyar', artist: 'Kumar Sanu', src: '/music/Sochenge_20Tumhe_20Pyar-_20Lyrical_20_EF_BD_9C_20_23Deewana_20_EF_BD_9C_20_23RishiKapoor__20Divya_20Bharti_20_EF_BD_9C_2090_s_20Best_20Song.mp3' },
      { id: 'love-t3', title: 'Woh Meri Neend Mera Chain', artist: 'Sadhana Sargam', src: '/music/Woh_20Meri_20Neend_20Mera_20Chain_20Lyrical_20-_20Hum_20Hain_20Rahi_20Pyar_20Ke_20_EF_BD_9C_20Aamir_20Khan__20Juhi_20Chawla_20_EF_BD_9C_20Sadhana_20Sargam.mp3' },
    ]
  }
];

export const AMBIENT_TRACKS = {
  engine: '/audio/engine.mp3',
  rain: '/audio/rain.mp3',
  road: '/audio/road.mp3',
  horn: '/music/audley_fergine-truck-horn-1-280798.mp3',
};
