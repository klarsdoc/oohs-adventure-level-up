'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Lock, Unlock, Zap, Music, Puzzle, Heart, RefreshCcw, BookOpen, Map, Video, CheckCircle, Flame, Server, Volume2, VolumeX, X, Maximize2 } from 'lucide-react';

// --- KONSTANTA KONFIGURASI APLIKASI ---
const AUTH_PIN = '0712';
const PRIMARY_DARK = '#0C0C1E';
const ACCENT_CYAN = '#00F0FF';
const ACCENT_ORANGE = '#FF9900';

// BACKGROUND MUSIC CONFIGURATION
const BACKGROUND_MUSIC_URL = 'https://controlled-apricot-hux1cukm4c.edgeone.app/James%20Arthur%20-%20Say%20You%20Won%27t%20Let%20Go.mp3';
const FALLBACK_MUSIC_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // Fallback untuk testing

// C4: THE GOLDEN COMPASS QUEST
const COMPASS_RIDDLES = [
  { question: "THE DAY WE BECAME 'US' (DDMMYYYY)?", answer: "20122022" },
  { question: "THE ICONIC PLACE IN OUR MOMENTS?", answer: "LAWANG SEWU" },
  { question: "THE CERTIFICATE DATE OF THAT MEMORABLE VIDEO COMPETITION (DDMMYYYY)?", answer: "02122022" },
];

// C3: OUR JOURNEY TRIVIA QUESTIONS
const TRIVIA_QUESTIONS = [
  { q: "WHICH IS NOT MY FAVORITE COLOR?", options: ["WHITE", "BROWN", "YELLOW", "BLUE"], a: "YELLOW" },
  { q: "WHAT DID YOU EAT ON OUR FIRST LUNCH TOGETHER?", options: ["GADO-GADO", "PECEL", "MI SUMATRA", "NASI GORENG"], a: "GADO-GADO" },
  { q: "WHERE DID I BUY OPENG?", options: ["DP MALL", "QUEEN CITY MALL", "THE PARK MALL", "TENTREM MALL"], a: "DP MALL" },
  { q: "WHAT IS MY FAVOURITE FLAVOUR?", options: ["TARO", "CHOCOLATE", "RED VELVET", "CHEESE"], a: "TARO" },
  { q: "HOW LONG HAVE WE BEEN DATING?", options: ["1085 DAYS", "1048 DAYS", "1038 DAYS", "1084 DAYS"], a: "1084 DAYS" },
  { q: "WHAT WAS OUR FIRST MOVIE DATE?", options: ["JOHN WICK", "MISSION IMPOSSIBLE", "MEGAN", "JUMBO"], a: "MEGAN" },
  { q: "WHAT IS MY FAVORITE THING TO DO?", options: ["PLAYING MUSIC", "WATCHING MOVIES", "READING COMICS", "SINGING"], a: "READING COMICS" },
  { q: "HOW MANY CHILDREN DO I WANT TO HAVE?", options: ["0", "1", "2", "3"], a: "3" },
  { q: "WHAT IS MY BAPTISMAL NAME?", options: ["AGNES", "THERESIA", "MARIA", "SESILIA"], a: "THERESIA" },
  { q: "WHAT DAY WAS I BORN ON?", options: ["THURSDAY", "FRIDAY", "SUNDAY", "SATURDAY"], a: "SUNDAY" },
];

// C1: THE SOUNDTRACK OF US
const SONG_GUESS = {
  lyrics: "KUT'RIMA SURATMU, T'LAH KUBACA, DAN AKU MENGERTI.. BETAPA MERINDUNYA DIRIMU AKAN HADIRNYA DIRIKU.. DI DALAM HARI-HARIMU.. BERSAMA LAGI..",
  answer: "KANGEN",
  photoUrl: 'https://5w1hindonesia.id/wp-content/uploads/2021/07/Kangen.jpg',
  songUrl: 'https://gleaming-plum-si2hhzjvhy.edgeone.app/Dewa%2019%20-%20Kangen%20(Official%20Audio)%20(1).mp3'
};

// C2: PIECE TOGETHER THE PIC
const PUZZLE_PHOTO_URL = 'https://circular-fuchsia-7fgxlhpbzv.edgeone.app/Happy%20Birthday_20251017_053512_0000.png';

// M1: THE MEMORY VAULT - 36 FOTO DENGAN JUDUL DAN CAPTION (DIURUT DARI PERTAMA SAMPAAI TERAKHIR)
const MONTHLY_MEMORIES = [
  {
    title: "FOTO KE-1: ADA APA DENGAN CINTA?",
    caption: "[1 of 36] Hayoo.. Siapa yang udah mulai suka di sini?",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/1.jpg',
  },
  {
    title: "FOTO KE-2: PUJI TUHAN, MENANG!",
    caption: "[2 of 36] Eits- siapa yang kesandung tangga waktu mau foto?",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/2.jpg',
  },
  {
    title: "FOTO KE-3: OUR DATE AT RACCOON CAFE",
    caption: "[3 of 36] Kaget gak tiba-tiba disamperin? :p",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/3.jpg',
  },
  {
    title: "FOTO KE-4: EDISI JALAN-JALAN KE PARAGON",
    caption: "[4 of 36] Habis itu ada yang foto sama Optimus Prime WKWKWK",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/4.jpg',
  },
  {
    title: "FOTO KE-5: ICIP-ICIP MALL BARU",
    caption: "[5 of 36] Finally ngedate dengan kaos couple! (walau sampai saat ini kaosnya itu mulu..)",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/5.jpg',
  },
  {
    title: "FOTO KE-6: MAIN KAGAK, NGEVLOG IYA.",
    caption: "[6 of 36] Gak pernah ngevlog, sekali ngevlog dibikin story berbagai editan :v",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/6.jpg',
  },
  {
    title: "FOTO KE-7: GA JAIMNYA KALO SEPI",
    caption: "[7 of 36] Hasil dari jepretan anak (yang sekarang) jurusan Film dan Televisi",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/7.jpg',
  },
  {
    title: "FOTO KE-8: DI LUAR PREDIKSI BMKG!",
    caption: "[8 of 36] Siapa sangka tiba-tiba diajak pergi dan udah OTW dijemput? :)",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/8.jpg',
  },
  {
    title: "FOTO KE-9: FOTO LEGENDARIS",
    caption: "[9 of 36] Ini sih foto kita yang paling 'legend'",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/9.jpg',
  },
  {
    title: "FOTO KE-10: BBQ NIGHT",
    caption: "[10 of 36] Seneng-seneng sih, tapi sedih ditinggal lulus :'(",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/10.jpg',
  },
  {
    title: "FOTO KE-11: UNEXPECTED..",
    caption: "[11 of 36] Niatnya graduasi malah reparasi ._.",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/11.png',
  },
  {
    title: "FOTO KE-12: TIBA-TIBA LARI PAGI?!",
    caption: "[12 of 36] Sepertinya ini akan menjadi yang pertama sekaligus terakhir..",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/12.jpg',
  },
  {
    title: "FOTO KE-13: VIP ROOM",
    caption: "[13 of 36] Selesai main PS maunya nobar, beliau malah tidur nyenyak ^^",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/13.jpg',
  },
  {
    title: "FOTO KE-14: MCDONALD'S JAGONYA ES KRIM",
    caption: "[14 of 36] Makan es krim dulu biar kuat melawan panasnya Semarang",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/14.jpg',
  },
  {
    title: "FOTO KE-15: HUNTING FOTO",
    caption: "[15 of 36] Baik banget deh mau nemenin pacarnya buat ngerjain tugas xixixi",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/15.jpg',
  },
  {
    title: "FOTO KE-16: NONTON DRIFT",
    caption: "[16 of 36] Seruu hehehe, mau lagi kok kalau diajak >.<",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/16.jpg',
  },
  {
    title: "FOTO KE-17: FIRST TIME MAIN KE RUMAH",
    caption: "[17 of 36] Garasi jadi batas suci, pelan-pelan berprogres ya dek ya",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/17.jpg',
  },
  {
    title: "FOTO KE-18: SEMUA YANG KAU LAKUKAN IS MAGIC",
    caption: "[18 of 36] Entah apa yang terjadi, si kaku ini tiba-tiba jago berpose..",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/18.webp',
  },
  {
    title: "FOTO KE-19: PURA-PURA JADI TEMEN SEANGKATAN",
    caption: "[19 of 36] Pura2 jadi temen seangkatan demi tugas 100 foto •_•",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/19.jpg',
  },
  {
    title: "FOTO KE-20: DAN YAP, PERPUS LAGI",
    caption: "[20 of 36] Tempat andalan pada masanya, sekarang sudah mulai terlupakan well",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/20.jpg',
  },
  {
    title: "FOTO KE-21: PECEL DATE",
    caption: "[21 of 36] Jujur aja telor gorengnya enak euy dimakan sama nasi pecelnya",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/21.jpg',
  },
  {
    title: "FOTO KE-22: JALAN-JALAN KE PARAGON EDISI TERBARU",
    caption: "[22 of 36] Nah bener kan, kaosnya itu lagi..",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/22.jpg',
  },
  {
    title: "FOTO KE-23: GIIAS PERTAMA DI MULADI DOME",
    caption: "[23 of 36] Pertama kali merasakan sensasi naik mobil harga 1 miliar :D",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/23.jpg',
  },
  {
    title: "FOTO KE-24: GAGAL ESTETIK",
    caption: "[24 of 36] Berniat fotbar dengan background langit, tapi kamera berkata lain",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/24.jpg',
  },
  {
    title: "FOTO KE-25: MERRY CHRISTMAS!",
    caption: "[25 of 36] Yeayy, seneng banget deh bisa ke Gereja bareng!",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/25.jpg',
  },
  {
    title: "FOTO KE-26: JENG JENG JENG",
    caption: "[26 of 36] Ini dia foto yang dijadikan PP WA Ooh",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/26.jpg',
  },
  {
    title: "FOTO KE-27: NAIK JAMUR APUNG",
    caption: "[27 of 36] Bagus kali lah foto-foto kita di jamur apung",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/27.jpg',
  },
  {
    title: "FOTO KE-28: PERTAMA KALI KE PASAR DUGDERAN",
    caption: "[28 of 36] Pengen street food night date kaya di pasar dugderan lagi :(",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/28.jpg',
  },
  {
    title: "FOTO KE-29: HAPPY VALENTINE'S DAY!",
    caption: "[29 of 36] Cheese! Ke Gereja bareng lagi!",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/29.jpg',
  },
  {
    title: "FOTO KE-30: NAIK MOBIL, NAIK TURUN TEMBALANG",
    caption: "[30 of 36] Gak jadi ngemall no problem, yang penting jadi drive-thru yuhuu",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/30.jpg',
  },
  {
    title: "FOTO KE-31: GANTIAN DP MALL JADI ANDALAN",
    caption: "[31 of 36] Berhasil mendapatkan tempat duduk setelah war dengan miliaran manusia",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/31.jpg',
  },
  {
    title: "FOTO KE-32: TOURING PERTAMA KE TELOMOYO",
    caption: "[32 of 36] NGL but enak banget makan mi di puncak HAHAHA",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/32.jpg',
  },
  {
    title: "FOTO KE-33: BEST GIFTS",
    caption: "[33 of 36] Terima kasih untuk hadiah-hadiahnya, Ayang!",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/33.jpg',
  },
  {
    title: "FOTO KE-34: TEBAK DI MANA?",
    caption: "[34 of 36] Tampaknya DP Mall sudah mulai beralih menjadi base camp..",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/34.jpg',
  },
  {
    title: "FOTO KE-35: BONDOL GIRLFRIEND ERA",
    caption: "[35 of 36] Suatu hari, pacarmu bertransformasi menjadi bondol",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/35.jpg',
  },
  {
    title: "FOTO KE-36: MIXUE YANG KE-1964728",
    caption: "[36 of 36] Momen sebelum Mixue tersaingi oleh Momoyo",
    photoUrl: 'https://burning-black-om1a31mbed.edgeone.app/36.jpg',
  },
];
// CORE MESSAGES
const INITIAL_GREETING_MESSAGE = `
ACCESS GRANTED: WELCOME, OOH.

MY DEAREST LOVE,

IF YOU ARE READING THIS, IT MEANS YOU HAVE SUCCESSFULLY NAVIGATED MY INITIAL PROTOCOLS.

HAPPY BIRTHDAY. THIS ISN'T JUST A WEBSITE; IT'S A TIME CAPSULE, A DIGITAL SHRINE TO THE 36 MONTHS OF CHAOS AND MAGIC WE'VE SHARED.

PLEASE TAKE YOUR TIME EXPLORING. EACH TASK IS A PIECE OF MY HEART. FINISH THE CHALLENGES, UNLOCK THE REWARDS, AND FIND THE ULTIMATE SURPRISE.

I LOVE YOU MORE THAN WORDS, MOST IN THE WORLD

NONIK
`;

const FINAL_SURPRISE_TEXT = 'PAYLOAD DEPLOYED: HAPPY BIRTHDAY, OOH 🥳❤️ SEMOGA DI USIA YANG BARU INI, OOH SELALU DIBERI KESEHATAN, UMUR YANG PANJANG, REZEKI YANG LANCAR, DAN KEBAHAGIAAN YANG TIDAK ADA HABISNYA. SEMOGA SEMUA MIMPI DAN HARAPAN OOH BISA TERCAPAI SATU PER SATU, LANGKAHNYA SELALU DIMUDAHKAN, DAN SELALU DIKELILINGI ORANG-ORANG YANG BAIK SAMA OOH. NONIK SANGAT BERSYUKUR KARENA BISA JADI PASANGAN OOH, LIHAT SENYUM OOH, DAN IKUT MENEMANI SETIAP PROSES YANG OOH JALANI. SEMOGA HARI INI PENUH MOMEN INDAH DAN DOA BAIK YANG MENGALIR BUAT OOH. NONIK AKAN SELALU ADA BUAT OOH DI SETIAP SUKA, DUKA, DAN PERJALANAN PANJANG KITA KE DEPAN. I LOVE U SO MUCH, OOH 🥰 KADO UTAMAMU ADALAH: X';

const VIDEO_URL_MOCK = 'https://hurt-red-q2169uba0g-f3pcge3nm9.edgeone.app/Its%20Your%20Birthday%20Today.mp4';

// --- UI UTILITY COMPONENTS ---
const TailwindStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
    .font-mono-terminal { font-family: 'Roboto Mono', monospace; }
    .bg-primary-dark { background-color: ${PRIMARY_DARK}; }
    .text-accent-cyan { color: ${ACCENT_CYAN}; }
    .border-accent-cyan { border-color: ${ACCENT_CYAN}; }
    .shadow-accent-cyan-light { box-shadow: 0 0 15px rgba(0, 240, 255, 0.4); }
    .text-accent-orange { color: ${ACCENT_ORANGE}; }
    .border-accent-orange { border-color: ${ACCENT_ORANGE}; }
    .shadow-accent-orange-light { box-shadow: 0 0 15px rgba(255, 153, 0, 0.4); }
    
    .pulsing-cyan {
        animation: pulse-cyan 1.5s infinite;
    }
    @keyframes pulse-cyan {
        0%, 100% { box-shadow: 0 0 5px ${ACCENT_CYAN}, 0 0 10px ${ACCENT_CYAN}; }
        50% { box-shadow: 0 0 10px ${ACCENT_CYAN}, 0 0 20px ${ACCENT_CYAN}; }
    }
    .pulsing-orange {
        animation: pulse-orange 1.5s infinite;
    }
    @keyframes pulse-orange {
        0%, 100% { box-shadow: 0 0 5px ${ACCENT_ORANGE}, 0 0 10px ${ACCENT_ORANGE}; }
        50% { box-shadow: 0 0 10px ${ACCENT_ORANGE}, 0 0 20px ${ACCENT_ORANGE}; }
    }
  `}</style>
);

const TerminalButton = ({ children, onClick, disabled = false, accent = 'cyan', className = '', type = 'button' }) => {
  const baseClasses = `
    ${className} font-mono-terminal tracking-wider uppercase py-3 px-6 rounded-lg transition-all duration-300 w-full md:w-auto
    border-2 text-sm md:text-base shadow-lg flex items-center justify-center
    ${accent === 'cyan'
      ? 'bg-cyan-900/20 text-accent-cyan border-accent-cyan hover:bg-cyan-800/40 shadow-accent-cyan-light'
      : 'bg-orange-900/20 text-accent-orange border-accent-orange hover:bg-orange-800/40 shadow-accent-orange-light'
    }
    ${disabled
      ? 'opacity-50 cursor-not-allowed bg-gray-800/50 border-gray-700 text-gray-500 shadow-none'
      : ''
    }
  `;

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClasses}>
      {children}
    </button>
  );
};

const ModuleCard = ({ title, status, icon: Icon, onClick, isLocked = false, isReward = false }) => {
  const isComplete = status === 'COMPLETE';
  const lockColor = isLocked ? 'text-gray-500' : (isComplete ? 'text-accent-cyan' : 'text-accent-orange');
  const lockBorder = isLocked ? 'border-gray-800 border-dashed' : (isComplete ? 'border-accent-cyan' : 'border-accent-orange');
  const lockBg = isLocked ? 'bg-gray-900/50' : (isComplete ? 'bg-cyan-900/10' : 'bg-orange-900/10 hover:bg-orange-900/20');
  const lockShadow = isComplete ? 'shadow-accent-cyan-light' : (isLocked ? '' : 'shadow-accent-orange-light');

  const handleClick = isLocked ? null : onClick;
  const accent = isComplete ? 'cyan' : (isLocked ? 'gray' : 'orange');

  return (
    <div
      onClick={handleClick}
      className={`p-4 rounded-xl border-2 transition-all duration-300 backdrop-blur-sm 
      cursor-${isLocked ? 'default' : 'pointer'}
      ${lockBorder} ${lockBg} ${lockShadow}
      flex flex-col justify-between h-full`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className={`text-xs font-mono-terminal tracking-widest ${lockColor}`}>
            {isReward ? 'REWARD CHAMBER' : 'MISSION MODULE'}
          </div>
          <h2 className={`text-xl font-bold uppercase ${isLocked ? 'text-gray-500' : 'text-white/90'}`}>{title}</h2>
        </div>
        <Icon className={`w-8 h-8 ${lockColor}`} />
      </div>
      <div className="mt-4">
        <div className={`text-xs font-mono-terminal tracking-wider ${lockColor}`}>
          STATUS: {isLocked ? 'LOCKED' : status}
        </div>
        {!isComplete && !isLocked && (
          <TerminalButton onClick={onClick} className="mt-3 !py-2 !text-xs !w-full" accent={accent}>
            ACCESS
          </TerminalButton>
        )}
        {isComplete && (
            <div className="mt-3 !py-2 !text-xs !w-full text-center border-2 border-green-500 bg-green-900/30 text-green-400 rounded-lg font-mono-terminal">
                <CheckCircle className="w-3 h-3 inline mr-1" /> COMPLETED
            </div>
        )}
      </div>
    </div>
  );
};

// --- CONGRATULATIONS CONFETTI COMPONENT ---
const ConfettiCelebration = ({ isVisible, onClose }) => {
  const [confettiPieces, setConfettiPieces] = useState([]);

  useEffect(() => {
    if (isVisible) {
      // Generate confetti pieces
      const pieces = [];
      const colors = ['#FF9900', '#00F0FF', '#FF006E', '#FFBE0B', '#FB5607', '#3A86FF', '#8338EC', '#06FFB4'];
      
      for (let i = 0; i < 100; i++) {
        pieces.push({
          id: i,
          left: Math.random() * 100,
          animationDelay: Math.random() * 2,
          animationDuration: 2 + Math.random() * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 5 + Math.random() * 10,
          rotation: Math.random() * 360,
        });
      }
      
      setConfettiPieces(pieces);
      
      // Auto-close after 3 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Confetti Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {confettiPieces.map((piece) => (
          <div
            key={piece.id}
            className="absolute animate-bounce"
            style={{
              left: `${piece.left}%`,
              top: '-20px',
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              backgroundColor: piece.color,
              animation: `confettiFall ${piece.animationDuration}s linear ${piece.animationDelay}s`,
              transform: `rotate(${piece.rotation}deg)`,
              opacity: 0.8,
            }}
          />
        ))}
      </div>
      
      {/* Congratulations Message */}
      <div className="relative z-10 text-center animate-pulse">
        <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-8 border-4 border-accent-cyan shadow-2xl shadow-accent-cyan/50">
          <h1 className="text-4xl md:text-6xl font-bold font-mono-terminal text-accent-cyan tracking-wider uppercase mb-4">
            CONGRATULATIONS!
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-mono-terminal">
            TASK COMPLETED SUCCESSFULLY!
          </p>
          <div className="mt-6 flex justify-center space-x-2">
            <CheckCircle className="w-8 h-8 text-green-400 animate-pulse" />
            <CheckCircle className="w-8 h-8 text-accent-cyan animate-pulse" style={{ animationDelay: '0.2s' }} />
            <CheckCircle className="w-8 h-8 text-accent-orange animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
      
      {/* CSS Animation */}
      <style jsx>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// --- BACKGROUND MUSIC MANAGER COMPONENT ---
const BackgroundMusicManager = ({ isVideoPlaying, currentStep, isSongPlaying }) => {
  const audioRef = useRef(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState(BACKGROUND_MUSIC_URL);
  const prevVideoPlaying = useRef(false);
  const prevSongPlaying = useRef(false);

  // Handle audio error and try fallback
  const handleAudioError = useCallback(() => {
    if (!audioError && currentAudioUrl === BACKGROUND_MUSIC_URL) {
      console.log('Primary audio failed, trying fallback...');
      setCurrentAudioUrl(FALLBACK_MUSIC_URL);
      setAudioError(true);
    } else {
      console.log('All audio sources failed');
    }
  }, [audioError, currentAudioUrl]);

  // Fade in effect for BGM
  const fadeInAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0;
      const targetVolume = isMuted ? 0 : volume;
      const fadeStep = 0.02;
      const fadeInterval = setInterval(() => {
        if (audioRef.current && audioRef.current.volume < targetVolume) {
          audioRef.current.volume = Math.min(audioRef.current.volume + fadeStep, targetVolume);
        } else {
          clearInterval(fadeInterval);
        }
      }, 100);
    }
  }, [volume, isMuted]);

  // Initialize audio
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(currentAudioUrl);
      audio.loop = true;
      audio.volume = 0;
      audio.addEventListener('error', handleAudioError);
      audioRef.current = audio;
    }
  }, [currentAudioUrl, handleAudioError]);

  // Handle music play/pause based on video, song, and auth state
  useEffect(() => {
    if (audioRef.current) {
      if (isVideoPlaying || isSongPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      } else if (currentStep !== 'AUTH' && currentStep !== 'VIDEO') {
        // Check if we should fade in
        const videoJustEnded = prevVideoPlaying.current && !isVideoPlaying;
        const songJustEnded = prevSongPlaying.current && !isSongPlaying;
        
        if (!isMusicPlaying) {
          // Music is not playing, start it
          if (videoJustEnded || songJustEnded || currentStep === 'GREETING') {
            // Start with fade in
            audioRef.current.volume = 0;
            audioRef.current.play().catch(error => {
              console.log('Auto-play prevented:', error);
            });
            setIsMusicPlaying(true);
            fadeInAudio();
          }
        }
        // If music is already playing, let it continue normally (no interruption for menu navigation)
      }
      
      // Update previous states
      prevVideoPlaying.current = isVideoPlaying;
      prevSongPlaying.current = isSongPlaying;
    }
  }, [isVideoPlaying, isSongPlaying, currentStep, isMusicPlaying, fadeInAudio]);

  // Handle volume change
  useEffect(() => {
    if (audioRef.current && isMusicPlaying) {
      audioRef.current.volume = volume;
    }
  }, [volume, isMusicPlaying]);

  // Toggle music play/pause
  const toggleMusic = () => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }
    
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        audioRef.current.volume = isMuted ? 0 : volume;
        audioRef.current.play().then(() => {
          setIsMusicPlaying(true);
        }).catch(error => {
          console.log('Play prevented:', error);
        });
      }
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }
    
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
        // Start playing if not already playing
        if (!isMusicPlaying && currentStep !== 'AUTH' && currentStep !== 'VIDEO') {
          audioRef.current.play().then(() => {
            setIsMusicPlaying(true);
          }).catch(error => {
            console.log('Play prevented:', error);
          });
        }
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  // Start music after authentication with user interaction trigger
  useEffect(() => {
    if (currentStep !== 'AUTH' && currentStep !== 'VIDEO' && !isVideoPlaying && !isSongPlaying && hasUserInteracted && !isMusicPlaying) {
      // Delay to ensure smooth transition
      const timer = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.volume = volume; // No fade for initial start
          audioRef.current.play().then(() => {
            setIsMusicPlaying(true);
          }).catch(error => {
            console.log('Auto-play prevented:', error);
          });
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isVideoPlaying, isSongPlaying, hasUserInteracted, isMusicPlaying, volume]);

  // Don't show music controls during auth and video
  if (currentStep === 'AUTH' || currentStep === 'VIDEO') {
    return (
      <audio
        ref={audioRef}
        src={currentAudioUrl}
        loop
        preload="auto"
        onError={handleAudioError}
      />
    );
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={currentAudioUrl}
        loop
        preload="auto"
        onError={handleAudioError}
      />
      
      {/* Enhanced Music Controls */}
      <div className="fixed top-4 right-4 z-50 flex flex-col items-end space-y-2">
        {/* Audio Error Indicator */}
        {audioError && (
          <div className="bg-red-900/90 backdrop-blur-sm border border-red-500/50 rounded-lg px-3 py-2 mb-2">
            <p className="text-xs text-red-400 font-mono-terminal">⚠️ Using fallback audio</p>
          </div>
        )}
        
        {/* Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          className="p-3 bg-gray-900/80 backdrop-blur-sm border border-accent-cyan/50 rounded-full text-accent-cyan hover:bg-accent-cyan/20 transition-all duration-300 shadow-lg"
          title={isMuted ? "Unmute Music" : "Mute Music"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>
      </div>
    </>
  );
};

// --- PHASE 1: PIN AUTHENTICATION ---
const AuthView = ({ setAuthReady }) => {
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('INITIATING SECURITY GATE. ENTER PIN.');
  const [statusColor, setStatusColor] = useState('text-accent-cyan');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInput = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
    setPin(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin.length !== 4 || isProcessing) return;

    setIsProcessing(true);
    setMessage('VALIDATING CREDENTIALS...');
    setStatusColor('text-accent-cyan');

    setTimeout(() => {
      if (pin === AUTH_PIN) {
        setMessage('ACCESS GRANTED. PROCEEDING TO TRANSMISSION.');
        setStatusColor('text-green-400');
        setTimeout(() => setAuthReady(true), 1500);
      } else {
        setMessage('AUTHENTICATION FAILED. INVALID PIN. RETRY.');
        setStatusColor('text-accent-orange');
        setPin('');
        setIsProcessing(false);
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-primary-dark">
      <h1 className="text-4xl md:text-5xl font-extrabold font-mono-terminal text-white tracking-widest uppercase mb-4">
        OOH'S ADVENTURE
      </h1>
      <h2 className="text-lg md:text-xl font-mono-terminal tracking-wider uppercase mb-8 text-accent-cyan">
        LEVEL UP
      </h2>

      <div className="w-full max-w-sm p-6 rounded-xl border-2 border-accent-orange bg-gray-900/70 shadow-accent-orange-light backdrop-blur-sm">
        <p className={`text-sm font-mono-terminal tracking-wider mb-6 ${statusColor}`}>{message}</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={pin}
            onChange={handleInput}
            maxLength="4"
            placeholder="ENTER PIN"
            className="w-full text-center text-2xl font-mono-terminal tracking-[0.5em] text-white bg-black/50 border-b-4 border-accent-orange p-3 mb-6 focus:outline-none focus:border-white transition"
            autoFocus
            disabled={isProcessing}
          />
          <TerminalButton type="submit" disabled={pin.length !== 4 || isProcessing} accent="orange" className="w-full">
            {isProcessing ? 'PROCESSING...' : 'INITIATE ACCESS'}
          </TerminalButton>
        </form>
      </div>
    </div>
  );
};

// --- PHASE 2: MANDATORY VIDEO TRANSMISSION ---
const VideoView = ({ setStep, setIsVideoPlaying }) => {
  const [videoEnded, setVideoEnded] = useState(false);
  const [isInteracted, setIsInteracted] = useState(false); 
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    setIsVideoPlaying(false);
  };

  const handlePlay = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play().catch(error => {
        console.error("Playback failed:", error);
      });
      setIsInteracted(true); 
      setIsVideoPlaying(true);
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('ended', handleVideoEnd);
    }
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-primary-dark">
      <h1 className="text-2xl font-mono-terminal text-accent-cyan uppercase mb-4 text-center">INITIAL TRANSMISSION: MANDATORY</h1>
      <p className="text-sm font-mono-terminal text-white/70 mb-6 text-center">PROCESSING CRITICAL DATA FEED. AUDIO ENABLED (REQUIRES USER INTERACTION).</p>

      <div className="w-full max-w-xl aspect-video bg-gray-900 border-2 border-accent-cyan rounded-lg shadow-accent-cyan-light backdrop-blur-sm">
        <video
          ref={videoRef}
          src={VIDEO_URL_MOCK}
          controls={isInteracted}
          className="w-full h-full rounded-lg"
          onEnded={handleVideoEnd}
          onPlay={() => setIsVideoPlaying(true)}
          onPause={() => setIsVideoPlaying(false)}
        >
          Your browser does not support the video tag.
        </video>
      </div>

     <div className='mt-8 flex flex-col items-center space-y-4 w-full max-w-xl'>
        {!isInteracted && (
          <TerminalButton
            onClick={handlePlay}
            className={`!py-4 text-lg pulsing-orange`}
            accent="orange"
          >
            INITIATE VIDEO PLAY (REQUIRED FOR AUDIO)
          </TerminalButton>
        )}
        
        <TerminalButton
          onClick={() => setStep('GREETING')}
          disabled={!videoEnded}
          className={`${videoEnded ? 'pulsing-cyan' : ''}`}
          accent="cyan"
        >
          {videoEnded ? 'PROCEED TO GREETING' : 'WAIT FOR TRANSMISSION END'}
        </TerminalButton>
      </div>
    </div>
  );
};

// --- PHASE 3: POST-VIDEO GREETING CARD ---
const GreetingView = ({ setStep }) => {
  const [scrolled, setScrolled] = useState(false);
  const letterRef = useRef(null);

  const handleScroll = () => {
    if (letterRef.current) {
      const { scrollTop } = letterRef.current;
      // Set scrolled to true when user scrolls more than 10px
      if (scrollTop > 10 && !scrolled) {
        setScrolled(true);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-primary-dark">
      <div className="w-full max-w-xl p-6 rounded-xl border-4 border-accent-cyan bg-gray-900/90 shadow-2xl shadow-accent-cyan-light backdrop-blur-sm">
        <h1 className="text-2xl font-mono-terminal text-accent-cyan uppercase mb-4 text-center border-b border-accent-cyan pb-2">
          PERSONAL GREETING CARD: DECRYPTED
        </h1>

        <div className="relative">
          <div
            ref={letterRef}
            onScroll={handleScroll}
            className="h-96 overflow-y-auto p-4 bg-black/50 rounded-lg text-white/90 font-mono-terminal text-sm leading-relaxed"
          >
            <pre className="whitespace-pre-wrap">{INITIAL_GREETING_MESSAGE}</pre>
          </div>
          
          {/* Vignette effect at bottom - only visible when scroll text is visible */}
          {!scrolled && (
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 via-black/50 via-black/30 to-transparent pointer-events-none"></div>
          )}
          
          {/* Floating indicator - only visible when not scrolled */}
          {!scrolled && (
            <div className="absolute bottom-4 left-0 right-0 text-center text-accent-orange font-mono-terminal text-sm animate-pulse">
              [SCROLL DOWN TO READ FULL MESSAGE]
            </div>
          )}
        </div>

        <TerminalButton
          onClick={() => setStep('HUB')}
          disabled={!scrolled}
          className={`mt-6 ${scrolled ? 'pulsing-cyan' : ''}`}
          accent="cyan"
        >
          {scrolled ? 'PROCEED TO MISSION HUB' : 'FINISH READING'}
        </TerminalButton>
      </div>
    </div>
  );
};

// --- MODULE 1: THE MEMORY VAULT ---
const MemoryVaultModule = ({ completeModule, setCurrentStep }) => {
  const handleExit = () => {
    completeModule('MEMORY_VAULT');
    setCurrentStep('HUB');
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-mono-terminal text-accent-cyan uppercase mb-6 text-center">
        M1: THE MEMORY VAULT
      </h1>
      <p className="text-gray-400 text-sm mb-6 text-center uppercase">VERTICAL TIMELINE: 36 MONTHS OF LEVELING UP TOGETHER.</p>

      <div className="relative border-l-4 border-accent-cyan/50 ml-4 pl-4 h-[75vh] overflow-y-scroll custom-scrollbar">
        {MONTHLY_MEMORIES.map((memory, index) => (
          <div key={index} className={`mb-8 relative`}>
            <div className={`absolute -left-7 top-0 w-4 h-4 rounded-full bg-accent-cyan border-2 border-primary-dark shadow-accent-cyan-light pulsing-cyan`}></div>
            
            <div className="p-6 bg-gray-900/80 rounded-lg border border-accent-cyan/50 shadow-md hover:shadow-accent-cyan-light transition-all duration-300">
              <h3 className="text-lg font-bold text-accent-cyan uppercase mb-2">{memory.title}</h3>
              <p className="text-sm text-white/80 mb-4 leading-relaxed">{memory.caption}</p>
              <div className="flex justify-center">
                <img 
                  src={memory.photoUrl} 
                  alt={`Memory ${memory.title}`} 
                  className="w-48 h-48 object-cover rounded-lg border-2 border-gray-700 hover:border-accent-cyan transition-all duration-300 cursor-pointer hover:scale-105"
                  onClick={() => window.open(memory.photoUrl, '_blank')}
                />
              </div>
            </div>
          </div>
        ))}
        <div className="h-4"></div>
      </div>
      
      <TerminalButton onClick={handleExit} accent="cyan" className="mt-6">
        EXIT MEMORY VAULT
      </TerminalButton>
    </div>
  );
};

// --- MODULE C1: THE SOUNDTRACK OF US ---
const SongGuessModule = ({ completeModule, setIsSongPlaying, setCurrentStep, setShowConfetti }) => {
  const [input, setInput] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  const [message, setMessage] = useState('INPUT SONG TITLE.');
  const [isVerifying, setIsVerifying] = useState(false);
  const songAudioRef = useRef(null);

  // Reset state when component mounts or revisits
  useEffect(() => {
    setIsSolved(false);
    setInput('');
    setMessage('INPUT SONG TITLE.');
    setIsVerifying(false);
    if (songAudioRef.current) {
      songAudioRef.current.pause();
      songAudioRef.current.currentTime = 0;
    }
    setIsSongPlaying(false);
  }, [setIsSongPlaying]);

  // Fade in effect for Kangen song
  const fadeInSong = useCallback(() => {
    if (songAudioRef.current) {
      songAudioRef.current.volume = 0;
      const targetVolume = 0.5;
      const fadeStep = 0.02;
      const fadeInterval = setInterval(() => {
        if (songAudioRef.current && songAudioRef.current.volume < targetVolume) {
          songAudioRef.current.volume = Math.min(songAudioRef.current.volume + fadeStep, targetVolume);
        } else {
          clearInterval(fadeInterval);
        }
      }, 100);
    }
  }, []);

  // Fade out effect for Kangen song
  const fadeOutSong = useCallback((callback) => {
    if (songAudioRef.current) {
      const initialVolume = songAudioRef.current.volume;
      const fadeStep = 0.02;
      const fadeInterval = setInterval(() => {
        if (songAudioRef.current && songAudioRef.current.volume > 0) {
          songAudioRef.current.volume = Math.max(songAudioRef.current.volume - fadeStep, 0);
        } else {
          clearInterval(fadeInterval);
          if (callback) callback();
        }
      }, 100);
    } else if (callback) {
      callback();
    }
  }, []);

  const checkAnswer = (e) => {
    e.preventDefault();
    const cleanInput = input.trim().toUpperCase();
    const cleanAnswer = SONG_GUESS.answer.toUpperCase();

    // Start verifying process
    setIsVerifying(true);
    setMessage('VERIFYING ANSWER...');

    // Simulate verification delay
    setTimeout(() => {
      if (cleanInput === cleanAnswer) {
        setMessage('VALIDATION SUCCESSFUL. ACCESS GRANTED.');
        setIsSolved(true);
        setIsSongPlaying(true); // Set song playing state
        // Play the song with fade in when solved
        if (songAudioRef.current) {
          songAudioRef.current.volume = 0;
          songAudioRef.current.play().then(() => {
            fadeInSong();
          }).catch(error => {
            console.log('Song play prevented');
          });
        }
        
        // Show congratulations immediately when answer is verified
        completeModule('C1_SONG');
      } else {
        setMessage('ERROR: SONG TITLE INVALID. RESTART ATTEMPT.');
        setInput('');
        setIsVerifying(false);
      }
    }, 1000); // 1 second delay for verification
  };

  const handleReturnToHub = () => {
    // Stop the song immediately when returning to hub (no fade out for manual return)
    if (songAudioRef.current) {
      songAudioRef.current.pause();
      songAudioRef.current.currentTime = 0;
    }
    setIsSongPlaying(false); // Reset song playing state
    // Hide confetti before returning to hub
    setShowConfetti(false);
    // Return to hub
    setCurrentStep('HUB');
  };

  return (
    <div className="flex flex-col items-center p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-mono-terminal text-accent-cyan uppercase mb-4">C1: THE SOUNDTRACK OF US</h1>
      <p className="text-gray-400 text-sm mb-6 text-center uppercase">OBJECTIVE: IDENTIFY THE SONG.</p>

      <div className="w-full p-4 bg-gray-900 border border-accent-cyan/50 rounded-lg mb-6 shadow-md">
        <p className="text-lg font-bold italic text-white text-center">
          "{SONG_GUESS.lyrics}"
        </p>
      </div>

      {!isSolved ? (
        <form onSubmit={checkAnswer} className="w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            placeholder="SONG TITLE"
            className="w-full p-3 mb-4 text-center text-lg font-mono-terminal text-white bg-black/50 border-b-2 border-accent-cyan/80 focus:outline-none focus:border-white"
            autoFocus
            disabled={isVerifying}
          />
          <TerminalButton type="submit" disabled={!input || isVerifying} accent="orange" className="w-full">
            {isVerifying ? 'VERIFYING...' : 'VERIFY ANSWER'}
          </TerminalButton>
          <p className={`mt-4 text-center text-sm font-mono-terminal ${isSolved ? 'text-green-400' : 'text-accent-orange'}`}>{message}</p>
        </form>
      ) : (
        <div className="mt-8 text-center animate-pulse">
          <div className="text-xl font-mono-terminal text-green-400 tracking-wider mb-4">
            SONG UNLOCKED: "{SONG_GUESS.answer}"
          </div>
          <img src={SONG_GUESS.photoUrl} alt="Song Memory Photo" className="w-full rounded-lg object-cover border-2 border-green-500 shadow-xl shadow-green-500/30" />
          <TerminalButton onClick={handleReturnToHub} className="mt-6" accent="cyan">
            RETURN TO HUB
          </TerminalButton>
        </div>
      )}
      
      {/* Hidden audio element for the song */}
      <audio
        ref={songAudioRef}
        src={SONG_GUESS.songUrl}
        onEnded={() => {
          // Song ended naturally, fade out first then update state
          fadeOutSong(() => {
            setIsSongPlaying(false);
          });
        }}
      />
    </div>
  );
};

// --- MODULE C2: PIECE TOGETHER THE PIC ---
const PhotoPuzzleModule = ({ completeModule, setCurrentStep, setShowConfetti }) => {
  const SIZE = 3; // Changed from 4 to 3
  const TOTAL_TILES = SIZE * SIZE; // Now 9 tiles instead of 16
  const solvedGrid = useMemo(() => Array.from({ length: TOTAL_TILES }, (_, i) => i), [TOTAL_TILES]);
  const [grid, setGrid] = useState(solvedGrid);
  const [isSolved, setIsSolved] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHinting, setIsHinting] = useState(false);
  const [isSurrendering, setIsSurrendering] = useState(false);

  // Reset state when component mounts or revisits
  useEffect(() => {
    setGrid(solvedGrid);
    setIsSolved(false);
    setImageLoaded(false);
    setIsHinting(false);
    setIsSurrendering(false);
  }, [solvedGrid]);

  // Auto-load puzzle after 2 seconds to prevent infinite loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const checkWin = useCallback((currentGrid) => currentGrid.every((val, index) => val === solvedGrid[index]), [solvedGrid]);
  const swapTiles = (currentGrid, index1, index2) => {
    const newGrid = [...currentGrid];
    [newGrid[index1], newGrid[index2]] = [newGrid[index2], newGrid[index1]];
    return newGrid;
  };

  // Find tiles that are in wrong positions
  const getWrongTiles = useCallback(() => {
    return grid.map((tileValue, index) => ({
      currentIndex: index,
      correctIndex: tileValue,
      isWrong: tileValue !== index
    })).filter(item => item.isWrong && item.correctIndex !== TOTAL_TILES - 1);
  }, [grid, TOTAL_TILES]);

  // Hint function: move a few tiles to correct positions
  const giveHint = useCallback(() => {
    if (isSolved || isHinting || isSurrendering) return;
    
    setIsHinting(true);
    const wrongTiles = getWrongTiles();
    
    if (wrongTiles.length > 0) {
      // Fix 2-3 tiles that are closest to their correct positions
      const tilesToFix = wrongTiles
        .map(tile => ({
          ...tile,
          distance: Math.abs(tile.currentIndex - tile.correctIndex)
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, Math.min(3, wrongTiles.length));

      let newGrid = [...grid];
      
      tilesToFix.forEach((tile, index) => {
        setTimeout(() => {
          const blankIndex = newGrid.indexOf(TOTAL_TILES - 1);
          const targetIndex = tile.correctIndex;
          
          // Simple swap to move tile closer to correct position
          if (blankIndex !== targetIndex) {
            newGrid = swapTiles(newGrid, blankIndex, targetIndex);
            setGrid([...newGrid]);
          }
          
          // Check if solved after hint
          if (checkWin(newGrid)) {
            setIsSolved(true);
            // Don't auto complete module - let user click return to hub manually
          }
          
          if (index === tilesToFix.length - 1) {
            setIsHinting(false);
          }
        }, (index + 1) * 500); // Animate each move
      });
    } else {
      setIsHinting(false);
    }
  }, [grid, isSolved, isHinting, isSurrendering, getWrongTiles, checkWin, TOTAL_TILES]);

  // Surrender function: solve the puzzle automatically
  const surrender = useCallback(() => {
    if (isSolved || isSurrendering) return;
    
    setIsSurrendering(true);
    
    // Animate tiles to correct positions one by one like hint
    const solvedGrid = Array.from({ length: TOTAL_TILES }, (_, i) => i);
    const animationSteps = [];
    
    // Create animation steps for each tile moving to correct position
    for (let step = 0; step < TOTAL_TILES; step++) {
      animationSteps.push(solvedGrid.slice(0, step + 1));
    }
    
    // Animate each step
    animationSteps.forEach((stepGrid, index) => {
      setTimeout(() => {
        setGrid(stepGrid);
        
        // On final step, mark as solved and complete
        if (index === animationSteps.length - 1) {
          setIsSolved(true);
          setIsSurrendering(false);
          // Don't auto complete module - let user click return to hub manually
        }
      }, index * 200); // 200ms delay between each tile movement
    });
  }, [grid, isSolved, isSurrendering, TOTAL_TILES]);

  const shuffleGrid = useCallback(() => {
    let newGrid = [...solvedGrid];
    for (let i = newGrid.length - 2; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      [newGrid[i], newGrid[j]] = [newGrid[j], newGrid[i]];
    }
    const blankIndex = newGrid.indexOf(TOTAL_TILES - 1);
    if (blankIndex !== TOTAL_TILES - 1) {
      newGrid = swapTiles(newGrid, blankIndex, TOTAL_TILES - 1);
    }

    setGrid(newGrid);
    setIsSolved(false);
  }, [solvedGrid, TOTAL_TILES]);

  useEffect(() => { shuffleGrid(); }, [shuffleGrid]);

  const handleTileClick = (index) => {
    if (isSolved) return;

    const blankIndex = grid.indexOf(TOTAL_TILES - 1);
    const [row, col] = [Math.floor(index / SIZE), index % SIZE];
    const [blankRow, blankCol] = [Math.floor(blankIndex / SIZE), blankIndex % SIZE];

    const isAdjacent = (
      (Math.abs(row - blankRow) === 1 && col === blankCol) ||
      (Math.abs(col - blankCol) === 1 && row === blankRow)
    );

    if (isAdjacent) {
      const newGrid = swapTiles(grid, index, blankIndex);
      setGrid(newGrid);
      if (checkWin(newGrid)) {
        setIsSolved(true);
        // Don't auto complete module - let user click return to hub manually
      }
    }
  };

  const tileStyle = (tileValue) => {
    if (tileValue === TOTAL_TILES - 1) return {};
    const tileIndex = tileValue;
    const row = Math.floor(tileIndex / SIZE);
    const col = tileIndex % SIZE;
    
    // For 3x3 grid, we need to position the background correctly
    // Each tile should show 1/3 of the image
    const offsetX = col * (100 / (SIZE - 1)); // 0%, 50%, 100%
    const offsetY = row * (100 / (SIZE - 1)); // 0%, 50%, 100%

    return {
      backgroundImage: `url(${PUZZLE_PHOTO_URL})`,
      backgroundSize: `${SIZE * 100}% ${SIZE * 100}%`, // 300% x 300%
      backgroundPosition: `${offsetX}% ${offsetY}%`,
      width: '100%',
      height: '100%',
      backgroundRepeat: 'no-repeat',
    };
  };

  return (
    <div className="flex flex-col items-center p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-mono-terminal text-accent-cyan uppercase mb-4">C2: PIECE TOGETHER THE PIC</h1>
      <p className="text-gray-400 text-sm mb-6 text-center uppercase">OBJECTIVE: REASSEMBLE THE 3X3 PHOTO GRID. BEGINNER DIFFICULTY.</p>

      {/* Preview Image */}
      <div className="mb-6 text-center">
        <p className="text-xs text-accent-orange mb-2">REFERENCE IMAGE:</p>
        <img 
          src={PUZZLE_PHOTO_URL} 
          alt="Reference" 
          className="w-32 h-32 object-cover rounded-lg border-2 border-accent-orange mx-auto"
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div className="w-full max-w-sm aspect-square relative mb-8 p-1 bg-gray-900 border-4 border-gray-700 rounded-lg shadow-inner shadow-gray-800">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-lg">
            <p className="text-accent-cyan font-mono-terminal text-sm">LOADING IMAGE...</p>
          </div>
        )}
        <div
          className={`grid gap-1 transition-all duration-300 ${isSolved ? 'shadow-lg shadow-accent-cyan-light' : ''}`}
          style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)` }}
        >
          {grid.map((tileValue, index) => (
            <div
              key={index}
              onClick={() => handleTileClick(index)}
              className={`
                aspect-square transition-all duration-150 rounded-sm overflow-hidden text-white/80
                ${tileValue === TOTAL_TILES - 1
                  ? 'bg-black opacity-0 pointer-events-none'
                  : 'bg-gray-800 border-2 border-gray-700 hover:scale-[1.02] active:scale-98 cursor-pointer'
                }
              `}
              style={tileStyle(tileValue)}
            />
          ))}
        </div>
      </div>

      <TerminalButton onClick={shuffleGrid} disabled={isSolved} accent="orange" className="!w-64 mb-4">
        <RefreshCcw className="w-4 h-4 mr-2 inline" /> RESTART SHUFFLE
      </TerminalButton>

      {/* Hint and Surrender Buttons */}
      <div className="flex gap-3 justify-center mb-4">
        <TerminalButton 
          onClick={giveHint} 
          disabled={isSolved || isHinting || isSurrendering} 
          accent="cyan" 
          className="!w-32"
        >
          {isHinting ? 'HINTING...' : 'HINT'}
        </TerminalButton>
        <TerminalButton 
          onClick={surrender} 
          disabled={isSolved || isHinting || isSurrendering} 
          accent="orange" 
          className="!w-32"
        >
          {isSurrendering ? 'SOLVING...' : 'SURRENDER'}
        </TerminalButton>
      </div>

      {/* Status Messages */}
      {!isSolved && (isHinting || isSurrendering) && (
        <div className="text-center mb-4">
          <p className="text-sm font-mono-terminal text-accent-cyan animate-pulse">
            {isHinting ? 'MOVING TILES TO CORRECT POSITIONS...' : 'AUTO-SOLVING PUZZLE...'}
          </p>
        </div>
      )}

      {isSolved && (
        <div className="mt-8 text-center animate-pulse">
          <div className="text-3xl font-mono-terminal text-green-400 tracking-wider mb-4 border-b-2 border-green-500 pb-2">
            PUZZLE SUCCESS!
          </div>
          <p className="text-xl font-extrabold text-white bg-green-700 p-4 rounded-lg shadow-2xl shadow-green-500/50">
            "YOUR PHOTO PUZZLE IS COMPLETED."
          </p>
          <TerminalButton onClick={() => {
            completeModule('C2_PUZZLE');
            setCurrentStep('HUB');
          }} className="mt-6" accent="cyan">
            RETURN TO HUB
          </TerminalButton>
        </div>
      )}
    </div>
  );
};

// --- MODULE C3: OUR JOURNEY TRIVIA ---
const TriviaModule = ({ completeModule, setCurrentStep, setShowConfetti }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showAnswerReveal, setShowAnswerReveal] = useState(false);

  // Reset state when component mounts or revisits
  useEffect(() => {
    setCurrentQ(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
    setShowAnswerReveal(false);
  }, []);

  const handleAnswer = (option) => {
    if (showResult) return;
    setSelectedOption(option);

    if (option === TRIVIA_QUESTIONS[currentQ].a) {
      setScore(prev => prev + 1);
    }

    // Show answer reveal immediately after selection
    setShowAnswerReveal(true);

    setTimeout(() => {
      setShowAnswerReveal(false);
      if (currentQ < TRIVIA_QUESTIONS.length - 1) {
        setCurrentQ(prev => prev + 1);
        setSelectedOption(null);
      } else {
        // Quiz completed, show results
        setShowResult(true);
        // Don't auto complete module - let user click return to hub manually
      }
    }, 2000); // Show answer for 2 seconds before moving to next question
  };

  const handleAcquire = () => {
    completeModule('C3_TRIVIA');
    setCurrentStep('HUB');
  };

  const currentQuestion = TRIVIA_QUESTIONS[currentQ];
  const isCorrect = selectedOption === currentQuestion.a;

  if (showResult) {
    const finalMessage = score === 10
      ? "ACCESS GRANTED: TRUE WINNER! 100% HEART KNOWLEDGE!"
      : score >= 7
        ? "VALIDATED: HIGH KNOWLEDGE. EXCELLENT WORK."
        : "LOW KNOWLEDGE: BUT KEEP LOVING ME ANYWAY! TRY AGAIN SOMETIME.";
    const resultColor = score === 10 ? 'text-green-400' : 'text-accent-orange';

    return (
      <div className="flex flex-col items-center p-4 max-w-md mx-auto text-center">
        <h1 className="text-3xl font-mono-terminal text-accent-cyan uppercase mb-4">TRIVIA RESULT</h1>
        <div className={`text-5xl font-extrabold mb-4 ${resultColor}`}>{score} / 10</div>
        <p className={`text-xl font-mono-terminal mb-8 ${resultColor} border-b-2 pb-2`}>{finalMessage}</p>
        <TerminalButton onClick={handleAcquire} accent="cyan">
          RETURN TO HUB
        </TerminalButton>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-mono-terminal text-accent-cyan uppercase mb-4 text-center">C3: OUR JOURNEY TRIVIA</h1>
      <p className="text-gray-400 text-sm mb-6 text-center uppercase">QUESTION {currentQ + 1} OF 10. TEST YOUR LOVE KNOWLEDGE.</p>

      <div className="p-4 bg-gray-900 border border-accent-cyan/50 rounded-lg shadow-md mb-6">
        <p className="text-lg font-bold text-white/90 text-center uppercase">{currentQuestion.q}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {currentQuestion.options.map((option, index) => {
          const isCorrectOption = option === currentQuestion.a;
          const isSelectedOption = option === selectedOption;
          let buttonClasses = 'bg-gray-800 hover:bg-gray-700 text-white border-gray-700';
          let btnAccent = 'orange';

          if (selectedOption) {
            if (isSelectedOption) {
              buttonClasses = isCorrectOption ? 'bg-green-700 border-green-500' : 'bg-red-700 border-red-500';
              btnAccent = isCorrectOption ? 'cyan' : 'orange';
            } else if (isCorrectOption) {
              buttonClasses = 'bg-green-600 border-green-400';
            } else {
              buttonClasses = 'bg-gray-900/50 text-gray-500 border-gray-800';
            }
          }

          return (
            <TerminalButton
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={!!selectedOption}
              accent={btnAccent}
              className={`!py-4 !text-base !font-normal ${buttonClasses}`}
            >
              {option.toUpperCase()}
            </TerminalButton>
          );
        })}
      </div>

      {/* Answer Reveal Section */}
      {showAnswerReveal && selectedOption && (
        <div className="p-4 bg-gray-800 border-2 rounded-lg animate-pulse mb-6">
          {isCorrect ? (
            <div className="text-center space-y-2">
              <div className="text-2xl">✅</div>
              <p className="text-lg font-bold text-green-400">CORRECT!</p>
              <p className="text-sm text-white/80">Your answer: {selectedOption.toUpperCase()}</p>
              <p className="text-sm text-green-300">This is the correct answer!</p>
            </div>
          ) : (
            <div className="text-center space-y-2">
              <div className="text-2xl">❌</div>
              <p className="text-lg font-bold text-red-400">WRONG!</p>
              <p className="text-sm text-white/80">Your answer: {selectedOption.toUpperCase()}</p>
              <p className="text-sm text-yellow-300">The correct answer: {currentQuestion.a.toUpperCase()}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// --- MODULE C4: THE GOLDEN COMPASS QUEST ---
const CompassQuestModule = ({ completeModule, setCurrentStep, setShowConfetti }) => {
  const [currentRiddle, setCurrentRiddle] = useState(0);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('INITIATE COMPASS QUEST: ANSWER THE RIDDLE.');
  const [isSolved, setIsSolved] = useState(false);

  // Reset state when component mounts or revisits
  useEffect(() => {
    setCurrentRiddle(0);
    setInput('');
    setMessage('INITIATE COMPASS QUEST: ANSWER THE RIDDLE.');
    setIsSolved(false);
  }, []);

  const riddle = COMPASS_RIDDLES[currentRiddle];

  const checkAnswer = (e) => {
    e.preventDefault();
    const cleanInput = input.trim().toUpperCase().replace(/\s/g, '');
    const cleanAnswer = riddle.answer.toUpperCase().replace(/\s/g, '');

    if (cleanInput === cleanAnswer) {
      if (currentRiddle < COMPASS_RIDDLES.length - 1) {
        setMessage(`RIDDLE ${currentRiddle + 1} CLEARED. PROCEEDING...`);
        setInput('');
        setTimeout(() => {
          setCurrentRiddle(prev => prev + 1);
          setMessage(`RIDDLE ${currentRiddle + 2}: INPUT DATA.`);
        }, 1000);
      } else {
        // For the final riddle, show "PROCEEDING..." first, then success message
        setMessage('RIDDLE 3 CLEARED. PROCEEDING...');
        setInput('');
        setTimeout(() => {
          setMessage('QUEST COMPLETE. ALL COMPASS DATA ACQUIRED.');
          setIsSolved(true);
          // Don't auto complete module - let user click return to hub manually
        }, 1000);
      }
    } else {
      // Show proceeding first even for wrong answers
      setMessage('PROCEEDING...');
      setInput('');
      setTimeout(() => {
        setMessage('ERROR: DATA MISMATCH. TRY AGAIN.');
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-mono-terminal text-accent-cyan uppercase mb-4">C4: GOLDEN COMPASS QUEST</h1>
      <p className="text-gray-400 text-sm mb-6 text-center uppercase">STEP {currentRiddle + 1} OF 3. INPUT THE CORRECT KEYWORD.</p>

      <div className="w-full p-4 bg-gray-900 border border-accent-orange rounded-lg shadow-md mb-6">
        <p className="text-lg font-bold text-white/90 text-center">{riddle.question}</p>
      </div>

      {!isSolved ? (
        <form onSubmit={checkAnswer} className="w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            placeholder="YOUR ANSWER"
            className="w-full p-3 mb-4 text-center text-lg font-mono-terminal text-white bg-black/50 border-b-2 border-accent-orange/80 focus:outline-none focus:border-white"
            autoFocus
          />
          <TerminalButton type="submit" disabled={!input} accent="orange" className="w-full">
            VERIFY DATA
          </TerminalButton>
          <p className={`mt-4 text-center text-sm font-mono-terminal ${isSolved ? 'text-green-400' : 'text-accent-orange'}`}>{message}</p>
        </form>
      ) : (
        <div className="mt-8 text-center animate-pulse">
          <div className="text-3xl font-mono-terminal text-green-400 tracking-wider mb-4 border-b-2 border-green-500 pb-2">
            QUEST COMPLETE!
          </div>
          <p className="text-xl font-extrabold text-white bg-green-700 p-4 rounded-lg shadow-2xl shadow-green-500/50">
            "YOU HAVE A GOOD MEMORY!"
          </p>
          <TerminalButton onClick={() => {
            completeModule('C4_COMPASS');
            setCurrentStep('HUB');
          }} className="mt-6" accent="cyan">
            RETURN TO HUB
          </TerminalButton>
        </div>
      )}
    </div>
  );
};

// --- MODULE C5: SWEETEST CATCH (ARCADE) ---
const SweetestCatchModule = ({ completeModule, setCurrentStep }) => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('MAX SCORE: 20. CATCH HEARTS, AVOID BOMBS!');

  const GAME_WIDTH = 300;
  const GAME_HEIGHT = 400;
  const BASKET_WIDTH = 60;
  const BASKET_HEIGHT = 10;
  const ITEM_SIZE = 15;
  const TARGET_SCORE = 20;

  const basket = useRef({ x: GAME_WIDTH / 2 - BASKET_WIDTH / 2, y: GAME_HEIGHT - BASKET_HEIGHT - 10 });
  const items = useRef([]);
  let lastTime = 0;
  const spawnInterval = 1000;
  let timeSinceLastSpawn = 0;

  const resetGame = () => {
    setScore(0);
    items.current = [];
    basket.current.x = GAME_WIDTH / 2 - BASKET_WIDTH / 2;
    setGameOver(false);
    setIsPlaying(true);
    setMessage('GAME STARTED! CATCH ' + TARGET_SCORE + ' HEARTS!');
    lastTime = 0;
    timeSinceLastSpawn = 0;
    requestAnimationFrame(gameLoop);
  };

  const drawBasket = (ctx) => {
    ctx.fillStyle = ACCENT_CYAN;
    ctx.fillRect(basket.current.x, basket.current.y, BASKET_WIDTH, BASKET_HEIGHT);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.strokeRect(basket.current.x, basket.current.y, BASKET_WIDTH, BASKET_HEIGHT);
  };

  const drawItem = (ctx, item) => {
    ctx.font = `${ITEM_SIZE}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (item.type === 'heart') {
      ctx.fillStyle = 'red';
      ctx.fillText('♥', item.x, item.y);
    } else {
      ctx.fillStyle = ACCENT_ORANGE;
      ctx.fillText('💣', item.x, item.y);
    }
  };

  const updateItems = (delta) => {
    items.current = items.current.filter(item => {
      item.y += 0.1 * delta;

      if (item.y > basket.current.y - ITEM_SIZE && item.y < basket.current.y + BASKET_HEIGHT) {
        if (item.x > basket.current.x && item.x < basket.current.x + BASKET_WIDTH) {
          if (item.type === 'heart') {
            setScore(prev => prev + 1);
            return false;
          } else {
            setGameOver(true);
            setMessage('GAME OVER! BOMB HIT. SCORE RESET.');
            setIsPlaying(false);
            return false;
          }
        }
      }

      if (item.y > GAME_HEIGHT) {
        return false;
      }
      return true;
    });
  };

  const spawnItem = () => {
    const isBomb = Math.random() < 0.3;
    items.current.push({
      x: Math.random() * (GAME_WIDTH - ITEM_SIZE) + ITEM_SIZE / 2,
      y: 0,
      type: isBomb ? 'bomb' : 'heart'
    });
  };

  const gameLoop = (time) => {
    if (!isPlaying || gameOver) return;

    const delta = time - lastTime;
    lastTime = time;
    const ctx = canvasRef.current.getContext('2d');

    ctx.fillStyle = PRIMARY_DARK;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    updateItems(delta);
    items.current.forEach(item => drawItem(ctx, item));
    drawBasket(ctx);

    timeSinceLastSpawn += delta;
    if (timeSinceLastSpawn > spawnInterval) {
      spawnItem();
      timeSinceLastSpawn = 0;
    }

    if (score >= TARGET_SCORE) {
      setGameOver(true);
      setIsPlaying(false);
      setMessage('VICTORY! ALL HEARTS COLLECTED!');
      return;
    }

    requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    if (isPlaying && !gameOver) {
      requestAnimationFrame(gameLoop);
    }
  }, [isPlaying, gameOver]);

  useEffect(() => {
    if (!isPlaying) return;

    const handleMouseMove = (e) => {
      const rect = canvasRef.current.getBoundingClientRect();
      let newX = e.clientX - rect.left - BASKET_WIDTH / 2;
      newX = Math.max(0, Math.min(newX, GAME_WIDTH - BASKET_WIDTH));
      basket.current.x = newX;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const rect = canvasRef.current.getBoundingClientRect();
        let newX = e.touches[0].clientX - rect.left - BASKET_WIDTH / 2;
        newX = Math.max(0, Math.min(newX, GAME_WIDTH - BASKET_WIDTH));
        basket.current.x = newX;
        e.preventDefault();
      }
    };

    const canvas = canvasRef.current;
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center p-4 max-w-sm mx-auto">
      <h1 className="text-2xl font-mono-terminal text-accent-cyan uppercase mb-4">C5: SWEETEST CATCH</h1>
      <p className="text-gray-400 text-sm mb-6 text-center uppercase">{message}</p>

      <div className="mb-4 text-white font-mono-terminal text-lg">SCORE: <span className={score >= TARGET_SCORE ? 'text-green-400' : 'text-accent-orange'}>{score}</span> / {TARGET_SCORE}</div>

      <canvas
        ref={canvasRef}
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
        className={`bg-gray-900 border-4 rounded-lg shadow-xl mb-6
          ${gameOver ? 'border-red-500 shadow-red-500/50' : 'border-accent-cyan shadow-accent-cyan-light'}`}
      />

      {score >= TARGET_SCORE && (
        <div className="mt-4 text-center animate-pulse">
          <div className="text-2xl font-mono-terminal text-green-400 tracking-wider mb-2 border-b-2 border-green-500 pb-2">
            MISSION COMPLETE!
          </div>
          <p className="text-lg font-extrabold text-white bg-green-700 p-3 rounded-lg shadow-2xl shadow-green-500/50 mb-4">
            "ALL HEARTS SUCCESSFULLY CAUGHT!"
          </p>
        </div>
      )}

      {score >= TARGET_SCORE ? (
        <TerminalButton onClick={() => {
            completeModule('C5_ARCADE');
            setCurrentStep('HUB');
          }} accent="cyan" className="pulsing-cyan">
          RETURN TO HUB
        </TerminalButton>
      ) : (
        <TerminalButton onClick={resetGame} disabled={isPlaying} accent={gameOver ? 'orange' : 'cyan'} className="!w-full">
          {gameOver ? 'RESTART GAME' : 'START CATCHING'}
        </TerminalButton>
      )}
    </div>
  );
};

// --- MODULE: VIDEO CHAMBER (REWARD) ---
const VideoChamberModule = ({ completeModule, setIsVideoPlaying, setCurrentStep }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);
  
  // Single compiled video for the commemoration feed
  const videoThumbnails = [
    {
      id: 1,
      title: "THE COMMEMORATION FEED",
      thumbnail: "https://placehold.co/150x100/1E1E30/FF9900?text=COMMEMORATION+FEED",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    }
  ];
  
  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setIsVideoPlaying(true); // Pause BGM when video opens
  };
  
  const handleCloseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setSelectedVideo(null);
    setIsVideoPlaying(false); // Resume BGM with fade in when video closes
  };
  
  const handleVideoEnded = () => {
    setIsVideoPlaying(false); // Resume BGM with fade in when video ends naturally
  };
  
  const handleVideoPlay = () => {
    setIsVideoPlaying(true); // Pause BGM when video starts playing
  };
  
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-mono-terminal text-accent-cyan uppercase mb-6 text-center">
        R1: THE COMMEMORATION FEEDS
      </h1>
      <p className="text-gray-400 text-sm mb-6 text-center uppercase">SELECT A MEMORY FEED TO PLAY</p>
      
<div className="mb-6">
        <div className="w-full">
          {videoThumbnails.map((video) => (
          <div
            key={video.id}
            onClick={() => handleVideoClick(video)}
            className="cursor-pointer group relative overflow-hidden rounded-lg border-2 border-accent-cyan/30 hover:border-accent-cyan transition-all duration-300 bg-gray-900/50 hover:bg-gray-900/70 w-full"
          >
            <div className="aspect-video relative w-full">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-accent-cyan/80 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Video className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <p className="text-xs font-mono-terminal text-accent-cyan p-2 text-center uppercase">{video.title}</p>
          </div>
        ))}
        </div>
      </div>
      
      <TerminalButton onClick={() => {
        completeModule('VIDEO_CHAMBER');
        setCurrentStep('HUB');
      }} accent="cyan" className="mt-8">
        CLOSE FEED AND RETURN
      </TerminalButton>
      
      {/* Video Popup Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={handleCloseVideo}>
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleCloseVideo}
              className="absolute -top-12 right-0 text-white hover:text-accent-cyan transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl border-2 border-accent-cyan">
              <div className="p-4 border-b border-accent-cyan/30">
                <h3 className="text-lg font-mono-terminal text-accent-cyan uppercase">{selectedVideo.title}</h3>
              </div>
              
              <div className="relative aspect-video bg-black">
                <video
                  ref={videoRef}
                  src={selectedVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full"
                  playsInline
                  onPlay={handleVideoPlay}
                  onEnded={handleVideoEnded}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              
              <div className="p-4 bg-gray-800/50 flex justify-between items-center">
                <p className="text-sm text-gray-400 font-mono-terminal uppercase">Video Feed {selectedVideo.id}</p>
                <button
                  onClick={handleCloseVideo}
                  className="px-3 py-2 bg-accent-orange/20 hover:bg-accent-orange/30 text-accent-orange rounded-lg transition-colors font-mono-terminal text-sm uppercase"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- PHASE 4: MISSION HUB ---
const CentralHub = ({ moduleStatus, allChallengesComplete, videoChamberUnlocked, challengesUnlocked, finaleUnlocked, setStep }) => {
  const challengesCompleteCount = ['C1_SONG', 'C2_PUZZLE', 'C3_TRIVIA', 'C4_COMPASS', 'C5_ARCADE']
    .filter(key => moduleStatus[key] === 'COMPLETE').length;

  const totalChallenges = 5;

  const getModuleStatus = (key) => moduleStatus[key] || 'PENDING';

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-extrabold font-mono-terminal text-white tracking-widest uppercase mb-4">
        MISSION HUB
      </h1>
      <h2 className="text-lg md:text-xl font-mono-terminal tracking-wider uppercase mb-6 text-accent-cyan">
        STATUS: SECURED
      </h2>

      <div className="mb-10 p-4 rounded-xl border-2 border-accent-cyan/50 bg-gray-900/70">
        <h3 className="text-xl font-mono-terminal text-accent-cyan tracking-wider mb-3 uppercase flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" /> CHALLENGE PROGRESS
        </h3>
        <p className="text-2xl font-bold text-white/90">{challengesCompleteCount} / {totalChallenges}</p>
        <div className="w-full bg-gray-800 rounded-full h-3.5 mt-2 border border-gray-700">
          <div
            className="h-3.5 rounded-full bg-accent-cyan shadow-md shadow-accent-cyan-light transition-all duration-500"
            style={{ width: `${(challengesCompleteCount / totalChallenges) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-mono-terminal text-accent-cyan tracking-wider uppercase mb-4 border-b border-accent-cyan pb-2 flex items-center">
          <Server className="w-5 h-5 mr-2" /> CORE ARCHIVES (MEMORIES)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ModuleCard
            title="THE MEMORY VAULT (36 MONTHS)"
            status={getModuleStatus('MEMORY_VAULT')}
            icon={BookOpen}
            onClick={() => setStep('MEMORY_VAULT')}
            isGame={false}
          />
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-mono-terminal text-accent-orange tracking-wider uppercase mb-4 border-b border-accent-orange pb-2 flex items-center">
          <Zap className="w-5 h-5 mr-2" /> SIMULATION ARENA (5 CHALLENGES)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ModuleCard title="C1: THE SOUNDTRACK OF US" status={getModuleStatus('C1_SONG')} icon={Music} onClick={() => setStep('C1_SONG')} isLocked={!challengesUnlocked} />
          <ModuleCard title="C2: PIECE TOGETHER THE PIC (3x3 GRID)" status={getModuleStatus('C2_PUZZLE')} icon={Puzzle} onClick={() => setStep('C2_PUZZLE')} isLocked={!challengesUnlocked} />
          <ModuleCard title="C3: OUR JOURNEY TRIVIA (10 QUESTIONS)" status={getModuleStatus('C3_TRIVIA')} icon={Zap} onClick={() => setStep('C3_TRIVIA')} isLocked={!challengesUnlocked} />
          <ModuleCard title="C4: GOLDEN COMPASS QUEST (3 STEP)" status={getModuleStatus('C4_COMPASS')} icon={Map} onClick={() => setStep('C4_COMPASS')} isLocked={!challengesUnlocked} />
          <ModuleCard title="C5: SWEETEST CATCH (ARCADE GAME)" status={getModuleStatus('C5_ARCADE')} icon={Heart} onClick={() => setStep('C5_ARCADE')} isLocked={!challengesUnlocked} />
        </div>
      </div>

       <div className="mb-28"> 
        <h3 className="text-xl font-mono-terminal text-accent-cyan tracking-wider uppercase mb-4 border-b border-accent-cyan pb-2 flex items-center">
          <Video className="w-5 h-5 mr-2" /> REWARD CHAMBER (SPECIALLY MADE FOR YOU)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ModuleCard
            title="R1: THE COMMEMORATION FEEDS"
            status={videoChamberUnlocked ? getModuleStatus('VIDEO_CHAMBER') : 'LOCKED'}
            icon={Video}
            onClick={() => setStep('VIDEO_CHAMBER')}
            isLocked={!videoChamberUnlocked}
            isReward={true}
          />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-primary-dark border-t border-accent-orange/50 shadow-inner shadow-accent-orange-light">
        <TerminalButton
          onClick={() => finaleUnlocked && setStep('FINALE')}
          disabled={!finaleUnlocked}
          accent={finaleUnlocked ? 'orange' : 'cyan'}
          className={`w-full !py-4 text-lg ${finaleUnlocked ? 'pulsing-orange' : ''}`}
        >
          {finaleUnlocked ? 'REVEAL ULTIMATE SURPRISE (PAYLOAD DEPLOYMENT)' : `FINAL PAYLOAD LOCKED (${challengesCompleteCount}/${totalChallenges} CHALLENGES)`}
        </TerminalButton>
      </div>
    </div>
  );
};

// --- PHASE 5: THE ULTIMATE REWARD (FINALE) ---
const FinaleView = ({ setStep }) => {
  const [decrypted, setDecrypted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDecrypt = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setDecrypted(true);
      setIsProcessing(false);
    }, 2000);
  };

  if (!decrypted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-primary-dark">
        <h1 className="text-4xl font-mono-terminal text-accent-orange tracking-widest uppercase mb-10 pulsing-orange">
          FINAL PAYLOAD READY
        </h1>
        <p className="text-xl font-mono-terminal text-white/70 mb-8 text-center">
          ALL CHALLENGES COMPLETE. INITIATE ULTIMATE REWARD DECRYPTION.
        </p>
        <TerminalButton onClick={handleDecrypt} disabled={isProcessing} accent="orange" className="!w-64 !py-4 text-xl">
          {isProcessing ? 'DECRYPTING...' : 'INITIATE REVEAL'}
        </TerminalButton>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-primary-dark">
      <h1 className="text-4xl md:text-5xl font-extrabold font-mono-terminal text-green-400 tracking-widest uppercase mb-8">
        ULTIMATE REWARD UNLOCKED
      </h1>

      <div className="w-40 h-40 border-8 border-green-500 rounded-full flex items-center justify-center relative my-8 pulsing-cyan">
        <Flame className="w-12 h-12 text-green-400 animate-pulse" />
      </div>

      <div className="w-full max-w-lg p-6 rounded-xl border-4 border-green-500 bg-green-900/20 shadow-2xl shadow-green-500/50 backdrop-blur-sm">
        <p className="text-xl font-mono-terminal text-white whitespace-pre-wrap">{FINAL_SURPRISE_TEXT}</p>
      </div>

      <TerminalButton onClick={() => setStep('HUB')} className="mt-8 !bg-green-700 !border-green-500" accent="cyan">
        ARCHIVE PAYLOAD & RETURN
      </TerminalButton>
    </div>
  );
};

// --- MAIN APPLICATION COMPONENT ---
const App = () => {
  const [currentStep, setCurrentStep] = useState('AUTH');
  const [authReady, setAuthReady] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const [moduleStatus, setModuleStatus] = useState({
    MEMORY_VAULT: 'PENDING',
    C1_SONG: 'PENDING',
    C2_PUZZLE: 'PENDING',
    C3_TRIVIA: 'PENDING',
    C4_COMPASS: 'PENDING',
    C5_ARCADE: 'PENDING',
    VIDEO_CHAMBER: 'PENDING',
  });
  const [recentlyCompletedModule, setRecentlyCompletedModule] = useState(null);

  const completeModule = useCallback((moduleName) => {
    // Check if module is already completed (except MEMORY_VAULT, VIDEO_CHAMBER, and C1_SONG which can be revisited)
    const wasAlreadyCompleted = moduleStatus[moduleName] === 'COMPLETE';
    
    if (moduleName !== 'MEMORY_VAULT' && moduleName !== 'VIDEO_CHAMBER' && moduleName !== 'C1_SONG' && wasAlreadyCompleted) {
        setCurrentStep('HUB');
        return;
    }

    // Update module status to complete
    setModuleStatus(prev => ({
      ...prev,
      [moduleName]: 'COMPLETE'
    }));
    
    // Track recently completed module for congratulations in hub
    if (!wasAlreadyCompleted && ['C1_SONG', 'C2_PUZZLE', 'C3_TRIVIA', 'C4_COMPASS', 'C5_ARCADE'].includes(moduleName)) {
      setRecentlyCompletedModule(moduleName);
    }
  }, [moduleStatus, setCurrentStep]);

  const videoChamberUnlocked = ['C1_SONG', 'C2_PUZZLE', 'C3_TRIVIA', 'C4_COMPASS', 'C5_ARCADE']
    .every(key => moduleStatus[key] === 'COMPLETE');
  const allChallengesComplete = ['C1_SONG', 'C2_PUZZLE', 'C3_TRIVIA', 'C4_COMPASS', 'C5_ARCADE']
    .every(key => moduleStatus[key] === 'COMPLETE');
  const challengesUnlocked = moduleStatus.MEMORY_VAULT === 'COMPLETE';
  const finaleUnlocked = videoChamberUnlocked && moduleStatus.VIDEO_CHAMBER === 'COMPLETE';

  // Show congratulations when returning to hub after completing a module
  useEffect(() => {
    if (currentStep === 'HUB' && recentlyCompletedModule) {
      setShowConfetti(true);
      // Clear the recently completed module after showing congratulations
      const timer = setTimeout(() => {
        setRecentlyCompletedModule(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, recentlyCompletedModule]);

  useEffect(() => {
    if (authReady && currentStep === 'AUTH') {
      setCurrentStep('VIDEO');
    }
  }, [authReady, currentStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 'AUTH':
        return <AuthView setAuthReady={setAuthReady} />;
      case 'VIDEO':
        return <VideoView setStep={setCurrentStep} setIsVideoPlaying={setIsVideoPlaying} />;
      case 'GREETING':
        return <GreetingView setStep={setCurrentStep} />;
  case 'HUB':
        return (
          <CentralHub
            moduleStatus={moduleStatus}
            allChallengesComplete={allChallengesComplete}
            videoChamberUnlocked={videoChamberUnlocked}
            challengesUnlocked={challengesUnlocked}
            finaleUnlocked={finaleUnlocked}
            setStep={setCurrentStep}
          />
        );
      case 'MEMORY_VAULT':
        return <MemoryVaultModule completeModule={completeModule} setCurrentStep={setCurrentStep} />;
      case 'C1_SONG':
        return <SongGuessModule completeModule={completeModule} setIsSongPlaying={setIsSongPlaying} setCurrentStep={setCurrentStep} setShowConfetti={setShowConfetti} />;
      case 'C2_PUZZLE':
        return <PhotoPuzzleModule completeModule={completeModule} setCurrentStep={setCurrentStep} setShowConfetti={setShowConfetti} />;
      case 'C3_TRIVIA':
        return <TriviaModule completeModule={completeModule} setCurrentStep={setCurrentStep} setShowConfetti={setShowConfetti} />;
      case 'C4_COMPASS':
        return <CompassQuestModule completeModule={completeModule} setCurrentStep={setCurrentStep} setShowConfetti={setShowConfetti} />;
      case 'C5_ARCADE':
        return <SweetestCatchModule completeModule={completeModule} setCurrentStep={setCurrentStep} />;
      case 'VIDEO_CHAMBER':
        if (videoChamberUnlocked) {
          return <VideoChamberModule completeModule={completeModule} setIsVideoPlaying={setIsVideoPlaying} setCurrentStep={setCurrentStep} />;
        }
        return <div className="text-accent-orange font-mono-terminal text-center pt-20">ACCESS DENIED. COMPLETE C4 FIRST.</div>;
      case 'FINALE':
        if (finaleUnlocked) {
          return <FinaleView setStep={setCurrentStep} />;
        }
 return <div className="text-accent-orange font-mono-terminal text-center pt-20">ULTIMATE REWARD LOCKED. COMPLETE ALL CHALLENGES.</div>;
      default:
        return <div className="text-red-500 font-mono-terminal text-center pt-20">SYSTEM ERROR: UNKNOWN STEP.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-primary-dark text-white font-sans overflow-x-hidden">
      <TailwindStyle />
      <BackgroundMusicManager isVideoPlaying={isVideoPlaying} currentStep={currentStep} isSongPlaying={isSongPlaying} />
      {renderStep()}
      <ConfettiCelebration isVisible={showConfetti} onClose={() => setShowConfetti(false)} />
    </div>
  );
};

export default function Home() {
  return <App />;
}