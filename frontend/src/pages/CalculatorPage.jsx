import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateCost } from '../api';
import { Server, Database, HardDrive, Globe, Loader2, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const CalculatorPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    provider: 'aws',
    computeConfig: { instanceType: 't2.micro', hours: 730 },
    storageConfig: { storageType: 'standard', sizeGB: 100 },
    databaseConfig: { engine: 'mysql', instanceSize: 'micro' },
    bandwidthConfig: { dataTransferGB: 50 },
  });

  const handleChange = (category, field, value) => {
    if (category) {
      setFormData(prev => ({
        ...prev,
        [category]: { ...prev[category], [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await calculateCost(formData);
      navigate('/results', { state: { formData, result } });
    } catch (error) {
      console.error('Error calculating cost', error);
      alert('Failed to calculate cost. Backend might be down.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto mt-8"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black mb-4">Architecture <span className="text-gradient">Builder</span></h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">Select your cloud provider and fine-tune your resource allocation to generate a robust cost estimate.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 glass-panel p-8 md:p-10 relative overflow-hidden">
        
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 blur-[80px] rounded-full pointer-events-none"></div>

        {/* Provider Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 relative z-10">
          {['aws', 'azure', 'gcp'].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => handleChange(null, 'provider', p)}
              className={`px-8 py-4 rounded-2xl font-bold uppercase tracking-widest transition-all duration-300 transform active:scale-95
                ${formData.provider === p 
                  ? 'bg-gradient-to-r from-primary-600 to-primary-400 text-white shadow-[0_0_30px_rgba(59,130,246,0.3)] border-transparent' 
                  : 'bg-surface/50 text-gray-400 border border-surfaceBorder hover:bg-surface hover:text-white'
                }`}
            >
               {p === 'aws' ? 'Amazon AWS' : p === 'azure' ? 'Microsoft Azure' : 'Google Cloud'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {/* Compute */}
          <SectionCard icon={<Cpu className="text-primary-400" />} title="Compute Engine">
            <Select 
              label="Instance Type" 
              value={formData.computeConfig.instanceType} 
              onChange={(e) => handleChange('computeConfig', 'instanceType', e.target.value)}
              options={['t2.micro', 't2.medium', 'c5.large']}
            />
            <Input 
              label="Monthly Uptime (Hours)" type="number" 
              value={formData.computeConfig.hours}
              onChange={(e) => handleChange('computeConfig', 'hours', parseInt(e.target.value) || 0)}
            />
          </SectionCard>

          {/* Storage */}
          <SectionCard icon={<HardDrive className="text-accent-400" />} title="Block Storage">
            <Select 
              label="Storage Tier" 
              value={formData.storageConfig.storageType} 
              onChange={(e) => handleChange('storageConfig', 'storageType', e.target.value)}
              options={['standard', 'premium']}
            />
            <Input 
              label="Allocated Size (GB)" type="number" 
              value={formData.storageConfig.sizeGB}
              onChange={(e) => handleChange('storageConfig', 'sizeGB', parseInt(e.target.value) || 0)}
            />
          </SectionCard>

          {/* Database */}
          <SectionCard icon={<Database className="text-purple-400" />} title="Managed Database">
            <Select 
              label="Database Engine" 
              value={formData.databaseConfig.engine} 
              onChange={(e) => handleChange('databaseConfig', 'engine', e.target.value)}
              options={['mysql', 'postgres']}
            />
            <Select 
              label="Instance Class" 
              value={formData.databaseConfig.instanceSize} 
              onChange={(e) => handleChange('databaseConfig', 'instanceSize', e.target.value)}
              options={['micro', 'large']}
            />
          </SectionCard>

          {/* Bandwidth */}
          <SectionCard icon={<Globe className="text-pink-400" />} title="Network Egress">
            <Input 
              label="Data Transfer Out (GB / Month)" type="number" 
              value={formData.bandwidthConfig.dataTransferGB}
              onChange={(e) => handleChange('bandwidthConfig', 'dataTransferGB', parseInt(e.target.value) || 0)}
            />
          </SectionCard>
        </div>

        <div className="pt-10 mt-4 border-t border-surfaceBorder mx-auto text-center relative z-10">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            disabled={loading}
            className="px-14 py-5 bg-white text-background hover:bg-gray-100 rounded-2xl font-black text-xl shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center justify-center gap-3 w-full md:w-auto mx-auto disabled:opacity-70 transition-colors"
          >
            {loading ? <Loader2 className="animate-spin w-6 h-6" /> : <Server className="w-6 h-6" />}
            Generate Estimate
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

const SectionCard = ({ icon, title, children }) => (
  <div className="bg-surface/40 p-6 rounded-2xl border border-surfaceBorder hover:border-primary-500/30 transition-colors group">
    <div className="flex items-center gap-4 mb-6">
      <div className="p-3 bg-background rounded-xl border border-surfaceBorder shadow-inner group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-shadow">
        {icon}
      </div>
      <h3 className="text-xl font-bold tracking-wide text-white">{title}</h3>
    </div>
    <div className="space-y-5">{children}</div>
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div className="group/input">
    <label className="block text-sm font-semibold text-gray-400 mb-2 group-focus-within/input:text-primary-400 transition-colors">{label}</label>
    <div className="relative">
      <select 
        className="glass-input appearance-none cursor-pointer"
        {...props}
      >
        {options.map(opt => <option key={opt} value={opt} className="bg-surface">{opt.toUpperCase()}</option>)}
      </select>
      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path></svg>
      </div>
    </div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div className="group/input">
    <label className="block text-sm font-semibold text-gray-400 mb-2 group-focus-within/input:text-primary-400 transition-colors">{label}</label>
    <input 
      className="glass-input transition-shadow hover:shadow-[0_0_10px_rgba(59,130,246,0.1)] focus:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
      {...props}
    />
  </div>
);

export default CalculatorPage;
