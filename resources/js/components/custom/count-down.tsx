import { useEffect, useState } from 'react';

type Props = {
  datetime: string;
};

type TimeLeft = {
  hari: number;
  jam: number;
  menit: number;
  detik: number;
};

const calculateTimeLeft = (datetime: string): TimeLeft => {
  const diff = new Date(datetime).getTime() - new Date().getTime();

  if (diff <= 0) return { hari: 0, jam: 0, menit: 0, detik: 0 };

  return {
    hari: Math.floor(diff / (1000 * 60 * 60 * 24)),
    jam: Math.floor((diff / (1000 * 60 * 60)) % 24),
    menit: Math.floor((diff / (1000 * 60)) % 60),
    detik: Math.floor((diff / 1000) % 60),
  };
};

const pad = (n: number) => String(n).padStart(2, '0');

const CountDown = ({ datetime }: Props) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(datetime),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(datetime));
    }, 1000);

    return () => clearInterval(interval);
  }, [datetime]);

  const items = [
    { label: 'Hari', value: timeLeft.hari },
    { label: 'Jam', value: timeLeft.jam },
    { label: 'Menit', value: timeLeft.menit },
    { label: 'Detik', value: timeLeft.detik },
  ];

  return (
    <div className="flex items-center justify-center gap-6">
      {items.map((item, index) => (
        <>
          <div key={item.label} className="text-center">
            <h1>{pad(item.value)}</h1>
            <span>{item.label}</span>
          </div>
          {index < items.length - 1 && <div>:</div>}
        </>
      ))}
    </div>
  );
};

export default CountDown;
