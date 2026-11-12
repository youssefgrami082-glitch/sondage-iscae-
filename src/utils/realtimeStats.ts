import { useState, useEffect, useCallback } from 'react';
import { FormSubmissionPayload } from './googleFormSubmit';

export interface DomainVote {
  label: string;
  count: number;
  percentage: number;
}

export interface FormatVote {
  label: string;
  count: number;
  percentage: number;
}

export interface TimingVote {
  label: string;
  count: number;
  percentage: number;
}

export interface RecentSubmissionSummary {
  id: string;
  name: string;
  domain?: string;
  format?: string;
  questionIdea?: string;
  timestamp: string;
}

function loadRealSubmissions(): FormSubmissionPayload[] {
  try {
    const listStr = localStorage.getItem('faculte_actual_submissions_list');
    if (listStr) {
      const parsed: FormSubmissionPayload[] = JSON.parse(listStr);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }

    // Check single saved response fallback
    const singleStr = localStorage.getItem('faculte_management_form_saved');
    if (singleStr) {
      const parsed: FormSubmissionPayload = JSON.parse(singleStr);
      if (parsed && parsed.answers && Object.keys(parsed.answers).length > 0) {
        return [parsed];
      }
    }
  } catch (err) {
    console.error('Error loading submissions:', err);
  }
  return [];
}

export function useRealtimeStats() {
  const [submissions, setSubmissions] = useState<FormSubmissionPayload[]>(() => loadRealSubmissions());

  const refreshSubmissions = useCallback(() => {
    const loaded = loadRealSubmissions();
    setSubmissions(loaded);
  }, []);

  useEffect(() => {
    // Listen for custom event on submission
    const handleUpdate = () => {
      refreshSubmissions();
    };

    window.addEventListener('faculte_submission_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('faculte_submission_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [refreshSubmissions]);

  const totalVotes = submissions.length;
  const hasResponses = totalVotes > 0;

  // Real Tally for Q1 (Domaines professionnels)
  const domainCounts: Record<string, number> = {};
  submissions.forEach((sub) => {
    const domain = sub.answers[1];
    if (domain && domain.trim()) {
      domainCounts[domain] = (domainCounts[domain] || 0) + 1;
    }
  });

  const domainTotal = Object.values(domainCounts).reduce((a, b) => a + b, 0) || 1;
  const domainList: DomainVote[] = Object.entries(domainCounts)
    .map(([label, count]) => ({
      label,
      count,
      percentage: Math.round((count / domainTotal) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  // Real Tally for Q11 (Format préféré)
  const formatCounts: Record<string, number> = {};
  submissions.forEach((sub) => {
    const format = sub.answers[11];
    if (format && format.trim()) {
      formatCounts[format] = (formatCounts[format] || 0) + 1;
    }
  });

  const formatTotal = Object.values(formatCounts).reduce((a, b) => a + b, 0) || 1;
  const formatList: FormatVote[] = Object.entries(formatCounts)
    .map(([label, count]) => ({
      label,
      count,
      percentage: Math.round((count / formatTotal) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  // Real Tally for Q13 (Moment préféré)
  const timingCounts: Record<string, number> = {};
  submissions.forEach((sub) => {
    const timing = sub.answers[13];
    if (timing && timing.trim()) {
      timingCounts[timing] = (timingCounts[timing] || 0) + 1;
    }
  });

  const timingTotal = Object.values(timingCounts).reduce((a, b) => a + b, 0) || 1;
  const timingList: TimingVote[] = Object.entries(timingCounts)
    .map(([label, count]) => ({
      label,
      count,
      percentage: Math.round((count / timingTotal) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  // Real Tally for Q12 (Durée préférée)
  const durationCounts: Record<string, number> = {};
  submissions.forEach((sub) => {
    const dur = sub.answers[12];
    if (dur && dur.trim()) {
      durationCounts[dur] = (durationCounts[dur] || 0) + 1;
    }
  });

  const durationTotal = Object.values(durationCounts).reduce((a, b) => a + b, 0) || 1;
  const durationList = Object.entries(durationCounts)
    .map(([label, count]) => ({
      label,
      count,
      percentage: Math.round((count / durationTotal) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  // Real Tally for Q5 (Motivations)
  const expectationCounts: Record<string, number> = {};
  submissions.forEach((sub) => {
    const exp = sub.answers[5];
    if (exp && exp.trim()) {
      expectationCounts[exp] = (expectationCounts[exp] || 0) + 1;
    }
  });

  const expectationTotal = Object.values(expectationCounts).reduce((a, b) => a + b, 0) || 1;
  const expectationList = Object.entries(expectationCounts)
    .map(([label, count]) => ({
      label,
      count,
      percentage: Math.round((count / expectationTotal) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  // Recent real submissions summary
  const recentSubmissions: RecentSubmissionSummary[] = submissions
    .slice(-5)
    .reverse()
    .map((sub, idx) => ({
      id: String(idx),
      name: sub.studentName?.trim() || "Étudiant participant",
      domain: sub.answers[1],
      format: sub.answers[11],
      questionIdea: sub.answers[14] || sub.answers[15],
      timestamp: sub.timestamp || new Date().toISOString(),
    }));

  return {
    hasResponses,
    totalVotes,
    domainList,
    formatList,
    timingList,
    durationList,
    expectationList,
    recentSubmissions,
    refreshSubmissions,
  };
}
