import { api } from '@/lib/api';
import SurahCard from '@/components/surah-card';
import { Surah } from '@/types/quran';

export default async function Home() {
  const surahs: Surah[] = await api.getAllSurahs();

  return (
    <>
      <div className="text-center mb-16 pt-10">
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter mb-4 rgb-text">
          The Noble Quran
        </h1>
        <p className="text-zinc-300 text-lg md:text-xl font-light">
          114 Surahs • Arabic &amp; English Translation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {surahs.map((surah, index) => (
          <SurahCard key={surah.id} surah={surah} index={index} />
        ))}
      </div>
    </>
  );
}