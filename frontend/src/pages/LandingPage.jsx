import { Link } from 'react-router-dom';
import { Calculator, Zap, Lock, BarChart3, ArrowRight, Server, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center w-full pb-20">
      
      {/* Hero Section */}
      <section className="relative w-full max-w-5xl mx-auto pt-24 pb-32 text-center rounded-3xl mt-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 px-6 space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-300 text-sm font-semibold mb-6">
            <Zap size={16} className="text-yellow-400" /> V2.0 Now Available
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight">
            Stop Guessing Your <br />
            <span className="text-gradient drop-shadow-lg">Cloud Infrastructure</span> Costs
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            Beautifully simulate, estimate, and compare your monthly AWS, Azure, and Google Cloud spending before you deploy a single resource.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Link to="/calculator">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-400 hover:from-primary-500 hover:to-primary-300 text-white font-bold rounded-2xl shadow-[0_0_40px_rgba(59,130,246,0.4)] flex items-center gap-3 text-lg transition-all"
              >
                Start Calculating <ArrowRight size={22} />
              </motion.button>
            </Link>
            <Link to="/dashboard">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass-panel hover:bg-surface/80 text-white font-bold rounded-2xl flex items-center gap-3 text-lg transition-all"
              >
                View Dashboard
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Modern Features Grid */}
      <section className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 relative z-10">
        <FeatureCard 
          delay={0.1}
          icon={<Calculator className="text-primary-400 w-8 h-8" />}
          title="Multi-Cloud Precision"
          desc="Compare estimates effortlessly between AWS, Azure, and Google Cloud with our advanced simulation engine."
        />
        <FeatureCard 
          delay={0.2}
          icon={<BarChart3 className="text-accent-400 w-8 h-8" />}
          title="Stunning Breakdowns"
          desc="Visualize your costs with interactive, beautiful charts allocating budgets to Compute, DB, and Storage."
        />
        <FeatureCard 
          delay={0.3}
          icon={<Lock className="text-purple-400 w-8 h-8" />}
          title="Private & Secure"
          desc="Save unlimited infrastructure configurations securely to your dashboard for future planning."
        />
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="p-8 glass-panel group hover:border-primary-500/50 transition-all duration-500"
  >
    <div className="w-16 h-16 rounded-2xl bg-surface/80 border border-surfaceBorder flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
    <p className="text-gray-400 leading-relaxed text-lg">{desc}</p>
  </motion.div>
);

export default LandingPage;
