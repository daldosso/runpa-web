export type Post = {
  id: number;
  title: string;
  excerpt: string;
  body: string;
  date: string; // ISO
  tags?: string[];
};

export const posts: Post[] = [
  {
    id: 1,
    title: "Allenamento specifico per la mezza: come migliorare il tempo",
    excerpt: "Piani e esercizi per migliorare la tua resistenza e velocità nella mezza maratona.",
    body:
      "La mezza maratona richiede un bilanciamento tra resistenza e ritmo. Inserire sessioni di interval training (ripetute corte e lunghe), un lungo progressivo settimanale e lavoro di forza per il core può migliorare significativamente i tempi. Non dimenticare il recupero: sonno, idratazione e giorni leggeri sono essenziali.",
    date: "2026-01-15",
    tags: ["allenamento", "mezza", "resistenza"],
  },
  {
    id: 2,
    title: "Tecnica di corsa: piccoli aggiustamenti, grandi risultati",
    excerpt: "Suggerimenti pratici per migliorare l'economia di corsa senza stravolgere il tuo stile.",
    body:
      "Concentrare l'attenzione su postura, cadenza e appoggio può rapidamente ridurre il dispendio energetico. Prova esercizi a piedi veloci, skip e drill di tecnica 2 volte a settimana per 10-15 minuti. Lavori di core e squat leggeri aiutano a mantenere una postura efficiente nelle fasi finali della gara.",
    date: "2026-01-20",
    tags: ["tecnica", "prevenzione"],
  },
  {
    id: 3,
    title: "Calendario gare e consigli per la stagione agonistica",
    excerpt: "Come pianificare la stagione, scegliere gli obiettivi e distribuire i picchi di forma.",
    body:
      "Pianifica 1-2 obiettivi principali nella stagione e costruisci le fasi di preparazione attorno a questi. Usa gare di avvicinamento come test e condizioni per provare la strategia di gara. Periodizza carichi e includi tapering adeguati per massimizzare la performance nel giorno della gara.",
    date: "2026-01-07",
    tags: ["gare", "pianificazione"],
  },
  {
    id: 4,
    title: "Storie locali: correre ad Arona e dintorni",
    excerpt: "Itinerari consigliati e racconti di soci della Podistica Arona.",
    body:
      "Dall'anello del lungolago ai percorsi collinari, la zona offre ottime soluzioni per allenamenti variati. Scopri i percorsi preferiti dai soci, con info su distanze, dislivelli e punti acqua. Condividere segnali di passaggi e orari aiuta la comunità a correre in sicurezza.",
    date: "2026-01-25",
    tags: ["local", "percorsi"],
  },
];
