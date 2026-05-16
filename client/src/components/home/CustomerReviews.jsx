import { motion } from 'framer-motion';
import { Star, Quote, Heart, CheckCircle } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Verified Buyer",
    content: "The quality of the crackers was exceptional. The color sparklers stayed lit longer than expected and were very safe for children. Highly recommend the gift boxes!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=rahul"
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Premium Member",
    content: "Best place to order Diwali crackers online. The doorstep delivery was incredibly fast and everything was packed securely. The customer support is also very responsive.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=priya"
  },
  {
    id: 3,
    name: "Arjun Singh",
    role: "Business Owner",
    content: "I've been using their bulk gift boxes for my employees for 2 years now. The value for money is unbeatable and the product variety is amazing. Five stars!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=arjun"
  }
];

const CustomerReviews = () => {
  return (
    <section className="py-24 bg-[#10050a] relative overflow-hidden border-t border-white/5">
      {/* Pink/Purple Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-black uppercase tracking-widest mb-6"
          >
            <Heart className="h-4 w-4 fill-pink-500" />
            <span>Customer Stories</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter"
          >
            LOVED BY <span className="vibrant-gradient-text">CUSTOMERS</span>
          </motion.h2>
          <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed">
            Join thousands of happy families who trust us for their festival celebrations every year.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-10 rounded-[40px] group hover:border-pink-500/30 transition-all duration-500 relative"
            >
              <div className="absolute top-10 right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <Quote className="h-16 w-16 text-white" />
              </div>

              <div className="flex gap-1 mb-8">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>

              <p className="text-zinc-300 text-lg mb-10 leading-relaxed font-medium italic">
                "{review.content}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                <img 
                  src={review.avatar} 
                  alt={review.name} 
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-white/10 group-hover:border-pink-500/50 transition-colors"
                />
                <div>
                  <h4 className="text-white font-black text-base flex items-center gap-2">
                    {review.name}
                    <CheckCircle className="h-3 w-3 text-cyan-400" />
                  </h4>
                  <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CustomerReviews;
