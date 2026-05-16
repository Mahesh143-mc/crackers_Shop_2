import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 1, name: 'Sparklers', desc: 'Bright & beautiful', color: 'from-orange-500/20 to-red-600/20', icon: '✨' },
  { id: 2, name: 'Rockets', desc: 'Sky high colors', color: 'from-blue-500/20 to-cyan-600/20', icon: '🚀' },
  { id: 3, name: 'Flower Pots', desc: 'Classic fountains', color: 'from-purple-500/20 to-pink-600/20', icon: '🌋' },
  { id: 4, name: 'Ground Chakkars', desc: 'Spinning wheels', color: 'from-yellow-400/20 to-orange-500/20', icon: '🌀' },
  { id: 5, name: 'Kids Special', desc: 'Safe & soundless', color: 'from-cyan-400/20 to-blue-600/20', icon: '🎈' },
  { id: 6, name: 'Gift Boxes', desc: 'Assorted premium', color: 'from-pink-500/20 to-rose-600/20', icon: '🎁' },
  { id: 7, name: 'Premium Collections', desc: 'Exclusive sets', color: 'from-indigo-500/20 to-purple-600/20', icon: '👑' },
  { id: 8, name: 'Sound Crackers', desc: 'Loud & proud', color: 'from-red-500/20 to-orange-600/20', icon: '💥' }
];

const FeaturedCategories = () => {
  return (
    <section className="py-20 bg-[var(--bg-categories)] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 dark:bg-white/5 border border-orange-500/20 dark:border-white/10 text-orange-600 dark:text-zinc-300 text-xs font-medium mb-4"
          >
            <Sparkles className="h-3 w-3 text-orange-500" />
            <span>Categories</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight"
          >
            Explore our wide range of <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">premium festival crackers</span>.
          </motion.h2>
        </div>

        <div className="relative overflow-hidden py-10 -mx-4 sm:-mx-6 lg:-mx-8">
          <motion.div 
            className="flex gap-4 md:gap-6 w-max px-4 sm:px-6 lg:px-8"
            animate={{ 
              x: [0, -1600] 
            }}
            transition={{ 
              duration: 40, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {/* Double the categories for seamless looping */}
            {[...categories, ...categories].map((cat, index) => (
              <div
                key={`${cat.id}-${index}`}
                className="w-64 md:w-72 shrink-0"
              >
                <Link 
                  to={`/products?category=${cat.name}`}
                  className="group block relative overflow-hidden bg-white/60 dark:bg-zinc-900 border border-orange-500/10 dark:border-zinc-800 rounded-3xl p-6 hover:border-orange-500/50 transition-all duration-300 h-full flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_10px_40px_-10px_rgba(249,115,22,0.15)] backdrop-blur-sm"
                >
                  {/* Background Gradient Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="text-4xl md:text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {cat.icon}
                    </div>
                    <h3 className="text-zinc-900 dark:text-white font-bold text-lg md:text-xl mb-1 group-hover:text-orange-400 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-zinc-500 text-xs md:text-sm mb-4 line-clamp-1">
                      {cat.desc}
                    </p>
                    
                    <div className="mt-auto w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                      <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:text-white" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
