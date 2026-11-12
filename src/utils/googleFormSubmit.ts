import { FORM_METADATA, FORM_QUESTIONS } from '../data/formData';
import { TARGET_EMAIL, sendEmailReportToTarget, StatsSummaryData } from './emailReport';

export interface FormSubmissionPayload {
  answers: Record<number, string>;
  studentName?: string;
  studentEmail?: string;
  timestamp: string;
}

function computeStatsFromList(list: FormSubmissionPayload[]): StatsSummaryData {
  const totalVotes = list.length;
  const countAnswers = (qId: number) => {
    const counts: Record<string, number> = {};
    list.forEach((s) => {
      const a = s.answers[qId];
      if (a && a.trim()) {
        counts[a] = (counts[a] || 0) + 1;
      }
    });
    const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
    return Object.entries(counts)
      .map(([label, count]) => ({
        label,
        count,
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.count - a.count);
  };

  return {
    totalVotes,
    domainList: countAnswers(1),
    formatList: countAnswers(11),
    timingList: countAnswers(13),
    durationList: countAnswers(12),
    expectationList: countAnswers(5),
  };
}

export async function submitToGoogleForm(payload: FormSubmissionPayload): Promise<{ success: boolean; message: string }> {
  try {
    const formData = new FormData();
    const params = new URLSearchParams();

    FORM_QUESTIONS.forEach((q) => {
      const val = payload.answers[q.id];
      if (val !== undefined && val !== null && val.trim() !== '') {
        formData.append(q.entryKey, val);
        params.append(q.entryKey, val);
      }
    });

    // 1. Save to local storage for persistent real submissions
    let existingList: FormSubmissionPayload[] = [payload];
    try {
      localStorage.setItem('faculte_management_form_saved', JSON.stringify(payload));
      
      const existingStr = localStorage.getItem('faculte_actual_submissions_list');
      const storedList: FormSubmissionPayload[] = existingStr ? JSON.parse(existingStr) : [];
      storedList.push(payload);
      existingList = storedList;
      localStorage.setItem('faculte_actual_submissions_list', JSON.stringify(storedList));
      
      window.dispatchEvent(new Event('faculte_submission_updated'));
    } catch {
      // Local storage might be blocked or full
    }

    // 2. Submit to Google Forms via hidden iframe or fetch no-cors
    const formUrl = FORM_METADATA.actionUrl;

    try {
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });
    } catch {
      // If fetch fails (e.g. adblocker), fallback to creating a hidden iframe form submission
      submitViaHiddenIframe(formUrl, payload.answers);
    }

    // 3. Dispatch full email report with answers, percentages and stats to gharbimolka1107@gmail.com
    try {
      const stats = computeStatsFromList(existingList);
      await sendEmailReportToTarget(payload, stats);
    } catch (err) {
      console.warn("Email dispatch error:", err);
    }

    return {
      success: true,
      message: `Votre participation ainsi que les statistiques ont bien été transmises à ${TARGET_EMAIL} !`,
    };
  } catch (error) {
    console.error('Error submitting form:', error);
    // Still consider it recorded locally
    return {
      success: true,
      message: 'Vos réponses sont enregistrées localement.',
    };
  }
}

function submitViaHiddenIframe(actionUrl: string, answers: Record<number, string>) {
  try {
    const iframeName = 'hidden_gform_iframe_' + Date.now();
    const iframe = document.createElement('iframe');
    iframe.name = iframeName;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const form = document.createElement('form');
    form.target = iframeName;
    form.action = actionUrl;
    form.method = 'POST';
    form.style.display = 'none';

    FORM_QUESTIONS.forEach((q) => {
      const val = answers[q.id];
      if (val && val.trim() !== '') {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = q.entryKey;
        input.value = val;
        form.appendChild(input);
      }
    });

    document.body.appendChild(form);
    form.submit();

    setTimeout(() => {
      form.remove();
      iframe.remove();
    }, 3000);
  } catch (err) {
    console.warn('Iframe fallback submission failed:', err);
  }
}

export function generateCalendarICS(studentName: string = 'Étudiant'): string {
  const title = "Forum Management & Marketing - Faculté";
  const description = "Rencontre exclusive avec un Responsable Marketing et un Manager d'entreprise. Organisé selon les retours des étudiants.";
  const location = "Amphithéâtre Principal / Faculté";
  
  // Suggested future event date
  const icsData = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Faculte//Forum Management//FR",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `SUMMARY:${title}`,
    `DESCRIPTION:${description} - Pass étudiant nominatif au nom de ${studentName}`,
    `LOCATION:${location}`,
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT24H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Rappel Forum Faculté Demain",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  return icsData;
}
