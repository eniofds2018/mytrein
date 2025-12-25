
import React, { useState, useEffect, useRef } from 'react';
import { Timer, Plus, CheckCircle2, Play, Trash2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockExercises } from '../data';

interface SessionSet {
  reps: number;
  weight: number;
  completed: boolean;
}

interface ActiveExercise {
  id: string; // Unique instance ID
  exerciseId: string;
  name: string;
  sets: SessionSet[];
}

const Session: React.FC = () => {
  const { t } = useLanguage();
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [activeExercises, setActiveExercises] = useState<ActiveExercise[]>([]);
  const [showExerciseSelector, setShowExerciseSelector] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const addExercise = (exerciseId: string, name: string) => {
    const newExercise: ActiveExercise = {
      id: Math.random().toString(36).substr(2, 9),
      exerciseId,
      name,
      sets: [{ reps: 0, weight: 0, completed: false }]
    };
    setActiveExercises([...activeExercises, newExercise]);
    setShowExerciseSelector(false);
  };

  const addSet = (exerciseInstanceId: string) => {
    setActiveExercises(activeExercises.map(ex => {
      if (ex.id === exerciseInstanceId) {
        // Copy previous set values for convenience
        const lastSet = ex.sets[ex.sets.length - 1];
        return {
          ...ex,
          sets: [...ex.sets, { reps: lastSet?.reps || 0, weight: lastSet?.weight || 0, completed: false }]
        };
      }
      return ex;
    }));
  };

  const updateSet = (exerciseInstanceId: string, setIndex: number, field: 'reps' | 'weight', value: number) => {
    setActiveExercises(activeExercises.map(ex => {
      if (ex.id === exerciseInstanceId) {
        const newSets = [...ex.sets];
        newSets[setIndex] = { ...newSets[setIndex], [field]: value };
        return { ...ex, sets: newSets };
      }
      return ex;
    }));
  };

  const toggleSetComplete = (exerciseInstanceId: string, setIndex: number) => {
     setActiveExercises(activeExercises.map(ex => {
      if (ex.id === exerciseInstanceId) {
        const newSets = [...ex.sets];
        newSets[setIndex] = { ...newSets[setIndex], completed: !newSets[setIndex].completed };
        return { ...ex, sets: newSets };
      }
      return ex;
    }));
  };

  const removeExercise = (id: string) => {
    setActiveExercises(activeExercises.filter(ex => ex.id !== id));
  }

  const finishWorkout = () => {
    if (confirm(t('finish_confirm'))) {
      setIsActive(false);
      setSeconds(0);
      setActiveExercises([]);
      alert("Session saved to history! (Simulated)");
    }
  };

  if (!isActive) {
    return (
      <div className="p-10 text-center space-y-4 h-[80vh] flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl animate-bounce">💪</span>
        </div>
        <h2 className="text-2xl font-bold">{t('ready_crush')}</h2>
        <p className="text-gray-400 max-w-sm">{t('tracking_desc')}</p>
        <button 
          onClick={() => setIsActive(true)}
          className="bg-lime-400 text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(163,230,53,0.4)]"
        >
          {t('start_tracking')}
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto pb-32">
      <header className="sticky top-0 z-10 glass -mx-4 -mt-4 p-4 md:rounded-b-2xl mb-6 flex justify-between items-center shadow-lg">
        <div>
          <h2 className="text-sm text-gray-400 font-bold uppercase tracking-wider">{t('current_session')}</h2>
          <div className="flex items-center gap-2 mt-1">
             <Timer className="w-5 h-5 text-lime-400" />
             <span className="text-3xl font-mono font-bold">{formatTime(seconds)}</span>
          </div>
        </div>
        <button 
          onClick={finishWorkout}
          className="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all text-sm"
        >
          {t('finish_workout')}
        </button>
      </header>

      <div className="space-y-6">
        {activeExercises.map((ex) => (
          <div key={ex.id} className="glass rounded-2xl overflow-hidden">
             <div className="bg-white/5 p-4 flex justify-between items-center">
               <h3 className="font-bold text-lg">{ex.name}</h3>
               <button onClick={() => removeExercise(ex.id)} className="text-gray-600 hover:text-red-400"><Trash2 className="w-4 h-4"/></button>
             </div>
             <div className="p-4 space-y-3">
               <div className="grid grid-cols-10 gap-2 text-xs font-bold text-gray-500 uppercase text-center mb-2">
                 <div className="col-span-2">{t('sets')}</div>
                 <div className="col-span-3">{t('kg')}</div>
                 <div className="col-span-3">{t('reps')}</div>
                 <div className="col-span-2"></div>
               </div>
               
               {ex.sets.map((set, idx) => (
                 <div key={idx} className={`grid grid-cols-10 gap-2 items-center ${set.completed ? 'opacity-50' : ''}`}>
                   <div className="col-span-2 flex justify-center">
                     <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-xs font-bold text-gray-400">
                       {idx + 1}
                     </div>
                   </div>
                   <div className="col-span-3">
                     <input 
                       type="number" 
                       value={set.weight || ''} 
                       onChange={(e) => updateSet(ex.id, idx, 'weight', parseFloat(e.target.value))}
                       className="w-full bg-[#111] border border-white/10 rounded-lg p-2 text-center focus:border-lime-400 outline-none"
                       placeholder="0"
                     />
                   </div>
                   <div className="col-span-3">
                     <input 
                       type="number" 
                       value={set.reps || ''} 
                       onChange={(e) => updateSet(ex.id, idx, 'reps', parseFloat(e.target.value))}
                       className="w-full bg-[#111] border border-white/10 rounded-lg p-2 text-center focus:border-lime-400 outline-none"
                       placeholder="0"
                     />
                   </div>
                   <div className="col-span-2 flex justify-center">
                     <button 
                        onClick={() => toggleSetComplete(ex.id, idx)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${set.completed ? 'bg-lime-400 text-black' : 'bg-white/5 text-gray-600 hover:bg-white/10'}`}
                     >
                       <CheckCircle2 className="w-5 h-5" />
                     </button>
                   </div>
                 </div>
               ))}

               <button 
                 onClick={() => addSet(ex.id)}
                 className="w-full py-2 bg-white/5 hover:bg-white/10 text-gray-400 text-sm font-bold rounded-xl mt-2 flex items-center justify-center gap-2 transition-colors"
               >
                 <Plus className="w-4 h-4" /> {t('add_set')}
               </button>
             </div>
          </div>
        ))}

        <div className="relative">
           {showExerciseSelector ? (
             <div className="glass p-4 rounded-2xl animate-in fade-in zoom-in duration-200">
               <input type="text" placeholder={t('search_placeholder')} className="w-full bg-[#111] border border-white/10 rounded-xl p-3 mb-3 outline-none focus:border-lime-400" autoFocus />
               <div className="max-h-60 overflow-y-auto space-y-1">
                 {mockExercises.map(ex => (
                   <button 
                     key={ex.id} 
                     onClick={() => addExercise(ex.id, ex.name)}
                     className="w-full text-left p-3 hover:bg-white/5 rounded-lg flex justify-between items-center group"
                   >
                     <span>{ex.name}</span>
                     <Plus className="w-4 h-4 text-gray-600 group-hover:text-lime-400" />
                   </button>
                 ))}
               </div>
               <button onClick={() => setShowExerciseSelector(false)} className="w-full mt-3 py-2 text-red-400 text-sm">{t('cancel')}</button>
             </div>
           ) : (
             <button 
               onClick={() => setShowExerciseSelector(true)}
               className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-gray-400 font-bold flex items-center justify-center gap-2 hover:border-lime-400/50 hover:text-lime-400 transition-all"
             >
               <Plus className="w-5 h-5" />
               {t('add_exercise')}
             </button>
           )}
        </div>
      </div>
    </div>
  );
};

export default Session;
