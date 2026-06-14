import type { CSSProperties } from "react";

function Cloud({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 60" aria-hidden fill="#ffffff">
      <ellipse cx="42" cy="40" rx="30" ry="17" />
      <ellipse cx="66" cy="32" rx="25" ry="21" />
      <ellipse cx="88" cy="41" rx="22" ry="15" />
      <rect x="20" y="40" width="80" height="17" rx="8.5" />
    </svg>
  );
}

// Wing positions for a flapping flight cycle: up-beat → glide → down-beat → glide.
const FLAP =
  "M2 12 Q9 2 12 7 Q15 2 22 12;" +
  "M2 9 Q9 5 12 9 Q15 5 22 9;" +
  "M2 7 Q9 11 12 8 Q15 11 22 7;" +
  "M2 9 Q9 5 12 9 Q15 5 22 9;" +
  "M2 12 Q9 2 12 7 Q15 2 22 12";

function Bird({ style, dur = "0.5s", begin = "0s" }: { style?: CSSProperties; dur?: string; begin?: string }) {
  return (
    <svg className="bird" style={style} viewBox="0 0 24 14" aria-hidden>
      <path fill="none" stroke="#3a4a6b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M2 9 Q9 5 12 9 Q15 5 22 9">
        <animate attributeName="d" dur={dur} begin={begin} repeatCount="indefinite" keyTimes="0;0.25;0.5;0.75;1" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" values={FLAP} />
      </path>
    </svg>
  );
}

export function Sky() {
  return (
    <>
      {/* Clouds drift behind the content */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <Cloud className="cloud" style={{ top: "12%", width: "180px", opacity: 0.95, animationDuration: "95s", animationDelay: "-10s" }} />
        <Cloud className="cloud" style={{ top: "24%", width: "120px", opacity: 0.8, animationDuration: "130s", animationDelay: "-60s" }} />
        <Cloud className="cloud" style={{ top: "8%", width: "240px", opacity: 0.9, animationDuration: "160s", animationDelay: "-110s" }} />
        <Cloud className="cloud" style={{ top: "34%", width: "150px", opacity: 0.7, animationDuration: "115s", animationDelay: "-35s" }} />
      </div>

      {/* Birds fly over the top, wings beating out of sync */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden>
        <div className="bird-flock" style={{ top: "17%", animationDuration: "36s", animationDelay: "-4s" }}>
          <Bird style={{ left: "0px", top: "0px", width: "22px" }} dur="0.52s" begin="0s" />
          <Bird style={{ left: "30px", top: "14px", width: "16px" }} dur="0.58s" begin="-0.18s" />
          <Bird style={{ left: "56px", top: "-6px", width: "24px" }} dur="0.48s" begin="-0.31s" />
          <Bird style={{ left: "84px", top: "9px", width: "15px" }} dur="0.6s" begin="-0.12s" />
          <Bird style={{ left: "110px", top: "22px", width: "18px" }} dur="0.54s" begin="-0.25s" />
        </div>
        <div className="bird-flock" style={{ top: "8%", animationDuration: "52s", animationDelay: "-28s" }}>
          <Bird style={{ left: "0px", top: "0px", width: "14px" }} dur="0.62s" begin="-0.2s" />
          <Bird style={{ left: "24px", top: "10px", width: "12px" }} dur="0.56s" begin="-0.05s" />
          <Bird style={{ left: "46px", top: "-3px", width: "15px" }} dur="0.5s" begin="-0.34s" />
        </div>
      </div>
    </>
  );
}
