import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { EventData } from '../EventCreationFlow';

interface EventDateStepProps {
  eventData: EventData;
  updateEventData: (updates: Partial<EventData>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export function EventDateStep({ eventData, updateEventData, onNext, onBack, currentStep, totalSteps }: EventDateStepProps) {
  const [dateType, setDateType] = useState(eventData.dates.type);
  const [startDate, setStartDate] = useState(
    eventData.dates.startDate ? eventData.dates.startDate.toISOString().split('T')[0] : ''
  );
  const [endDate, setEndDate] = useState(
    eventData.dates.endDate ? eventData.dates.endDate.toISOString().split('T')[0] : ''
  );
  const [time, setTime] = useState(eventData.dates.time || '');
  const [isFlexible, setIsFlexible] = useState(dateType === 'flexible');

  const dateTypes = [
    {
      id: 'single',
      name: 'Single Day',
      description: 'Event happens on one day'
    },
    {
      id: 'multi',
      name: 'Multi-Day',
      description: 'Event spans multiple days'
    }
  ];

  const handleDateTypeChange = (type: 'single' | 'multi' | 'flexible') => {
    setDateType(type);
    updateEventData({ 
      dates: { 
        ...eventData.dates, 
        type,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        time: time
      } 
    });
  };

  const handleFlexibleToggle = () => {
    const newFlexible = !isFlexible;
    setIsFlexible(newFlexible);
    if (newFlexible) {
      handleDateTypeChange('flexible');
    } else {
      handleDateTypeChange('single');
    }
  };

  const handleDateChange = () => {
    updateEventData({ 
      dates: { 
        ...eventData.dates, 
        type: dateType,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        time: time
      } 
    });
  };

  const canProceed = isFlexible || (startDate && (dateType === 'single' || endDate));

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">Event Dates</h1>
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
          <h2 className="text-2xl font-bold mb-2">When is your event?</h2>
          <p className="text-gray-600">Select dates and times for your event.</p>
        </div>

        {/* Flexible Dates Toggle */}
        <Card className="p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar size={20} className="text-blue-500 mr-3" />
              <div>
                <h3 className="font-semibold">TBD/Flexible</h3>
                <p className="text-sm text-gray-500">Decide dates later</p>
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
            {/* Date Type Selection */}
            <div className="mb-6">
              <h3 className="font-semibold mb-4">Duration</h3>
              <div className="grid grid-cols-2 gap-3">
                {dateTypes.map((type) => (
                  <Card
                    key={type.id}
                    className={`p-4 cursor-pointer transition-all ${
                      dateType === type.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'hover:border-gray-300'
                    }`}
                    onClick={() => handleDateTypeChange(type.id as 'single' | 'multi')}
                  >
                    <div className="text-center">
                      <h4 className="font-semibold mb-1">{type.name}</h4>
                      <p className="text-xs text-gray-500">{type.description}</p>
                      {dateType === type.id && (
                        <div className="mt-3">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Date Inputs */}
            <div className="mb-6">
              <h3 className="font-semibold mb-4">Select Dates</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {dateType === 'single' ? 'Event Date' : 'Start Date'}
                  </label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      handleDateChange();
                    }}
                    className="h-12"
                  />
                </div>

                {dateType === 'multi' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                        handleDateChange();
                      }}
                      min={startDate}
                      className="h-12"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Time Input for Single Day Events */}
            {dateType === 'single' && (
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <Clock size={20} className="text-blue-500 mr-2" />
                  <h3 className="font-semibold">Event Time (Optional)</h3>
                </div>
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                    handleDateChange();
                  }}
                  className="h-12"
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t px-4 py-4">
        <Button 
          onClick={onNext}
          disabled={!canProceed}
          className="w-full h-12"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}