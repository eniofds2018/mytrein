
import React, { useState } from 'react';
import { Search, Plus, Filter, ChevronRight, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockExercises } from '../data';

const Exercises: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filtered = mockExercises.filter(ex => 
    ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ex.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTranslatedValue = (val: string) => {
      const key = val.toLowerCase() as any;
      return t(key) !== key ? t(key) : val;
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">{t('exercise_library')}</h1>
          <p className="text-gray-400">{t('browse_exercises')}</p>
        </div>
        <button className="bg-lime-400 text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-lime-300">
          <Plus className="w-5 h-5" />
          {t('add_new')}
        </button>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder={t('search_placeholder')}
            className="w-full bg-[#111] border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-lime-400 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="glass px-6 py-3 rounded-xl flex items-center gap-2 text-gray-300">
          <Filter className="w-5 h-5" />
          {t('filters')}
        </button>
      </div>

      <div className="space-y-3">
        {filtered.map((ex) => (
          <div key={ex.id} className="glass p-5 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center font-bold text-gray-400 group-hover:text-lime-400 transition-colors">
                {getTranslatedValue(ex.category)[0]}
              </div>
              <div>
                <h4 className="font-bold text-lg">{ex.name}</h4>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">{getTranslatedValue(ex.category)}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">{getTranslatedValue(ex.equipment)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-500 hover:text-white transition-colors">
                <Info className="w-5 h-5" />
              </button>
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-lime-400 transition-all group-hover:translate-x-1" />
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <p className="text-gray-400">{t('no_exercises')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exercises;
