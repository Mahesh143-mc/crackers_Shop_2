import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';
import { TrendingUp, Users, Package, DollarSign, PieChart, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockRevenueData = [
  { name: 'Mon', value: 400 }, { name: 'Tue', value: 300 }, { name: 'Wed', value: 550 },
  { name: 'Thu', value: 450 }, { name: 'Fri', value: 700 }, { name: 'Sat', value: 900 }, { name: 'Sun', value: 850 },
];

const AnalyticsPreview = () => {
  return (
    <section className="py-24 bg-[#050a15] relative overflow-hidden border-t border-white/5">
      {/* Intense Cyan/Blue Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-black uppercase tracking-widest mb-8"
            >
              <Zap className="h-4 w-4 fill-cyan-500 animate-pulse" />
              <span>Smart Business Intelligence</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-none"
            >
              MANAGE SALES WITH <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">REAL-TIME INSIGHTS</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-400 text-lg md:text-xl mb-12 leading-relaxed font-medium"
            >
              Empower your cracker business with a high-fidelity dashboard. Track every sale, monitor inventory levels, and analyze revenue growth with beautiful, interactive visualizations.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              <div className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:border-green-500/50 transition-colors shadow-xl">
                  <DollarSign className="h-7 w-7 text-green-500" />
                </div>
                <div>
                  <h4 className="text-white font-black text-sm uppercase tracking-wide">Revenue Growth</h4>
                  <p className="text-sm text-zinc-500">Live profit margin analysis</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:border-orange-500/50 transition-colors shadow-xl">
                  <Package className="h-7 w-7 text-orange-500" />
                </div>
                <div>
                  <h4 className="text-white font-black text-sm uppercase tracking-wide">Stock Monitoring</h4>
                  <p className="text-sm text-zinc-500">Automated inventory alerts</p>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/admin" className="inline-flex items-center justify-center bg-cyan-600 hover:bg-cyan-500 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-95">
                Launch Dashboard
              </Link>
            </motion.div>
          </div>

          {/* High-Fidelity Mock Dashboard */}
          <div className="order-1 lg:order-2 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: "spring" }}
              className="relative glass-card rounded-[40px] p-8 shadow-2xl border border-white/10"
              style={{ perspective: 1500 }}
            >
              {/* Dashboard Nav Mock */}
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="bg-zinc-950/50 px-4 py-1.5 rounded-full border border-white/5 text-[10px] font-mono text-zinc-500 tracking-tighter">
                  vibe.analytics.io/v2
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-zinc-950/80 rounded-3xl p-6 border border-white/5 glow-cyan">
                  <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Total Sales</div>
                  <div className="text-3xl font-black text-white mb-2 tracking-tighter">₹4.2M</div>
                  <div className="text-[10px] text-green-400 font-bold flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> +24% vs last week
                  </div>
                </div>
                <div className="bg-zinc-950/80 rounded-3xl p-6 border border-white/5">
                  <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Active Users</div>
                  <div className="text-3xl font-black text-white mb-2 tracking-tighter">12.5K</div>
                  <div className="text-[10px] text-cyan-400 font-bold flex items-center gap-1">
                    <Users className="h-3 w-3" /> +158 today
                  </div>
                </div>
              </div>

              {/* Area Chart */}
              <div className="bg-zinc-950/80 rounded-3xl p-6 border border-white/5 h-64 relative overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-xs font-black text-white uppercase tracking-widest">Revenue Analytics</h4>
                  <PieChart className="h-4 w-4 text-zinc-500" />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockRevenueData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AnalyticsPreview;
