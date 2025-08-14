import { useState } from 'react';
import { ArrowLeft, ChevronDown, Lightbulb, MapPin, Calendar, Clock, DollarSign, Info, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ScrollArea } from '../ui/scroll-area';
import { Switch } from '../ui/switch';
import { EventData } from '../EventCreationFlow';

interface SingleEventFormProps {
  eventData: EventData;
  updateEventData: (updates: Partial<EventData>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export function SingleEventForm({ eventData, updateEventData, onNext, onBack, currentStep, totalSteps }: SingleEventFormProps) {
  // Form state
  const [category, setCategory] = useState(eventData.category);
  const [name, setName] = useState(eventData.name);
  const [location, setLocation] = useState(eventData.location);
  const [startDate, setStartDate] = useState(
    eventData.dates.startDate ? eventData.dates.startDate.toISOString().split('T')[0] : ''
  );
  const [endDate, setEndDate] = useState(
    eventData.dates.endDate ? eventData.dates.endDate.toISOString().split('T')[0] : ''
  );
  const [time, setTime] = useState(eventData.dates.time || '');
  const [isDateTBD, setIsDateTBD] = useState(eventData.dates.type === 'flexible');
  const [budgetAmount, setBudgetAmount] = useState(eventData.budget.amount?.toString() || '');
  const [currency, setCurrency] = useState(eventData.budget.currency);
  const [isBudgetFlexible, setIsBudgetFlexible] = useState(eventData.budget.flexible);

  // Dropdown states
  const [showEventTypeDropdown, setShowEventTypeDropdown] = useState(false);
  const [showNameSuggestions, setShowNameSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [locationSearchMode, setLocationSearchMode] = useState(false);
  const [locationSearchQuery, setLocationSearchQuery] = useState('');

  // Data arrays
  const eventTypes = [
    { id: 'travel', name: 'Travel', emoji: '🎒', subtitle: 'Leisure, Adventure, Road Trip' },
    { id: 'party', name: 'Party', emoji: '🎉', subtitle: 'Birthday, Anniversary, Wedding' },
    { id: 'spiritual', name: 'Spiritual', emoji: '🕉', subtitle: 'Temple Visit, Yoga Retreat' },
    { id: 'business', name: 'Business', emoji: '💼', subtitle: 'Conference, Team Building' },
    { id: 'education', name: 'Education', emoji: '📚', subtitle: 'Study Tour, Course' },
    { id: 'personal', name: 'Personal Project', emoji: '🛠', subtitle: 'DIY, Volunteering' },
    { id: 'other', name: 'Other/Custom', emoji: '✏', subtitle: 'Free text option' }
  ];

  const nameSuggestions = [
    'Goa Adventure 2025',
    'Sharma Family Wedding',
    'Bangalore Office Retreat',
    'Hyderabad Food Tour',
    'Puri Jagannath Pilgrimage',
    'Team Building Weekend',
    'College Reunion 2025',
    'Annual Family Trip'
  ];

  const popularDestinations = [
    'Goa, India',
    'Jaipur, India',
    'Manali, India',
    'Dubai, UAE',
    'London, UK',
    'Mumbai, India',
    'Delhi, India',
    'Bangalore, India'
  ];

  const searchDestinations = [
    { name: 'Mumbai, Maharashtra', type: 'City', country: 'India' },
    { name: 'Delhi, India', type: 'City', country: 'India' },
    { name: 'Goa, India', type: 'State', country: 'India' },
    { name: 'Bangalore, Karnataka', type: 'City', country: 'India' },
    { name: 'Manali, Himachal Pradesh', type: 'Hill Station', country: 'India' },
    { name: 'Dubai, UAE', type: 'City', country: 'UAE' },
    { name: 'London, UK', type: 'City', country: 'UK' },
    { name: 'Singapore', type: 'City-State', country: 'Singapore' }
  ];

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

  // Helper functions
  const getSelectedEventType = () => {
    return eventTypes.find(type => type.id === category);
  };

  const filteredSearchDestinations = locationSearchQuery 
    ? searchDestinations.filter(dest => 
        dest.name.toLowerCase().includes(locationSearchQuery.toLowerCase())
      )
    : searchDestinations;

  const categoryHints = budgetHints[category as keyof typeof budgetHints] || budgetHints.travel;

  // Event handlers
  const handleEventTypeSelect = (typeId: string) => {
    setCategory(typeId);
    updateEventData({ category: typeId });
    setShowEventTypeDropdown(false);
  };

  const handleNameSuggestionSelect = (suggestion: string) => {
    setName(suggestion);
    updateEventData({ name: suggestion });
    setShowNameSuggestions(false);
  };

  const handleLocationSuggestionSelect = (destination: string) => {
    setLocation(destination);
    updateEventData({ location: destination });
    setShowLocationSuggestions(false);
  };

  const handleLocationSearchSelect = (destination: string) => {
    setLocation(destination);
    updateEventData({ location: destination });
    setLocationSearchMode(false);
    setLocationSearchQuery('');
  };

  const handleLocationInputFocus = () => {
    setLocationSearchMode(true);
    setLocationSearchQuery(location);
  };

  const handleLocationInputChange = (value: string) => {
    setLocation(value);
    setLocationSearchQuery(value);
    updateEventData({ location: value });
  };

  const handleDateTBDToggle = (checked: boolean) => {
    setIsDateTBD(checked);
    if (checked) {
      updateEventData({ 
        dates: { 
          ...eventData.dates, 
          type: 'flexible',
          startDate: undefined,
          endDate: undefined
        } 
      });
    } else {
      updateEventData({ 
        dates: { 
          ...eventData.dates, 
          type: 'single'
        } 
      });
    }
  };

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
    updateEventData({ 
      dates: { 
        ...eventData.dates, 
        type: endDate ? 'multi' : 'single',
        startDate: value ? new Date(value) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        time: time
      } 
    });
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
    updateEventData({ 
      dates: { 
        ...eventData.dates, 
        type: value ? 'multi' : 'single',
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: value ? new Date(value) : undefined,
        time: time
      } 
    });
  };

  const handleBudgetFlexibleToggle = (checked: boolean) => {
    setIsBudgetFlexible(checked);
    updateEventData({ 
      budget: { 
        ...eventData.budget, 
        flexible: checked,
        amount: checked ? undefined : parseFloat(budgetAmount) || undefined
      } 
    });
  };

  const handleBudgetAmountChange = (value: string) => {
    setBudgetAmount(value);
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

  const canProceed = category && name.trim().length > 0 && location.trim().length > 0 && 
    (isDateTBD || startDate) && (isBudgetFlexible || budgetAmount.trim().length > 0);

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">Create New Event</h1>
            <p className="text-sm text-gray-500">Fill in the details below</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="px-4 py-6 space-y-8">
          
          {/* 1. Event Type Selection */}
          <div>
            <h2 className="text-xl font-bold mb-4">What type of event is this?</h2>
            <div className="relative">
              <button
                onClick={() => setShowEventTypeDropdown(!showEventTypeDropdown)}
                className="w-full h-12 px-4 bg-white border border-gray-200 rounded-lg flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span className={getSelectedEventType() ? 'text-gray-900' : 'text-gray-500'}>
                  {getSelectedEventType() ? (
                    <span className="flex items-center">
                      <span className="mr-2">{getSelectedEventType()?.emoji}</span>
                      {getSelectedEventType()?.name}
                    </span>
                  ) : 'Select Event Type'}
                </span>
                <ChevronDown size={20} className="text-gray-400" />
              </button>

              {showEventTypeDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                  {eventTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleEventTypeSelect(type.id)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center">
                        <span className="mr-3">{type.emoji}</span>
                        <div>
                          <div className="font-medium text-gray-900">{type.name}</div>
                          <div className="text-sm text-gray-500">{type.subtitle}</div>
                        </div>
                      </div>
                      {category === type.id && (
                        <Check size={16} className="text-blue-500" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 2. Event Name */}
          <div>
            <h2 className="text-xl font-bold mb-4">What's your event called?</h2>
            <div className="relative">
              <Input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  updateEventData({ name: e.target.value });
                }}
                placeholder="Enter Event Name"
                className="text-lg h-12 border-2 focus:border-blue-500 pr-12"
              />
              <button
                onClick={() => setShowNameSuggestions(!showNameSuggestions)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-blue-500 hover:bg-blue-50 rounded"
              >
                <Lightbulb size={20} />
              </button>

              {showNameSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-40 max-h-48 overflow-y-auto">
                  {nameSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleNameSuggestionSelect(suggestion)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 3. Location */}
          <div>
            <h2 className="text-xl font-bold mb-4">Where is the event?</h2>
            <div className="relative">
              <Input
                value={location}
                onChange={(e) => handleLocationInputChange(e.target.value)}
                onFocus={handleLocationInputFocus}
                placeholder="Enter Location"
                className="text-lg h-12 border-2 focus:border-blue-500 pr-12"
              />
              <button
                onClick={() => setShowLocationSuggestions(!showLocationSuggestions)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-blue-500 hover:bg-blue-50 rounded"
              >
                <MapPin size={20} />
              </button>

              {/* Popular Destinations Dropdown */}
              {showLocationSuggestions && !locationSearchMode && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-40 max-h-48 overflow-y-auto">
                  {popularDestinations.map((destination, index) => (
                    <button
                      key={index}
                      onClick={() => handleLocationSuggestionSelect(destination)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center"
                    >
                      <MapPin size={16} className="text-gray-400 mr-3" />
                      {destination}
                    </button>
                  ))}
                </div>
              )}

              {/* Search Results Dropdown */}
              {locationSearchMode && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-40 max-h-48 overflow-y-auto">
                  {filteredSearchDestinations.map((destination, index) => (
                    <button
                      key={index}
                      onClick={() => handleLocationSearchSelect(destination.name)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center"
                    >
                      <div className="w-8 h-6 bg-gray-100 rounded mr-3 flex items-center justify-center">
                        <MapPin size={12} className="text-gray-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{destination.name}</div>
                        <div className="text-sm text-gray-500">{destination.type}, {destination.country}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 4. When is your event */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">When is your event?</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Dates To Be Decided</span>
                <Switch
                  checked={isDateTBD}
                  onCheckedChange={handleDateTBDToggle}
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => handleStartDateChange(e.target.value)}
                  disabled={isDateTBD}
                  className={`h-12 ${isDateTBD ? 'bg-gray-100 text-gray-400' : ''}`}
                  placeholder="Select Start Date"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date (Optional)</label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => handleEndDateChange(e.target.value)}
                  disabled={isDateTBD}
                  min={startDate}
                  className={`h-12 ${isDateTBD ? 'bg-gray-100 text-gray-400' : ''}`}
                  placeholder="Select End Date"
                />
              </div>
            </div>

            {/* Time Input for events */}
            {!isDateTBD && (
              <div className="mt-4">
                <div className="flex items-center mb-2">
                  <Clock size={18} className="text-blue-500 mr-2" />
                  <label className="text-sm font-medium text-gray-700">Event Time (Optional)</label>
                </div>
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="h-12"
                />
              </div>
            )}
          </div>

          {/* 5. Budget Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">What's your budget?</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Flexible Budget</span>
                <Switch
                  checked={isBudgetFlexible}
                  onCheckedChange={handleBudgetFlexibleToggle}
                />
              </div>
            </div>

            {!isBudgetFlexible && (
              <>
                {/* Budget Input */}
                <div className="mb-4">
                  <div className="flex gap-3">
                    <div className="w-28">
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
                    <div className="flex-1">
                      <Input
                        type="number"
                        value={budgetAmount}
                        onChange={(e) => handleBudgetAmountChange(e.target.value)}
                        placeholder="Enter amount"
                        className="text-lg h-12 border-2 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Budget Hints */}
                {category && (
                  <Card className="p-3 bg-blue-50 border-blue-200">
                    <div className="flex items-start">
                      <Info size={14} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-2 text-sm">Budget Estimates</h4>
                        <div className="space-y-1 text-xs text-blue-700">
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
                )}
              </>
            )}
          </div>

        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="bg-white border-t px-4 py-4">
        <Button 
          onClick={onNext}
          disabled={!canProceed}
          className="w-full h-12"
        >
          Review & Create Event
        </Button>
      </div>

      {/* Overlay to close dropdowns */}
      {(showEventTypeDropdown || showNameSuggestions || showLocationSuggestions || locationSearchMode) && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => {
            setShowEventTypeDropdown(false);
            setShowNameSuggestions(false);
            setShowLocationSuggestions(false);
            setLocationSearchMode(false);
          }}
        />
      )}
    </div>
  );
}