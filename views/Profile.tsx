
import React, { useState } from 'react';
import { User, Edit2, Save, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Profile: React.FC = () => {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Alex Thompson',
    weight: '84',
    goal: 'Strength',
    email: 'alex@example.com'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleChange = (field: string, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto space-y-8 mt-4">
      <div className="glass rounded-3xl p-8 relative">
        <div className="absolute top-6 right-6">
          {isEditing ? (
            <div className="flex gap-2">
              <button onClick={() => setIsEditing(false)} className="p-2 bg-white/5 rounded-xl hover:bg-white/10 text-gray-400">
                <X className="w-5 h-5" />
              </button>
              <button onClick={handleSave} className="p-2 bg-lime-400 rounded-xl hover:bg-lime-300 text-black">
                <Save className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button onClick={() => setIsEditing(true)} className="p-2 bg-white/5 rounded-xl hover:bg-white/10 text-lime-400">
              <Edit2 className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex flex-col items-center mb-8">
           <div className="w-24 h-24 bg-gradient-to-br from-lime-400 to-lime-600 rounded-full mb-6 flex items-center justify-center text-black text-4xl font-bold shadow-[0_0_30px_rgba(163,230,53,0.3)]">
             {userData.name.charAt(0)}
           </div>
           
           {isEditing ? (
             <input 
               type="text" 
               value={userData.name}
               onChange={(e) => handleChange('name', e.target.value)}
               className="bg-[#111] border border-white/20 rounded-xl px-4 py-2 text-center text-xl font-bold outline-none focus:border-lime-400"
             />
           ) : (
             <h2 className="text-2xl font-bold">{userData.name}</h2>
           )}
           <p className="text-gray-400 mt-2">Intermediate • {t('member_since')}</p>
        </div>

        <div className="space-y-4">
          <div className="bg-white/5 p-5 rounded-2xl flex items-center justify-between">
            <span className="text-gray-400 font-medium">{t('email')}</span>
            <span className="font-semibold text-gray-200">{userData.email}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-5 rounded-2xl">
              <p className="text-gray-500 text-xs uppercase font-bold mb-2">{t('weight')}</p>
              {isEditing ? (
                <div className="flex items-center gap-2">
                   <input 
                    type="number" 
                    value={userData.weight}
                    onChange={(e) => handleChange('weight', e.target.value)}
                    className="w-full bg-[#111] border border-white/20 rounded-lg px-2 py-1 text-xl font-bold outline-none focus:border-lime-400"
                  />
                  <span className="text-gray-500">kg</span>
                </div>
              ) : (
                <p className="text-xl font-bold">{userData.weight} kg</p>
              )}
            </div>
            
            <div className="bg-white/5 p-5 rounded-2xl">
              <p className="text-gray-500 text-xs uppercase font-bold mb-2">{t('goal')}</p>
               {isEditing ? (
                 <select 
                   value={userData.goal}
                   onChange={(e) => handleChange('goal', e.target.value)}
                   className="w-full bg-[#111] border border-white/20 rounded-lg px-2 py-1 text-sm font-bold outline-none focus:border-lime-400 text-white"
                 >
                   <option value="Strength">Strength</option>
                   <option value="Hypertrophy">Hypertrophy</option>
                   <option value="Endurance">Endurance</option>
                   <option value="Weight Loss">Weight Loss</option>
                 </select>
               ) : (
                <p className="text-xl font-bold">{t(userData.goal.toLowerCase() as any) || userData.goal}</p>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
