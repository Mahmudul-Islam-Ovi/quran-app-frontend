'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Settings as SettingsIcon } from 'lucide-react';
import { useSettings } from './providers/settings-provider';
import { cn } from '@/lib/utils';

export default function SettingsSheet() {
    const { settings, updateSettings } = useSettings();

    return (
        <Sheet>
            <SheetTrigger render={<Button variant="outline" size="icon" className="border-emerald-500/30 rgb-hover-glow glass-panel" />}>
                <SettingsIcon className="w-5 h-5 text-emerald-400" />
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md border-l border-white/10 glass-panel bg-zinc-950/80 backdrop-blur-2xl">
                <div className="space-y-8 mt-8 px-2">
                    <h2 className="text-2xl font-bold rgb-text mb-6">Reading Settings</h2>

                    {/* Arabic Font */}
                    <div className="space-y-4">
                        <Label className="text-sm font-medium text-zinc-300">Arabic Font Style</Label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => updateSettings({ arabicFont: 'amiri' })}
                                className={cn(
                                    "flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300",
                                    settings.arabicFont === 'amiri'
                                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)] scale-[1.02]"
                                        : "border-white/10 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:border-emerald-500/30"
                                )}
                            >
                                <span className="text-3xl mb-3 arabic-amiri mt-2">بِسْمِ اللَّهِ</span>
                                <span className="text-xs font-medium uppercase tracking-wider">Amiri</span>
                            </button>
                            <button
                                onClick={() => updateSettings({ arabicFont: 'noto' })}
                                className={cn(
                                    "flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300",
                                    settings.arabicFont === 'noto'
                                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)] scale-[1.02]"
                                        : "border-white/10 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:border-emerald-500/30"
                                )}
                            >
                                <span className="text-3xl mb-3 arabic-noto mt-2">بِسْمِ اللَّهِ</span>
                                <span className="text-xs font-medium uppercase tracking-wider">Noto Naskh</span>
                            </button>
                        </div>
                    </div>

                    {/* Arabic Size */}
                    <div className="space-y-4 pt-4 border-t border-white/5">
                        <div className="flex justify-between items-center">
                            <Label className="text-sm font-medium text-zinc-300">Arabic Text Size</Label>
                            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">{settings.arabicSize}px</span>
                        </div>
                        <Slider
                            min={20}
                            max={60}
                            step={1}
                            value={[settings.arabicSize]}
                            onValueChange={(v) => updateSettings({ arabicSize: Array.isArray(v) ? v[0] : (v as number) })}
                            className="py-4"
                        />
                    </div>

                    {/* Translation Size */}
                    <div className="space-y-4 pt-4 border-t border-white/5">
                        <div className="flex justify-between items-center">
                            <Label className="text-sm font-medium text-zinc-300">Translation Size</Label>
                            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">{settings.translationSize}px</span>
                        </div>
                        <Slider
                            min={14}
                            max={32}
                            step={1}
                            value={[settings.translationSize]}
                            onValueChange={(v) => updateSettings({ translationSize: Array.isArray(v) ? v[0] : (v as number) })}
                            className="py-4"
                        />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}