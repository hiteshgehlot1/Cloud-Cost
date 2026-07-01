import { useState, useEffect } from 'react';
import { getPlans, deletePlan } from '../api';
import { Trash2, Loader2, Calendar, Server, HardDrive, Database, Globe } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const DashboardPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const data = await getPlans();
      setPlans(data);
    } catch (error) {
      console.error('Failed to fetch plans', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this infrastructure plan permanently? Action cannot be undone.')) return;
    try {
      await deletePlan(id);
      setPlans(prev => prev.filter(p => p._id !== id));
    } catch (error) {
      console.error('Failed to delete plan', error);
      alert('Failed to delete plan');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-6">
        <Loader2 className="w-12 h-12 animate-spin text-primary-500" />
        <p className="text-gray-400 font-medium text-lg tracking-widest uppercase animate-pulse">Retrieving architecture datastore...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto mt-6"
    >
      <div className="mb-14 text-center">
        <h2 className="text-4xl md:text-5xl font-black mb-4">Command <span className="text-gradient">Center</span></h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">Review and manage your saved cloud infrastructure layouts.</p>
      </div>

      {plans.length === 0 ? (
        <div className="text-center py-32 glass-panel relative overflow-hidden">
          <div className="absolute inset-0 bg-primary-600/5 blur-[100px] rounded-full pointer-events-none"></div>
          <p className="text-2xl font-bold text-gray-300 relative z-10">No architecture plans saved yet.</p>
          <p className="text-gray-500 mt-2 relative z-10">Use the calculator to build and commit your first estimate.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              key={plan._id} 
              className="glass-panel p-8 relative group hover:border-primary-500/50 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(59,130,246,0.15)] hover:-translate-y-2 flex flex-col justify-between"
            >
              
              <div>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-black truncate pr-4 text-white group-hover:text-primary-400 transition-colors">{plan.planName}</h3>
                  <button 
                    onClick={() => handleDelete(plan._id)}
                    className="p-2.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] rounded-xl transition-all opacity-0 group-hover:opacity-100 absolute top-7 right-7"
                    title="Terminate Plan"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="text-5xl font-black text-white flex items-baseline gap-1 mb-8">
                  ${plan.totalCost.toFixed(2)}
                  <span className="text-sm text-gray-500 font-bold uppercase tracking-widest ml-2">/ mth</span>
                </div>

                <div className="space-y-4 text-sm font-medium text-gray-300 mb-8 bg-surface/40 p-5 rounded-2xl border border-surfaceBorder/50 mix-blend-screen overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-surface/20 to-transparent pointer-events-none"></div>
                  
                  <div className="flex items-center gap-3 relative z-10">
                    <Server size={16} className="text-primary-400" />
                    <span>{plan.computeConfig?.instanceType} <span className="text-gray-500 mx-1">|</span> {plan.computeConfig?.hours}hrs</span>
                  </div>
                  <div className="flex items-center gap-3 relative z-10">
                    <HardDrive size={16} className="text-accent-400" />
                    <span>{plan.storageConfig?.storageType} <span className="text-gray-500 mx-1">|</span> {plan.storageConfig?.sizeGB}GB</span>
                  </div>
                  <div className="flex items-center gap-3 relative z-10">
                    <Database size={16} className="text-purple-400" />
                    <span>{plan.databaseConfig?.engine} <span className="text-gray-500 mx-1">|</span> {plan.databaseConfig?.instanceSize}</span>
                  </div>
                  <div className="flex items-center gap-3 relative z-10">
                    <Globe size={16} className="text-pink-400" />
                    <span>{plan.bandwidthConfig?.dataTransferGB}GB Egress</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase tracking-widest border-t border-surfaceBorder pt-6 mt-auto">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>{format(new Date(plan.createdAt), 'MMM d, yyyy')}</span>
                </div>
                <div className="px-3 py-1 bg-surface rounded-md border border-surfaceBorder">
                   {plan.computeConfig?.provider?.toUpperCase() || 'AWS'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default DashboardPage;
