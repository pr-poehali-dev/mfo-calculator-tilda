import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [amount, setAmount] = useState(10000);
  const [days, setDays] = useState(7);

  const minAmount = 1000;
  const maxAmount = 100000;
  const minDays = 1;
  const maxDays = 365;

  const interestRate = days <= 7 ? 0 : 0.52;
  const commission = 560;
  const totalRepayment = amount + (amount * interestRate / 100) + (interestRate === 0 ? 0 : commission);

  const repaymentDate = new Date();
  repaymentDate.setDate(repaymentDate.getDate() + days);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-md bg-card rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 opacity-20">
          <div className="text-5xl sm:text-6xl">🌿</div>
        </div>

        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-1 sm:mb-2 text-card-foreground">
            ПОЛУЧИ ЗАЙМ
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 text-card-foreground">
            НА КАРТУ <span className="text-primary">ЗА 10 МИН</span>
          </h2>

          <div className="space-y-6 sm:space-y-8">
            <div>
              <label className="block text-base sm:text-lg font-medium text-card-foreground mb-2 sm:mb-3">
                Сумма
              </label>
              <div className="text-3xl sm:text-4xl font-bold text-card-foreground mb-3 sm:mb-4">
                {amount.toLocaleString('ru-RU')} ₽
              </div>
              <Slider
                value={[amount]}
                onValueChange={(value) => setAmount(value[0])}
                min={minAmount}
                max={maxAmount}
                step={1000}
                className="mb-2"
              />
              <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                <span>{minAmount.toLocaleString('ru-RU')} ₽</span>
                <span>{maxAmount.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>

            <div>
              <label className="block text-base sm:text-lg font-medium text-card-foreground mb-2 sm:mb-3">
                Срок
              </label>
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <div className="text-3xl sm:text-4xl font-bold text-card-foreground">
                  {days} {days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'}
                </div>
                {days <= 7 && (
                  <div className="text-primary text-xs sm:text-sm font-semibold">
                    ДО 7 ДНЕЙ БЕЗ %
                  </div>
                )}
              </div>
              <Slider
                value={[days]}
                onValueChange={(value) => setDays(value[0])}
                min={minDays}
                max={maxDays}
                step={1}
                className="mb-2"
              />
              <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                <span>{minDays} день</span>
                <span>{maxDays} дней</span>
              </div>
            </div>

            <div>
              <label className="block text-base sm:text-lg font-medium text-card-foreground mb-2 sm:mb-3">
                Вы возвращаете:
              </label>
              <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                {interestRate > 0 && (
                  <div className="text-lg sm:text-xl text-muted-foreground line-through">
                    {(amount + commission).toLocaleString('ru-RU')} ₽
                  </div>
                )}
                <div className="text-3xl sm:text-4xl font-bold text-primary">
                  {totalRepayment.toLocaleString('ru-RU')} ₽
                  {interestRate === 0 && <span className="text-base sm:text-lg">*</span>}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-base sm:text-lg font-medium text-card-foreground mb-1 sm:mb-2">
                До (включительно):
              </label>
              <div className="text-xl sm:text-2xl font-bold text-card-foreground">
                {formatDate(repaymentDate)}
              </div>
            </div>

            <Button 
              size="lg"
              className="w-full h-14 sm:h-16 text-lg sm:text-xl font-bold rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={() => window.open('https://tuchkafinance.ru/applicationform', '_blank')}
            >
              Получить деньги
            </Button>

            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-muted/30 rounded-2xl border border-muted">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Code2" size={20} className="text-primary" />
                <h3 className="text-base sm:text-lg font-semibold text-card-foreground">Код для вашего сайта</h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                Скопируйте этот калькулятор на свой сайт или в Tilda
              </p>
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => {
                  window.open('/tilda-calculator.html', '_blank');
                }}
              >
                <Icon name="Download" size={18} className="mr-2" />
                Открыть HTML-код
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;