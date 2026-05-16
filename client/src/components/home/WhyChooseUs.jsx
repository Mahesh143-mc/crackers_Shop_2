import { motion } from 'framer-motion';
import { ShieldCheck, Truck, ThumbsUp, Wallet, Headphones, BadgePercent } from 'lucide-react';

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Certified Safe',
    desc: 'All our products undergo rigorous safety testing and meet government standards.',
    color: 'text-green-500',
    bg: 'bg-green-500/10'
  },
  {
    icon: ThumbsUp,
    title: 'Premium Quality',
    desc: 'We source only the best raw materials for brighter colors and safer bursts.',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10'
  },
  {
    icon: BadgePercent,
    title: 'Affordable Prices',
    desc: 'Direct from manufacturers, ensuring you get the best wholesale prices.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    icon: Wallet,
    title: 'Secure Payments',
    desc: '100% secure payment gateways with multiple options including UPI and Cards.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    desc: 'Lightning-fast, tracked delivery directly to your doorstep before the festival.',
    color: 'text-rose-500',
    bg: 'bg-rose-500/10'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    desc: 'Dedicated customer support team ready to assist you with any queries.',
    color: 'text-sky-500',
    bg: 'bg-sky-500/10'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-[var(--bg-whyus)] relative border-t border-white/5 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight"
          >
            Why Choose <span className="text-orange-500">Us?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-600 dark:text-zinc-400 text-lg"
          >
            We are committed to making your celebrations safe, bright, and memorable.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/60 dark:bg-zinc-950 border border-orange-500/10 dark:border-zinc-800 hover:border-orange-500/30 dark:hover:border-zinc-700 p-8 rounded-3xl transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:shadow-xl dark:hover:shadow-2xl hover:-translate-y-1 group backdrop-blur-sm"
            >
              <div className={`w-14 h-14 rounded-2xl ${reason.bg} flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                <reason.icon className={`h-7 w-7 ${reason.color}`} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-orange-400 transition-colors">
                {reason.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
