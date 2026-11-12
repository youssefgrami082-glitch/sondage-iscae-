import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Send,
  Sparkles,
  Check,
  Lightbulb,
  ArrowRight,
  Info
} from 'lucide-react';
import { FORM_QUESTIONS, SECTIONS, FormQuestion } from '../data/formData';

interface StepByStepFormProps {
  answers: Record<number, string>;
  onSelectAnswer: (questionId: number, value: string) => void;
  onSubmit: (studentName: string, studentEmail: string) => void;
  isSubmitting: boolean;
  studentName: string;
  setStudentName: (val: string) => void;
  studentEmail: string;
  setStudentEmail: (val: string) => void;
}

export const StepByStepForm: React.FC<StepByStepFormProps> = ({
  answers,
  onSelectAnswer,
  onSubmit,
  isSubmitting,
  studentName,
  setStudentName,
  studentEmail,
  setStudentEmail
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Compute active questions taking condition into account
  const visibleQuestions: FormQuestion[] = FORM_QUESTIONS.filter((q) => {
    if (q.condition) {
      const parentVal = answers[q.condition.dependsOn];
      if (parentVal && parentVal !== q.condition.value) {
        return false;
      }
    }
    return true;
  });

  const currentQuestion = visibleQuestions[currentIndex] || visibleQuestions[0];
  const isLastQuestion = currentIndex === visibleQuestions.length - 1;
  const currentAnswer = answers[currentQuestion.id] || '';

  const currentSection = SECTIONS.find((s) => s.id === currentQuestion.category) || SECTIONS[0];

  const answeredTotal = Object.keys(answers).filter(k => answers[Number(k)]?.trim()).length;
  const progressPercent = Math.min(100, Math.round(((currentIndex + 1) / visibleQuestions.length) * 100));

  // Keyboard navigation on desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        if (e.key === 'Enter' && !e.shiftKey && currentQuestion.type === 'text') {
          e.preventDefault();
          handleNext();
        }
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (currentQuestion.options && /^[1-9]$/.test(e.key)) {
        const optionIdx = parseInt(e.key, 10) - 1;
        if (currentQuestion.options[optionIdx]) {
          onSelectAnswer(currentQuestion.id, currentQuestion.options[optionIdx]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQuestion, answers]);

  const handleNext = () => {
    setErrorMsg(null);
    if (currentQuestion.required && !currentAnswer.trim()) {
      setErrorMsg("Cette question est obligatoire pour soumettre le formulaire.");
      return;
    }

    if (currentIndex < visibleQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setErrorMsg(null);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentQuestion.required && !currentAnswer.trim()) {
      setErrorMsg("Veuillez renseigner cette question obligatoire.");
      return;
    }
    onSubmit(studentName, studentEmail);
  };

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
      {/* Top Section Progress Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-400 mb-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium text-[10px] sm:text-xs">
              {currentSection.shortTitle}
            </span>
            <span className="font-semibold text-slate-200">
              Q{currentIndex + 1}/{visibleQuestions.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden xs:inline">{answeredTotal} complété{answeredTotal > 1 ? 's' : ''}</span>
            <span className="font-mono text-indigo-300 font-bold">{progressPercent}%</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 sm:h-2 bg-slate-900 border border-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400"
            initial={{ width: '0%' }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Main Animated Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl relative backdrop-blur-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Question Title */}
            <div>
              <div className="flex items-start gap-2.5 sm:gap-3">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 mt-0.5">
                  {currentQuestion.number}
                </span>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base sm:text-2xl font-bold text-white leading-snug">
                    {currentQuestion.title}
                    {currentQuestion.required && (
                      <span className="text-pink-400 ml-1.5 text-sm sm:text-base font-semibold" title="Obligatoire">
                        *
                      </span>
                    )}
                  </h2>
                  {currentQuestion.subtitle && (
                    <p className="mt-1 text-xs sm:text-sm text-slate-400 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>{currentQuestion.subtitle}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Error banner */}
            {errorMsg && (
              <div className="p-3 bg-pink-500/10 border border-pink-500/30 rounded-xl text-xs text-pink-300 flex items-center gap-2">
                <Info className="w-4 h-4 text-pink-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Answer Controls: Radio options */}
            {currentQuestion.type === 'radio' && currentQuestion.options && (
              <div className="space-y-2 sm:space-y-2.5 pt-1 sm:pt-2">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = currentAnswer === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        onSelectAnswer(currentQuestion.id, option);
                        setErrorMsg(null);
                      }}
                      className={`w-full text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all flex items-center justify-between group active:scale-[0.99] touch-manipulation min-h-[50px] ${
                        isSelected
                          ? 'bg-indigo-600/20 border-indigo-500 shadow-md shadow-indigo-500/10 text-white ring-1 ring-indigo-500/50'
                          : 'bg-slate-950/60 border-slate-800/90 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3.5 pr-2 min-w-0">
                        <span
                          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-mono font-bold flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-indigo-500 text-white'
                              : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span className={`text-xs sm:text-base font-medium leading-snug ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                          {option}
                        </span>
                      </div>

                      <div
                        className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ml-2 ${
                          isSelected
                            ? 'border-indigo-400 bg-indigo-500 text-white'
                            : 'border-slate-700 bg-slate-900 group-hover:border-slate-600'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Text / Textarea input */}
            {(currentQuestion.type === 'text' || currentQuestion.type === 'textarea') && (
              <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
                {currentQuestion.type === 'textarea' ? (
                  <textarea
                    rows={4}
                    value={currentAnswer}
                    onChange={(e) => onSelectAnswer(currentQuestion.id, e.target.value)}
                    placeholder={currentQuestion.placeholder || "Écrivez votre réponse ici..."}
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-base text-slate-100 placeholder:text-slate-500 outline-none transition-colors"
                  />
                ) : (
                  <input
                    type="text"
                    value={currentAnswer}
                    onChange={(e) => onSelectAnswer(currentQuestion.id, e.target.value)}
                    placeholder={currentQuestion.placeholder || "Votre réponse..."}
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl sm:rounded-2xl px-3.5 py-3 text-base text-slate-100 placeholder:text-slate-500 outline-none transition-colors"
                  />
                )}

                {/* Smart inspiration chips */}
                {currentQuestion.smartSuggestions && currentQuestion.smartSuggestions.length > 0 && (
                  <div className="pt-1">
                    <div className="flex items-center gap-1.5 text-xs text-amber-400/90 font-medium mb-2">
                      <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                      <span>Suggestions en 1 clic pour vous inspirer :</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {currentQuestion.smartSuggestions.map((suggestion, sIdx) => (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() => {
                            const newText = currentAnswer ? `${currentAnswer} | ${suggestion}` : suggestion;
                            onSelectAnswer(currentQuestion.id, newText);
                          }}
                          className="text-[11px] sm:text-xs bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/50 text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg sm:rounded-xl transition-all text-left active:scale-[0.98]"
                        >
                          + {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Optional student personalization before submitting at last step */}
            {isLastQuestion && (
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-800/80">
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 border border-indigo-500/30">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-xs sm:text-sm font-semibold text-white">Identification (Optionnelle)</h3>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-300 mb-3 sm:mb-4">
                    Indiquez votre prénom, nom ou pseudo pour être tenu(e) informé(e) des annonces de l'événement.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    <div>
                      <label className="block text-[11px] sm:text-xs font-medium text-slate-400 mb-1">Prénom & Nom (ou Pseudo)</label>
                      <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Ex : Youssef G."
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg sm:rounded-xl px-3 py-2.5 text-base sm:text-sm text-slate-100 placeholder:text-slate-600 focus:border-indigo-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] sm:text-xs font-medium text-slate-400 mb-1">Email universitaire (optionnel)</label>
                      <input
                        type="email"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        placeholder="etudiant@univ.fr"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg sm:rounded-xl px-3 py-2.5 text-base sm:text-sm text-slate-100 placeholder:text-slate-600 focus:border-indigo-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Navigation Buttons */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-800/80 flex items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all min-h-[44px] ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed text-slate-500 bg-slate-950'
                : 'text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 active:scale-[0.98]'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Précédent</span>
          </button>

          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-500">
            <span>Raccourcis :</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 font-mono text-slate-400">1..7</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 font-mono text-slate-400">Entrée ↵</kbd>
          </div>

          {isLastQuestion ? (
            <button
              type="button"
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all min-h-[44px] active:scale-[0.98]"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Envoi en cours...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Soumettre</span>
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-500/20 transition-all min-h-[44px] active:scale-[0.98]"
            >
              <span>Suivant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
