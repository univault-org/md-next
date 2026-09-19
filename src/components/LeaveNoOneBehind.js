// Leave No One Behind: the commitment film. Same words on univault.org and paragonreflex.com
// (paragonreflex.com: src/components/LeaveNoOneBehind.astro). The film is click-to-play, never autoplay.
export default function LeaveNoOneBehind({
  src = "/videos/leave-no-one-behind/leave-no-one-behind-v5.mp4",
  poster = "/videos/leave-no-one-behind/leave-no-one-behind-v5-poster.jpg",
  ctaHref = "#contact",
}) {
  return (
    <section
      id="leave-no-one-behind"
      aria-labelledby="lnob-heading"
      className="max-w-5xl mx-auto px-4 py-16 text-center scroll-mt-24"
    >
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary-500">
        Our commitment
      </p>
      <h2
        id="lnob-heading"
        className="mt-3 text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white"
      >
        Leave no one behind.
      </h2>
      <p className="mt-6 max-w-2xl mx-auto text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
        In 1859, what one man saw at Solferino became a promise nearly every nation has signed: the
        wounded are cared for, on every side. Our film is about machines that learn from one
        person's tap, keep the rules people write, and let go of a mistake. Rescue is where we start.
      </p>
      <div className="mt-10 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-black aspect-video">
        <video
          className="w-full h-full block"
          controls
          preload="metadata"
          playsInline
          poster={poster}
          aria-label="Leave No One Behind, a four-minute film with burned-in subtitles"
        >
          <source src={src} type="video/mp4" />
          Your browser cannot play this film. <a href={src}>Download it</a>.
        </video>
      </div>
      <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
        4 minutes, subtitles on screen. Early lab results, in simulation on one computer; no fleet
        has been fielded. Historical images are public domain; other scenes are illustrations,
        some AI-generated. Not affiliated with the Red Cross, the ICRC, the United Nations or the
        Swiss government.
      </p>
      <div className="mt-8">
        <a
          href={ctaHref}
          data-track="lnob-support"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
        >
          Support the rescue mission
        </a>
      </div>
    </section>
  );
}
