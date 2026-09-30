import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function RocketScroll() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const rocketY = useTransform(scrollYProgress, [0, 0.42, 1], [100, 0, -150]);
  const rocketRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-14, 0, 18]);
  const smokeY = useTransform(scrollYProgress, [0, 1], [28, 82]);
  const smokeOpacity = useTransform(scrollYProgress, [0, 0.12, 0.75, 1], [0, 0.8, 0.65, 0]);

  return (
    <div ref={targetRef} className="relative flex min-h-[18rem] items-center justify-center overflow-hidden md:min-h-[26rem]">
      <motion.svg
        viewBox="0 0 180 260"
        role="img"
        aria-label="Hand-drawn rocket launching upward"
        className="relative z-10 w-36 sm:w-48 md:w-56"
        style={{ y: rocketY, rotate: rocketRotate }}
      >
        <path d="M90 18C68 42 61 76 64 127L71 161L109 161L116 127C119 77 111 42 90 18Z" fill="#FFFDF8" stroke="#9E2B25" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M66 105C50 112 40 132 37 159L68 145M114 105C130 112 140 132 143 159L112 145" fill="#E07A5F" stroke="#9E2B25" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="90" cy="86" r="15" fill="#FDF6E9" stroke="#9E2B25" strokeWidth="4" />
        <path d="M78 160C80 181 84 194 90 204C96 194 100 181 102 160" fill="#F4B76A" stroke="#9E2B25" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M48 64L53 53M128 76L137 68M42 91L31 88" stroke="#E07A5F" strokeWidth="3" strokeLinecap="round" />
      </motion.svg>

      <motion.svg
        viewBox="0 0 180 260"
        className="pointer-events-none absolute inset-0 m-auto h-[90%] w-[70%] text-[#E07A5F]"
        style={{ y: smokeY, opacity: smokeOpacity }}
        aria-hidden="true"
      >
        <path d="M90 168C78 190 103 198 86 216C73 230 98 239 88 253M67 177C55 196 75 205 63 222M111 179C124 196 105 209 119 225" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="5 7" />
      </motion.svg>
    </div>
  );
}