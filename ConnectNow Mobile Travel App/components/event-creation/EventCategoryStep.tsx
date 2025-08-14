import { useState } from 'react';
import { ArrowLeft, Plane, PartyPopper, Heart, Briefcase, GraduationCap, User, MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { EventData } from '../EventCreationFlow';

interface EventCategoryStepProps {
  eventData: EventData;
  updateEventData: (updates: Partial<EventData>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export function EventCategoryStep({ eventData, updateEventData, onNext, onBack, currentStep, totalSteps }: EventCategoryStepProps) {
  const [selectedCategory, setSelectedCategory] = useState(eventData.category);

  const categories = [
    {
      id: 'travel',
      name: 'Travel',
      icon: Plane,
      color: 'bg-blue-500',
      description: 'Trips, vacations, adventures'
    },
    {
      id: 'party',
      name: 'Party',
      icon: PartyPopper,
      color: 'bg-pink-500',
      description: 'Celebrations, birthdays, festivals'
    },
    {
      id: 'spiritual',
      name: 'Spiritual',
      icon: Heart,
      color: 'bg-purple-500',
      description: 'Retreats, pilgrimages, meditation'
    },
    {
      id: 'business',
      name: 'Business',
      icon: Briefcase,
      color: 'bg-gray-600',
      description: 'Conferences, meetings, networking'
    },
    {
      id: 'education',
      name: 'Education',
      icon: GraduationCap,
      color: 'bg-green-500',
      description: 'Workshops, courses, seminars'
    },
    {
      id: 'personal',
      name: 'Personal Project',
      icon: User,
      color: 'bg-orange-500',
      description: 'Personal goals, hobbies'
    },
    {
      id: 'other',
      name: 'Other/Custom',
      icon: MoreHorizontal,
      color: 'bg-gray-400',
      description: 'Create your own category'
    }
  ];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    updateEventData({ category: categoryId });
  };

  const canProceed = selectedCategory.length > 0;

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">Event Category</h1>
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
          <h2 className="text-2xl font-bold mb-2">What type of event is this?</h2>
          <p className="text-gray-600">Choose a category that best describes your event.</p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <Card
                key={category.id}
                className={`p-4 cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'hover:border-gray-300 hover:shadow-sm'
                }`}
                onClick={() => handleCategorySelect(category.id)}
              >
                <div className="text-center">
                  <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-500 leading-tight">{category.description}</p>
                  
                  {isSelected && (
                    <div className="mt-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
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