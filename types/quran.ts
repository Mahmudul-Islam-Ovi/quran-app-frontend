export interface Surah {
  id: number;
  name: string;           // Arabic
  transliteration: string;
  translation: string;    // English name
  type: "meccan" | "medinan";
  total_verses: number;
}

export interface Ayah {
  id: number;
  text: string;           // Arabic
  translation: string;
}

export interface SurahDetail {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: string;
  total_verses: number;
  verses: Ayah[];
}

export interface SearchResult {
  id: number;
  text: string;
  translation: string;
  surahId: number;
  surahName: string;
  surahEnglish: string;
}