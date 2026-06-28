import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-32 pb-24 bg-[var(--bg-contact)] min-h-screen relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-black uppercase tracking-widest mb-6"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Get in Touch</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter">
            CONTACT <span className="vibrant-gradient-text">US</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl font-medium">
            Have questions about our crackers or bulk orders? We're here to help you light up your celebrations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="flex gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0">
                <Mail className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <h3 className="text-white font-black text-xl mb-2">Email Us</h3>
                <p className="text-zinc-500 mb-1 font-medium">For support and queries:</p>
                <a href="mailto:support@crackers.com" className="text-white font-bold hover:text-orange-500 transition-colors">support@crackers.com</a>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0">
                <Phone className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h3 className="text-white font-black text-xl mb-2">Call Us</h3>
                <p className="text-zinc-500 mb-1 font-medium">Monday - Sunday, 9am - 9pm:</p>
                <a href="tel:+919876543210" className="text-white font-bold hover:text-purple-500 transition-colors">+91 98765 43210</a>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0">
                <MapPin className="h-6 w-6 text-cyan-500" />
              </div>
              <div>
                <h3 className="text-white font-black text-xl mb-2">Our Location</h3>
                <p className="text-zinc-500 font-medium">Sivakasi Main Road, <br />Tamil Nadu, India - 626123</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-10 rounded-[40px] border border-white/10"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-zinc-500 text-xs font-black uppercase tracking-widest mb-3 px-1">Your Name</label>
                  <input type="text" className="w-full bg-zinc-950 border border-white/5 text-white px-6 py-4 rounded-2xl focus:outline-none focus:border-orange-500/50 transition-all font-medium" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-zinc-500 text-xs font-black uppercase tracking-widest mb-3 px-1">Email Address</label>
                  <input type="email" className="w-full bg-zinc-950 border border-white/5 text-white px-6 py-4 rounded-2xl focus:outline-none focus:border-orange-500/50 transition-all font-medium" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-zinc-500 text-xs font-black uppercase tracking-widest mb-3 px-1">Message</label>
                <textarea rows="4" className="w-full bg-zinc-950 border border-white/5 text-white px-6 py-4 rounded-2xl focus:outline-none focus:border-orange-500/50 transition-all font-medium resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button className="w-full bg-white text-zinc-950 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-orange-500 hover:text-white transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95">
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
