import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroHeader } from './components/HeroHeader';
import { StepByStepForm } from './components/StepByStepForm';
import { FullFormView } from './components/FullFormView';
import { StatsView } from './components/StatsView';
import { SubmissionSuccess } from './components/SubmissionSuccess';
import { BackgroundEffects } from './components/BackgroundEffects';
import { FORM_QUESTIONS, FORM_METADATA } from './data/formData';
import { submitToGoogleForm, FormSubmissionPayload } from './utils/googleFormSubmit';
import { ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'guided' | 'full' | 'stats'>('guided');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [studentName, setStudentName] = useState<string>('');
  const [studentEmail, setStudentEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Restore saved state from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('faculte_management_form_saved');
      if (saved) {
        const parsed: FormSubmissionPayload = JSON.parse(saved);
        if (parsed.answers) {
          setAnswers(parsed.answers);
          if (parsed.studentName) setStudentName(parsed.studentName);
          if (parsed.studentEmail) setStudentEmail(parsed.studentEmail);
          setIsSubmitted(true);
        }
      }
    } catch {
      // Ignore localStorage error
    }
  }, []);

  const handleSelectAnswer = (questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (name: string, email: string) => {
    setIsSubmitting(true);
    const payload: FormSubmissionPayload = {
      answers,
      studentName: name,
      studentEmail: email,
      timestamp: new Date().toISOString(),
    };

    await submitToGoogleForm(payload);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setActiveTab('guided');
  };

  const answeredCount = Object.keys(answers).filter((k) => answers[Number(k)]?.trim()).length;
  const totalCount = FORM_QUESTIONS.length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white relative">
      {/* Rich Animated Background Effects */}
      <BackgroundEffects />

      {/* Top sticky navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (isSubmitted && (tab === 'guided' || tab === 'full')) {
            setIsSubmitted(false);
          }
        }}
        answeredCount={answeredCount}
        totalCount={totalCount}
      />

      {/* Main hero header shown when not submitted */}
      {!isSubmitted && <HeroHeader />}

      {/* Main interactive content */}
      <main className="flex-1 relative z-10">
        {isSubmitted ? (
          <SubmissionSuccess
            answers={answers}
            studentName={studentName}
            studentEmail={studentEmail}
            onGoToStats={() => setActiveTab('stats')}
            onReset={handleReset}
          />
        ) : (
          <>
            {activeTab === 'guided' && (
              <StepByStepForm
                answers={answers}
                onSelectAnswer={handleSelectAnswer}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                studentName={studentName}
                setStudentName={setStudentName}
                studentEmail={studentEmail}
                setStudentEmail={setStudentEmail}
              />
            )}

            {activeTab === 'full' && (
              <FullFormView
                answers={answers}
                onSelectAnswer={handleSelectAnswer}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                studentName={studentName}
                setStudentName={setStudentName}
                studentEmail={studentEmail}
                setStudentEmail={setStudentEmail}
              />
            )}

            {activeTab === 'stats' && (
              <StatsView
                onGoToForm={() => setActiveTab('guided')}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900/80 bg-slate-950/80 backdrop-blur-md py-6 px-4 sm:px-6 text-xs text-slate-500 mt-auto relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-slate-400 font-medium">
              Synchronisé avec le formulaire Google Forms officiel
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href={FORM_METADATA.googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors flex items-center gap-1"
            >
              <span>Lien direct Google Forms</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span>Faculté 2026 • Consultation Étudiante</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
