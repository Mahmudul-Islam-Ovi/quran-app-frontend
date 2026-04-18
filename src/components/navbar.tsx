'use client';

import { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { api } from '@/lib/api';
import { SearchResult } from '@/types/quran';
import SettingsSheet from './settings-sheet';

export default function Navbar() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);

    const handleSearch = async (q: string) => {
        if (q.trim().length < 2) return setResults([]);
        const data = await api.searchAyahs(q);
        setResults(data);
    };

    return (
        <nav className="sticky top-0 z-50 glass-panel border-b border-white/5 shadow-2xl bg-zinc-950/40 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <BookOpen className="w-8 h-8 text-emerald-500" />
                    <div>
                        <span className="text-2xl font-bold tracking-tight">Al-Quran</span>
                        <p className="text-xs text-zinc-400 -mt-1">Read with peace</p>
                    </div>
                </Link>

                <div className="flex items-center gap-4">
                    {/* Global Search */}
                    <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
                        <SheetTrigger render={<Button variant="outline" size="icon" className="border-emerald-500/30" />}>
                            <Search className="w-5 h-5" />
                        </SheetTrigger>
                        <SheetContent side="top" className="h-screen max-h-[90vh] bg-zinc-950 border-b">
                            <div className="max-w-2xl mx-auto mt-10">
                                <Input
                                    placeholder="Search ayahs..."
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        handleSearch(e.target.value);
                                    }}
                                    className="text-lg py-7"
                                />

                                <div className="mt-8 max-h-[60vh] overflow-auto space-y-4">
                                    {results.length > 0 ? (
                                        results.map((ayah, index) => (
                                            <Link
                                                key={`${ayah.surahId}-${ayah.id}`}   // ← Best fix: Combine surahId + ayah id
                                                href={`/surah/${ayah.surahId}`}
                                                onClick={() => setSearchOpen(false)}
                                                className="block p-4 rounded-xl hover:bg-zinc-900 border border-transparent hover:border-emerald-500/30 transition-colors"
                                            >
                                                <div className="flex justify-between text-xs text-emerald-400 mb-2">
                                                    <span>
                                                        {ayah.surahName} ({ayah.surahEnglish})
                                                    </span>
                                                    <span>Ayah {ayah.id}</span>
                                                </div>
                                                <p className="text-sm text-zinc-300 line-clamp-2">
                                                    {ayah.translation}
                                                </p>
                                            </Link>
                                        ))
                                    ) : query.length > 2 ? (
                                        <p className="text-center text-zinc-500 py-10">No matching ayahs found.</p>
                                    ) : null}
                                </div>


                                {/* <div className="mt-8 max-h-[60vh] overflow-auto space-y-4">
                                    {results.map((ayah) => (
                                        <Link
                                            key={ayah.id}
                                            href={`/surah/${ayah.surahId}`}
                                            onClick={() => setSearchOpen(false)}
                                            className="block p-4 rounded-xl hover:bg-zinc-900 border border-transparent hover:border-emerald-500/30"
                                        >
                                            <div className="flex justify-between text-xs text-emerald-400 mb-2">
                                                <span>{ayah.surahName} ({ayah.surahEnglish})</span>
                                                <span>Ayah {ayah.id}</span>
                                            </div>
                                            <p className="text-sm text-zinc-300 line-clamp-2">{ayah.translation}</p>
                                        </Link>
                                    ))}
                                    {results.length === 0 && query.length > 2 && (
                                        <p className="text-center text-zinc-500 py-10">No ayahs found.</p>
                                    )}
                                </div> */}
                            </div>
                        </SheetContent>
                    </Sheet>

                    {/* Settings */}
                    <SettingsSheet />
                </div>
            </div>
        </nav>
    );
}