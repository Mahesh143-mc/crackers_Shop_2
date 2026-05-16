import { motion } from 'framer-motion';
import { ScanLine, Receipt, Download, FileText, QrCode, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const POSFeature = () => {
  return (
    <section className="py-24 bg-[#0a0d12] relative overflow-hidden border-t border-white/5">
      {/* Intense Orange/Pink Glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Visual Presentation (Mock POS Interface) */}
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, x: -50, rotateX: 10 }}
              whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: "spring" }}
              className="relative glass-card rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/10"
              style={{ perspective: 1500 }}
            >
              {/* POS Left Side (Products mock) */}
              <div className="w-full md:w-3/5 p-6 border-b md:border-b-0 md:border-r border-white/5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">Inventory</h3>
                  <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <ScanLine className="h-4 w-4 text-orange-500 animate-pulse" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-zinc-950/50 border border-white/5 rounded-2xl p-4 group hover:border-orange-500/50 transition-colors">
                      <div className="w-full h-20 bg-zinc-900 rounded-xl mb-3 flex items-center justify-center">
                        <Zap className="h-6 w-6 text-zinc-800 group-hover:text-orange-500/50 transition-colors" />
                      </div>
                      <div className="h-2 w-3/4 bg-zinc-800 rounded mb-2"></div>
                      <div className="flex justify-between items-center">
                        <div className="h-2 w-1/3 bg-orange-500/30 rounded"></div>
                        <CheckCircle2 className="h-3 w-3 text-green-500/50" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* POS Right Side (Cart mock) */}
              <div className="w-full md:w-2/5 bg-zinc-900/40 p-6 flex flex-col backdrop-blur-md">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-8 h-8 rounded-full bg-zinc-950 border border-white/10 flex items-center justify-center">
                    <Receipt className="h-4 w-4 text-zinc-500" />
                  </div>
                  <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">Current Bill</span>
                </div>

                <div className="flex-1 space-y-4 mb-8">
                  <div className="bg-zinc-950/80 p-3 rounded-xl border border-white/5 flex justify-between items-center">
                    <div className="w-1/2 h-2 bg-zinc-700 rounded"></div>
                    <div className="text-[10px] font-bold text-white">₹850</div>
                  </div>
                  <div className="bg-zinc-950/80 p-3 rounded-xl border border-white/5 flex justify-between items-center">
                    <div className="w-1/3 h-2 bg-zinc-700 rounded"></div>
                    <div className="text-[10px] font-bold text-white">₹1,200</div>
                  </div>
                  <div className="bg-zinc-950/80 p-3 rounded-xl border border-white/5 flex justify-between items-center opacity-50">
                    <div className="w-2/3 h-2 bg-zinc-700 rounded"></div>
                    <div className="text-[10px] font-bold text-white">₹450</div>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-6 mt-auto">
                  <div className="flex justify-between mb-3">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">GST (18%)</span>
                    <span className="text-[10px] font-black text-zinc-400">₹450.00</span>
                  </div>
                  <div className="flex justify-between mb-6">
                    <span className="text-sm font-black text-white uppercase tracking-wider">Total</span>
                    <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">₹2,950.00</span>
                  </div>
                  <button className="w-full bg-orange-600 hover:bg-orange-500 text-white text-center py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-[0_0_30px_rgba(234,88,12,0.4)] transition-all transform active:scale-95">
                    Generate Invoice
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Text Content */}
          <div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-black uppercase tracking-widest mb-8"
            >
              <Receipt className="h-4 w-4" />
              <span>Smart Billing Ecosystem</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-none"
            >
              LIGHTNING FAST <br />
              <span className="vibrant-gradient-text">POS TERMINAL</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-400 text-lg md:text-xl mb-12 leading-relaxed font-medium"
            >
              Engineered for peak festival rush. Our POS system integrates barcode scanning, automatic GST calculations, and instant thermal printing to keep your checkout lines moving.
            </motion.p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-10 mb-12">
              <div className="flex items-center gap-3 group">
                <div className="p-3 rounded-xl bg-zinc-900 border border-white/5 text-orange-500 group-hover:scale-110 transition-transform">
                  <FileText className="h-6 w-6" />
                </div>
                <span className="text-white font-black text-xs uppercase tracking-widest">GST Invoices</span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-3 rounded-xl bg-zinc-900 border border-white/5 text-pink-500 group-hover:scale-110 transition-transform">
                  <QrCode className="h-6 w-6" />
                </div>
                <span className="text-white font-black text-xs uppercase tracking-widest">QR Payments</span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-3 rounded-xl bg-zinc-900 border border-white/5 text-yellow-500 group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6" />
                </div>
                <span className="text-white font-black text-xs uppercase tracking-widest">Instant Print</span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-3 rounded-xl bg-zinc-900 border border-white/5 text-cyan-500 group-hover:scale-110 transition-transform">
                  <Download className="h-6 w-6" />
                </div>
                <span className="text-white font-black text-xs uppercase tracking-widest">PDF Export</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/admin/pos" className="inline-flex items-center justify-center bg-white hover:bg-zinc-200 text-zinc-950 px-10 py-5 rounded-full font-black uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95">
                Launch POS Now
              </Link>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default POSFeature;
