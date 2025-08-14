import { useState } from 'react';
import { EventConfirmationStep } from './event-creation/EventConfirmationStep';
import { SingleEventForm } from './event-creation/SingleEventForm';

interface EventCreationFlowProps {
  onEventCreated: (eventData: any) => void;
  onBack: () => void;
}

export interface EventData {
  name: string;
  location: string;
  category: string;
  dates: {
    type: 'single' | 'multi' | 'flexible';
    startDate?: Date;
    endDate?: Date;
    time?: string;
  };
  budget: {
    amount?: number;
    currency: string;
    flexible: boolean;
  };
}

export function EventCreationFlow({ onEventCreated, onBack }: EventCreationFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [eventData, setEventData] = useState<EventData>({
    name: '',
    location: '',
    category: '',
    dates: {
      type: 'single',
      currency: 'USD'
    },
    budget: {
      currency: 'USD',
      flexible: false
    }
  });

  const totalSteps = 2; // Now just form + confirmation

  const updateEventData = (updates: Partial<EventData>) => {
    setEventData(prev => ({
      ...prev,
      ...updates
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const handleComplete = () => {
    onEventCreated(eventData);
  };

  const renderStep = () => {
    const commonProps = {
      eventData,
      updateEventData,
      onNext: nextStep,
      onBack: prevStep,
      currentStep,
      totalSteps
    };

    switch (currentStep) {
      case 1:
        return <SingleEventForm {...commonProps} />;
      case 2:
        return <EventConfirmationStep {...commonProps} onComplete={handleComplete} />;
      default:
        return <SingleEventForm {...commonProps} />;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {renderStep()}
    </div>
  );
}