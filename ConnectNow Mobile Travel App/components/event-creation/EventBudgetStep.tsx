import { useState } from 'react';
import { ArrowLeft, DollarSign, Info, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card } from '../ui/card';
import { EventData } from '../EventCreationFlow';

interface EventBudgetStepProps {
  eventData: EventData;
  updateEventData: (updates: Partial<EventData>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export function EventBudgetStep({ eventData, updateEventData, onNext, onBack, currentStep, totalSteps }: EventBudgetStepProps) {
  const [amount, setAmount] = useState(eventData.budget.amount?.toString() || '');
  const [currency, setCurrency] = useState(eventData.budget.currency);
  const [isFlexible, setIsFlexible] = useState(eventData.budget.flexible);

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' }
  ];

  const budgetHints = {
    travel: {
      '3-day Goa trip for 4': '₹50,000 - ₹80,000',
      'Weekend city break': '₹15,000 - ₹25,000',
      'International trip': '$2,000 - $5,000'
    },
    party: {
      'Birthday party for 20': '₹20,000 - ₹40,000',
      'Small celebration': '₹5,000 - ₹15,000',
      'Wedding reception': '₹2,00,000 - ₹5,00,000'
    },
    business: {
      'Conference for 50': '₹1,00,000 - ₹2,50,000',
      'Team meeting': '₹10,000 - ₹30,000',
      'Workshop': '₹25,000 - ₹75,000'
    }
  };

  const categoryHints = budgetHints[eventData.category as keyof typeof budgetHints] || budgetHints.travel;

  const handleFlexibleToggle = () => {
    const newFlexible = !isFlexible;
    setIsFlexible(newFlexible);
    updateEventData({ 
      budget: { 
        ...eventData.budget, 
        flexible: newFlexible,
        amount: newFlexible ? undefined : parseFloat(amount) || undefined
      } 
    });
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    updateEventData({ 
      budget: { 
        ...eventData.budget, 
        amount: parseFloat(value) || undefined,
        currency: currency
      } 
    });
  };

  const handleCurrencyChange = (value: string) => {
    setCurrency(value);
    updateEventData({ 
      budget: { 
        ...eventData.budget, 
        currency: value
      } 
    });
  };

  const handleSkip = () => {
    updateEventData({ 
      budget: { 
        ...eventData.budget, 
        flexible: true,
        amount: undefined
      } 
    });
    onNext();
  };

  const canProceed = isFlexible || amount.trim().length > 0;

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">Event Budget</h1>
            <p className="text-sm text-gray-500">Step {currentStep} of {totalSteps}</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white px-4 pb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">What's your budget?</h2>
          <p className="text-gray-600">Set a budget to help plan your event expenses.</p>
        </div>

        {/* Flexible Budget Toggle */}
        <Card className="p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <DollarSign size={20} className="text-blue-500 mr-3" />
              <div>
                <h3 className="font-semibold">Flexible Budget</h3>
                <p className="text-sm text-gray-500">Decide budget later</p>
              </div>
            </div>
            <button onClick={handleFlexibleToggle}>
              {isFlexible ? (
                <ToggleRight size={32} className="text-blue-500" />
              ) : (
                <ToggleLeft size={32} className="text-gray-400" />
              )}
            </button>
          </div>
        </Card>

        {!isFlexible && (
          <>
            {/* Budget Input */}
            <div className="mb-6">
              <h3 className="font-semibold mb-4">Enter Budget Amount</h3>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    placeholder="0"
                    className="text-lg h-12 border-2 focus:border-blue-500"
                  />
                </div>
                <div className="w-32">
                  <Select value={currency} onValueChange={handleCurrencyChange}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((curr) => (
                        <SelectItem key={curr.code} value={curr.code}>
                          {curr.symbol} {curr.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Budget Hints */}
            <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
              <div className="flex items-start">
                <Info size={16} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Budget Estimates</h4>
                  <div className="space-y-1 text-sm text-blue-700">
                    {Object.entries(categoryHints).map(([event, estimate]) => (
                      <div key={event} className="flex justify-between">
                        <span>{event}:</span>
                        <span className="font-medium">{estimate}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t px-4 py-4 space-y-3">
        <Button 
          onClick={onNext}
          disabled={!canProceed}
          className="w-full h-12"
        >
          Continue
        </Button>
        <Button 
          variant="ghost"
          onClick={handleSkip}
          className="w-full h-10"
        >
          Skip for now
        </Button>
      </div>
    </div>
  );
}