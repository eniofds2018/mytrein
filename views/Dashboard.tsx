
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area 
} from 'recharts';
import { Flame, Clock, Calendar, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();

  const data = [
    { name: t('mon'), volume: 4500 },
    { name: t('tue'), volume: 5200 },
    { name: t('wed'), volume: 3800 },
    { name: t('thu'), volume: 6100 },
    { name: t('fri'), volume: 5400 },
    { name: t('sat'), volume: 7200 },
    { name: t('sun'), volume: 2000 },
  ];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t('welcome')}</h1>
          <p className="text-gray-400">{t('summary')}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass px-4 py-2 rounded-full flex items-center gap-2 border-lime-400/30">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span className="text-sm font-semibold">{t('streak')}</span>
          </div>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: t('avg_workout'), value: '72 min', icon: Clock, color: 'text-blue-400' },
          { label: t('total_volume'), value: '34,250 kg', icon: TrendingUp, color: 'text-lime-400' },
          { label: t('sessions'), value: '12', icon: Calendar, color: 'text-purple-400' },
          { label: t('personal_best'), value: '2', icon: Flame, color: 'text-red-400' },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-3xl">
            <div className={`p-2 w-fit rounded-lg bg-white/5 mb-4 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass p-6 rounded-3xl h-[400px]">
          <h3 className="text-lg font-semibold mb-6">{t('volume_progress')}</h3>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a3e635" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#a3e635" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                itemStyle={{ color: '#a3e635' }}
              />
              <Area 
                type="monotone" 
                dataKey="volume" 
                stroke="#a3e635" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorVolume)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass p-6 rounded-3xl flex flex-col">
          <h3 className="text-lg font-semibold mb-6">{t('upcoming_session')}</h3>
          <div className="flex-1 space-y-4">
            <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 bg-lime-400/20 rounded-xl flex items-center justify-center text-lime-400 font-bold">
                M
              </div>
              <div>
                <p className="font-bold">Legs & Abs</p>
                <p className="text-xs text-gray-500">{t('scheduled_prefix')} 17:30</p>
              </div>
            </div>
            <div className="space-y-3 pt-4">
              {['Barbell Squat', 'Leg Press', 'Calf Raises', 'Hanging Leg Raises'].map((ex) => (
                <div key={ex} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                  <span className="text-gray-300">{ex}</span>
                  <span className="text-gray-500">4 {t('sets')}</span>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full mt-6 py-3 bg-lime-400 text-black font-bold rounded-xl hover:bg-lime-300 transition-colors">
            {t('start_session')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
