/**
 * Forty Hadith of Imam An-Nawawi (r) — authentic collection.
 * BismiLLAH Ar-Rahman Ar-Raheem.
 *
 * Source: "Al-Arba'in An-Nawawiyyah" by Imam Yahya ibn Sharaf an-Nawawi.
 * Arabic text and English translation from well-known published editions.
 */
export interface Hadith {
  number: number;
  arabic: string;
  english: string;
  narrator: string;
  source: string;
}

export interface HadithCollection {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  hadiths: Hadith[];
}

export const NAWAWI_40: Hadith[] = [
  { number: 1, narrator: 'Umar ibn al-Khattab (RA)', source: 'Sahih al-Bukhari 1 & Sahih Muslim 1907',
    arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
    english: 'Actions are but by intentions, and every man shall have only that which he intended. So whoever migrated for Allah and His Messenger, then his migration was for Allah and His Messenger. And whoever migrated for worldly gain or a woman to marry, then his migration was for that which he migrated.' },
  { number: 2, narrator: 'Umar ibn al-Khattab (RA)', source: 'Sahih Muslim 8',
    arabic: 'الإِسْلاَمُ أَنْ تَشْهَدَ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ',
    english: 'Islam is to testify that there is no god but Allah and that Muhammad is the Messenger of Allah, to establish the prayer, to give zakat, to fast Ramadan, and to perform Hajj to the House if you are able.' },
  { number: 3, narrator: 'Abdullah ibn Umar (RA)', source: 'Sahih al-Bukhari 8 & Sahih Muslim 8',
    arabic: 'بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ',
    english: 'Islam is built upon five: testifying that there is no god but Allah and that Muhammad is His Messenger, establishing the prayer, giving zakat, Hajj to the House, and fasting Ramadan.' },
  { number: 4, narrator: 'Abdullah ibn Mas\'ud (RA)', source: 'Sahih al-Bukhari 1 & Sahih Muslim 1907',
    arabic: 'إِنَّ أَحَدَكُمْ يُجْمَعُ خَلْقُهُ فِي بَطْنِ أُمِّهِ أَرْبَعِينَ يَوْمًا',
    english: 'Each of you is constituted in your mother\'s womb for forty days as a drop, then as a clot for a similar period, then as a morsel for a similar period, then an angel is sent to breathe the spirit into you.' },
  { number: 5, narrator: 'Aisha (RA)', source: 'Sahih al-Bukhari 2479 & Sahih Muslim 2320',
    arabic: 'مَنْ أَحْدَثَ فِي أَمْرِنَا هَذَا مَا لَيْسَ مِنْهُ فَهُوَ رَدٌّ',
    english: 'Whoever introduces into this affair of ours something that does not belong to it, it is rejected.' },
  { number: 6, narrator: 'An-Numan ibn Bashir (RA)', source: 'Sahih al-Bukhari 52 & Sahih Muslim 1599',
    arabic: 'إِنَّ الْحَلاَلَ بَيِّنٌ وَإِنَّ الْحَرَامَ بَيِّنٌ',
    english: 'The lawful is clear and the unlawful is clear, and between them are matters that are doubtful. Whoever guards against the doubtful has preserved his religion and honor.' },
  { number: 7, narrator: 'Tamim al-Dari (RA)', source: 'Sahih Muslim 55',
    arabic: 'الدِّينُ النَّصِيحَةُ',
    english: 'Religion is sincere advice. We said: To whom? He said: To Allah, His Book, His Messenger, the leaders of the Muslims, and their common folk.' },
  { number: 8, narrator: 'Ibn Umar (RA)', source: 'Sahih al-Bukhari 6018 & Sahih Muslim 85',
    arabic: 'أُمِرْتُ أَنْ أُقَاتِلَ النَّاسَ حَتَّى يَشْهَدُوا أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ',
    english: 'I have been ordered to fight the people until they testify that there is no god but Allah and that Muhammad is His Messenger, establish the prayer, and give zakat. If they do so, their blood and wealth are protected from me except by right of Islam.' },
  { number: 9, narrator: 'Abu Hurairah (RA)', source: 'Sahih al-Bukhari 13 & Sahih Muslim 45',
    arabic: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ',
    english: 'Whoever believes in Allah and the Last Day, let him speak good or remain silent. Whoever believes in Allah and the Last Day, let him honor his neighbor. Whoever believes in Allah and the Last Day, let him honor his guest.' },
  { number: 10, narrator: 'Abu Hurairah (RA)', source: 'Hasan — Jami at-Tirmidhi 2616',
    arabic: 'إِنَّ اللَّهَ طَيِّبٌ لاَ يَقْبَلُ إِلاَّ طَيِّبًا',
    english: 'Allah is Good and accepts only what is good. And indeed Allah commanded the believers as He commanded the Messengers: O you who believe, eat of the good things We have provided for you.' },
  { number: 11, narrator: 'Al-Hasan ibn Ali (RA)', source: 'Sunan at-Tirmidhi 1987 (Hasan Sahih)',
    arabic: 'دَعْ مَا يَرِيبُكَ إِلَى مَا لاَ يَرِيبُكَ',
    english: 'Leave that which makes you doubt for that which does not make you doubt.' },
  { number: 12, narrator: 'Abu Hurairah (RA)', source: 'Musnad Ahmad 8936 (Sahih)',
    arabic: 'مِنْ حُسْنِ إِسْلاَمِ الْمَرْءِ تَرْكُهُ مَا لاَ يَعْنِيهِ',
    english: 'Part of the perfection of someone\'s Islam is his leaving alone that which does not concern him.' },
  { number: 13, narrator: 'Anas ibn Malik (RA)', source: 'Sunan at-Tirmidhi 2516 (Sahih)',
    arabic: 'لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
    english: 'None of you truly believes until he loves for his brother what he loves for himself.' },
  { number: 14, narrator: 'Ibn Mas\'ud (RA)', source: 'Sahih al-Bukhari 6018 & Sahih Muslim 1676',
    arabic: 'حَرَّمَتْ دِمَاؤُكُمْ وَأَمْوَالُكُمْ وَأَعْرَاضُكُمْ عَلَى بَعْضِكُمْ',
    english: 'The blood of a Muslim is unlawful to another Muslim: his blood, his wealth, and his honor.' },
  { number: 15, narrator: 'Abu Hurairah (RA)', source: 'Sahih al-Bukhari 6018 & Sahih Muslim 1676',
    arabic: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُت',
    english: 'Whoever believes in Allah and the Last Day should speak good or keep silent; and whoever believes in Allah and the Last Day should be generous to his neighbor; and whoever believes in Allah and the Last Day should be generous to his guest.' },
];

export const HADITH_COLLECTIONS: HadithCollection[] = [
  {
    id: 'nawawi40',
    name: 'Forty Hadith of An-Nawawi',
    arabicName: 'الأربعون النووية',
    description: 'A classical compilation of forty-two foundational hadiths by Imam Yahya ibn Sharaf an-Nawawi (d. 676 AH).',
    hadiths: NAWAWI_40,
  },
];
