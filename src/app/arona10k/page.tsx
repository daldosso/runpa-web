import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Arona 10K — Podistica Arona",
  description: "Informazioni pratiche sull'Arona 10K: data, iscrizioni, regolamento e contatti.",
};

export default function Arona10KPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">Arona 10K — Informazioni</h1>
          <p className="text-sm text-gray-600 mt-1">Edizione 2026 — manifestazione 10 km su strada organizzata da ASD Podistica Arona</p>
        </div>

        <div className="w-32 h-32 relative">
          <Image src="/podistica-arona.png" alt="Podistica Arona" fill style={{ objectFit: 'contain' }} />
        </div>
      </header>

      <section className="bg-white border rounded p-4 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Panoramica</h2>
        <p className="text-sm text-gray-700">
          L&apos;Arona 10K è una corsa su strada di 10 chilometri che si svolge nel centro storico e lungo il lungolago di Arona. L&apos;evento comprende la gara competitiva (10 km) e una camminata non competitiva di 5 km.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <article className="bg-white border rounded p-4">
          <h3 className="font-semibold">Date & iscrizioni</h3>
          <ul className="mt-2 text-sm text-gray-700 space-y-1">
            <li><strong>Giorno evento:</strong> Febbraio 2026 (controlla la data ufficiale sul sito organizzatore)</li>
            <li><strong>Iscrizioni online:</strong> tramite il servizio Endu (link ufficiale nella sezione link utili)</li>
            <li><strong>Iscrizioni in loco:</strong> disponibili la mattina dell&apos;evento ai tavoli predisposti (se prevista)</li>
          </ul>
        </article>

        <article className="bg-white border rounded p-4">
          <h3 className="font-semibold">Quote</h3>
          <p className="mt-2 text-sm text-gray-700">Le quote variano in base alla data di iscrizione, con una progressione che sale avvicinandosi all&apos;evento. Consulta la pagina ufficiale per le date precise delle fasce di prezzo.</p>
        </article>
      </section>

      <section className="bg-white border rounded p-4">
        <h3 className="font-semibold">Regolamento essenziale</h3>
        <ul className="list-disc ml-5 mt-2 text-sm text-gray-700 space-y-1">
          <li>La gara è inserita nel calendario nazionale e rispetta le norme FIDAL per le competizioni su strada.</li>
          <li>Possono partecipare atleti tesserati (FIDAL o EPS con Runcard) e atleti stranieri sotto le condizioni previste dal regolamento.</li>
          <li>È richiesta la documentazione sanitaria prevista per la partecipazione agonistica (ove impostato), consultare il regolamento ufficiale per i dettagli.</li>
          <li>La manifestazione si svolge anche in caso di condizioni meteorologiche avverse, salvo situazioni di forza maggiore.</li>
        </ul>
      </section>

      <section className="bg-white border rounded p-4">
        <h3 className="font-semibold">Premi e categorie</h3>
        <p className="text-sm text-gray-700">Sono previsti premi per le posizioni assolute e per le categorie d&apos;età. Alcune categorie possono ricevere premi in natura o buoni valore; la distribuzione è indicata nel regolamento ufficiale.</p>
      </section>

      <section className="bg-white border rounded p-4">
        <h3 className="font-semibold">Camminata 5 km</h3>
        <p className="text-sm text-gray-700">In concomitanza alla 10K viene organizzata una camminata non competitiva di 5 km, aperta a tutti. Le modalità e le quote possono essere diverse rispetto alla gara competitiva.</p>
      </section>

      <section className="bg-white border rounded p-4">
        <h3 className="font-semibold">Contatti & link utili</h3>
        <ul className="mt-2 text-sm text-gray-700 space-y-1">
          <li>Organizzazione: <strong>ASD Podistica Arona</strong></li>
          <li>Email: <a className="underline" href="mailto:10k@podisticaarona.it">10k@podisticaarona.it</a></li>
          <li>Pagina ufficiale evento: <a className="underline" href="https://www.podisticaarona.it/arona10k/" target="_blank" rel="noopener noreferrer">podisticaarona.it/arona10k</a></li>
          <li>Iscrizioni: <a className="underline" href="https://api.endu.net/r/i/99925" target="_blank" rel="noopener noreferrer">Iscrizioni Endu</a></li>
          <li>Foto e rassegna stampa: consultare la sezione media sulla pagina ufficiale.</li>
        </ul>
      </section>

      <footer className="text-sm text-gray-500">
        <p>Questa pagina è una sintesi informativa ispirata alla comunicazione ufficiale di Podistica Arona. Per il regolamento completo e i dettagli ufficiali, visita la pagina <a className="underline" href="https://www.podisticaarona.it/arona10k/" target="_blank" rel="noopener noreferrer">ufficiale</a>.</p>
      </footer>
    </main>
  );
}
