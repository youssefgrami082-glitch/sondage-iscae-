export interface QuestionOption {
  id: string;
  label: string;
  icon?: string;
  badge?: string;
}

export interface FormQuestion {
  id: number;
  entryKey: string;
  number: number;
  title: string;
  subtitle?: string;
  type: 'radio' | 'text' | 'textarea';
  required: boolean;
  options?: string[];
  placeholder?: string;
  category: 'career' | 'expectations' | 'feedback' | 'logistics' | 'ideas';
  condition?: {
    dependsOn: number;
    value: string;
  };
  smartSuggestions?: string[];
}

export interface SectionCategory {
  id: 'career' | 'expectations' | 'feedback' | 'logistics' | 'ideas';
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  accentColor: string;
}

export const FORM_METADATA = {
  formId: "1FAIpQLSfI4PztPkQRxOj0ISeAoFN08qD6WiwH8Dd4t7X7oii7jr8sWA",
  title: "Invitation - Formulaire sur le management",
  tagline: "« Prêt à organiser un événement qui vous ressemble ? Votre avis compte ! »",
  description: "Dans le cadre de l’organisation d’un événement à la faculté avec la participation d’un responsable marketing et d’un manager, nous souhaitons connaître vos centres d’intérêt, vos attentes et vos motivations afin de vous proposer un événement adapté à vos besoins.",
  actionUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfI4PztPkQRxOj0ISeAoFN08qD6WiwH8Dd4t7X7oii7jr8sWA/formResponse",
  googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfI4PztPkQRxOj0ISeAoFN08qD6WiwH8Dd4t7X7oii7jr8sWA/viewform"
};

export const SECTIONS: SectionCategory[] = [
  {
    id: 'career',
    title: "1. Domaines & Métiers Cibles",
    shortTitle: "Carrière",
    description: "Quels secteurs et rôles managériaux vous passionnent ?",
    icon: "Briefcase",
    accentColor: "from-blue-600 to-indigo-600"
  },
  {
    id: 'expectations',
    title: "2. Motivations & Attentes",
    shortTitle: "Motivations",
    description: "Ce que vous souhaitez retirer de la présence des intervenants.",
    icon: "Target",
    accentColor: "from-indigo-600 to-purple-600"
  },
  {
    id: 'feedback',
    title: "3. Retours d'Expérience & Freins",
    shortTitle: "Expérience",
    description: "Aidez-nous à éviter les écueils des précédents événements.",
    icon: "Sparkles",
    accentColor: "from-purple-600 to-pink-600"
  },
  {
    id: 'logistics',
    title: "4. Format Idéal & Organisation",
    shortTitle: "Organisation",
    description: "Format, horaire et durée qui correspondent à votre planning.",
    icon: "Clock",
    accentColor: "from-emerald-600 to-teal-600"
  },
  {
    id: 'ideas',
    title: "5. Questions Directes & Idées Créatives",
    shortTitle: "Vos Idées",
    description: "Posez votre question directe aux invités et suggérez vos idées.",
    icon: "MessageSquare",
    accentColor: "from-amber-600 to-orange-600"
  }
];

export const FORM_QUESTIONS: FormQuestion[] = [
  // --- Section 1: Domaines & Métiers ---
  {
    id: 1,
    entryKey: "entry.877086558",
    number: 1,
    title: "Quels domaines professionnels aimeriez-vous découvrir davantage ?",
    subtitle: "Sélectionnez le secteur principal qui stimule votre curiosité",
    type: "radio",
    required: true,
    category: "career",
    options: [
      "Marketing et communication",
      "Management et gestion d'entreprise",
      "Finance et comptabilité",
      "Ressources humaines",
      "Entrepreneuriat",
      "Commerce international",
      "Marketing digital"
    ]
  },
  {
    id: 2,
    entryKey: "entry.1498135098",
    number: 2,
    title: "Quels métiers aimeriez-vous mieux connaître ?",
    subtitle: "Découvrez le quotidien concret d'un professionnel en poste",
    type: "radio",
    required: false,
    category: "career",
    options: [
      "Responsable marketing",
      "Community manager",
      "Chef de projet",
      "Responsable des ressources humaines",
      "Directeur ou manager d'entreprise",
      "Entrepreneur",
      "Responsable commercial"
    ]
  },
  {
    id: 3,
    entryKey: "entry.1424661284",
    number: 3,
    title: "Quelles informations aimeriez-vous obtenir sur ces métiers ?",
    subtitle: "Ce qui vous importe le plus pour votre futur choix de carrière",
    type: "radio",
    required: false,
    category: "career",
    options: [
      "Les missions et les responsabilités",
      "Les compétences nécessaires",
      "Le salaire et les perspectives d'évolution",
      "Les études et les formations requises",
      "Les difficultés rencontrées dans ces métiers",
      "Les opportunités d'emploi"
    ]
  },

  // --- Section 2: Motivations & Attentes ---
  {
    id: 4,
    entryKey: "entry.2606285",
    number: 4,
    title: "À quels types d'événements universitaires aimeriez-vous participer ?",
    subtitle: "La modalité d'échange qui vous correspond le mieux",
    type: "radio",
    required: false,
    category: "expectations",
    options: [
      "Conférences avec des professionnels",
      "Tables rondes et discussions",
      "Ateliers pratiques",
      "Témoignages et retours d'expérience",
      "Activités interactives et challenges"
    ]
  },
  {
    id: 5,
    entryKey: "entry.1787599035",
    number: 5,
    title: "Qu'est-ce qui pourrait vous motiver à assister à notre événement ?",
    subtitle: "Votre principal déclencheur pour bloquer la date",
    type: "radio",
    required: false,
    category: "expectations",
    options: [
      "La présence d'un responsable marketing et d'un manager",
      "La découverte de métiers et de parcours professionnels",
      "Les conseils pour préparer mon avenir professionnel",
      "Les échanges directs avec les intervenants",
      "L'acquisition de nouvelles compétences",
      "Les opportunités de stage et d'emploi",
      "L'attestation de participation"
    ]
  },
  {
    id: 6,
    entryKey: "entry.675440257",
    number: 6,
    title: "Qu'aimeriez-vous retirer de cette expérience ?",
    subtitle: "Le bénéfice concret que vous attendez à la sortie",
    type: "radio",
    required: false,
    category: "expectations",
    options: [
      "Une meilleure connaissance du monde professionnel",
      "Des conseils utiles pour mon avenir",
      "De nouvelles compétences",
      "De nouveaux contacts professionnels"
    ]
  },

  // --- Section 3: Retours d'Expérience & Freins ---
  {
    id: 7,
    entryKey: "entry.159787435",
    number: 7,
    title: "Avez-vous déjà été déçu(e) par un événement universitaire ?",
    subtitle: "Votre avis nous permet de concevoir une session irréprochable",
    type: "radio",
    required: false,
    category: "feedback",
    options: ["Oui", "Non"]
  },
  {
    id: 8,
    entryKey: "entry.2009576484",
    number: 8,
    title: "Si oui, quels éléments vous ont dérangé ?",
    subtitle: "Indiquez le principal point noir rencontré",
    type: "radio",
    required: false,
    category: "feedback",
    condition: {
      dependsOn: 7,
      value: "Oui"
    },
    options: [
      "Les interventions trop longues",
      "Le manque d'interaction avec le public",
      "Les sujets peu intéressants",
      "Le manque d'organisation",
      "Les retards",
      "Le manque d'activités pratiques",
      "Le manque de clarté des informations communiquées"
    ]
  },
  {
    id: 9,
    entryKey: "entry.753140718",
    number: 9,
    title: "Qu'est-ce qui pourrait vous empêcher d'assister à notre événement ?",
    subtitle: "Anticipons vos contraintes pour trouver le meilleur compromis",
    type: "radio",
    required: false,
    category: "feedback",
    options: [
      "Un emploi du temps chargé",
      "Les cours ou les examens",
      "Un thème qui ne m'intéresse pas",
      "Un manque d'informations sur l'événement",
      "Une durée trop longue",
      "Un manque d'intérêt pour les intervenants"
    ]
  },
  {
    id: 10,
    entryKey: "entry.671547850",
    number: 10,
    title: "Quelles améliorations proposeriez-vous pour rendre les événements de la faculté plus intéressants ?",
    subtitle: "Une formule, un rythme, des animations à proposer ?",
    type: "text",
    required: false,
    category: "feedback",
    placeholder: "Ex : Plus de sessions interactives, quiz en direct, pauses networking avec cafés...",
    smartSuggestions: [
      "Intégrer des sessions de questions/réponses en direct via smartphone",
      "Prévoir un temps d'échange informel et café-networking avec les intervenants",
      "Faire des études de cas réels d'entreprises plutôt que des discours théoriques",
      "Remettre des guides pratiques ou templates téléchargeables aux participants"
    ]
  },

  // --- Section 4: Format Idéal & Organisation ---
  {
    id: 11,
    entryKey: "entry.35154283",
    number: 11,
    title: "Quel format préférez-vous ?",
    subtitle: "Comment structurer la prise de parole ?",
    type: "radio",
    required: false,
    category: "logistics",
    options: [
      "Une conférence suivie de questions-réponses",
      "Une discussion ouverte avec les intervenants",
      "Des ateliers pratiques",
      "Une table ronde",
      "Un mélange de plusieurs formats"
    ]
  },
  {
    id: 12,
    entryKey: "entry.1172122437",
    number: 12,
    title: "Quelle durée vous conviendrait le mieux ?",
    subtitle: "Le format le plus efficace et digeste pour vous",
    type: "radio",
    required: false,
    category: "logistics",
    options: [
      "Moins d'une heure",
      "Entre 1 et 2 heures",
      "Entre 2 et 3 heures"
    ]
  },
  {
    id: 13,
    entryKey: "entry.1344409524",
    number: 13,
    title: "Quel moment préférez-vous pour participer ?",
    subtitle: "Le créneau optimal par rapport à vos horaires de cours",
    type: "radio",
    required: false,
    category: "logistics",
    options: [
      "Le matin",
      "À midi",
      "L'après-midi"
    ]
  },

  // --- Section 5: Vos Questions Directes & Idées ---
  {
    id: 14,
    entryKey: "entry.543408265",
    number: 14,
    title: "Quelle question aimeriez-vous poser à un responsable marketing ou à un manager ?",
    subtitle: "Profitez-en ! Les intervenants recevront vos meilleures questions avant la séance",
    type: "textarea",
    required: false,
    category: "ideas",
    placeholder: "Ex : Comment gérez-vous la pression quotidienne ? Quels critères privilégiez-vous lors d'un recrutement ?",
    smartSuggestions: [
      "Quelles sont les 3 compétences qui font la plus grande différence sur le marché actuel ?",
      "Comment avez-vous géré votre transition entre l'université et votre premier poste à responsabilités ?",
      "Quel a été votre plus grand défi en gestion d'équipe ou en stratégie marketing et comment l'avez-vous surmonté ?",
      "Quels conseils donneriez-vous à un étudiant qui souhaite démarrer dans votre domaine ?"
    ]
  },
  {
    id: 15,
    entryKey: "entry.118445149",
    number: 15,
    title: "Avez-vous une idée ou une suggestion qui pourrait rendre cet événement plus attractif pour les étudiants ?",
    subtitle: "Une animation, une surprise, un concours ou un thème inédit ?",
    type: "textarea",
    required: false,
    category: "ideas",
    placeholder: "Partagez votre créativité...",
    smartSuggestions: [
      "Organiser un mini-challenge express de pitch ou cas pratique avec feedback des pros en direct",
      "Proposer une tombola avec un mentorat d'une heure en tête-à-tête avec les intervenants",
      "Créer un stand de relecture de CV et d'optimisation de profil LinkedIn sur place",
      "Mettre en place un livestream interactif avec sondages en direct pour les étudiants à distance"
    ]
  }
];

// Sample simulated community responses for the stats module so students feel part of a lively university movement
export const COMMUNITY_STATS = {
  totalResponses: 142,
  topDomains: [
    { label: "Marketing digital", percentage: 34, count: 48 },
    { label: "Entrepreneuriat", percentage: 26, count: 37 },
    { label: "Management & gestion", percentage: 21, count: 30 },
    { label: "Marketing & communication", percentage: 12, count: 17 },
    { label: "Autres domaines", percentage: 7, count: 10 }
  ],
  topFormats: [
    { label: "Un mélange de plusieurs formats", percentage: 41, icon: "Layers" },
    { label: "Ateliers pratiques", percentage: 29, icon: "Hammer" },
    { label: "Discussion ouverte", percentage: 18, icon: "MessageCircle" },
    { label: "Conférence + Q&R", percentage: 12, icon: "Mic" }
  ],
  topTiming: [
    { label: "L'après-midi", percentage: 52 },
    { label: "À midi", percentage: 28 },
    { label: "Le matin", percentage: 20 }
  ],
  topDuration: [
    { label: "Entre 1 et 2 heures", percentage: 64 },
    { label: "Moins d'une heure", percentage: 24 },
    { label: "Entre 2 et 3 heures", percentage: 12 }
  ],
  topExpectations: [
    { label: "Échanges directs avec les intervenants", percentage: 38 },
    { label: "Opportunités de stage et d'emploi", percentage: 29 },
    { label: "Conseils pour l'avenir professionnel", percentage: 21 },
    { label: "Acquisition de nouvelles compétences", percentage: 12 }
  ]
};
