import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Calendar,
  Download,
  Share2,
  Check,
  Ticket,
  Sparkles,
  QrCode,
  Award,
  Clock,
  MapPin,
  Building2
} from 'lucide-react';
import { generateCalendarICS } from '../utils/googleFormSubmit';

interface StudentPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  studentEmail: string;
  answers: Record<number, string>;
}

export const StudentPassModal: React.FC<StudentPassModalProps> = ({
  isOpen,
  onClose,
  studentName,
  studentEmail,
  answers
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Confetti fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const displayName = studentName.trim() || "Participant Étudiant";
  const preferredDomain = answers[1] || "Management & Marketing";
  const preferredJob = answers[2] || "Manager / Responsable Marketing";
  const preferredFormat = answers[11] || "Conférence & Débat";
  const preferredTime = answers[13] || "Après-midi";

  const passNumber = `FAC-MM-8492-${Math.abs(displayName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 9000 + 1000)}`;

  const handleDownloadICS = () => {
    const icsContent = generateCalendarICS(displayName);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Pass-Forum-Management-${displayName.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Mon Pass pour le Forum Management & Marketing',
        text: `J'ai donné mon avis pour la rencontre avec les intervenants à la faculté ! Viens voter et récupérer ton pass VIP :`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-8">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-indigo-600/20 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-cyan-600/15 blur-3xl rounded-full pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pass Officiel Validé</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">Votre Billet VIP Étudiant</h3>
          <p className="text-xs text-slate-400 mt-1">
            Merci pour votre précieuse contribution au programme de l'événement !
          </p>
        </div>

        {/* The Badge / Pass card */}
        <div className="relative rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950/80 border border-indigo-500/40 p-5 shadow-inner">
          {/* Badge Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-slate-950 shadow-md">
                <Ticket className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] tracking-wider uppercase text-indigo-400 font-bold">Faculté • Édition 2026</p>
                <h4 className="text-sm font-bold text-white">Forum Management & Marketing</h4>
              </div>
            </div>
            <span className="font-mono text-[11px] font-bold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
              {passNumber}
            </span>
          </div>

          {/* Attendee Details */}
          <div className="py-4 space-y-3">
            <div>
              <p className="text-[11px] text-slate-400 uppercase tracking-wider">Participant</p>
              <p className="text-lg font-extrabold text-white">{displayName}</p>
              {studentEmail && (
                <p className="text-xs text-slate-400 font-mono">{studentEmail}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                <p className="text-[10px] text-slate-400">Domaine Clé</p>
                <p className="font-semibold text-slate-200 truncate" title={preferredDomain}>
                  {preferredDomain}
                </p>
              </div>

              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                <p className="text-[10px] text-slate-400">Format Recommandé</p>
                <p className="font-semibold text-slate-200 truncate" title={preferredFormat}>
                  {preferredFormat}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 text-xs text-slate-400 border-t border-slate-800/60">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>Amphithéâtre Faculté</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Créneau : {preferredTime}</span>
              </div>
            </div>
          </div>

          {/* Pass Footer with simulated barcode & QR */}
          <div className="pt-3 border-t border-dashed border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-white p-1 flex items-center justify-center shrink-0">
                <QrCode className="w-8 h-8 text-slate-950" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-300">Accès Prioritaire Débat & Q&R</p>
                <p className="text-[9px] text-slate-500">Présentez ce QR Code à l'accueil</p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                PASS VIP
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={handleDownloadICS}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Ajouter au Calendrier</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Lien copié !</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Partager l'invitation</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
