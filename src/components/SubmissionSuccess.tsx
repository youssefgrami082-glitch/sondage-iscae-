import React, { useState } from 'react';
import {
  CheckCircle2,
  BarChart3,
  MessageSquare,
  ArrowLeft,
  ExternalLink,
  Sparkles,
  Mail,
  Copy,
  Check
} from 'lucide-react';
import { FORM_METADATA } from '../data/formData';
import { TARGET_EMAIL, generatePlainTextReport, generateMailtoUrl } from '../utils/emailReport';

interface SubmissionSuccessProps {
  answers: Record<number, string>;
  studentName?: string;
  studentEmail?: string;
  onGoToStats: () => void;
  onReset: () => void;
}

export const SubmissionSuccess: React.FC<SubmissionSuccessProps> = ({
  answers,
  studentName,
  studentEmail,
  onGoToStats,
  onReset
}) => {
  const [copied, setCopied] = useState(false);

  const chosenDomain = answers[1] || "Management général";
  const chosenFormat = answers[11] || "Mixte";
  const studentQuestion = answers[14];
  const studentIdea = answers[15];

  const payload = {
    answers,
    studentName,
    studentEmail,
    timestamp: new Date().toISOString(),
  };

  const handleCopyReport = () => {
    const text = generatePlainTextReport(payload);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const mailtoUrl = generateMailtoUrl(payload);

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-12 text-center relative z-10">
      {/* Success Badge */}
      <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-2xl sm:rounded-3xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4 sm:mb-6 shadow-xl shadow-emerald-500/10 animate-bounce">
        <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] sm:text-xs font-semibold mb-2 sm:mb-3">
        <Sparkles className="w-3.5 h-3.5 shrink-0" />
        <span>Réponse bien enregistrée et transmise</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
        Merci pour votre participation{studentName ? `, ${studentName}` : ''} !
      </h2>
      <p className="mt-2 text-xs sm:text-base text-slate-300 max-w-xl mx-auto">
        Vos réponses et suggestions ont été enregistrées avec succès et envoyées pour consolidation.
      </p>

      {/* Target Email Notification Box */}
      <div className="mt-5 sm:mt-6 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-cyan-950/40 border border-indigo-500/40 text-left max-w-2xl mx-auto shadow-lg">
        <div className="flex items-start gap-2.5 sm:gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
            <Mail className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between flex-wrap gap-1.5 mb-1">
              <span className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider">
                Transmission automatique par email
              </span>
              <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Liaison active
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300">
              Les détails de cette réponse et les pourcentages statistiques sont configurés pour être envoyés directement à :
            </p>
            <p className="text-xs sm:text-sm font-mono font-bold text-cyan-300 mt-1 select-all break-all">
              {TARGET_EMAIL}
            </p>

            <div className="mt-3 pt-2.5 sm:pt-3 border-t border-slate-800/80 flex flex-col xs:flex-row items-stretch xs:items-center gap-2">
              <a
                href={mailtoUrl}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all min-h-[40px] active:scale-[0.98]"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Ouvrir le rapport prêt à l'envoi</span>
              </a>

              <button
                type="button"
                onClick={handleCopyReport}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all min-h-[40px] active:scale-[0.98]"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Rapport copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copier le rapport texte</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights summary card */}
      <div className="mt-6 sm:mt-8 bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-left shadow-2xl backdrop-blur-md">
        <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 sm:mb-4 flex items-center gap-2">
          <span>Récapitulatif de votre participation</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-950/80 border border-slate-800">
            <p className="text-[11px] sm:text-xs text-slate-400">Domaine sélectionné</p>
            <p className="font-bold text-white mt-0.5 sm:mt-1 text-sm sm:text-base leading-snug">{chosenDomain}</p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-950/80 border border-slate-800">
            <p className="text-[11px] sm:text-xs text-slate-400">Format d'événement choisi</p>
            <p className="font-bold text-white mt-0.5 sm:mt-1 text-sm sm:text-base leading-snug">{chosenFormat}</p>
          </div>
        </div>

        {studentQuestion && (
          <div className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-950/80 border border-slate-800">
            <p className="text-[11px] sm:text-xs text-indigo-400 font-semibold flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              <span>Votre question aux intervenants :</span>
            </p>
            <p className="text-xs sm:text-sm text-slate-200 mt-1 italic leading-relaxed">
              « {studentQuestion} »
            </p>
          </div>
        )}

        {studentIdea && (
          <div className="mt-2.5 sm:mt-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-950/80 border border-slate-800">
            <p className="text-[11px] sm:text-xs text-amber-400 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Votre idée d'animation :</span>
            </p>
            <p className="text-xs sm:text-sm text-slate-200 mt-1 italic leading-relaxed">
              « {studentIdea} »
            </p>
          </div>
        )}

        {/* Action buttons inside card */}
        <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
          <button
            onClick={onGoToStats}
            className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-blue-600 to-indigo-600 hover:from-indigo-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all min-h-[44px] active:scale-[0.98]"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Voir les tendances en temps réel</span>
          </button>

          <a
            href={FORM_METADATA.googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-4 py-2.5 sm:py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs border border-slate-700 flex items-center justify-center gap-2 transition-colors min-h-[44px]"
          >
            <span>Lien officiel Google Forms</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 flex items-center justify-center gap-4">
        <button
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 underline underline-offset-4 py-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Modifier mes réponses</span>
        </button>
      </div>
    </div>
  );
};
