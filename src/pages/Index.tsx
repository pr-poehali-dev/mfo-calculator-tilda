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

  const getInterestRate = (days: number) => {
    if (days <= 7) return 0;
    if (days <= 35) return 0.08;
    return 0.52;
  };

  const interestRate = getInterestRate(days);
  const commission = 560;
  const totalRepayment = amount + (amount * interestRate * days / 100) + (interestRate === 0 ? 0 : commission);

  const repaymentDate = new Date();
  repaymentDate.setDate(repaymentDate.getDate() + days);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-white sm:bg-background flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-md bg-card rounded-[1.5rem] sm:rounded-[2.5rem] p-4 sm:p-8 shadow-2xl ring-4 ring-primary">
        <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-center mb-1 text-card-foreground">
          ПОЛУЧИ ЗАЙМ
        </h1>
        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-6 text-card-foreground">
          НА КАРТУ <span className="text-primary">ПОД 0%</span>
        </h2>

        <div className="space-y-3 sm:space-y-6">
          <div>
            <label className="block text-sm sm:text-lg font-medium text-card-foreground mb-1 sm:mb-2">
              Сумма
            </label>
            <div className="text-2xl sm:text-4xl font-bold text-card-foreground mb-2 sm:mb-3">
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
            <label className="block text-sm sm:text-lg font-medium text-card-foreground mb-1 sm:mb-2">
              Срок
            </label>
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <div className="text-2xl sm:text-4xl font-bold text-card-foreground">
                {days} {days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'}
              </div>
              {days <= 7 && (
                <div className="text-primary text-[10px] sm:text-sm font-semibold">
                  ДО 7 ДНЕЙ БЕЗ %
                </div>
              )}
              {days > 7 && days <= 35 && (
                <div className="text-primary text-[10px] sm:text-sm font-semibold">
                  0.08% В ДЕНЬ
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
            <div className="flex justify-between text-[10px] sm:text-sm text-muted-foreground">
              <span>{minDays} день</span>
              <span>{maxDays} дней</span>
            </div>
          </div>

          <div>
            <label className="block text-sm sm:text-lg font-medium text-card-foreground mb-1 sm:mb-2">
              Вы возвращаете:
            </label>
            <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
              {interestRate > 0 && (
                <div className="text-base sm:text-xl text-muted-foreground line-through">
                  {(amount + commission).toLocaleString('ru-RU')} ₽
                </div>
              )}
              <div className="text-2xl sm:text-4xl font-bold text-primary">
                {totalRepayment.toLocaleString('ru-RU')} ₽
                {interestRate === 0 && <span className="text-base sm:text-lg">*</span>}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm sm:text-lg font-medium text-card-foreground mb-1 sm:mb-2">
              До (включительно):
            </label>
            <div className="text-lg sm:text-2xl font-bold text-card-foreground">
              {formatDate(repaymentDate)}
            </div>
          </div>

          <Button 
            size="lg"
            className="w-full h-12 sm:h-16 text-base sm:text-xl font-bold rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
            onClick={() => window.open('https://tuchkafinance.ru/applicationform', '_blank')}
          >
            Получить деньги
          </Button>

          <div className="mt-4 sm:mt-6 p-3 sm:p-5 bg-muted/30 rounded-2xl border border-muted">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="Code2" size={20} className="text-primary" />
              <h3 className="text-base sm:text-lg font-semibold text-card-foreground">Код для вашего сайта</h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-3">
              Скопируйте этот калькулятор на свой сайт или в Tilda
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                className="flex-1"
                onClick={async () => {
                  try {
                    const response = await fetch('/tilda-calculator.html');
                    const htmlCode = await response.text();
                    await navigator.clipboard.writeText(htmlCode);
                    alert('Код скопирован в буфер обмена!');
                  } catch (error) {
                    console.error('Ошибка копирования:', error);
                    window.open('/tilda-calculator.html', '_blank');
                  }
                }}
              >
                <Icon name="Copy" size={18} className="mr-2" />
                Скопировать код
              </Button>
              <Button 
                variant="outline"
                className="flex-1"
                onClick={() => {
                  window.open('/tilda-calculator.html', '_blank');
                }}
              >
                <Icon name="Eye" size={18} className="mr-2" />
                Просмотр
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;