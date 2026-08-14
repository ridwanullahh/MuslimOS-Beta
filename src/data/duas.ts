/**
 * Essential Duas (Supplications) — selected from Hisn al-Muslim (Fortress of the Muslim).
 * BismiLLAH Ar-Rahman Ar-Raheem.
 *
 * Authentic narrations from the Quran and Sunnah.
 */
export interface Dua {
  id: string;
  title: string;
  category: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
}

export interface DuaCategory {
  id: string;
  name: string;
}

export const DUA_CATEGORIES: DuaCategory[] = [
  { id: 'morning', name: 'Morning & Evening' },
  { id: 'prayer', name: 'After Prayer' },
  { id: 'protection', name: 'Protection' },
  { id: 'food', name: 'Food & Drink' },
  { id: 'travel', name: 'Travel' },
  { id: 'forgiveness', name: 'Forgiveness' },
  { id: 'distress', name: 'Distress' },
  { id: 'quranic', name: 'Quranic Duas' },
];

export const DUAS: Dua[] = [
  // Morning & Evening
  { id: 'm1', title: 'Morning Remembrance', category: 'morning',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ',
    transliteration: 'Asbahna wa asbahal-mulku lillah, wal-hamdu lillah',
    translation: 'We have reached the morning and at this very time the whole dominion belongs to Allah. Praise is to Allah.',
    reference: 'Sahih Muslim 2725' },
  { id: 'm2', title: 'Sayyid al-Istighfar (Master of Seeking Forgiveness)', category: 'morning',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ',
    transliteration: 'Allahumma anta Rabbi la ilaha illa anta, khalaqtani wa ana \'abduk',
    translation: 'O Allah, You are my Lord. There is no god but You. You created me and I am Your servant.',
    reference: 'Sahih al-Bukhari 6306' },
  { id: 'm3', title: 'Three Protective Surahs', category: 'morning',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ',
    transliteration: 'Bismillahil-ladhi la yadurru ma\'asmishi shay\'un fil-ardi wa la fis-sama\'',
    translation: 'In the name of Allah, with whose name nothing on earth or in the heavens can cause harm. He is the All-Hearing, the All-Knowing.',
    reference: 'Sunan at-Tirmidhi 3388, Abu Dawud 5088' },

  // After Prayer
  { id: 'p1', title: 'Tasbih After Prayer', category: 'prayer',
    arabic: 'سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَاللَّهُ أَكْبَرُ',
    transliteration: 'SubhanAllah, walhamdulillah, wallahu Akbar',
    translation: 'Glory be to Allah, praise be to Allah, Allah is the Greatest. (33 times each)',
    reference: 'Sahih Muslim 597' },
  { id: 'p2', title: 'Ayat al-Kursi After Prayer', category: 'prayer',
    arabic: 'اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ',
    transliteration: 'Allahu la ilaha illa huwal-Hayyul-Qayyum',
    translation: 'Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence. (Recite Ayat al-Kursi after every obligatory prayer.)',
    reference: 'Quran 2:255, Sunan an-Nasa\'i 992' },
  { id: 'p3', title: 'Closing Dua', category: 'prayer',
    arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
    transliteration: 'Allahumma a\'inni \'ala dhikrika wa shukrika wa husni \'ibadatik',
    translation: 'O Allah, help me to remember You, to thank You, and to worship You in the best manner.',
    reference: 'Sunan Abu Dawud 1521' },

  // Protection
  { id: 'pr1', title: 'Protection from Evil', category: 'protection',
    arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    transliteration: 'A\'udhu bikalimatillahit-tammati min sharri ma khalaq',
    translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
    reference: 'Sahih Muslim 2708' },
  { id: 'pr2', title: 'Protection from Anxiety', category: 'protection',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ',
    transliteration: 'Allahumma inni a\'udhu bika minal-hammi wal-hazan',
    translation: 'O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, stinginess and cowardice, the burden of debt, and being overpowered by men.',
    reference: 'Sahih al-Bukhari 2893' },

  // Food & Drink
  { id: 'f1', title: 'Before Eating', category: 'food',
    arabic: 'بِسْمِ اللَّهِ',
    transliteration: 'Bismillah',
    translation: 'In the name of Allah. (If one forgets to say it at the beginning, say: Bismillahi awwalahu wa akhirahu.)',
    reference: 'Sunan at-Tirmidhi 1858, Abu Dawud 3767' },
  { id: 'f2', title: 'After Eating', category: 'food',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلاَ قُوَّةٍ',
    transliteration: 'Alhamdulillahil-ladhi at\'amani hadha wa razaqanihu min ghayri hawlin minni wa la quwwah',
    translation: 'Praise be to Allah Who has fed me this and provided me with it without any strength or power on my part.',
    reference: 'Sunan at-Tirmidhi 3458, Abu Dawud 4023' },

  // Travel
  { id: 't1', title: 'Dua for Travel', category: 'travel',
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
    transliteration: 'Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila Rabbina lamunqalibun',
    translation: 'Glory to Him Who has subjected this to us, and we could never have it (by our efforts), and to our Lord we are surely returning.',
    reference: 'Quran 43:13-14, Sahih Muslim 1342' },

  // Forgiveness
  { id: 'fr1', title: 'Seeking Forgiveness', category: 'forgiveness',
    arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ',
    transliteration: 'Astaghfirullahal-\'Adhimal-ladhi la ilaha illa Huwal-Hayyul-Qayyuma wa atubu ilayh',
    translation: 'I seek forgiveness from Allah, the Mighty, besides Whom there is no god, the Ever-Living, the Sustainer, and I turn to Him in repentance.',
    reference: 'Sunan Abu Dawud 1517' },
  { id: 'fr2', title: 'Comprehensive Forgiveness', category: 'forgiveness',
    arabic: 'رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا',
    transliteration: 'Rabbanaghfir lana dhunubana wa israfana fi amrina',
    translation: 'Our Lord, forgive us our sins and our transgressions, and make our feet firm, and grant us victory over the disbelieving people.',
    reference: 'Quran 3:147' },

  // Distress
  { id: 'd1', title: 'Dua of Yunus (AS)', category: 'distress',
    arabic: 'لاَ إِلَهَ إِلاَّ أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
    transliteration: 'La ilaha illa anta subhanaka inni kuntu minaz-zalimin',
    translation: 'There is no god but You; glory be to You. Indeed, I was among the wrongdoers.',
    reference: 'Quran 21:87, Sunan at-Tirmidhi 3505' },

  // Quranic Duas
  { id: 'q1', title: 'Dua for Knowledge', category: 'quranic',
    arabic: 'رَبِّ زِدْنِي عِلْمًا',
    transliteration: 'Rabbi zidni \'ilma',
    translation: 'My Lord, increase me in knowledge.',
    reference: 'Quran 20:114' },
  { id: 'q2', title: 'Dua for Parents', category: 'quranic',
    arabic: 'رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    transliteration: 'Rabbighfir li wa liwalidayya warhamhuma kama rabbayani saghira',
    translation: 'My Lord, forgive me and my parents, and have mercy on them both as they raised me when I was small.',
    reference: 'Quran 17:24' },
  { id: 'q3', title: 'Dua for Ease', category: 'quranic',
    arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
    transliteration: 'Rabbishrah li sadri wa yassir li amri',
    translation: 'My Lord, expand for me my chest and ease for me my task.',
    reference: 'Quran 20:25-26' },
];
