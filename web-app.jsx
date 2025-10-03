import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Lock, Unlock, Zap, Music, Puzzle, Heart, RefreshCcw, BookOpen, Map, Video, CheckCircle, Flame, Server } from 'lucide-react';

// --- KONSTANTA KONFIGURASI APLIKASI (WAJIB DIUBAH) ---
const AUTH_PIN = '0712'; // PIN 4 digit untuk akses
const PRIMARY_DARK = '#0C0C1E'; // Deep Space Black
const ACCENT_CYAN = '#00F0FF'; // Electric Cyan
const ACCENT_ORANGE = '#FF9900'; // Bright Orange
useState, useEffect, useCallback, useMemo, useRef } from 'react';
// C4: THE GOLDEN COMPASS QUEST
const COMPASS_RIDDLES = [
  { question: "THE DAY WE BECAME 'US' (DDMMYYYY)?", answer: "20122022" },
  { question: "THE ICONIC PLACE IN OUR MOMENTS?", answer: "LAWANG SEWU" },
  { question: "THE CERTIFICATE DATE OF THAT MEMORABLE VIDEO COMPETITION (DDMMYYYY)?", answer: "02122022" },
];

// C3: OUR JOURNEY TRIVIA QUESTIONS (10 QUESTIONS)
const TRIVIA_QUESTIONS = [
  { q: "WHICH IS NOT MY FAVORITE COLOR?", options: ["WHITE", "BROWN", "YELLOW", "BLUE"], a: "YELLOW" },
  { q: "WHAT DID YOU EAT ON OUR FIRST LUNCH TOGETHER?", options: ["GADO-GADO", "PECEL", "MI SUMATRA", "NASI GORENG"], a: "GADO-GADO" },
  { q: "WHERE DID I BUY OPENG?", options: ["DP MALL", "QUEEN CITY MALL", "THE PARK MALL", "TENTREM MALL"], a: "DP MALL" },
  { q: "WHAT IS MY FAVOURITE FLAVOUR?", options: ["TARO", "CHOCOLATE", "RED VELVET", "CHEESE"], a: "TARO" },
  { q: "HOW LONG HAVE WE BEEN DATING?", options: ["1085 DAYS", "1048 DAYS", "1038 DAYS", "1084 DAYS"], a: "1084 DAYS" },
  { q: "WHWHWH?", options: ["JAKARTA", "BALI", "TOKYO", "LONDON"], a: "TOKYO" },
  { q: "WHAT iS MY FAVORITE THING TO DO?", options: ["PLAYING MUSIC", "WATCHING MOVIES", "READING COMICS", "SINGING"], a: "READING COMICS" },
  { q: "HOW MANY CHILDREN DO I WANT TO HAVE?", options: ["0", "1", "2", "3"], a: "3" },
  { q: "WHAT IS MY BAPTISMAL NAME?", options: ["AGNES", "THERESIA", "MARIA", "SESILIA"], a: "THERESIA" },
  { q: "WHAT DAY WAS I BORN ON?", options: ["THURSDAY", "FRIDAY", "SUNDAY", "SATURDAY"], a: "SUNDAY" },
];

// C1: THE SOUNDTRACK OF US
const SONG_GUESS = {
  lyrics: "KUT'RIMA SURATMU, T'LAH KUBACA, DAN AKU MENGERTI.. BETAPA MERINDUNYA DIRIMU AKAN HADIRNYA DIRIKU.. DI DALAM HARI-HARIMU.. BERSAMA LAGI..",
  answer: "KANGEN",
  photoUrl: 'https://5w1hindonesia.id/wp-content/uploads/2021/07/Kangen.jpg',
};

// C2: PIECE TOGETHER THE PIC (4x4 Puzzle)
const PUZZLE_PHOTO_URL = 'https://www.instagram.com/p/C7LF1a3ybZF/?img_index=4&igsh=MTl1cWphd3A3aThpMg==';

// M1: THE MEMORY VAULT (36 MONTHS)
const generateMemoryContent = (monthIndex) => {
  const titles = {
    'start': ["AWAL YANG BARU", "EKSPERIMEN PERTAMA", "DISCOVERY PHASE", "MOMEN PERKENALAN"],
    'explore': ["PETUALANGAN KITA", "CANDA & TAWA", "KONSOLIDASI DATA", "MOMEN TAK TERDUGA"],
    'challenge': ["UJI KETAHANAN", "MELEWATI BADAI", "GROWTH MINDSET", "RESOLUSI KONFLIK"],
    'steady': ["RUTINITAS INDAH", "ZONA NYAMAN", "KEPASTIAN HATI", "BLUEPRINT MASA DEPAN"],
    'final': ["THE NEXT LEVEL", "ANNIVERSARY PROJECT", "MIMPI KITA", "3 TAHUN CINTA"]
  };

  const captions = {
    'start': [
      "Perjalanan ini dimulai dengan langkah kecil. Semuanya terasa baru dan penuh harapan.",
      "Masih malu-malu, tapi getaran listrik itu sudah terasa. Awal dari segalanya.",
      "Saat kita pertama kali mencoba memahami dunia satu sama lain. Menggemaskan!",
      "Ingat momen canggung ini? Sekarang jadi kenangan termanis. Love you."
    ],
    'explore': [
      "Bukan hanya destinasi, tapi saat-saat di perjalanan yang membuat kita 'kita'.",
      "Koleksi meme, tawa tengah malam, dan obrolan yang tidak ada habisnya.",
      "Saat kita mulai menyesuaikan diri dengan kebiasaan aneh masing-masing. Indah.",
      "Momen saat kita sadar, 'Ah, dia memang orangnya.' Tak bisa digantikan."
    ],
    'challenge': [
      "Ini adalah bulan saat kita membuktikan bahwa cinta kita lebih kuat dari masalah apa pun.",
      "Sedikit gesekan, banyak pembelajaran. Kita berhasil naik level lagi!",
      "Mengasah kesabaran, memahami sudut pandang. Proses pendewasaan bersama.",
      "Kita selalu tahu, pada akhirnya, kita akan selalu memilih untuk bersama."
    ],
    'steady': [
      "Kenyamanan dalam rutinitas. Secangkir kopi, film, dan kamu di sisiku.",
      "Di sinilah kebahagiaan sejati. Tempat yang kita sebut rumah, meskipun itu hanya di hatimu.",
      "Saat semua keraguan hilang dan yang tersisa hanyalah kepastian abadi.",
      "Merencanakan masa depan, memilih warna cat, menamai anak kucing. Semua bersamamu."
    ]
  };

  let phase;
  if (monthIndex >= 25) {
    phase = 'steady';
    if (monthIndex === 36) phase = 'final';
  } else if (monthIndex >= 13) {
    phase = (monthIndex % 2 === 0) ? 'challenge' : 'explore';
  } else {
    phase = (monthIndex % 2 === 0) ? 'explore' : 'start';
  }

  // Use a simple hash based on monthIndex to pick a consistent phrase for the month
  const titleList = phase === 'final' ? titles.final : (phase.includes('start') ? titles.start : phase.includes('explore') ? titles.explore : phase.includes('challenge') ? titles.challenge : titles.steady);
  const captionList = phase.includes('start') ? captions.start : phase.includes('explore') ? captions.explore : phase.includes('challenge') ? captions.challenge : captions.steady;
  
  const titleIndex = (monthIndex * 7) % titleList.length;
  const captionIndex = (monthIndex * 11) % captionList.length;

  return {
    title: `BULAN KE-${monthIndex}: ${titleList[titleIndex]}`,
    caption: `[${monthIndex} of 36] ${captionList[captionIndex]}`,
    photoUrl: `https://placehold.co/100x100/123/fff?text=${monthIndex}`,
  };
};

const MONTHLY_MEMORIES = Array.from({ length: 36 }, (_, i) => {
  const monthIndex = 36 - i; // Count down from 36 to 1
  return generateMemoryContent(monthIndex);
});

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

const FINAL_SURPRISE_TEXT = 'PAYLOAD DEPLOYED: HAPPY BIRTHDAY, OOH 🥳❤️ SEMOGA DI USIA YANG BARU INI, OOH SELALU DIBERI KESEHATAN, PUMUR YANG PANJANG, REZEKI YANG LANCAR, DAN KEBAHAGIAAN YANG TIDAK ADA HABISNYA. SEMOGA SEMUA MIMPI DAN HARAPAN OOH BISA TERCAPAI SATU PER SATU, LANGKAHNYA SELALU DIMUDAHKAN, DAN SELALU DIKELILINGI ORANG-ORANG YANG BAIK SAMA OOH. NONIK SANGAT BERSYUKUR KARENA BISA JADI PASANGAN OOH, LIHAT SENYUM OOH, DAN IKUT MENEMANI SETIAP PROSES YANG OOH JALANI. SEMOGA HARI INI PENUH MOMEN INDAH DAN DOA BAIK YANG MENGALIR BUAT OOH. NONIK AKAN SELALU ADA BUAT OOH DI SETIAP SUKA, DUKA, DAN PERJALANAN PANJANG KITA KE DEPAN. I LOVE U SO MUCH, OOH 🥰 KADO UTAMAMU ADALAH: X';

const VIDEO_URL_MOCK = 'https://www.w3schools.com/html/mov_bbb.mp4'; // Placeholder MP4 video

// --- UI UTILITY COMPONENTS ---

// Custom Tailwind Configuration (Inline)
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
    border-2 text-sm md:text-base shadow-lg
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
const VideoView = ({ setStep }) => {
  const [videoEnded, setVideoEnded] = useState(false);
  // NEW STATE: Track if user has interacted to start playback (required for unmuted audio)
  const [isInteracted, setIsInteracted] = useState(false); 
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const handlePlay = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      // Initiate playback on user click (this is required for audio to work)
      videoElement.play().catch(error => {
        console.error("Playback failed (user interaction issue):", error);
      });
      // Set interacted state to true once playback is attempted by user click
      setIsInteracted(true); 
    }
  };

  useEffect(() => {
    // Add event listener for when component mounts
    const videoElement = videoRef.current;
    if (videoElement) {
      // Listen for video end to enable the PROCEED button
      videoElement.addEventListener('ended', handleVideoEnd);
      // NOTE: Autoplay logic removed. Playback is now triggered by user interaction (handlePlay).
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
          controls={isInteracted} // Show controls once playback starts
          className="w-full h-full rounded-lg"
          onEnded={handleVideoEnd}
          // REMOVED 'muted' attribute: This is the key change to enable sound.
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
      const { scrollTop, scrollHeight, clientHeight } = letterRef.current;
      // Check if user is near the bottom (within 10 pixels)
      if (scrollHeight - scrollTop <= clientHeight + 10) {
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

        <div
          ref={letterRef}
          onScroll={handleScroll}
          className="h-96 overflow-y-auto p-4 bg-black/50 rounded-lg text-white/90 font-mono-terminal text-sm leading-relaxed"
        >
          <pre className="whitespace-pre-wrap">{INITIAL_GREETING_MESSAGE}</pre>
          {!scrolled && (
            <div className="text-center text-accent-orange pt-4 animate-pulse">
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

// --- MODULE 1: THE MEMORY VAULT (TIMELINE) ---
const MemoryVaultModule = ({ completeModule }) => {
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-mono-terminal text-accent-cyan uppercase mb-6 text-center">
        M1: THE MEMORY VAULT
      </h1>
      <p className="text-gray-400 text-sm mb-6 text-center uppercase">VERTICAL TIMELINE: 36 MONTHS OF LEVELING UP TOGETHER.</p>

      <div className="relative border-l-4 border-accent-cyan/50 ml-4 pl-4 h-[70vh] overflow-y-scroll custom-scrollbar">
        {MONTHLY_MEMORIES.map((memory, index) => (
          <div key={index} className={`mb-8 relative`}>
            {/* Cyan Dot */}
            <div className={`absolute -left-7 top-0 w-4 h-4 rounded-full bg-accent-cyan border-2 border-primary-dark shadow-accent-cyan-light pulsing-cyan`}></div>
            
            <div className="p-4 bg-gray-900/80 rounded-lg border border-accent-cyan/50 shadow-md">
              <h3 className="text-lg font-bold text-accent-cyan uppercase">{memory.title}</h3>
              <p className="text-sm text-white/80 mt-2">{memory.caption}</p>
              <img src={memory.photoUrl} alt={`Memory Month ${memory.month}`} className="mt-3 w-24 h-24 object-cover rounded-md border-2 border-gray-700" />
            </div>
          </div>
        ))}
        {/* Bottom of timeline */}
        <div className="h-4"></div>
      </div>
      
      <TerminalButton onClick={() => completeModule('MEMORY_VAULT')} accent="cyan" className="mt-6">
        EXIT MEMORY VAULT
      </TerminalButton>
    </div>
  );
};

// --- MODULE C1: THE SOUNDTRACK OF US ---
const SongGuessModule = ({ completeModule }) => {
  const [input, setInput] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  const [message, setMessage] = useState('VERIFYING LIRIK. INPUT SONG TITLE.');

  const checkAnswer = (e) => {
    e.preventDefault();
    const cleanInput = input.trim().toUpperCase();
    const cleanAnswer = SONG_GUESS.answer.toUpperCase();

    if (cleanInput === cleanAnswer) {
      setMessage('VALIDATION SUCCESSFUL. ACCESS GRANTED.');
      setIsSolved(true);
    } else {
      setMessage('ERROR: JUDUL TIDAK VALID. RESTART ATTEMPT.');
      setInput('');
    }
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
            placeholder="JUDUL LAGU"
            className="w-full p-3 mb-4 text-center text-lg font-mono-terminal text-white bg-black/50 border-b-2 border-accent-cyan/80 focus:outline-none focus:border-white"
            autoFocus
          />
          <TerminalButton type="submit" disabled={!input} accent="orange" className="w-full">
            VERIFY ANSWER
          </TerminalButton>
          <p className={`mt-4 text-center text-sm font-mono-terminal ${isSolved ? 'text-green-400' : 'text-accent-orange'}`}>{message}</p>
        </form>
      ) : (
        <div className="mt-8 text-center animate-pulse">
          <div className="text-xl font-mono-terminal text-green-400 tracking-wider mb-4">
            SONG UNLOCKED: "{SONG_GUESS.answer}"
          </div>
          <img src={SONG_GUESS.photoUrl} alt="Song Memory Photo" className="w-full rounded-lg object-cover border-2 border-green-500 shadow-xl shadow-green-500/30" />
          <TerminalButton onClick={() => completeModule('C1_SONG')} className="mt-6" accent="cyan">
            RETURN TO HUB
          </TerminalButton>
        </div>
      )}
    </div>
  );
};

// --- MODULE C2: PIECE TOGETHER THE PIC (4x4 Puzzle) ---
const PhotoPuzzleModule = ({ completeModule }) => {
  const SIZE = 4;
  const TOTAL_TILES = SIZE * SIZE;
  const solvedGrid = useMemo(() => Array.from({ length: TOTAL_TILES }, (_, i) => i), [TOTAL_TILES]);
  const [grid, setGrid] = useState(solvedGrid);
  const [isSolved, setIsSolved] = useState(false);

  const checkWin = useCallback((currentGrid) => currentGrid.every((val, index) => val === solvedGrid[index]), [solvedGrid]);
  const swapTiles = (currentGrid, index1, index2) => {
    const newGrid = [...currentGrid];
    [newGrid[index1], newGrid[index2]] = [newGrid[index2], newGrid[index1]];
    return newGrid;
  };

  // Simple shuffle (may not always be solvable, but enough randomness for a game)
  const shuffleGrid = useCallback(() => {
    let newGrid = [...solvedGrid];
    for (let i = newGrid.length - 2; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      [newGrid[i], newGrid[j]] = [newGrid[j], newGrid[i]];
    }
    // Ensure the blank tile (15) is at the last spot for visual consistency of the solved state
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
      }
    }
  };

  const tileStyle = (tileValue) => {
    if (tileValue === TOTAL_TILES - 1) return {};
    const tileIndex = tileValue;
    const row = Math.floor(tileIndex / SIZE);
    const col = tileIndex % SIZE;
    const tileWidth = 100 / SIZE; // 25%

    return {
      backgroundImage: `url(${PUZZLE_PHOTO_URL})`,
      backgroundSize: `${SIZE * 100}% ${SIZE * 100}%`,
      backgroundPosition: `${col * -tileWidth}% ${row * -tileWidth}%`,
      width: '100%',
      height: '100%',
    };
  };

  return (
    <div className="flex flex-col items-center p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-mono-terminal text-accent-cyan uppercase mb-4">C2: PIECE TOGETHER THE PIC</h1>
      <p className="text-gray-400 text-sm mb-6 text-center uppercase">OBJECTIVE: REASSEMBLE THE 4X4 PHOTO GRID. INTERMEDIATE DIFFICULTY.</p>

      <div className="w-full max-w-sm aspect-square relative mb-8 p-1 bg-gray-900 border-4 border-gray-700 rounded-lg shadow-inner shadow-gray-800">
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
            >
              <div style={tileStyle(tileValue)} className="w-full h-full" />
            </div>
          ))}
        </div>
      </div>

      <TerminalButton onClick={shuffleGrid} disabled={isSolved} accent="orange" className="!w-64 mb-4">
        <RefreshCcw className="w-4 h-4 mr-2 inline" /> RESTART SHUFFLE
      </TerminalButton>

      {isSolved && (
        <div className="mt-8 text-center animate-pulse">
          <div className="text-3xl font-mono-terminal text-green-400 tracking-wider mb-4 border-b-2 border-green-500 pb-2">
            PUZZLE SUCCESS!
          </div>
          <p className="text-xl font-extrabold text-white bg-green-700 p-4 rounded-lg shadow-2xl shadow-green-500/50">
            "YOUR LOVE STORY IS COMPLETE."
          </p>
          <TerminalButton onClick={() => completeModule('C2_PUZZLE')} className="mt-6" accent="cyan">
            RETURN TO HUB
          </TerminalButton>
        </div>
      )}
    </div>
  );
};

// --- MODULE C3: OUR JOURNEY TRIVIA ---
const TriviaModule = ({ completeModule }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option) => {
    if (showResult) return;
    setSelectedOption(option);

    if (option === TRIVIA_QUESTIONS[currentQ].a) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQ < TRIVIA_QUESTIONS.length - 1) {
        setCurrentQ(prev => prev + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const handleAcquire = () => {
    completeModule('C3_TRIVIA');
  };

  const currentQuestion = TRIVIA_QUESTIONS[currentQ];

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
        <p className="text-lg font-bold text-white/90 text-center">{currentQuestion.q}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {currentQuestion.options.map((option, index) => {
          const isCorrect = option === currentQuestion.a;
          const isSelected = option === selectedOption;
          let buttonClasses = 'bg-gray-800 hover:bg-gray-700 text-white border-gray-700';
          let btnAccent = 'orange';

          if (selectedOption) {
            if (isSelected) {
              buttonClasses = isCorrect ? 'bg-green-700 border-green-500' : 'bg-red-700 border-red-500';
              btnAccent = isCorrect ? 'cyan' : 'orange';
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
              {option}
            </TerminalButton>
          );
        })}
      </div>
    </div>
  );
};

// --- MODULE C4: THE GOLDEN COMPASS QUEST ---
const CompassQuestModule = ({ completeModule }) => {
  const [currentRiddle, setCurrentRiddle] = useState(0);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('INITIATE COMPASS QUEST: ANSWER THE RIDDLE.');
  const [isSolved, setIsSolved] = useState(false);

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
        setMessage('QUEST COMPLETE. ALL COMPASS DATA ACQUIRED.');
        setIsSolved(true);
      }
    } else {
      setMessage('ERROR: DATA MISMATCH. TRY AGAIN.');
      setInput('');
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
            placeholder="JAWABAN (TANPA SPASI/HURUF KECIL)"
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
            "VIDEO CHAMBER ACCESS UNLOCKED!"
          </p>
          <TerminalButton onClick={() => completeModule('C4_COMPASS')} className="mt-6" accent="cyan">
            RETURN TO HUB
          </TerminalButton>
        </div>
      )}
    </div>
  );
};

// --- MODULE C5: SWEETEST CATCH (ARCADE) ---
const SweetestCatchModule = ({ completeModule }) => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('MAX SCORE: 20. CATCH HEARTS, AVOID BOMBS!');

  // Game configuration
  const GAME_WIDTH = 300;
  const GAME_HEIGHT = 400;
  const BASKET_WIDTH = 60;
  const BASKET_HEIGHT = 10;
  const ITEM_SIZE = 15;
  const TARGET_SCORE = 20;

  // Game state
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
    } else { // bomb
      ctx.fillStyle = ACCENT_ORANGE;
      ctx.fillText('💣', item.x, item.y);
    }
  };

  const updateItems = (delta) => {
    items.current = items.current.filter(item => {
      item.y += 0.1 * delta; // speed

      // Check for catch (item hits the basket area)
      if (item.y > basket.current.y - ITEM_SIZE && item.y < basket.current.y + BASKET_HEIGHT) {
        if (item.x > basket.current.x && item.x < basket.current.x + BASKET_WIDTH) {
          if (item.type === 'heart') {
            setScore(prev => prev + 1);
            return false; // caught
          } else { // bomb caught
            setGameOver(true);
            setMessage('GAME OVER! BOMB HIT. SCORE RESET.');
            setIsPlaying(false);
            return false; // caught (end game)
          }
        }
      }

      // Check for miss (item goes past the bottom)
      if (item.y > GAME_HEIGHT) {
        return false;
      }
      return true;
    });
  };

  const spawnItem = () => {
    const isBomb = Math.random() < 0.3; // 30% chance of bomb
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

    // Clear canvas
    ctx.fillStyle = PRIMARY_DARK;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Update and draw
    updateItems(delta);
    items.current.forEach(item => drawItem(ctx, item));
    drawBasket(ctx);

    // Spawn new items
    timeSinceLastSpawn += delta;
    if (timeSinceLastSpawn > spawnInterval) {
      spawnItem();
      timeSinceLastSpawn = 0;
    }

    // Win condition check (inside game loop for real-time update)
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
  }, [isPlaying, gameOver]); // Dependency is important for initial run

  // Input handling
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
        e.preventDefault(); // Prevent scrolling
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

      {score >= TARGET_SCORE ? (
        <TerminalButton onClick={() => completeModule('C5_ARCADE')} accent="cyan" className="pulsing-cyan">
          MISSION COMPLETE: RETURN TO HUB
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
const VideoChamberModule = ({ completeModule }) => {
  const videoThumbnails = Array.from({ length: 7 }, (_, i) => ({
    title: `MESSAGE FEED ${i + 1}`,
    placeholder: `https://placehold.co/150x100/1E1E30/FF9900?text=VIDEO+FEED+${i + 1}`
  }));

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-mono-terminal text-accent-cyan uppercase mb-6 text-center">
        R1: THE COMMEMORATION FEEDS
      </h1>
      <p className="text-gray-400 text-sm mb-6 text-center uppercase">EMOTIONAL DATA TRANSFER INITIATED. ENJOY THE MESSAGES!</p>

      <div className="grid grid-cols-2 gap-4">
        {videoThumbnails.map((video, index) => (
          <div key={index} className="bg-gray-900/80 p-3 rounded-lg border border-accent-orange/50 shadow-md">
            <img src={video.placeholder} alt={video.title} className="w-full h-auto rounded-md object-cover border border-gray-700" />
            <p className="mt-2 text-sm font-mono-terminal text-accent-orange uppercase text-center">{video.title}</p>
          </div>
        ))}
      </div>

      <TerminalButton onClick={() => completeModule('VIDEO_CHAMBER')} accent="cyan" className="mt-8">
        CLOSE FEED AND RETURN
      </TerminalButton>
    </div>
  );
};

// --- PHASE 4: MISSION HUB ---
const CentralHub = ({ moduleStatus, allChallengesComplete, videoChamberUnlocked, setStep }) => {
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

      {/* 1. PROGRESS BAR */}
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

      {/* 2. CORE ARCHIVES / CONTENT MODULES */}
      <div className="mb-10">
        <h3 className="text-xl font-mono-terminal text-accent-cyan tracking-wider uppercase mb-4 border-b border-accent-cyan pb-2 flex items-center">
          <Server className="w-5 h-5 mr-2" /> CORE ARCHIVES (MEMORIES)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Module 1: Timeline (Always accessible) */}
          <ModuleCard
            title="THE MEMORY VAULT (36 MONTHS)"
            status={getModuleStatus('MEMORY_VAULT')}
            icon={BookOpen}
            onClick={() => setStep('MEMORY_VAULT')}
            isGame={false}
          />
        </div>
      </div>


      {/* 3. SIMULATION ARENA / CHALLENGES C1-C5 */}
      <div className="mb-10">
        <h3 className="text-xl font-mono-terminal text-accent-orange tracking-wider uppercase mb-4 border-b border-accent-orange pb-2 flex items-center">
          <Zap className="w-5 h-5 mr-2" /> SIMULATION ARENA (5 CHALLENGES)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Challenges C1-C5 */}
          <ModuleCard title="C1: THE SOUNDTRACK OF US" status={getModuleStatus('C1_SONG')} icon={Music} onClick={() => setStep('C1_SONG')} />
          <ModuleCard title="C2: PHOTO PUZZLE (4x4 GRID)" status={getModuleStatus('C2_PUZZLE')} icon={Puzzle} onClick={() => setStep('C2_PUZZLE')} />
          <ModuleCard title="C3: MY PERSONAL TRIVIA (10 Q)" status={getModuleStatus('C3_TRIVIA')} icon={Zap} onClick={() => setStep('C3_TRIVIA')} />
          <ModuleCard title="C4: GOLDEN COMPASS QUEST (3 STEP)" status={getModuleStatus('C4_COMPASS')} icon={Map} onClick={() => setStep('C4_COMPASS')} />
          <ModuleCard title="C5: SWEETEST CATCH (ARCADE GAME)" status={getModuleStatus('C5_ARCADE')} icon={Heart} onClick={() => setStep('C5_ARCADE')} />
        </div>
      </div>

       {/* 4. REWARD CHAMBER (R1) */}
       <div className="mb-28"> 
        <h3 className="text-xl font-mono-terminal text-accent-cyan tracking-wider uppercase mb-4 border-b border-accent-cyan pb-2 flex items-center">
          <Video className="w-5 h-5 mr-2" /> REWARD CHAMBER (FEEDS TERKUNCI)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Reward 1: Video Chamber (Locked by C4) */}
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

      {/* The Ultimate Reward - Fixed Button (Sticky Footer) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-primary-dark border-t border-accent-orange/50 shadow-inner shadow-accent-orange-light">
        <TerminalButton
          onClick={() => allChallengesComplete && setStep('FINALE')}
          disabled={!allChallengesComplete}
          accent={allChallengesComplete ? 'orange' : 'cyan'}
          className={`w-full !py-4 text-lg ${allChallengesComplete ? 'pulsing-orange' : ''}`}
        >
          {allChallengesComplete ? 'REVEAL ULTIMATE SURPRISE (PAYLOAD DEPLOYMENT)' : `FINAL PAYLOAD LOCKED (${challengesCompleteCount}/${totalChallenges})`}
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

  // Status for all 6 required modules + 1 optional reward
  const [moduleStatus, setModuleStatus] = useState({
    MEMORY_VAULT: 'PENDING',
    C1_SONG: 'PENDING',
    C2_PUZZLE: 'PENDING',
    C3_TRIVIA: 'PENDING',
    C4_COMPASS: 'PENDING',
    C5_ARCADE: 'PENDING',
    VIDEO_CHAMBER: 'PENDING', // Track completion of viewing the reward
  });

  const completeModule = useCallback((moduleName) => {
    // Only set to COMPLETE if it's a content module or if C4 is not the gate for VIDEO_CHAMBER
    if (moduleName !== 'MEMORY_VAULT' && moduleName !== 'VIDEO_CHAMBER' && moduleStatus[moduleName] === 'COMPLETE') {
        // Do nothing if already complete (prevents score reset in arcade if game over)
        setCurrentStep('HUB');
        return;
    }

    setModuleStatus(prev => ({
      ...prev,
      [moduleName]: 'COMPLETE'
    }));
    setCurrentStep('HUB');
  }, [moduleStatus]);

  // Derived states
  const videoChamberUnlocked = moduleStatus.C4_COMPASS === 'COMPLETE';
  const allChallengesComplete = ['C1_SONG', 'C2_PUZZLE', 'C3_TRIVIA', 'C4_COMPASS', 'C5_ARCADE']
    .every(key => moduleStatus[key] === 'COMPLETE');

  useEffect(() => {
    if (authReady && currentStep === 'AUTH') {
      setCurrentStep('VIDEO'); // Start with the mandatory video
    }
  }, [authReady, currentStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 'AUTH':
        return <AuthView setAuthReady={setAuthReady} />;
      case 'VIDEO':
        return <VideoView setStep={setCurrentStep} />;
      case 'GREETING':
        return <GreetingView setStep={setCurrentStep} />;
      case 'HUB':
        return (
          <CentralHub
            moduleStatus={moduleStatus}
            allChallengesComplete={allChallengesComplete}
            videoChamberUnlocked={videoChamberUnlocked}
            setStep={setCurrentStep}
          />
        );
      case 'MEMORY_VAULT':
        return <MemoryVaultModule completeModule={completeModule} />;
      case 'C1_SONG':
        return <SongGuessModule completeModule={completeModule} />;
      case 'C2_PUZZLE':
        return <PhotoPuzzleModule completeModule={completeModule} />;
      case 'C3_TRIVIA':
        return <TriviaModule completeModule={completeModule} />;
      case 'C4_COMPASS':
        return <CompassQuestModule completeModule={completeModule} />;
      case 'C5_ARCADE':
        return <SweetestCatchModule completeModule={completeModule} />;
      case 'VIDEO_CHAMBER':
        // Only allow access if unlocked
        if (videoChamberUnlocked) {
          return <VideoChamberModule completeModule={completeModule} />;
        }
        return <div className="text-accent-orange font-mono-terminal text-center pt-20">ACCESS DENIED. COMPLETE C4 FIRST.</div>;
      case 'FINALE':
        // Only allow access if all challenges are complete
        if (allChallengesComplete) {
          return <FinaleView setStep={setCurrentStep} />;
        }
        return <div className="text-accent-orange font-mono-terminal text-center pt-20">ULTIMATE REWARD LOCKED. FINISH ALL CHALLENGES.</div>;
      default:
        return <div className="text-red-500 font-mono-terminal text-center pt-20">SYSTEM ERROR: UNKNOWN STEP.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-primary-dark text-white font-sans overflow-x-hidden">
      <TailwindStyle />
      {renderStep()}
    </div>
  );
};

export default App;
