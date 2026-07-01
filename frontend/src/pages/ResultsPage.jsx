import { useLocation, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Save, ArrowLeft, CheckCircle, ChevronRight } from 'lucide-react';
import { savePlan } from '../api';
import { useState } from 'react';
import { motion } from 'framer-motion';

const COLORS = ['#3B82F6', '#10B981', '#A855F7', '#F43F5E'];

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [planName, setPlanName] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!location.state) {
    return (
      <div className="text-center py-32">
        <h2 className="text-3xl font-bold mb-6 text-white">No active calculation session.</h2>
        <button onClick={() => navigate('/calculator')} className="px-6 py-3 bg-primary-600 rounded-xl text-white font-bold inline-flex items-center gap-2 hover:bg-primary-500 transition-colors">
          Start New Estimate <ArrowLeft size={18} className="rotate-180" />
        </button>
      </div>
    );
  }

  const { formData, result } = location.state;
  const { breakdown, totalCost } = result;

  const data = [
    { name: 'Compute', value: breakdown.computeCost },
    { name: 'Storage', value: breakdown.storageCost },
    { name: 'Database', value: breakdown.databaseCost },
    { name: 'Network', value: breakdown.networkCost },
  ].filter(item => item.value > 0);

  const handleSave = async () => {
    if (!planName) {
      alert('Please enter a plan naming convention.');
      return;
    }
    setSaving(true);
    try {
      await savePlan({
        planName,
        ...formData,
        totalCost,
        breakdown
      });
      setSaved(true);
    } catch (err) {
      console.error(err);
      alert('Failed to construct and save plan entry.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-6xl mx-auto space-y-10 mt-4"
    >
      <button 
        onClick={() => navigate('/calculator')} 
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group font-medium"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Modify Architecture
      </button>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 glass-panel p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-600/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="z-10">
          <h2 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-2">Estimated Monthly Spend</h2>
          <div className="text-7xl font-black text-white flex items-baseline gap-2">
            ${totalCost.toFixed(2)} <span className="text-2xl text-gray-400 font-medium">/ USD</span>
          </div>
        </div>
        <div className="z-10 px-6 py-4 rounded-2xl bg-surface/80 border border-surfaceBorder flex flex-col gap-1 items-end">
             <span className="text-sm text-gray-400 font-medium uppercase tracking-wider">Provider Selected</span>
             <span className="text-2xl font-bold text-primary-400 uppercase tracking-widest">{formData.provider}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Charts */}
        <div className="lg:col-span-3 glass-panel p-8 flex flex-col items-center justify-center min-h-[400px]">
          <h3 className="text-2xl font-black mb-6 w-full text-left text-white">Cost Distribution Analysis</h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={85}
                  outerRadius={120}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={8}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `$${value.toFixed(2)}`} 
                  contentStyle={{ backgroundColor: '#030712', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '1rem', color: '#fff', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}
                  itemStyle={{ color: '#F3F4F6', fontWeight: 'bold' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown details */}
        <div className="lg:col-span-2 glass-panel p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-black mb-8 text-white">Resource Allocation</h3>
            <div className="space-y-4">
              {data.map((item, index) => (
                <div key={item.name} className="flex justify-between items-center p-5 bg-surface/50 rounded-2xl border border-surfaceBorder hover:bg-surface/80 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full shadow-inner" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="font-bold text-lg">{item.name}</span>
                  </div>
                  <span className="text-xl font-black text-white">${item.value.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-surfaceBorder">
            <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest flex items-center gap-2">Preserve Architecture <ChevronRight size={16} /></h4>
            {saved ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-3 p-5 bg-accent-500/20 text-accent-400 font-bold rounded-2xl border border-accent-500/30"
              >
                <CheckCircle size={24} /> Configuration Saved Successfully
              </motion.div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="text" 
                  placeholder="E.g. Prod Config V1" 
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  className="flex-1 glass-input py-4 text-base"
                />
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="px-8 py-4 bg-white text-background hover:bg-gray-200 rounded-xl font-black flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                  <Save size={20} /> {saving ? 'Committing...' : 'Commit'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultsPage;
