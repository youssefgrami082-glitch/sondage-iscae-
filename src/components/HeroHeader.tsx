import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, Users, Radio, ArrowDown, Megaphone, Flame, Clock } from 'lucide-react';
import { FORM_METADATA } from '../data/formData';

export const HeroHeader: React.FC = () => {
  return (
    <div className="relative overflow-hidden pt-5 pb-8 sm:pt-8 sm:pb-12 border-b border-slate-800/80 bg-gradient-to-b from-indigo-950/20 via-slate-950/80 to-slate-950">
      {/* Background radial spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-gradient-to-b from-indigo-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-3.5 sm:px-6 relative z-10 text-center">

        {/* 1. ULTRA-MODERN STAY TUNED BANNER */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="mb-6 sm:mb-8 p-0.5 sm:p-1 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-500/30 via-indigo-500/40 to-cyan-500/30 shadow-[0_0_30px_rgba(245,158,11,0.12)]"
        >
          <div className="rounded-[18px] sm:rounded-[22px] bg-slate-950/90 backdrop-blur-2xl p-3.5 sm:p-5 border border-white/10 relative overflow-hidden text-left">
            {/* Ambient internal soft light */}
            <div className="absolute -top-16 -right-16 w-36 sm:w-48 h-36 sm:h-48 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-36 sm:w-48 h-36 sm:h-48 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 sm:gap-4 relative z-10">
              
              {/* Left announcement details */}
              <div className="flex items-start gap-2.5 sm:gap-3.5">
                <div className="relative mt-0.5 shrink-0">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-300 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/30">
                    <Megaphone className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
                  </div>
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-amber-500 border border-slate-950" />
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                    <span className="text-[11px] sm:text-sm font-black tracking-wider uppercase bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200 bg-clip-text text-transparent">
                      STAY TUNED POUR L'ÉVÉNEMENT !
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wide uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm inline-flex items-center gap-1">
                      <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400" />
                      <span>Bientôt dévoilé</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                    La date finale, le programme détaillé et les intervenants exclusifs seront annoncés prochainement.
                  </p>
                </div>
              </div>

              {/* Right callout pill */}
              <div className="shrink-0 w-full lg:w-auto flex items-center">
                <div className="w-full lg:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-indigo-500/10 border border-amber-500/30 text-amber-300 text-[11px] sm:text-xs font-semibold shadow-inner text-center">
                  <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 animate-pulse shrink-0" />
                  <span>⚡ Votez ci-dessous pour façonner le programme !</span>
                </div>
              </div>
            </div>

            {/* Teaser Highlights micro-grid */}
            <div className="mt-3.5 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] sm:text-xs text-slate-300">
              <div className="flex items-center gap-2 bg-slate-900/60 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border border-slate-800">
                <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
                <span className="text-slate-400">Date & lieu :</span>
                <span className="font-medium text-slate-200">Révélation imminente</span>
              </div>

              <div className="flex items-center gap-2 bg-slate-900/60 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border border-slate-800">
                <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400 shrink-0" />
                <span className="text-slate-400">Invités :</span>
                <span className="font-medium text-slate-200">Marketing & Manager</span>
              </div>

              <div className="flex items-center gap-2 bg-slate-900/60 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border border-slate-800">
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
                <span className="text-slate-400">Durée :</span>
                <span className="font-medium text-emerald-300 font-mono">~3 min chrono</span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* 2. TOP METADATA TAG */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-[11px] sm:text-xs font-medium text-slate-300 mb-4 sm:mb-6 shadow-md backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />
          <span className="text-slate-200 font-semibold tracking-wide">Faculté 2026</span>
          <span className="text-slate-600">•</span>
          <span className="text-cyan-300 font-medium">Consultation Ouverte</span>
        </motion.div>

        {/* 3. HERO CATCHPHRASE */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-snug sm:leading-[1.15] max-w-3xl mx-auto px-1">
            <span className="text-indigo-400 text-3xl sm:text-5xl select-none font-serif mr-1">«</span>
            <span className="bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Prêt à organiser un événement qui vous ressemble ?
            </span>{' '}
            <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent font-extrabold drop-shadow-[0_0_25px_rgba(99,102,241,0.25)]">
              Votre avis compte !
            </span>
            <span className="text-cyan-400 text-3xl sm:text-5xl select-none font-serif ml-1">»</span>
          </h1>
        </motion.div>

        {/* 4. HIGH-QUALITY GLASS CONTAINER FOR THE DESCRIPTION */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 sm:mt-6 max-w-2xl mx-auto"
        >
          <div className="p-3.5 sm:p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md shadow-lg text-slate-300 text-xs sm:text-sm leading-relaxed text-left">
            <p className="font-normal text-slate-300">
              Dans le cadre de l’organisation d’un événement à la faculté avec la participation d’un{' '}
              <strong className="text-white font-semibold">responsable marketing</strong> et d’un{' '}
              <strong className="text-white font-semibold">manager</strong>, nous souhaitons connaître vos centres d’intérêt, vos attentes et vos motivations afin de vous proposer un événement adapté à vos besoins.
            </p>

            <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 text-[11px] sm:text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-indigo-300 font-medium">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400 shrink-0" />
                <span>100% anonyme & co-construit avec les étudiants</span>
              </span>
              <span className="text-slate-500 font-mono text-[10px] sm:text-[11px]">
                15 questions • Scroll pour commencer
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bottom subtle guidance arrow */}
        <div className="mt-4 sm:mt-6 flex justify-center">
          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500 animate-bounce">
            <ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-400" />
            <span>Exprimez-vous ci-dessous</span>
          </div>
        </div>

      </div>
    </div>
  );
};
