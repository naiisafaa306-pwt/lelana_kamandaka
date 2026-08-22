/* ==========================================
   GAMEPLAY 01 — PAJAJARAN DIALOGUE & QUIZ DATA
   ========================================== */

export const PAJAJARAN_STORY = [
  {
    type: 'dialogue',
    speaker: 'Raden Kamandaka',
    text: 'Sebelum aku melangkah menembus belantara menuju tanah Banyumas, aku harus meneguhkan niat suci ini. Perjalanan ini adalah pengembaraan wahyu dan bahasa.',
    characterImg: 'assets/images/characters/kamandaka.png'
  },
  {
    type: 'dialogue',
    speaker: 'Penasihat Istana',
    text: 'Raden, masyarakat di wilayah timur menyapa dengan kehangatan <span class="basa-word-highlight">Basa Banyumasan</span>. Tahukah Raden bagaimana ucapan salam penghormatan utama di sana?',
    characterImg: 'assets/images/characters/kamandaka.png'
  },
  {
    type: 'quiz',
    speaker: 'Tantangan Bahasa (Basa Banyumasan)',
    text: 'Pilihlah ungkapan salam kehangatan dan penghormatan yang tepat menurut tradisi tutur Basa Banyumasan:',
    basaWord: 'Sugeng Rawuh',
    phonetic: '/su-geng ra-wuh/',
    meaning: 'selamat datang, salam keselamatan',
    context: '"<em>Sugeng rawuh</em>, para tamu pengembara dari tanah Pajajaran."',
    options: [
      { text: 'A. Sugeng rawuh / Rahayu panjenengan', isCorrect: true, feedback: 'Bener pisan! Salam "Sugeng rawuh & Rahayu" minangka simbol persaudaraan.' },
      { text: 'B. Sugeng ambal warsa', isCorrect: false, feedback: 'Kurang tepat. "Sugeng ambal warsa" iku kanggo mengeti ulang tahun.' },
      { text: 'C. Matur nuwun sanget', isCorrect: false, feedback: 'Kurang tepat. Niki ucapan matur nuwun (terima kasih).' },
      { text: 'D. Mangan disit', isCorrect: false, feedback: 'Kurang tepat. Niki ajakan makan lebih dulu.' }
    ],
    vocabUnlocked: {
      word: 'Sugeng Rawuh / Rahayu',
      meaning: 'Selamat datang / Salam keselamatan & kedamaian',
      type: 'Basa Penghormatan',
      sentence: '"Sugeng rawuh dateng para tamu pengembara."'
    }
  },
  {
    type: 'dialogue',
    speaker: 'Raden Kamandaka',
    text: 'Aku mengerti. Setiap langkah pengembaraanku dipanggil sebagai <span class="basa-word-highlight">Lelana</span>.',
    characterImg: 'assets/images/characters/kamandaka.png'
  },
  {
    type: 'quiz',
    speaker: 'Tantangan Kosakata (Basa Banyumasan)',
    text: 'Miturut teges tuturan Jawa / Banyumasan, apa arti utama saka tembung "Lelana"?',
    basaWord: 'Lelana',
    phonetic: '/le-la-na/',
    meaning: 'pengembaraan, berkelana',
    context: '"Raden Kamandaka nembe <em>lelana</em> ing tlatah Sunda lan Banyumas."',
    options: [
      { text: 'A. Pengembaraan / Berkelana mencari pengalaman suci', isCorrect: true, feedback: 'Tepat sekali! "Lelana" tegese mengembara mencari ilmu dan kebijaksanaan hidup.' },
      { text: 'B. Turu nyenyak ing pembarakan', isCorrect: false, feedback: 'Salah, niki tegese tidur nyenyak.' },
      { text: 'C. Mangan panganan tradisional', isCorrect: false, feedback: 'Salah, niki tegese menikmati makanan.' },
      { text: 'D. Mulih maring omah', isCorrect: false, feedback: 'Salah, niki tegese pulang ke rumah.' }
    ],
    vocabUnlocked: {
      word: 'Lelana',
      meaning: 'Pengembaraan / Berkelana menempuh perjalanan hidup',
      type: 'Tembung Kawi / Banyumasan',
      sentence: '"Raden Kamandaka nembe lelana ing tlatah Sunda lan Banyumas."'
    }
  },
  {
    type: 'completion',
    title: 'Petualangan Pajajaran Selesai!',
    desc: 'Selamat! Kamu telah menyelesaikan petualangan di Pajajaran, memahami filosofi pengembaraan, dan menguasai kosakata dasar Basa Banyumasan.',
    xpEarned: 150,
    nextLocationIndex: 1, // Unlocks Location 02: Ki Ajar Winarong
    nextLocationName: 'Ki Ajar Winarong'
  }
];
