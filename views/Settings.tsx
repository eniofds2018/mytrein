
import React from 'react';
import { Settings as SettingsIcon, Bell, Moon, FileText, FileSpreadsheet, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Settings: React.FC = () => {
  const { t } = useLanguage();

  const handleExportCSV = () => {
    // Mock data for export
    const rows = [
      ["Date", "Exercise", "Sets", "Reps", "Weight"],
      ["2024-05-20", "Bench Press", "3", "10", "80"],
      ["2024-05-20", "Squat", "3", "8", "100"],
      ["2024-05-22", "Deadlift", "1", "5", "140"]
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "irontrack_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    window.print(); // Simple PDF generation via browser print
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold">{t('app_settings')}</h1>
        <p className="text-gray-400">{t('manage_prefs')}</p>
      </header>

      <div className="space-y-6">
        <section className="glass rounded-3xl p-6 md:p-8">
          <h3 className="text-lg font-bold text-lime-400 mb-6 flex items-center gap-2">
            <SettingsIcon className="w-5 h-5" /> {t('general')}
          </h3>
          <div className="space-y-4">
             <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Bell className="w-5 h-5" /></div>
                   <span className="font-medium">{t('notifications')}</span>
                </div>
                <div className="w-12 h-6 bg-lime-400/20 rounded-full relative cursor-pointer border border-lime-400/30">
                   <div className="absolute right-1 top-1 w-4 h-4 bg-lime-400 rounded-full shadow-lg"></div>
                </div>
             </div>
             <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><Moon className="w-5 h-5" /></div>
                   <span className="font-medium">{t('dark_mode')}</span>
                </div>
                 <div className="w-12 h-6 bg-lime-400/20 rounded-full relative cursor-pointer border border-lime-400/30">
                   <div className="absolute right-1 top-1 w-4 h-4 bg-lime-400 rounded-full shadow-lg"></div>
                </div>
             </div>
          </div>
        </section>

        <section className="glass rounded-3xl p-6 md:p-8">
          <h3 className="text-lg font-bold text-lime-400 mb-6 flex items-center gap-2">
            <Download className="w-5 h-5" /> {t('reports')}
          </h3>
          <p className="text-gray-400 text-sm mb-6">{t('report_desc')}</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <button 
              onClick={handleExportCSV}
              className="group p-6 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-lime-400/50 rounded-2xl transition-all flex flex-col items-center gap-3"
            >
               <FileSpreadsheet className="w-10 h-10 text-green-500 group-hover:scale-110 transition-transform" />
               <span className="font-bold">{t('export_excel')}</span>
            </button>

            <button 
              onClick={handleExportPDF}
              className="group p-6 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-red-400/50 rounded-2xl transition-all flex flex-col items-center gap-3"
            >
               <FileText className="w-10 h-10 text-red-400 group-hover:scale-110 transition-transform" />
               <span className="font-bold">{t('export_pdf')}</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
