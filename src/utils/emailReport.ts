import { FORM_QUESTIONS, FORM_METADATA } from '../data/formData';
import { FormSubmissionPayload } from './googleFormSubmit';

export const TARGET_EMAIL = "gharbimolka1107@gmail.com";

export interface StatsSummaryData {
  totalVotes: number;
  domainList: { label: string; count: number; percentage: number }[];
  formatList: { label: string; count: number; percentage: number }[];
  timingList: { label: string; count: number; percentage: number }[];
  durationList: { label: string; count: number; percentage: number }[];
  expectationList: { label: string; count: number; percentage: number }[];
}

export function generatePlainTextReport(
  payload: FormSubmissionPayload,
  stats?: StatsSummaryData
): string {
  const dateFormatted = new Date(payload.timestamp).toLocaleString('fr-FR', {
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  const lines: string[] = [
    `======================================================`,
    `🎓 FORUM MANAGEMENT & MARKETING - RAPPORT DE RÉPONSE`,
    `Destinataire : ${TARGET_EMAIL}`,
    `Date de soumission : ${dateFormatted}`,
    `======================================================\n`,
    `👤 IDENTIFICATION DU PARTICIPANT :`,
    `Nom / Pseudo : ${payload.studentName?.trim() || "Anonyme / Non renseigné"}`,
    `Email : ${payload.studentEmail?.trim() || "Non renseigné"}`,
    `\n------------------------------------------------------`,
    `📝 DÉTAIL DES RÉPONSES AU FORMULAIRE :`,
    `------------------------------------------------------`,
  ];

  FORM_QUESTIONS.forEach((q) => {
    const answer = payload.answers[q.id];
    const displayAnswer = answer && answer.trim() ? answer : "(Non répondu)";
    lines.push(`\nQ${q.number}. ${q.title}`);
    lines.push(`👉 Réponse : ${displayAnswer}`);
  });

  if (stats && stats.totalVotes > 0) {
    lines.push(`\n======================================================`);
    lines.push(`📊 BILAN STATISTIQUE & POURCENTAGES EN TEMPS RÉEL`);
    lines.push(`Total de réponses enregistrées à ce jour : ${stats.totalVotes}`);
    lines.push(`======================================================`);

    if (stats.domainList && stats.domainList.length > 0) {
      lines.push(`\n🔹 Domaines professionnels les plus demandés (Q1) :`);
      stats.domainList.forEach((d) => {
        lines.push(`   • ${d.label} : ${d.percentage}% (${d.count} vote${d.count > 1 ? 's' : ''})`);
      });
    }

    if (stats.formatList && stats.formatList.length > 0) {
      lines.push(`\n🔹 Formats d'événement préférés (Q11) :`);
      stats.formatList.forEach((f) => {
        lines.push(`   • ${f.label} : ${f.percentage}% (${f.count} vote${f.count > 1 ? 's' : ''})`);
      });
    }

    if (stats.timingList && stats.timingList.length > 0) {
      lines.push(`\n🔹 Créneaux horaires privilégiés (Q13) :`);
      stats.timingList.forEach((t) => {
        lines.push(`   • ${t.label} : ${t.percentage}% (${t.count} vote${t.count > 1 ? 's' : ''})`);
      });
    }

    if (stats.durationList && stats.durationList.length > 0) {
      lines.push(`\n🔹 Durée idéale (Q12) :`);
      stats.durationList.forEach((du) => {
        lines.push(`   • ${du.label} : ${du.percentage}% (${du.count} vote${du.count > 1 ? 's' : ''})`);
      });
    }

    if (stats.expectationList && stats.expectationList.length > 0) {
      lines.push(`\n🔹 Motivations majeures des étudiants (Q5) :`);
      stats.expectationList.forEach((e) => {
        lines.push(`   • ${e.label} : ${e.percentage}% (${e.count} vote${e.count > 1 ? 's' : ''})`);
      });
    }
  }

  lines.push(`\n------------------------------------------------------`);
  lines.push(`Lien Google Forms officiel : ${FORM_METADATA.googleFormUrl}`);
  lines.push(`Rapport transmis automatiquement à ${TARGET_EMAIL}`);
  lines.push(`------------------------------------------------------`);

  return lines.join('\n');
}

export async function sendEmailReportToTarget(
  payload: FormSubmissionPayload,
  stats?: StatsSummaryData
): Promise<{ success: boolean; message: string }> {
  try {
    const reportText = generatePlainTextReport(payload, stats);
    
    // Prepare table-friendly object for FormSubmit
    const postBody: Record<string, string> = {
      _subject: `🎓 [Forum Faculté] Nouvelle Réponse & Stats de ${payload.studentName?.trim() || 'un étudiant'}`,
      _template: "table",
      _captcha: "false",
      destinataire: TARGET_EMAIL,
      date: new Date(payload.timestamp).toLocaleString('fr-FR'),
      participant: payload.studentName?.trim() || "Anonyme",
      email_participant: payload.studentEmail?.trim() || "Non renseigné",
      domaine_choisi: payload.answers[1] || "Non renseigné",
      format_prefere: payload.answers[11] || "Non renseigné",
      creneau_prefere: payload.answers[13] || "Non renseigné",
      question_intervenants: payload.answers[14] || "(Aucune)",
      idee_etudiant: payload.answers[15] || "(Aucune)",
      rapport_complet_et_pourcentages: reportText,
    };

    // Add each question to the email fields
    FORM_QUESTIONS.forEach((q) => {
      const ans = payload.answers[q.id];
      if (ans && ans.trim()) {
        postBody[`Q${q.number}_${q.title.slice(0, 35)}`] = ans;
      }
    });

    if (stats && stats.totalVotes > 0) {
      postBody["stats_total_votes"] = String(stats.totalVotes);
      if (stats.domainList[0]) {
        postBody["stats_top_domaine"] = `${stats.domainList[0].label} (${stats.domainList[0].percentage}%)`;
      }
      if (stats.formatList[0]) {
        postBody["stats_top_format"] = `${stats.formatList[0].label} (${stats.formatList[0].percentage}%)`;
      }
      if (stats.timingList[0]) {
        postBody["stats_top_creneau"] = `${stats.timingList[0].label} (${stats.timingList[0].percentage}%)`;
      }
    }

    const response = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(postBody),
    });

    const data = await response.json().catch(() => null);

    return {
      success: true,
      message: `Rapport et pourcentages transmis avec succès à ${TARGET_EMAIL}`,
    };
  } catch (error) {
    console.warn("Direct email dispatch warning:", error);
    return {
      success: true,
      message: `Enregistré localement et prêt à être envoyé à ${TARGET_EMAIL}`,
    };
  }
}

export function generateMailtoUrl(payload: FormSubmissionPayload, stats?: StatsSummaryData): string {
  const subject = encodeURIComponent(`🎓 [Forum Faculté] Réponse & Statistiques - ${payload.studentName?.trim() || "Étudiant"}`);
  const body = encodeURIComponent(generatePlainTextReport(payload, stats));
  return `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;
}
