
import React, { useState } from 'react';
import { BrainCircuit, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { generateWorkoutRoutine } from '../services/geminiService';
import { AIWorkoutSuggestion } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const AICoach: React.FC = () => {
  const { t, language } = useLanguage();
  const [goal, setGoal] = useState('');
  const [level, setLevel] = useState('Intermediate');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<AIWorkoutSuggestion | null>(null);

  const handleGenerate = async () => {
    if (!goal) return;
    setLoading(true);
    try {
      const result = await generateWorkoutRoutine(goal, level, language);
      setSuggestion(result);
    } catch (error) {
      console.error(error);
      alert('Failed to generate routine. Please check your API key.');
    } finally {
      setLoading(false);
    }
  };

  const experienceLevels = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      <header className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-lime-400 rounded-2xl flex items-center justify-center animate-pulse">
          <BrainCircuit className="text-black w-10 h-10" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">{t('ai_title')}</h1>
        <p className="text-gray-400 max-w-lg mx-auto">
          {t('ai_subtitle')}
        </p>
      </header>

      {!suggestion ? (
        <div className="glass p-8 rounded-3xl space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300">{t('goal_label')}</label>
            <input 
              type="text" 
              placeholder={t('goal_placeholder')}
              className="w-full bg-[#111] border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-lime-400 outline-none transition-all"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300">{t('experience_label')}</label>
            <div className="grid grid-cols-3 gap-3">
              {experienceLevels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  className={`p-3 rounded-xl border transition-all ${
                    level === lvl 
                    ? 'bg-lime-400/20 border-lime-400 text-lime-400' 
                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {t(lvl.toLowerCase() as any)}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading || !goal}
            className="w-full py-4 bg-lime-400 text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-lime-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            {loading ? t('analyzing_btn') : t('generate_btn')}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="glass p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6">
              <button 
                onClick={() => setSuggestion(null)}
                className="text-gray-500 hover:text-white text-sm"
              >
                {t('reset')}
              </button>
            </div>
            <h2 className="text-2xl font-bold text-lime-400 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6" />
              {suggestion.routineName}
            </h2>
            <p className="mt-4 text-gray-300 leading-relaxed italic border-l-2 border-lime-400/30 pl-4">
              "{suggestion.advice}"
            </p>
            
            <div className="mt-10 space-y-4">
              {suggestion.exercises.map((ex, i) => (
                <div key={i} className="bg-white/5 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-lg">{ex.name}</h4>
                    <p className="text-sm text-gray-400">{t('targeting')}: {ex.focus}</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center px-4 py-2 bg-black/40 rounded-lg">
                      <p className="text-[10px] uppercase tracking-wider text-gray-500">{t('sets')}</p>
                      <p className="font-bold">{ex.sets}</p>
                    </div>
                    <div className="text-center px-4 py-2 bg-black/40 rounded-lg">
                      <p className="text-[10px] uppercase tracking-wider text-gray-500">{t('reps')}</p>
                      <p className="font-bold">{ex.reps}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 py-4 border border-lime-400/30 text-lime-400 font-bold rounded-xl hover:bg-lime-400/10 transition-all">
              {t('save_routine')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AICoach;
