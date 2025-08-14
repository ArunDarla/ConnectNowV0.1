import { ArrowLeft, MapPin, Calendar, DollarSign, Tag, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { EventData } from '../EventCreationFlow';

interface EventConfirmationStepProps {
  eventData: EventData;
  updateEventData: (updates: Partial<EventData>) => void;
  onNext: () => void;
  onBack: () => void;
  onComplete: () => void;
  currentStep: number;
  totalSteps: number;
}

export function EventConfirmationStep({ 
  eventData, 
  onBack, 
  onComplete, 
  currentStep, 
  totalSteps 
}: EventConfirmationStepProps) {
  const categoryNames = {
    travel: 'Travel',
    party: 'Party',
    spiritual: 'Spiritual',
    business: 'Business',
    education: 'Education',
    personal: 'Personal Project',
    other: 'Other/Custom'
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateRange = () => {
    if (eventData.dates.type === 'flexible') {
      return 'TBD/Flexible';
    }
    
    if (eventData.dates.type === 'single' && eventData.dates.startDate) {
      const dateStr = formatDate(eventData.dates.startDate);
      return eventData.dates.time ? `${dateStr} at ${eventData.dates.time}` : dateStr;
    }
    
    if (eventData.dates.type === 'multi' && eventData.dates.startDate && eventData.dates.endDate) {
      return `${formatDate(eventData.dates.startDate)} - ${formatDate(eventData.dates.endDate)}`;
    }
    
    return 'Not specified';
  };

  const formatBudget = () => {
    if (eventData.budget.flexible || !eventData.budget.amount) {
      return 'Flexible';
    }
    
    const currencySymbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      INR: '₹',
      JPY: '¥'
    };
    
    const symbol = currencySymbols[eventData.budget.currency as keyof typeof currencySymbols] || eventData.budget.currency;
    return `${symbol}${eventData.budget.amount.toLocaleString()}`;
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">Confirm Details</h1>
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
          <div className="flex items-center mb-4">
            <CheckCircle size={24} className="text-green-500 mr-3" />
            <h2 className="text-2xl font-bold">Almost there!</h2>
          </div>
          <p className="text-gray-600">Review your event details before creating.</p>
        </div>

        {/* Event Summary Card */}
        <Card className="p-0 overflow-hidden mb-6">
          {/* Header with Event Name */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <h3 className="text-xl font-bold mb-2">{eventData.name}</h3>
            <Badge className="bg-white/20 text-white">
              <Tag size={14} className="mr-1" />
              {categoryNames[eventData.category as keyof typeof categoryNames]}
            </Badge>
          </div>

          {/* Details */}
          <div className="p-6 space-y-4">
            {/* Location */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <MapPin size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Location</p>
                <p className="text-gray-600">{eventData.location}</p>
              </div>
            </div>

            {/* Dates */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <Calendar size={18} className="text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Date & Time</p>
                <p className="text-gray-600">{formatDateRange()}</p>
              </div>
            </div>

            {/* Budget */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                <DollarSign size={18} className="text-orange-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Budget</p>
                <p className="text-gray-600">{formatBudget()}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* What's Next Info */}
        <Card className="p-4 bg-green-50 border-green-200">
          <h4 className="font-semibold text-green-800 mb-2">What happens next?</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Your event will be created instantly</li>
            <li>• Access shared wallet, live map, and group chat</li>
            <li>• Invite members and start planning together</li>
            <li>• Get AI-powered booking suggestions</li>
          </ul>
        </Card>
      </div>

      {/* Footer */}
      <div className="bg-white border-t px-4 py-4">
        <Button 
          onClick={onComplete}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          Create Event
        </Button>
      </div>
    </div>
  );
}