'use client';

import { Ayah } from '@/types/quran';
import { useSettings } from './providers/settings-provider';
import { motion } from 'framer-motion';

export default function AyahCard({ ayah, number }: { ayah: Ayah; number: number }) {
    const { settings } = useSettings();

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="glass-panel rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden"
        >
            {/* Subtle glow behind the number */}
            <div className="absolute top-8 left-8 w-16 h-16 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono text-sm shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    {number}
                </div>
            </div>

            {/* Arabic */}
            <p
                className={`arabic-text text-[var(--arabic-font-size)] ${settings.arabicFont === 'amiri' ? 'arabic-amiri' : 'arabic-noto'} leading-loose mb-10 text-emerald-50 drop-shadow-sm`}
            >
                {ayah.text}
            </p>

            {/* Translation */}
            <p
                className="text-[var(--translation-font-size)] text-zinc-300 leading-relaxed font-light"
                style={{ fontSize: `var(--translation-font-size)` }}
            >
                {ayah.translation}
            </p>
        </motion.div>
    );
}