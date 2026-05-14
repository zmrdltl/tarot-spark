export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-10 text-neutral-50">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl flex-col justify-center gap-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-300">
          tarot-spark
        </p>
        <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">
          Draw cards. Shape the reading into a prompt.
        </h1>
        <p className="max-w-xl text-base leading-7 text-neutral-300">
          A static-first tarot card drawing and AI prompt generator.
        </p>
      </section>
    </main>
  );
}
