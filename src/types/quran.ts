export interface SearchResult {
    id: number;
    surahId: number;
    surahName: string;
    surahEnglish: string;
    translation: string;
}

export interface Ayah {
    id: number;
    text: string;
    translation: string;
}

export interface Surah {
    id: number;
    name: string;
    transliteration: string;
    translation: string;
    type: string;
    total_verses: number;
}

export interface SurahDetail extends Surah {
    verses: Ayah[];
}
