import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Truck, Store, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#050510]">
      {/* Animated Background Effects - Multi-color Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zinc-950 rounded-full border border-white/5 opacity-20"></div>
      
      {/* Dynamic Firework Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-40 blur-[1px]"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              backgroundColor: ['#f97316', '#ec4899', '#8b5cf6', '#06b6d4', '#eab308'][Math.floor(Math.random() * 5)],
            }}
            animate={{
              y: [0, -Math.random() * 200 - 100],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent mt-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-white/10 text-orange-400 text-sm font-medium mb-8 backdrop-blur-md">
            <Sparkles className="h-4 w-4" />
            <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">Premium Festival Collection 2026</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 leading-tight text-white italic">
            SPARK YOUR <br />
            <span className="vibrant-gradient-text drop-shadow-[0_0_30px_rgba(234,88,12,0.4)]">
              CELEBRATIONS
            </span>
          </h1>
          
          <p className="text-zinc-400 text-lg md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            Premium quality crackers for every festival. <span className="text-cyan-400">Safe</span>, <span className="text-pink-500">colorful</span>, and <span className="text-yellow-500">delivered</span> to your doorstep.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link 
              to="/products"
              className="group relative w-full sm:w-auto bg-white text-zinc-950 px-10 py-5 rounded-full font-black transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <span className="relative flex items-center justify-center gap-2">
                Explore Collection <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
            <Link 
              to="/products"
              className="w-full sm:w-auto bg-zinc-900/50 backdrop-blur-md border border-white/10 hover:border-orange-500/50 text-white px-10 py-5 rounded-full font-black transition-all hover:bg-zinc-800 flex items-center justify-center gap-2"
            >
              Shop Now
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto border-t border-white/5 pt-16">
            <motion.div 
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card p-8 rounded-3xl group transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-green-500/10 transition-colors"></div>
              <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                <ShieldCheck className="h-7 w-7 text-green-400" />
              </div>
              <h3 className="text-white font-black text-lg mb-2">100% Safe Products</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">Certified & tested for ultimate family safety</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card p-8 rounded-3xl group transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-cyan-500/10 transition-colors"></div>
              <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                <Store className="h-7 w-7 text-cyan-400" />
              </div>
              <h3 className="text-white font-black text-lg mb-2">Licensed Shop</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">Government approved & verified dealer</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card p-8 rounded-3xl group transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-orange-500/10 transition-colors"></div>
              <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform border border-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.1)]">
                <Truck className="h-7 w-7 text-orange-400" />
              </div>
              <h3 className="text-white font-black text-lg mb-2">Fast Delivery</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">Secure & tracked doorstep delivery</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
