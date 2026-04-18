'use client';

import Link from 'next/link';
import { Surah } from '@/types/quran';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export default function SurahCard({ surah, index = 0 }: { surah: Surah; index?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.02, ease: "easeOut" }}
            className="h-full"
        >
            <Link href={`/surah/${surah.id}`} className="block h-full">
                <div className="glass-panel rgb-hover-glow rounded-xl p-6 group h-full flex flex-col justify-between cursor-pointer ">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-emerald-400 font-mono text-3xl font-light mb-1">
                                {surah.id.toString().padStart(3, '0')}
                            </div>
                            <h3 className="text-2xl font-semibold mt-2 group-hover:text-emerald-300 transition-colors">
                                {surah.name}
                            </h3>
                            <p className="text-zinc-400 text-sm mt-1">{surah.transliteration}</p>
                        </div>
                        <Badge variant="outline" className="text-[10px] uppercase tracking-widest border-emerald-500/30 text-emerald-300 bg-emerald-500/10">
                            {surah.type}
                        </Badge>
                    </div>
                    <div>
                        <p className="mt-6 text-zinc-300 text-sm line-clamp-2">{surah.translation}</p>
                        <div className="text-xs text-zinc-500 mt-4 flex justify-end font-medium uppercase tracking-wider">
                            {surah.total_verses} verses
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}