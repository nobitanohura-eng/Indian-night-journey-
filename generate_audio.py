import json

TRACKS = [
    ("Ae Kash Ke Hum", "Kumar Sanu", "Ae_20Kash_20Ke_20Hum_20Full_20Video_20-_20Kabhi_20Haan_20Kabhi_20Naa_20_EF_BD_9C_20Shah_20Rukh_20Khan__20Suchitra_20_EF_BD_9C_20Kumar_20Sanu.mp3"),
    ("Chori Chori Dil Tera", "Kumar Sanu", "Chori_20Chori_20Dil_20Tera_20_HD__20-_20Kumar_20Sanu_20Songs_20-_20Romantic_20Songs_20-_2090_s_20Love_20Song.mp3"),
    ("Is Tarah Aashiqui Ka", "Kumar Sanu", "Is_20Tarah_20Aashiqui_20Ka_20Lyrical_20_EF_BD_9C_20Imtihan_20_EF_BD_9C_20Kumar_20Sanu_20_EF_BD_9C_20Saif_20Ali_20Khan__20Raveena_20Tandon_20_EF_BD_9C_20Anu_20Malik.mp3"),
    ("Kitna Haseen Chehra", "Kumar Sanu", "Kitna_20Haseen_20Chehra_20Full_20Lyrical_20Video_20Song_20_EF_BD_9C_20Dilwale_20_EF_BD_9C_20Ajay_20Devgan__20Raveena_20Tandon_20_EF_BD_9C_20Kumar_20Sanu.mp3"),
    ("Mujhse Mohabbat Ka Izhaar", "Kumar Sanu", "Mujhse_20Mohabbat_20Ka_20Izhaar_20_HD__EF_BD_9C_20Hum_20Hain_20Rahi_20Pyar_20Ke_20_1993__EF_BD_9C_20Aamir_20Khan_EF_BD_9C_20Juhi_20Chawla_EF_BD_9C_20Romantic_20Song.mp3"),
    ("Pehli Pehli Baar Mohabbat Ki Hai", "Kumar Sanu", "Pehli_20Pehli_20Baar_20Mohabbat_20Ki_20Hai_20Full_20Video_20Song_20_EF_BD_9C_20Sirf_20Tum_EF_BD_9CKumar_20Sanu_Alka_20Yagnik_EF_BD_9CSanjay_20K__20Priya_20G.mp3"),
    ("Saaton Janam Main Tere", "Kumar Sanu", "Saaton_20Janam_20Main_20Tere_20Full_20Lyrical_20_EF_BD_9CVideo_20Song_20_EF_BD_9C_20Dilwale_20_EF_BD_9C_20Ajay_20Devgan__20Raveena_20Tandon_20_EF_BD_9C_20Kumar_20Sanu.mp3"),
    ("Sochenge Tumhe Pyar", "Kumar Sanu", "Sochenge_20Tumhe_20Pyar-_20Lyrical_20_EF_BD_9C_20_23Deewana_20_EF_BD_9C_20_23RishiKapoor__20Divya_20Bharti_20_EF_BD_9C_2090_s_20Best_20Song.mp3"),
    ("Tu Jo Hans Hans Ke", "Udit Narayan", "Tu_20Jo_20Hans_20Hans_20Ke_20HD_20_EF_BD_9C_20Govinda__20Aarti_20Chabria_20_EF_BD_9CUdit_20Narayan__20Kavita_20Krishnamurthy_20_EF_BD_9CRaja_20Bhaiya_20Song.mp3"),
    ("Tumhein Dekhen Meri Aankhen", "Kumar Sanu", "Tumhein_20Dekhen_20Meri_20Aankhen_20_EF_BD_9C_20Divya_20Bharti_20_EF_BD_9C_20Kumar_20Sanu_20_EF_BD_9C_20Alka_20Yagnik_20_EF_BD_9C_20Rang_20Song_20_EF_BD_9C_2090_s_20Sad_20Song.mp3"),
    ("Woh Meri Neend Mera Chain", "Sadhana Sargam", "Woh_20Meri_20Neend_20Mera_20Chain_20Lyrical_20-_20Hum_20Hain_20Rahi_20Pyar_20Ke_20_EF_BD_9C_20Aamir_20Khan__20Juhi_20Chawla_20_EF_BD_9C_20Sadhana_20Sargam.mp3"),
]

playlists = [
    {
        "id": "old-retro",
        "name": "OLD RETRO",
        "description": "Songs from another journey",
        "icon": "📼",
        "externalLinks": {"spotify": "https://open.spotify.com/search/old%20retro%20hindi"},
        "tracks": []
    },
    {
        "id": "90s-era",
        "name": "90s ERA",
        "description": "Cassette-era nights",
        "icon": "📻",
        "externalLinks": {"spotify": "https://open.spotify.com/search/90s%20hindi"},
        "tracks": []
    },
    {
        "id": "sad-nights",
        "name": "SAD NIGHTS",
        "description": "For quiet roads and thoughts after midnight",
        "icon": "🌙",
        "externalLinks": {"spotify": "https://open.spotify.com/search/sad%20hindi"},
        "tracks": []
    },
    {
        "id": "love",
        "name": "LOVE",
        "description": "For late-night feelings",
        "icon": "❤️",
        "externalLinks": {"spotify": "https://open.spotify.com/search/love%20hindi"},
        "tracks": []
    },
    {
        "id": "highway",
        "name": "HIGHWAY",
        "description": "Long roads, steady speed",
        "icon": "🛣️",
        "externalLinks": {"spotify": "https://open.spotify.com/search/highway%20drive"},
        "tracks": []
    }
]

# Distribute them
playlists[0]["tracks"].extend([TRACKS[0], TRACKS[1]])
playlists[1]["tracks"].extend([TRACKS[3], TRACKS[5], TRACKS[8]])
playlists[2]["tracks"].extend([TRACKS[2], TRACKS[9]])
playlists[3]["tracks"].extend([TRACKS[4], TRACKS[6], TRACKS[7], TRACKS[10]])

content = """import { Playlist } from '../types';

export const MUSIC_PLAYLISTS: Playlist[] = [
"""

for p in playlists:
    content += f"  {{\n    id: '{p['id']}',\n    name: '{p['name']}',\n    description: '{p['description']}',\n    icon: '{p['icon']}',\n    externalLinks: {json.dumps(p['externalLinks'])},\n    tracks: [\n"
    for i, t in enumerate(p['tracks']):
        content += f"      {{ id: '{p['id']}-t{i}', title: '{t[0]}', artist: '{t[1]}', src: '/music/{t[2]}' }},\n"
    content += "    ]\n  },\n"

content += """];

export const AMBIENT_TRACKS = {
  engine: '/audio/engine.mp3',
  rain: '/audio/rain.mp3',
  road: '/audio/road.mp3',
  horn: '/music/audley_fergine-truck-horn-1-280798.mp3',
};
"""

with open("src/constants/audio.ts", "w") as f:
    f.write(content)

