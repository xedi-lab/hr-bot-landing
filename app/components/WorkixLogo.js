'use client';
import { motion } from 'framer-motion';

const LETTERS = ['W', 'o', 'r', 'k', 'i', 'x'];
const GREEN = '#22c55e';

export default function WorkixLogo({ size = 'md', animate = true }) {
  const sizes = {
    sm: { fontSize: 17, dotSize: 5, letterSpacing: '-0.03em' },
    md: { fontSize: 22, dotSize: 6, letterSpacing: '-0.03em' },
    lg: { fontSize: 48, dotSize: 13, letterSpacing: '-0.04em' },
  };
  const s = sizes[size] || sizes.md;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } },
  };

  const letter = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
  };

  const dot = {
    hidden: { opacity: 0, y: -s.dotSize * 4 },
    show: {
      opacity: 1, y: 0,
      transition: {
        delay: LETTERS.length * 0.055 + 0.1 + 0.08,
        duration: 0.28,
        ease: [0.36, 0, 0.66, -0.56], // overshoot — имитация "падения"
      },
    },
  };

  return (
    <motion.div
      variants={animate ? container : undefined}
      initial={animate ? 'hidden' : false}
      animate={animate ? 'show' : false}
      style={{ display: 'inline-flex', alignItems: 'baseline', gap: 0, position: 'relative' }}
    >
      {LETTERS.map((char, i) => {
        const isIx = i >= 4; // i и x — зелёные
        const isI = i === 4;

        return (
          <motion.span
            key={i}
            variants={animate ? letter : undefined}
            style={{
              fontSize: s.fontSize,
              fontWeight: 800,
              letterSpacing: s.letterSpacing,
              color: isIx ? GREEN : '#fff',
              lineHeight: 1,
              position: 'relative',
              display: 'inline-block',
            }}
          >
            {char}

            {/* Точка падает на букву i */}
            {isI && (
              <motion.span
                variants={animate ? dot : undefined}
                style={{
                  position: 'absolute',
                  top: s.fontSize * -0.18,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: s.dotSize,
                  height: s.dotSize,
                  borderRadius: '50%',
                  background: GREEN,
                  boxShadow: `0 0 ${s.dotSize * 2}px ${GREEN}`,
                  display: 'block',
                }}
              />
            )}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
