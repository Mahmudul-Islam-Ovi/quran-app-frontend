import { Surah, SurahDetail, SearchResult } from '@/types/quran';

const API_BASE = 'https://quran-app-backend-032q.onrender.com/api/surahs';

export const api = {
    async getAllSurahs(): Promise<Surah[]> {
        const res = await fetch(`${API_BASE}`, { cache: 'force-cache' });
        const json = await res.json();
        if (!json.success) throw new Error(json.error);
        return json.data;
    },

    async getSurah(id: number): Promise<SurahDetail> {
        const res = await fetch(`${API_BASE}/${id}`, { cache: 'force-cache' });
        const json = await res.json();
        if (!json.success) throw new Error(json.error);
        return json.data;
    },

    async searchAyahs(query: string): Promise<SearchResult[]> {
        const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
        const json = await res.json();
        if (!json.success) throw new Error(json.error);
        return json.data;
    },
};