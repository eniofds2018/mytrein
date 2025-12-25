
import React from 'react';
import { 
  LayoutDashboard, 
  Dumbbell, 
  User as UserIcon, 
  LogOut, 
  BrainCircuit,
  Settings as SettingsIcon,
  Languages
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const { t, language, setLanguage } = useLanguage();

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: t('dashboard') },
    { id: 'session', icon: Dumbbell, label: t('train') },
    { id: 'exercises', icon: Dumbbell, label: t('exercises') },
    { id: 'ai', icon: BrainCircuit, label: t('ai_coach') },
    { id: 'profile', icon: UserIcon, label: t('profile') },
    { id: 'settings', icon: SettingsIcon, label: t('settings') },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pt' : 'en');
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#111] border-r border-white/5 p-6 print:hidden">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center">
            <Dumbbell className="text-black w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">IRON<span className="text-lime-400">TRACK</span></span>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                ? 'bg-lime-400/10 text-lime-400 border border-lime-400/20' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="space-y-2 mt-auto">
          <button 
            onClick={toggleLanguage}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 transition-all"
          >
            <Languages className="w-5 h-5" />
            <span className="font-medium">{language === 'en' ? 'English' : 'Português'}</span>
          </button>
          
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/5 transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">{t('logout')}</span>
          </button>
        </div>
      </aside>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass z-50 px-6 py-4 border-t border-white/5 print:hidden">
        <div className="flex justify-between items-center">
          {navItems.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center gap-1 ${
                activeTab === item.id ? 'text-lime-400' : 'text-gray-400'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto pb-24 md:pb-0 no-scrollbar">
        {children}
      </main>
    </div>
  );
};

export default Layout;
