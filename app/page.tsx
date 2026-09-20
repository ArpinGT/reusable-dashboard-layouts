export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-900">
      <div className="mx-auto max-w-5xl space-y-16">
        <section>
          <p className="font-inter text-sm font-medium uppercase tracking-widest text-zinc-500">
            Font Test
          </p>

          <h1 className="mt-4 text-6xl leading-tight">
            Helvetica Neue Ultra Light
          </h1>

          <p className="mt-6 max-w-3xl font-inter text-lg leading-8 text-zinc-600">
            This is a paragraph using Inter. Use this section to compare the
            spacing, weight, readability, and overall appearance of your fonts.
          </p>
        </section>

        <section className="space-y-4 border-t border-zinc-200 pt-10">
          <h2 className="text-4xl">
            This is a Heading
          </h2>

          <h3 className="text-2xl">
            Helvetica Neue Ultra Light Heading
          </h3>

          <p className="font-inter text-base leading-7 text-zinc-600">
            The quick brown fox jumps over the lazy dog. 0123456789
          </p>
        </section>

        <section className="space-y-4 border-t border-zinc-200 pt-10">
          <h2 className="text-4xl">
            Inter
          </h2>

          <p className="font-inter text-base leading-7">
            The quick brown fox jumps over the lazy dog.
          </p>

          <p className="font-inter text-sm font-medium">
            Regular · Medium · SemiBold
          </p>
        </section>

        <section className="space-y-4 border-t border-zinc-200 pt-10">
          <h2 className="font-open-sans text-4xl">
            Open Sans
          </h2>

          <p className="font-open-sans text-base leading-7">
            The quick brown fox jumps over the lazy dog.
          </p>

          <p className="font-open-sans text-sm font-medium">
            Regular · Medium · SemiBold
          </p>
        </section>

        <section className="space-y-6 border-t border-zinc-200 pt-10">
          <h2 className="text-4xl">
            UI Elements
          </h2>

          <div className="flex flex-wrap gap-4">
            <button className="rounded-full bg-black px-6 py-3 font-inter text-sm font-medium text-white">
              Primary Button
            </button>

            <button className="rounded-full border border-zinc-300 bg-white px-6 py-3 font-inter text-sm font-medium">
              Secondary Button
            </button>
          </div>

          <input
            type="text"
            placeholder="Input using Inter"
            className="h-12 w-full max-w-md rounded-xl border border-zinc-300 bg-white px-4 font-inter text-sm outline-none"
          />
        </section>

        <section className="border-t border-zinc-200 pt-10">
          <h2 className="text-4xl">
            Full Typography Test
          </h2>

          <div className="mt-8 space-y-4">
            <h1 className="text-6xl">
              Heading One
            </h1>

            <h2 className="text-5xl">
              Heading Two
            </h2>

            <h3 className="text-4xl">
              Heading Three
            </h3>

            <h4 className="text-3xl">
              Heading Four
            </h4>

            <h5 className="text-2xl">
              Heading Five
            </h5>

            <h6 className="text-xl">
              Heading Six
            </h6>

            <p className="font-inter text-lg leading-8">
              This is large body text using Inter.
            </p>

            <p className="font-open-sans text-base leading-7 text-zinc-600">
              This is normal body text using Open Sans. The quick brown fox
              jumps over the lazy dog. 0123456789
            </p>

            <p className="font-inter text-sm text-zinc-500">
              Small text · Caption · Metadata · 0123456789
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}