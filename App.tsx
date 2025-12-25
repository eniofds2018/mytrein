
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './views/Dashboard';
import Exercises from './views/Exercises';
import AICoach from './views/AICoach';
import Session from './views/Session';
import Profile from './views/Profile';
import Settings from './views/Settings';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { t } = useLanguage();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
        <div className="max-w-md w-full glass p-10 rounded-[2.5rem] space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-black italic tracking-tighter text-white">IRON<span className="text-lime-400">TRACK</span></h1>
            <p className="text-gray-400 mt-2">{t('next_gen')}</p>
          </div>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsAuthenticated(true); }}>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">{t('email')}</label>
              <input 
                type="email" 
                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-lime-400 transition-colors"
                placeholder="alex@example.com"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">{t('password')}</label>
              <input 
                type="password" 
                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-lime-400 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-4 bg-lime-400 text-black font-black uppercase tracking-widest rounded-2xl hover:bg-lime-300 transition-all shadow-[0_0_30px_rgba(163,230,53,0.3)]"
            >
              {t('signin_title')}
            </button>
          </form>
          <p className="text-center text-gray-500 text-sm">
            {t('new_user')} <button className="text-lime-400 font-bold underline">{t('join_free')}</button>
          </p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'exercises': return <Exercises />;
      case 'ai': return <AICoach />;
      case 'session': return <Session />;
      case 'profile': return <Profile />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
