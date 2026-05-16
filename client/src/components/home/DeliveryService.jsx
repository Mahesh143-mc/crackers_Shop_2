import { motion } from 'framer-motion';
import { ShoppingCart, CreditCard, PackageCheck, Truck } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Order Online',
    desc: 'Browse our premium catalog and add your favorite crackers to the cart.',
    icon: ShoppingCart,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10 border-orange-500/20'
  },
  {
    id: 2,
    title: 'Secure Payment',
    desc: 'Pay safely using UPI, NetBanking, or Credit/Debit Cards.',
    icon: CreditCard,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10 border-blue-500/20'
  },
  {
    id: 3,
    title: 'Fast Packaging',
    desc: 'Your order is securely packed in corrugated boxes to prevent damage.',
    icon: PackageCheck,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10 border-purple-500/20'
  },
  {
    id: 4,
    title: 'Home Delivery',
    desc: 'Tracked and safe delivery right to your doorstep within 3-5 working days.',
    icon: Truck,
    color: 'text-green-500',
    bg: 'bg-green-500/10 border-green-500/20'
  }
];

const DeliveryService = () => {
  return (
    <section className="py-24 bg-[var(--bg-delivery)] relative border-t border-black/5 dark:border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight"
          >
            How It <span className="text-orange-500">Works</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-600 dark:text-zinc-400 text-lg"
          >
            From our warehouse to your home. We ensure a smooth, safe, and transparent delivery process.
          </motion.p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-black/5 dark:bg-zinc-800 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative bg-white dark:bg-zinc-950 border border-black/5 dark:border-zinc-800 rounded-3xl p-6 text-center shadow-lg hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 font-bold font-mono border-4 border-white dark:border-zinc-950">
                  {step.id}
                </div>
                
                <div className={`w-20 h-20 mx-auto rounded-full ${step.bg} border flex items-center justify-center mb-6`}>
                  <step.icon className={`h-10 w-10 ${step.color}`} />
                </div>
                
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default DeliveryService;
