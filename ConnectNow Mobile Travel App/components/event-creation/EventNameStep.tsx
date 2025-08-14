import { useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { EventData } from '../EventCreationFlow';

interface EventNameStepProps {
  eventData: EventData;
  updateEventData: (updates: Partial<EventData>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export function EventNameStep({ eventData, updateEventData, onNext, onBack, currentStep, totalSteps }: EventNameStepProps) {
  const [name, setName] = useState(eventData.name);

  const suggestions = [
    'Goa Adventure 2025',
    'Family Wedding',
    'Weekend Getaway',
    'Birthday Celebration',
    'Business Conference',
    'Team Building Trip',
    'Spiritual Retreat',
    'Anniversary Trip'
  ];

  const handleNameChange = (value: string) => {
    setName(value);
    updateEventData({ name: value });
  };

  const handleSuggestionClick = (suggestion: string) => {
    setName(suggestion);
    updateEventData({ name: suggestion });
  };

  const canProceed = name.trim().length > 0;

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">Name Your Event</h1>
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
          <h2 className="text-2xl font-bold mb-2">What's your event called?</h2>
          <p className="text-gray-600">Give your event a memorable name that captures its essence.</p>
        </div>

        {/* Input Field */}
        <div className="mb-8">
          <Input
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Enter Event Name"
            className="text-lg h-14 border-2 focus:border-blue-500"
            autoFocus
          />
        </div>

        {/* Suggestions */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Sparkles size={20} className="text-blue-500 mr-2" />
            <h3 className="font-semibold text-gray-700">Smart Suggestions</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-blue-50 hover:border-blue-300 px-3 py-2"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>
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