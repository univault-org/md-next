// The Core: why we do what we do. The company's founding film, above the commitment film. Click-to-play, never autoplay.
export default function TheCore({
  src = "/videos/the-core/the-core-v1.mp4",
  poster = "/videos/the-core/the-core-v1-poster.jpg",
}) {
  return (
    <section
      id="the-core"
      aria-labelledby="the-core-heading"
      className="max-w-5xl mx-auto px-4 py-16 text-center scroll-mt-24"
    >
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary-500">
        Why we do what we do
      </p>
      <h2
        id="the-core-heading"
        className="mt-3 text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white"
      >
        The Core.
      </h2>
      <p className="mt-6 max-w-2xl mx-auto text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
        The stars, the tides and a breathing body all run on rules nobody rewrites by hand. We build,
        in their image, the way people and machines work together under their own rules, in four
        words: rule, decision, record, judge.
      </p>
      <div className="mt-10 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-black aspect-video">
        <video
          className="w-full h-full block"
          controls
          preload="metadata"
          playsInline
          poster={poster}
          aria-label="The Core, a four-and-a-half-minute film with burned-in subtitles"
        >
          <source src={src} type="video/mp4" />
          Your browser cannot play this film. <a href={src}>Download it</a>.
        </video>
      </div>
      <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
        4 and a half minutes, subtitles on screen. The narration is an AI voice. Pictures are
        AI-generated, except NASA footage (public domain) and real R II F app screens. The scale scene
        is drawn from our own test run of 10 to 11 October 2026, on throwaway copies of the live system
        with stand-in teams.
      </p>
      <div className="mt-8">
        <a
          href="https://riif.com"
          data-track="the-core-join"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
        >
          Join us at riif.com
        </a>
      </div>
    </section>
  );
}
