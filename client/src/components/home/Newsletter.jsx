import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-24 bg-[var(--bg-newsletter)] relative overflow-hidden border-t border-black/5 dark:border-zinc-900">
      {/* Decorative Effects */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/60 dark:bg-zinc-900/50 backdrop-blur-xl border border-black/5 dark:border-zinc-800 rounded-3xl p-8 md:p-12 text-center shadow-[0_20px_50px_rgb(0,0,0,0.05)] dark:shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Grid Background inside the card */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

          <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10 border border-orange-500/20">
            <Mail className="h-8 w-8 text-orange-500" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white mb-4 relative z-10">
            Get Festival Offers & <span className="text-orange-500">Exclusive Discounts</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
            Subscribe to our newsletter to receive early access to mega sales, new product announcements, and special wholesale pricing.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto relative z-10">
            <div className="relative flex items-center">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white dark:bg-zinc-950 border border-black/10 dark:border-zinc-800 text-zinc-900 dark:text-white px-6 py-4 rounded-full pr-36 shadow-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              />
              <button 
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-orange-600 hover:bg-orange-500 text-white px-6 rounded-full font-bold transition-all flex items-center gap-2"
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
                {!subscribed && <ArrowRight className="h-4 w-4" />}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
