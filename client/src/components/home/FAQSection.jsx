import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Are the crackers safe to use?',
    answer: 'Yes, absolutely! All our products are sourced from licensed manufacturers in Sivakasi and undergo strict quality checks. We provide safety instructions with every order.'
  },
  {
    question: 'Do you provide home delivery?',
    answer: 'Yes, we provide tracked home delivery across major cities. Your order is packed in sturdy, moisture-resistant corrugated boxes to ensure complete safety during transit.'
  },
  {
    question: 'Which payment methods do you accept?',
    answer: 'We accept all major payment methods including UPI (Google Pay, PhonePe, Paytm), Net Banking, and Credit/Debit Cards via our secure payment gateway.'
  },
  {
    question: 'Is Cash on Delivery (COD) available?',
    answer: 'Currently, to ensure seamless logistics and prevent fraudulent orders during the festive rush, we only accept prepaid orders.'
  },
  {
    question: 'How long does delivery take?',
    answer: 'Standard delivery takes 3-5 working days depending on your location. During peak festival seasons, we recommend ordering at least 10 days in advance.'
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 bg-[#080808] relative border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-bold mb-4"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Support</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight"
          >
            Frequently Asked <span className="text-orange-500">Questions</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition-colors hover:border-zinc-700"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-bold text-white pr-4">{faq.question}</span>
                <div className={`p-2 rounded-full bg-zinc-800 transition-transform duration-300 ${openIndex === index ? 'rotate-180 bg-orange-500/20 text-orange-500' : 'text-zinc-400'}`}>
                  <ChevronDown className="h-5 w-5" />
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-zinc-400 leading-relaxed border-t border-zinc-800/50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
