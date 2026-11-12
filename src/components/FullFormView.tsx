import React from 'react';
import { Check, Sparkles, Send, Lightbulb, Info } from 'lucide-react';
import { FORM_QUESTIONS, SECTIONS } from '../data/formData';

interface FullFormViewProps {
  answers: Record<number, string>;
  onSelectAnswer: (questionId: number, value: string) => void;
  onSubmit: (studentName: string, studentEmail: string) => void;
  isSubmitting: boolean;
  studentName: string;
  setStudentName: (val: string) => void;
  studentEmail: string;
  setStudentEmail: (val: string) => void;
}

export const FullFormView: React.FC<FullFormViewProps> = ({
  answers,
  onSelectAnswer,
  onSubmit,
  isSubmitting,
  studentName,
  setStudentName,
  studentEmail,
  setStudentEmail
}) => {
  const answeredCount = Object.keys(answers).filter(k => answers[Number(k)]?.trim()).length;
  const isQ1Answered = !!answers[1]?.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isQ1Answered) {
      alert("La question 1 est obligatoire pour soumettre le formulaire.");
      const elem = document.getElementById('question-1');
      elem?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    onSubmit(studentName, studentEmail);
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8 pb-32">
      {/* Quick Section Anchor Navigation */}
      <div className="sticky top-14 sm:top-20 z-30 mb-6 sm:mb-8 bg-slate-950/95 backdrop-blur-md p-1.5 sm:p-2 rounded-xl sm:rounded-2xl border border-slate-800 shadow-xl overflow-x-auto no-scrollbar flex items-center gap-1.5 sm:gap-2">
        {SECTIONS.map((sec, idx) => {
          const secQuestions = FORM_QUESTIONS.filter(q => q.category === sec.id);
          const secAnswered = secQuestions.filter(q => answers[q.id]?.trim()).length;
          return (
            <a
              key={sec.id}
              href={`#section-${sec.id}`}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-medium shrink-0 bg-slate-900 hover:bg-slate-800 border border-slate-850 hover:border-indigo-500/40 text-slate-300 hover:text-white transition-all flex items-center gap-1 sm:gap-1.5"
            >
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-slate-800 text-[9px] sm:text-[10px] flex items-center justify-center font-bold text-slate-400">
                {idx + 1}
              </span>
              <span>{sec.shortTitle}</span>
              <span className="text-[9px] sm:text-[10px] text-indigo-400 font-mono">
                ({secAnswered}/{secQuestions.length})
              </span>
            </a>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-12">
        {SECTIONS.map((sec) => {
          const secQuestions = FORM_QUESTIONS.filter((q) => q.category === sec.id);

          return (
            <div
              key={sec.id}
              id={`section-${sec.id}`}
              className="bg-slate-900/60 border border-slate-800/80 rounded-2xl sm:rounded-3xl p-4 sm:p-8 backdrop-blur-sm relative"
            >
              {/* Section Header */}
              <div className="mb-5 sm:mb-8 border-b border-slate-800/80 pb-3.5 sm:pb-5">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-gradient-to-r ${sec.accentColor} flex items-center justify-center text-white text-xs font-bold shadow-md shrink-0`}>
                    {sec.title[0]}
                  </div>
                  <div>
                    <h2 className="text-base sm:text-xl font-bold text-white tracking-tight">{sec.title}</h2>
                    <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">{sec.description}</p>
                  </div>
                </div>
              </div>

              {/* Questions in Section */}
              <div className="space-y-4 sm:space-y-8">
                {secQuestions.map((q) => {
                  if (q.condition) {
                    const dependsOnAnswer = answers[q.condition.dependsOn];
                    const isMet = dependsOnAnswer === q.condition.value;
                    if (!isMet) {
                      return null;
                    }
                  }

                  const val = answers[q.id] || '';

                  return (
                    <div
                      key={q.id}
                      id={`question-${q.id}`}
                      className="p-3.5 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700/80 transition-all"
                    >
                      <div className="flex items-start gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                        <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {q.number}
                        </span>
                        <div>
                          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white leading-snug">
                            {q.title}
                            {q.required && (
                              <span className="text-pink-400 ml-1 text-xs sm:text-sm font-bold" title="Obligatoire">
                                *
                              </span>
                            )}
                          </h3>
                          {q.subtitle && (
                            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">{q.subtitle}</p>
                          )}
                        </div>
                      </div>

                      {/* Radio options */}
                      {q.type === 'radio' && q.options && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                          {q.options.map((option) => {
                            const isSelected = val === option;
                            return (
                              <button
                                key={option}
                                type="button"
                                onClick={() => onSelectAnswer(q.id, option)}
                                className={`text-left p-3 sm:p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between group min-h-[46px] active:scale-[0.99] touch-manipulation ${
                                  isSelected
                                    ? 'bg-indigo-600/20 border-indigo-500 text-white font-medium ring-1 ring-indigo-500/40'
                                    : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                                }`}
                              >
                                <span className="leading-snug pr-1">{option}</span>
                                <div
                                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                                    isSelected
                                      ? 'border-indigo-400 bg-indigo-500 text-white'
                                      : 'border-slate-700 bg-slate-950'
                                  }`}
                                >
                                  {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Text inputs */}
                      {(q.type === 'text' || q.type === 'textarea') && (
                        <div className="space-y-2.5 sm:space-y-3">
                          {q.type === 'textarea' ? (
                            <textarea
                              rows={3}
                              value={val}
                              onChange={(e) => onSelectAnswer(q.id, e.target.value)}
                              placeholder={q.placeholder || "Votre réponse..."}
                              className="w-full bg-slate-900/90 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl p-3 sm:p-3.5 text-base text-slate-100 placeholder:text-slate-600 outline-none"
                            />
                          ) : (
                            <input
                              type="text"
                              value={val}
                              onChange={(e) => onSelectAnswer(q.id, e.target.value)}
                              placeholder={q.placeholder || "Votre réponse..."}
                              className="w-full bg-slate-900/90 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-3 sm:px-3.5 py-2.5 text-base text-slate-100 placeholder:text-slate-600 outline-none"
                            />
                          )}

                          {q.smartSuggestions && q.smartSuggestions.length > 0 && (
                            <div className="pt-1">
                              <div className="flex items-center gap-1.5 text-[11px] text-amber-400/90 font-medium mb-1.5">
                                <Lightbulb className="w-3 h-3 shrink-0" />
                                <span>Inspirations suggérées :</span>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {q.smartSuggestions.map((suggestion, sIdx) => (
                                  <button
                                    key={sIdx}
                                    type="button"
                                    onClick={() => {
                                      const newText = val ? `${val} | ${suggestion}` : suggestion;
                                      onSelectAnswer(q.id, newText);
                                    }}
                                    className="text-[10px] sm:text-[11px] bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/40 text-slate-400 hover:text-slate-200 px-2.5 py-1 rounded-lg transition-colors text-left active:scale-[0.98]"
                                  >
                                    + {suggestion}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Participant Identification Card */}
        <div className="bg-gradient-to-r from-indigo-950/50 via-slate-900 to-purple-950/40 border border-indigo-500/30 rounded-2xl sm:rounded-3xl p-4 sm:p-8">
          <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">Identification (Optionnelle)</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mb-4 sm:mb-6">
            Renseignez votre prénom, nom ou pseudo si vous souhaitez être prévenu(e) en avant-première lors de l'annonce officielle.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Prénom et Nom (ou Pseudo)</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Ex : Sarah Benali"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 sm:px-3.5 py-2.5 text-base sm:text-sm text-slate-100 placeholder:text-slate-600 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email universitaire (optionnel)</label>
              <input
                type="email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                placeholder="sarah.b@univ-fac.fr"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 sm:px-3.5 py-2.5 text-base sm:text-sm text-slate-100 placeholder:text-slate-600 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Floating Submit Dock for Mobile & Desktop */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800 p-3 sm:p-4 backdrop-blur-md shadow-2xl">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-2.5 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-bold text-indigo-400 text-xs sm:text-sm">
                {answeredCount}/15
              </div>
              <div className="hidden xs:block">
                <p className="text-[11px] sm:text-xs font-semibold text-slate-200">
                  {isQ1Answered ? "Prêt à envoyer !" : "Q1 obligatoire"}
                </p>
                <p className="text-[10px] sm:text-[11px] text-slate-500 hidden sm:block">
                  {isQ1Answered ? "Tous les champs optionnels sont sauvegardés" : "Choisissez votre domaine prioritaire"}
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !isQ1Answered}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm shadow-xl transition-all min-h-[44px] active:scale-[0.98] ${
                isQ1Answered && !isSubmitting
                  ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Envoi...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Envoyer mes réponses</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
