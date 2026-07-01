import { Link, useLocation } from 'react-router-dom';
import { Cloud, Calculator, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/calculator', icon: Calculator, label: 'Calculator' },
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-5xl mx-auto mt-6 px-4 relative z-50 sticky top-6"
    >
      <div className="glass-panel px-6 py-4 flex items-center justify-between shadow-primary-500/10">
        
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2.5 bg-gradient-to-br from-primary-500 to-accent-400 rounded-xl group-hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-300">
            <Cloud className="w-6 h-6 text-white" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-white hidden sm:block">
            Cloud<span className="text-primary-400">Spend</span>
          </span>
        </Link>
        
        <div className="flex items-center gap-2 bg-surface/50 p-1.5 rounded-2xl border border-surfaceBorder">
          {navLinks.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link 
                key={path} 
                to={path} 
                className={cn(
                  "relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300",
                  isActive ? "text-white" : "text-gray-400 hover:text-white hover:bg-surfaceBorder/50"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-nav"
                    className="absolute inset-0 bg-primary-600/80 rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon size={18} className={isActive ? "text-white" : ""} />
                <span className="hidden sm:block">{label}</span>
              </Link>
            );
          })}
        </div>
        
      </div>
    </motion.nav>
  );
};

export default Navbar;
