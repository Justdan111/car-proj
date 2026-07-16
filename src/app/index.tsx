import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

import { RidgeBackdrop } from '@/components/ridge-backdrop';

const W = 200;
const H = 88;
const MID_Y = 52;
const LINE_START = 0;
const LINE_END = 156;
const MIN_R = 7;
const MAX_R = 30;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function Loading() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const duration = 2600;
    const startedAt = Date.now();
    let raf: number;

    const tick = () => {
      const t = Math.min(1, (Date.now() - startedAt) / duration);
      setPct(Math.round(easeInOutCubic(t) * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => router.replace('/onboarding'), 420);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const progress = pct / 100;
  const radius = MIN_R + (MAX_R - MIN_R) * progress;
  const circleCx = LINE_END - radius;

  return (
    <View className="flex-1 items-center justify-center bg-ink">
      <RidgeBackdrop />

      <View style={{ width: W, height: H }}>
        <Text
          className="absolute font-techno text-[19px] text-bone"
          style={{ left: LINE_START, top: MID_Y - 30, letterSpacing: 1 }}>
          {pct}%
        </Text>

        <Svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0 }}>
          <Line
            x1={LINE_START}
            y1={MID_Y}
            x2={LINE_END}
            y2={MID_Y}
            stroke="#F2F3F5"
            strokeWidth={1.4}
            strokeLinecap="round"
          />
          <Circle
            cx={circleCx}
            cy={MID_Y}
            r={radius}
            stroke="#F2F3F5"
            strokeWidth={1.4}
            fill="none"
          />
          <Circle cx={LINE_END} cy={MID_Y} r={3.4} fill="#F2F3F5" />
        </Svg>
      </View>
    </View>
  );
}
