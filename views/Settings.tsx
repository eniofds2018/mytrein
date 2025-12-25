
import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Bell, Moon, FileText, FileSpreadsheet, Download, Sun, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Settings: React.FC = () => {
  const { t } = useLanguage();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [exporting, setExporting] = useState<string | null>(null);

  // Load preferences on mount
  useEffect(() => {
    const storedNotif = localStorage.getItem('irontrack_notifications') === 'true';
    const storedDark = localStorage.getItem('irontrack_darkmode') !== 'false'; // Default to true

    setNotificationsEnabled(storedNotif);
    setDarkMode(storedDark);
    applyTheme(storedDark);
  }, []);

  const applyTheme = (isDark: boolean) => {
    const root = document.body;
    if (isDark) {
      root.style.backgroundColor = '#0a0a0a';
      root.style.color = '#ededed';
    } else {
      root.style.backgroundColor = '#f3f4f6'; // Tailwind gray-100
      root.style.color = '#111827'; // Tailwind gray-900
    }
  };

  const handleNotificationToggle = async () => {
    if (!notificationsEnabled) {
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notifications");
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setNotificationsEnabled(true);
        localStorage.setItem('irontrack_notifications', 'true');
        new Notification("IronTrack", { body: "Notifications enabled! We'll remind you to workout." });
      }
    } else {
      setNotificationsEnabled(false);
      localStorage.setItem('irontrack_notifications', 'false');
    }
  };

  const handleDarkModeToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('irontrack_darkmode', String(newMode));
    applyTheme(newMode);
  };

  const handleExportCSV = () => {
    setExporting('csv');
    // Simulate generation delay
    setTimeout(() => {
      const rows = [
        ["Date", "Exercise", "Sets", "Reps", "Weight"],
        ["2024-05-20", "Bench Press", "3", "10", "80"],
        ["2024-05-20", "Squat", "3", "8", "100"],
        ["2024-05-22", "Deadlift", "1", "5", "140"],
        [new Date().toISOString().split('T')[0], "Barbell Row", "4", "10", "70"]
      ];

      const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `irontrack_history_${new Date().getTime()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setExporting(null);
    }, 1500);
  };

  const handleExportPDF = () => {
    setExporting('pdf');
    // Using window.print as a robust, client-side only PDF generation solution
    setTimeout(() => {
      window.print(); 
      setExporting(null);
    }, 1000);
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold">{t('app_settings')}</h1>
        <p className="text-gray-400">{t('manage_prefs')}</p>
      </header>

      <div className="space-y-6">
        {/* General Settings */}
        <section className={`rounded-3xl p-6 md:p-8 transition-colors ${darkMode ? 'glass' : 'bg-white border border-gray-200 shadow-sm'}`}>
          <h3 className="text-lg font-bold text-lime-400 mb-6 flex items-center gap-2">
            <SettingsIcon className="w-5 h-5" /> {t('general')}
          </h3>
          
          <div className="space-y-4">
             {/* Notifications */}
             <div className={`flex items-center justify-between p-4 rounded-xl transition-colors ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Bell className="w-5 h-5" /></div>
                   <div className="flex flex-col">
                     <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t('notifications')}</span>
                     <span className="text-xs text-gray-500">{notificationsEnabled ? 'Enabled' : 'Disabled'}</span>
                   </div>
                </div>
                <button 
                  onClick={handleNotificationToggle}
                  className={`w-12 h-6 rounded-full relative cursor-pointer border transition-colors duration-300 ${
                    notificationsEnabled 
                      ? 'bg-lime-400/20 border-lime-400/30' 
                      : (darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-300 border-gray-300')
                  }`}
                >
                   <div className={`absolute top-1 w-4 h-4 rounded-full shadow-lg transition-all duration-300 ${
                     notificationsEnabled 
                      ? 'bg-lime-400 right-1' 
                      : 'bg-gray-400 left-1'
                   }`}></div>
                </button>
             </div>

             {/* Dark Mode */}
             <div className={`flex items-center justify-between p-4 rounded-xl transition-colors ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                     {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                   </div>
                   <div className="flex flex-col">
                     <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t('dark_mode')}</span>
                     <span className="text-xs text-gray-500">{darkMode ? 'Dark Theme' : 'Light Theme'}</span>
                   </div>
                </div>
                 <button 
                  onClick={handleDarkModeToggle}
                  className={`w-12 h-6 rounded-full relative cursor-pointer border transition-colors duration-300 ${
                    darkMode 
                      ? 'bg-lime-400/20 border-lime-400/30' 
                      : 'bg-gray-300 border-gray-300'
                  }`}
                >
                   <div className={`absolute top-1 w-4 h-4 rounded-full shadow-lg transition-all duration-300 ${
                     darkMode 
                      ? 'bg-lime-400 right-1' 
                      : 'bg-white left-1'
                   }`}></div>
                </button>
             </div>
          </div>
        </section>

        {/* Reports */}
        <section className={`rounded-3xl p-6 md:p-8 transition-colors ${darkMode ? 'glass' : 'bg-white border border-gray-200 shadow-sm'}`}>
          <h3 className="text-lg font-bold text-lime-400 mb-6 flex items-center gap-2">
            <Download className="w-5 h-5" /> {t('reports')}
          </h3>
          <p className="text-gray-400 text-sm mb-6">{t('report_desc')}</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <button 
              onClick={handleExportCSV}
              disabled={exporting === 'csv'}
              className={`group p-6 border rounded-2xl transition-all flex flex-col items-center gap-3 relative overflow-hidden ${
                darkMode 
                  ? 'bg-white/5 hover:bg-white/10 border-white/5 hover:border-lime-400/50' 
                  : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
              }`}
            >
               {exporting === 'csv' ? (
                 <div className="animate-spin w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full"></div>
               ) : (
                 <FileSpreadsheet className="w-10 h-10 text-green-500 group-hover:scale-110 transition-transform" />
               )}
               <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                 {exporting === 'csv' ? 'Generating...' : t('export_excel')}
               </span>
            </button>

            <button 
              onClick={handleExportPDF}
              disabled={exporting === 'pdf'}
              className={`group p-6 border rounded-2xl transition-all flex flex-col items-center gap-3 ${
                darkMode 
                  ? 'bg-white/5 hover:bg-white/10 border-white/5 hover:border-red-400/50' 
                  : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
              }`}
            >
               {exporting === 'pdf' ? (
                 <div className="animate-spin w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full"></div>
               ) : (
                 <FileText className="w-10 h-10 text-red-400 group-hover:scale-110 transition-transform" />
               )}
               <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                 {exporting === 'pdf' ? 'Preparing...' : t('export_pdf')}
               </span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
