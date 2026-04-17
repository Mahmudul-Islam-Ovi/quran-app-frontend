import { api } from '@/lib/api';
import AyahCard from '@/components/ayah-card';
import { notFound } from 'next/navigation';
import { SurahDetail, Surah } from '@/types/quran';

export async function generateStaticParams() {
    const surahs = await api.getAllSurahs();
    return surahs.map((surah: Surah) => ({ id: surah.id.toString() }));
}

export default async function SurahPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    let surah: SurahDetail;
    try {
        surah = await api.getSurah(Number(resolvedParams.id));
    } catch {
        notFound();
    }

    return (
        <div>
            {/* Header */}
            <div className="text-center mb-12 border-b pb-8">
                <div className="inline-flex items-center gap-3 text-emerald-500 mb-2">
                    <span className="text-4xl">ﷺ</span>
                </div>
                <h1 className="text-4xl font-semibold arabic-amiri">{surah.name}</h1>
                <p className="text-xl text-zinc-400 mt-1">{surah.transliteration}</p>
                <p className="text-sm text-zinc-500 mt-4">
                    {surah.translation} • {surah.type.toUpperCase()} • {surah.total_verses} verses
                </p>
            </div>

            {/* Ayahs */}
            <div className="max-w-3xl mx-auto">
                {surah.verses.map((ayah) => (
                    <AyahCard key={ayah.id} ayah={ayah} number={ayah.id} />
                ))}
            </div>
        </div>
    );
}