export default function Landing() {
  return (
    <div className="relative h-screen w-full overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <img
        src="/hand.jpg"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />

      {/* DARK LAYER (adds depth) */}
      <div className="absolute inset-0 bg-black/25"></div>

      {/* GRADIENT OVERLAY (for readability) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F5FAFF]/100 via-[#EAF4FF]/90 to-transparent"></div>

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center pl-[18%]">
        <div className="max-w-xl">
          
          {/* TITLE */}
          <h1 className="text-6xl font-bold text-[#1F3A5F]">
            Sentina
          </h1>

          {/* SLOGAN */}
          <p className="mt-6 text-xl text-[#5A6B7B] leading-relaxed">
            Guided by love,<br />
            protected by care
          </p>

          {/* NAVY BUTTON */}
          <button className="mt-10 px-10 py-4 rounded-2xl bg-[#1F3A5F] text-white text-lg font-medium shadow-[0_10px_30px_rgba(31,58,95,0.25)] hover:bg-[#162B45] hover:scale-105 hover:shadow-xl transition-all duration-300">
            Get Started
          </button>

        </div>
      </div>

    </div>
  );
}