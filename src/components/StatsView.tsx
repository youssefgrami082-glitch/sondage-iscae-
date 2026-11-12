import React, { useState } from 'react';
import { useRealtimeStats } from '../utils/realtimeStats';
import {
  BarChart3,
  Clock,
  ThumbsUp,
  Sparkles,
  ArrowRight,
  Inbox,
  Send,
  Mail,
  Copy,
  Check,
  MessageSquare
} from 'lucide-react';
import { TARGET_EMAIL } from '../utils/emailReport';

interface StatsViewProps {
  onGoToForm: () => void;
}

export const StatsView: React.FC<StatsViewProps> = ({ onGoToForm }) => {
  const {
    hasResponses,
    totalVotes,
    domainList,
    formatList,
    timingList,
    durationList,
    expectationList,
    recentSubmissions,
  } = useRealtimeStats();

  const [copiedStats, setCopiedStats] = useState(false);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);

  const generateStatsSummaryText = () => {
    const lines = [
      `======================================================`,
      `📊 SYNTHÈSE STATISTIQUE FORUM MANAGEMENT & MARKETING`,
      `Destinataire : ${TARGET_EMAIL}`,
      `Total réponses réelles : ${totalVotes}`,
      `======================================================\n`,
      `🔹 DOMAINES PROFESSIONNELS (Q1) :`,
      ...domainList.map(d => `   • ${d.label} : ${d.percentage}% (${d.count} vote${d.count > 1 ? 's' : ''})`),
      `\n🔹 FORMATS D'ÉVÉNEMENT (Q11) :`,
      ...formatList.map(f => `   • ${f.label} : ${f.percentage}% (${f.count} vote${f.count > 1 ? 's' : ''})`),
      `\n🔹 CRÉNEAU HORAIRE (Q13) :`,
      ...timingList.map(t => `   • ${t.label} : ${t.percentage}% (${t.count} vote${t.count > 1 ? 's' : ''})`),
      `\n🔹 DURÉE IDÉALE (Q12) :`,
      ...durationList.map(du => `   • ${du.label} : ${du.percentage}% (${du.count} vote${du.count > 1 ? 's' : ''})`),
      `\n🔹 ATTENTES & MOTIVATIONS (Q5) :`,
      ...expectationList.map(e => `   • ${e.label} : ${e.percentage}% (${e.count} vote${e.count > 1 ? 's' : ''})`),
    ];
    return lines.join('\n');
  };

  const handleCopyStats = () => {
    const text = generateStatsSummaryText();
    navigator.clipboard.writeText(text);
    setCopiedStats(true);
    setTimeout(() => setCopiedStats(false), 2500);
  };

  const handleSendEmailNow = async () => {
    setEmailStatus('sending');
    try {
      const summaryText = generateStatsSummaryText();
      await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `📊 [Forum Faculté] Bilan des Tendances et Pourcentages (${totalVotes} réponses)`,
          _template: "table",
          destinataire: TARGET_EMAIL,
          total_reponses: totalVotes,
          synthese_statistique: summaryText,
        }),
      });
      setEmailStatus('success');
      setTimeout(() => setEmailStatus(null), 4000);
    } catch {
      setEmailStatus('fallback');
      setTimeout(() => setEmailStatus(null), 4000);
    }
  };

  const mailtoStatsUrl = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(`📊 Bilan Statistique Forum Faculté (${totalVotes} votes)`)}&body=${encodeURIComponent(generateStatsSummaryText())}`;

  // If NO real responses exist yet:
  if (!hasResponses) {
    return (
      <div className="max-w-3xl mx-auto px-3 sm:px-4 py-8 sm:py-16 text-center relative z-10">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-indigo-600/10 blur-3xl rounded-full pointer-events-none" />

          {/* Icon */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-2xl sm:rounded-3xl bg-slate-800/80 border border-slate-700/80 text-amber-400 flex items-center justify-center mb-4 sm:mb-6 shadow-inner">
            <Inbox className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] sm:text-xs font-semibold mb-3 sm:mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>En attente de réponses</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
            Les tendances seront publiées dès réception des réponses
          </h2>

          <p className="mt-2.5 sm:mt-3 text-xs sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Aucun vote n'a encore été enregistré. Les pourcentages et statistiques seront générés en temps réel et transmis à{' '}
            <strong className="text-cyan-300 font-mono font-medium break-all">{TARGET_EMAIL}</strong> dès que les premières participations étudiantes seront soumises.
          </p>

          <div className="mt-6 sm:mt-8 pt-5 sm:pt-8 border-t border-slate-800/80 max-w-md mx-auto">
            <button
              onClick={onGoToForm}
              className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-blue-600 to-indigo-600 hover:from-indigo-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 mx-auto transition-transform active:scale-[0.98] min-h-[44px]"
            >
              <Send className="w-4 h-4" />
              <span>Être le premier à voter et ouvrir les tendances</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // When real responses exist:
  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8 space-y-4 sm:space-y-8 relative z-10">
      {/* Live Status Header Banner */}
      <div className="bg-gradient-to-r from-blue-950/70 via-slate-900/90 to-indigo-950/70 border border-indigo-500/30 rounded-2xl sm:rounded-3xl p-4 sm:p-8 relative overflow-hidden backdrop-blur-xl shadow-2xl">
        <div className="absolute top-0 right-0 w-60 sm:w-80 h-60 sm:h-80 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-xs font-bold">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400" />
                <span>RÉSULTATS BASÉS SUR LES RÉPONSES RÉELLES</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              Tendances & Statistiques des Étudiants
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 sm:mt-2 max-w-xl">
              Ces statistiques sont calculées exclusivement à partir des réponses authentiques enregistrées auprès des participants de la faculté.
            </p>
          </div>

          {/* Real Votes Counter */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 text-center shrink-0 w-full md:w-auto shadow-inner ring-1 ring-white/5">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5 sm:mb-1">
              Réponses enregistrées
            </span>
            <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-emerald-400 font-mono tracking-tight">
              {totalVotes}
            </div>
            <div className="text-[9px] sm:text-[10px] text-emerald-400 font-medium mt-0.5 sm:mt-1">
              ✓ 100% réponses réelles
            </div>
          </div>
        </div>

        {/* Linked Email Bar */}
        <div className="mt-4 sm:mt-6 pt-3.5 sm:pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex flex-col xs:flex-row items-start xs:items-center gap-1.5 sm:gap-2 text-slate-300">
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="text-[11px] sm:text-xs">Email lié :</span>
            </div>
            <span className="font-mono font-bold text-cyan-300 text-[11px] sm:text-xs select-all break-all">{TARGET_EMAIL}</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleSendEmailNow}
              disabled={emailStatus === 'sending'}
              className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all min-h-[38px] active:scale-[0.98]"
            >
              <Send className="w-3 h-3" />
              <span>
                {emailStatus === 'sending'
                  ? 'Transmission...'
                  : emailStatus === 'success'
                  ? 'Transmis à Molka !'
                  : 'Envoyer à Molka'}
              </span>
            </button>

            <a
              href={mailtoStatsUrl}
              className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white transition-colors shrink-0 flex items-center justify-center min-h-[38px] min-w-[38px]"
              title="Ouvrir dans votre messagerie"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={handleCopyStats}
              className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white transition-colors shrink-0 flex items-center justify-center min-h-[38px] min-w-[38px]"
              title="Copier le rapport statistique complet"
            >
              {copiedStats ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Real-Time Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Card 1: Domaines Professionnels */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Domaines demandés (Q1)</h3>
                <p className="text-[10px] sm:text-[11px] text-slate-400">Classement selon les votes réels</p>
              </div>
            </div>
          </div>

          {domainList.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-3">Pas encore de choix enregistré pour ce critère.</p>
          ) : (
            <div className="space-y-2.5 sm:space-y-3.5">
              {domainList.map((item) => (
                <div key={item.label} className="p-2.5 rounded-xl sm:rounded-2xl bg-slate-950/40 border border-slate-850">
                  <div className="flex items-center justify-between text-xs mb-1.5 gap-2">
                    <span className="font-medium text-slate-200 truncate leading-snug">{item.label}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono">{item.count} vote{item.count > 1 ? 's' : ''}</span>
                      <span className="font-mono font-bold text-cyan-300">{item.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full h-2 sm:h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-700"
                      style={{ width: `${Math.max(item.percentage, 4)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Card 2: Formats Préférés */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Format d'événement (Q11)</h3>
                <p className="text-[10px] sm:text-[11px] text-slate-400">Modalités souhaitées</p>
              </div>
            </div>
          </div>

          {formatList.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-3">Pas encore de choix enregistré pour ce critère.</p>
          ) : (
            <div className="space-y-2.5 sm:space-y-3">
              {formatList.map((item) => (
                <div key={item.label} className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-950/40 border border-slate-850">
                  <div className="flex items-center justify-between text-xs mb-1.5 gap-2">
                    <span className="font-semibold text-slate-200 truncate leading-snug">{item.label}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono">{item.count} vote{item.count > 1 ? 's' : ''}</span>
                      <span className="font-mono font-bold text-purple-300">{item.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 sm:h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700"
                      style={{ width: `${Math.max(item.percentage, 5)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Card 3: Créneau & Horaires */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Créneau (Q13)</h3>
                <p className="text-[10px] sm:text-[11px] text-slate-400">Répartition des votes</p>
              </div>
            </div>
          </div>

          {timingList.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-3">Pas encore de choix enregistré pour ce critère.</p>
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {timingList.map((t) => (
                <div key={t.label} className="p-2 sm:p-3 rounded-xl sm:rounded-2xl text-center bg-slate-950 border border-slate-800">
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">{t.percentage}%</div>
                  <div className="text-[11px] sm:text-xs font-semibold mt-0.5 sm:mt-1 text-slate-200 truncate">{t.label}</div>
                  <div className="text-[9px] sm:text-[10px] text-slate-500 font-mono">{t.count} vote{t.count > 1 ? 's' : ''}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Card 4: Motivations majeures */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                <ThumbsUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Attentes Clés (Q5)</h3>
                <p className="text-[10px] sm:text-[11px] text-slate-400">Motivations exprimées</p>
              </div>
            </div>
          </div>

          {expectationList.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-3">Pas encore de choix enregistré pour ce critère.</p>
          ) : (
            <div className="space-y-2 sm:space-y-2.5">
              {expectationList.map((exp, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs p-2.5 sm:p-3 rounded-xl bg-slate-950 border border-slate-850 gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-amber-500/15 text-amber-400 flex items-center justify-center font-mono font-bold text-[9px] sm:text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-slate-200 font-medium truncate text-[11px] sm:text-xs">{exp.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[9px] sm:text-[10px] text-slate-500 font-mono">{exp.count} vote{exp.count > 1 ? 's' : ''}</span>
                    <span className="font-mono text-amber-300 font-semibold text-xs">{exp.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Real Submissions Questions to Speakers */}
      {recentSubmissions.some((s) => s.questionIdea) && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <MessageSquare className="w-4 h-4 text-cyan-400 shrink-0" />
            <h3 className="font-bold text-white text-sm sm:text-base">Questions réelles soumises aux intervenants</h3>
          </div>
          <div className="space-y-2.5 sm:space-y-3">
            {recentSubmissions
              .filter((s) => s.questionIdea)
              .map((sub) => (
                <div key={sub.id} className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-950 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-300 text-[11px] sm:text-xs">{sub.name}</span>
                    <span className="text-slate-500 text-[9px] sm:text-[10px]">
                      {new Date(sub.timestamp).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <p className="text-slate-200 italic text-xs leading-relaxed">« {sub.questionIdea} »</p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Bottom CTA to add response */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-indigo-900/40 via-slate-900 to-blue-900/40 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 backdrop-blur-xl">
        <div className="text-center sm:text-left">
          <h4 className="font-bold text-white text-sm sm:text-base">Ajoutez votre voix à ces résultats</h4>
          <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5 sm:mt-1">
            Chaque nouvelle soumission actualise immédiatement ces pourcentages et les transmet à {TARGET_EMAIL}.
          </p>
        </div>
        <button
          onClick={onGoToForm}
          className="w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-slate-950 font-bold text-xs shrink-0 shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 transition-transform active:scale-[0.98] min-h-[44px]"
        >
          <span>Participer au questionnaire</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
