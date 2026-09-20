import React, { useState } from 'react';
import { X, Check, Palette, Sparkles, RefreshCw, Eye } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeCustomizerModal: React.FC<ThemeCustomizerModalProps> = ({ isOpen, onClose }) => {
  const {
    themes,
    activeThemeId,
    setActiveThemeId,
    isCustomActive,
    customColors,
    applyCustomColors
  } = useTheme();

  const [primaryInput, setPrimaryInput] = useState(customColors.primary);
  const [accentInput, setAccentInput] = useState(customColors.accent);
  const [bgInput, setBgInput] = useState(customColors.bgBase);

  if (!isOpen) return null;

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    applyCustomColors(primaryInput, accentInput, bgInput);
  };

  const handlePresetSelect = (id: string) => {
    setActiveThemeId(id);
    const selected = themes.find((t) => t.id === id);
    if (selected) {
      setPrimaryInput(selected.primaryHex);
      setAccentInput(selected.accentHex);
      setBgInput(selected.bgHex);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-paper-border animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-primary text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest mb-1">
            <Palette className="w-4 h-4" />
            <span>Visual Theme &amp; Brand Palette</span>
          </div>
          <h3 className="font-serif text-2xl font-bold">Customize Website Colors</h3>
          <p className="text-xs text-slate-300 font-light mt-1">
            Choose from our premium South African funeral palettes or enter exact hex colors matching your brand imagery.
          </p>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Preset Palettes */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Curated Brand Themes
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {themes.map((theme) => {
                const isSelected = !isCustomActive && activeThemeId === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => handlePresetSelect(theme.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all relative ${
                      isSelected
                        ? 'border-accent bg-paper-soft shadow-md'
                        : 'border-paper-border hover:border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-accent text-primary-dark flex items-center justify-center shadow">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-5 h-5 rounded-full border border-black/10 shadow-xs"
                        style={{ backgroundColor: theme.primaryHex }}
                      />
                      <div
                        className="w-5 h-5 rounded-full border border-black/10 shadow-xs"
                        style={{ backgroundColor: theme.accentHex }}
                      />
                      <div
                        className="w-5 h-5 rounded-full border border-black/10 shadow-xs"
                        style={{ backgroundColor: theme.bgHex }}
                      />
                    </div>
                    <div className="font-serif font-bold text-sm text-primary">
                      {theme.name}
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                      {theme.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Color Mode */}
          <div className="border-t border-slate-200 pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary block">
                  Exact Image / Custom Hex Colors
                </span>
                <p className="text-[11px] text-slate-500">
                  Enter specific hex color codes from your company logo or palette
                </p>
              </div>
              {isCustomActive && (
                <span className="px-2.5 py-0.5 rounded-full bg-accent/20 text-primary-dark text-[10px] font-bold uppercase">
                  Custom Active
                </span>
              )}
            </div>

            <form onSubmit={handleApplyCustom} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Primary Color */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Primary Tone
                  </label>
                  <div className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-300 bg-white">
                    <input
                      type="color"
                      value={primaryInput}
                      onChange={(e) => setPrimaryInput(e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                    />
                    <input
                      type="text"
                      value={primaryInput}
                      onChange={(e) => setPrimaryInput(e.target.value)}
                      className="w-full text-xs font-mono font-bold text-slate-800 outline-none uppercase"
                    />
                  </div>
                </div>

                {/* Accent / Gold Color */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Accent / Gold Tone
                  </label>
                  <div className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-300 bg-white">
                    <input
                      type="color"
                      value={accentInput}
                      onChange={(e) => setAccentInput(e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                    />
                    <input
                      type="text"
                      value={accentInput}
                      onChange={(e) => setAccentInput(e.target.value)}
                      className="w-full text-xs font-mono font-bold text-slate-800 outline-none uppercase"
                    />
                  </div>
                </div>

                {/* Background Tint */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Background Soft
                  </label>
                  <div className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-300 bg-white">
                    <input
                      type="color"
                      value={bgInput}
                      onChange={(e) => setBgInput(e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                    />
                    <input
                      type="text"
                      value={bgInput}
                      onChange={(e) => setBgInput(e.target.value)}
                      className="w-full text-xs font-mono font-bold text-slate-800 outline-none uppercase"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-xs uppercase tracking-wider transition-all shadow flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>Apply Custom Colors to Live Site</span>
              </button>
            </form>
          </div>

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-colors"
            >
              Done &amp; Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
