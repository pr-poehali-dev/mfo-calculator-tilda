import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';

const Index = () => {
  const [amount, setAmount] = useState(68000);
  const [days, setDays] = useState(74);
  const [decisionTime, setDecisionTime] = useState('');

  const minAmount = 1000;
  const maxAmount = 100000;
  const minDays = 1;
  const maxDays = 90;

  useEffect(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 10);
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    setDecisionTime(`${h}:${m}`);
  }, []);

  const getDaysWord = (d: number) => {
    if (d === 1) return 'день';
    if (d >= 2 && d <= 4) return 'дня';
    return 'дней';
  };

  const ratePerDay = days > 7 ? 0.0052 : 0;
  const total = Math.round(amount * (1 + ratePerDay * days));
  const daily = days > 0 ? Math.round(total / days) : 0;

  const fmt = (n: number) => n.toLocaleString('ru-RU');

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#1a1a1a' }}>
      <div className="w-full max-w-[420px] bg-white rounded-3xl p-7 shadow-2xl">
        {/* Header */}
        <h2 className="text-center font-bold text-[#1a1a1a] leading-snug mb-7" style={{ fontSize: '18px' }}>
          Оформите заявку прямо сейчас и получите решение в {decisionTime || '--:--'}
        </h2>

        {/* Amount slider */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span style={{ fontSize: '15px', color: '#888' }}>Сумма займа</span>
            <span className="font-bold" style={{ fontSize: '22px', color: '#e8293a' }}>{fmt(amount)} ₽</span>
          </div>
          <Slider
            value={[amount]}
            onValueChange={(v) => setAmount(v[0])}
            min={minAmount}
            max={maxAmount}
            step={1000}
            className="mb-2"
          />
          <div className="flex justify-between" style={{ fontSize: '13px', color: '#aaa' }}>
            <span>1 000 ₽</span>
            <span>100 000 ₽</span>
          </div>
        </div>

        {/* Days slider */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span style={{ fontSize: '15px', color: '#888' }}>Срок займа</span>
            <span className="font-bold" style={{ fontSize: '22px', color: '#e8293a' }}>{days} {getDaysWord(days)}</span>
          </div>
          <Slider
            value={[days]}
            onValueChange={(v) => setDays(v[0])}
            min={minDays}
            max={maxDays}
            step={1}
            className="mb-2"
          />
          <div className="flex justify-between" style={{ fontSize: '13px', color: '#aaa' }}>
            <span>1 дн.</span>
            <span>90 дн.</span>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-2xl p-4" style={{ background: '#fff0f1' }}>
            <div style={{ fontSize: '13px', color: '#888', marginBottom: '6px' }}>К возврату</div>
            <div className="font-bold" style={{ fontSize: '20px', color: '#e8293a' }}>{fmt(total)} ₽</div>
          </div>
          <div className="rounded-2xl p-4" style={{ background: '#fff0f1' }}>
            <div style={{ fontSize: '13px', color: '#888', marginBottom: '6px' }}>Платёж в день</div>
            <div className="font-bold" style={{ fontSize: '20px', color: '#e8293a' }}>{fmt(daily)} ₽</div>
          </div>
        </div>

        {/* Submit button */}
        <button
          className="w-full font-bold text-white transition-all duration-200"
          style={{
            height: '56px',
            fontSize: '17px',
            background: '#e8293a',
            border: 'none',
            borderRadius: '14px',
            cursor: 'pointer',
            letterSpacing: '0.3px',
          }}
          onMouseEnter={e => {
            (e.target as HTMLButtonElement).style.background = '#c81f2e';
            (e.target as HTMLButtonElement).style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={e => {
            (e.target as HTMLButtonElement).style.background = '#e8293a';
            (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
          }}
          onClick={() => window.open('https://tuchkafinance.ru/applicationform', '_blank')}
        >
          Оформить заявку
        </button>
      </div>
    </div>
  );
};

export default Index;
