import { useState } from 'react';
import { ArrowLeft, MapPin, Search, Globe, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { EventData } from '../EventCreationFlow';

interface EventLocationStepProps {
  eventData: EventData;
  updateEventData: (updates: Partial<EventData>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export function EventLocationStep({ eventData, updateEventData, onNext, onBack, currentStep, totalSteps }: EventLocationStepProps) {
  const [location, setLocation] = useState(eventData.location);
  const [isFlexible, setIsFlexible] = useState(location === 'Anywhere/Flexible');
  const [searchQuery, setSearchQuery] = useState('');

  const popularDestinations = [
    { name: 'Goa, India', type: 'Beach' },
    { name: 'Mumbai, India', type: 'City' },
    { name: 'Delhi, India', type: 'City' },
    { name: 'Bangalore, India', type: 'City' },
    { name: 'Manali, India', type: 'Mountains' },
    { name: 'Rishikesh, India', type: 'Spiritual' },
    { name: 'Udaipur, India', type: 'Heritage' },
    { name: 'Kerala, India', type: 'Nature' }
  ];

  const searchResults = searchQuery 
    ? popularDestinations.filter(dest => 
        dest.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : popularDestinations;

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
    updateEventData({ location: selectedLocation });
    setIsFlexible(false);
  };

  const handleFlexibleToggle = () => {
    const newFlexible = !isFlexible;
    setIsFlexible(newFlexible);
    if (newFlexible) {
      setLocation('Anywhere/Flexible');
      updateEventData({ location: 'Anywhere/Flexible' });
    } else {
      setLocation('');
      updateEventData({ location: '' });
    }
  };

  const canProceed = location.trim().length > 0;

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">Choose Location</h1>
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
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Where's the event?</h2>
          <p className="text-gray-600">Choose your destination or keep it flexible.</p>
        </div>

        {/* Flexible Location Toggle */}
        <Card className="p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Globe size={20} className="text-blue-500 mr-3" />
              <div>
                <h3 className="font-semibold">Anywhere/Flexible</h3>
                <p className="text-sm text-gray-500">Decide location later</p>
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
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destinations..."
                className="pl-10 h-12 border-2 focus:border-blue-500"
              />
            </div>

            {/* Current Selection */}
            {location && location !== 'Anywhere/Flexible' && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Selected Location</h3>
                <Badge className="bg-blue-100 text-blue-800 px-3 py-2">
                  <MapPin size={14} className="mr-1" />
                  {location}
                </Badge>
              </div>
            )}

            {/* Popular Destinations */}
            <div>
              <h3 className="font-semibold mb-4">Popular Destinations</h3>
              <div className="grid grid-cols-1 gap-3">
                {searchResults.map((destination) => (
                  <Card
                    key={destination.name}
                    className={`p-4 cursor-pointer transition-all ${
                      location === destination.name 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'hover:border-gray-300'
                    }`}
                    onClick={() => handleLocationSelect(destination.name)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MapPin size={18} className="text-blue-500 mr-3" />
                        <div>
                          <h4 className="font-semibold">{destination.name}</h4>
                          <p className="text-sm text-gray-500">{destination.type}</p>
                        </div>
                      </div>
                      {location === destination.name && (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
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