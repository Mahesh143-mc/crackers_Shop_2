import { motion } from 'framer-motion';
import { Gift, Zap, Clock, Copy, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const FestivalOffers = () => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hrs: 48, min: 59, sec: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.sec > 0) return { ...prev, sec: prev.sec - 1 };
        if (prev.min > 0) return { ...prev, min: prev.min - 1, sec: 59 };
        if (prev.hrs > 0) return { ...prev, hrs: prev.hrs - 1, min: 59, sec: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyCode = () => {
    navigator.clipboard.writeText("DIWALI26");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 bg-[#08081a] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-orange-950/80 via-zinc-900 to-zinc-950 p-10 md:p-16 rounded-[50px] border border-orange-500/20 shadow-[0_20px_80px_rgba(234,88,12,0.15)] overflow-hidden"
        >
          {/* Animated Glow Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-purple-500/10 animate-gradient-x opacity-50"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-black uppercase tracking-[0.2em]">
                <Gift className="h-4 w-4" />
                <span>Limited Time Offer</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter">
                DIWALI MEGA <br />
                <span className="vibrant-gradient-text drop-shadow-[0_0_30px_rgba(234,88,12,0.3)]">SALE 2026</span>
              </h2>
              
              <p className="text-zinc-400 text-xl font-medium max-w-lg leading-relaxed">
                Unlock exclusive discounts on premium gift boxes. Get up to <span className="text-white font-black">40% OFF</span> on your first order.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="bg-zinc-950/80 border border-white/10 p-4 rounded-3xl backdrop-blur-md flex items-center gap-4">
                  <div className="p-3 bg-green-500/10 rounded-2xl">
                    <Zap className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Discount Code</div>
                    <div className="text-lg font-black text-white tracking-widest">DIWALI26</div>
                  </div>
                  <button 
                    onClick={copyCode}
                    className="ml-4 p-3 bg-white text-zinc-950 rounded-2xl hover:bg-zinc-200 transition-colors shadow-lg"
                  >
                    {copied ? <CheckCircle2 className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-zinc-900/50 backdrop-blur-2xl p-10 rounded-[40px] border border-white/10 shadow-2xl">
                <div className="flex items-center gap-3 mb-10 text-zinc-500 justify-center">
                  <Clock className="h-5 w-5" />
                  <span className="text-xs font-black uppercase tracking-widest">Offer Ends In</span>
                </div>
                
                <div className="flex justify-center gap-6 md:gap-8">
                  {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="flex flex-col items-center">
                      <div className="w-20 h-24 md:w-24 md:h-28 bg-zinc-950 rounded-3xl border border-white/5 flex items-center justify-center text-4xl md:text-5xl font-black text-white shadow-xl glow-orange mb-3">
                        {value.toString().padStart(2, '0')}
                      </div>
                      <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{unit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-500 rounded-full blur-3xl opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-pink-500 rounded-full blur-3xl opacity-20"></div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FestivalOffers;
