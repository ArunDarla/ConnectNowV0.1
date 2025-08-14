import { useState } from 'react';
import { ArrowLeft, Users, Settings, Calendar, MapPin, DollarSign, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { ContactInviteModal } from './ContactInviteModal';

interface PlanDashboardProps {
  eventData: any;
  onBack: () => void;
  onEventAddedToDashboard?: (eventData: any, invitationCount: number) => void;
}

export function PlanDashboard({ eventData, onBack, onEventAddedToDashboard }: PlanDashboardProps) {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [memberCount, setMemberCount] = useState(1); // Start with creator
  const categoryNames = {
    travel: 'Travel',
    party: 'Party',
    spiritual: 'Spiritual',
    business: 'Business',
    education: 'Education',
    personal: 'Personal Project',
    other: 'Other/Custom'
  };

  const formatDateRange = () => {
    if (eventData.dates.type === 'flexible') {
      return 'TBD/Flexible';
    }
    
    if (eventData.dates.type === 'single' && eventData.dates.startDate) {
      const dateStr = eventData.dates.startDate.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      return eventData.dates.time ? `${dateStr} at ${eventData.dates.time}` : dateStr;
    }
    
    if (eventData.dates.type === 'multi' && eventData.dates.startDate && eventData.dates.endDate) {
      return `${eventData.dates.startDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })} - ${eventData.dates.endDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })}`;
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

  const handleInviteSent = (invitationCount: number) => {
    // Update member count and add the event to the dashboard
    const newMemberCount = memberCount + invitationCount;
    setMemberCount(newMemberCount);
    
    if (onEventAddedToDashboard) {
      // Create enriched event data with member count
      const enrichedEventData = {
        ...eventData,
        memberCount: newMemberCount,
        invitationsSent: invitationCount,
        createdAt: new Date().toISOString()
      };
      onEventAddedToDashboard(enrichedEventData, invitationCount);
    }
    
    // Navigate back to dashboard after a short delay
    setTimeout(() => {
      onBack();
    }, 500);
  };



  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">Event Created!</h1>
            <p className="text-sm text-gray-500">Start planning together</p>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <Settings size={20} />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-6">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">🎉 Event Created!</h2>
          <p className="text-gray-600">Your event is ready. Start planning with your team.</p>
        </div>

        {/* Event Info Card */}
        <Card className="p-0 overflow-hidden mb-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{eventData.name}</h3>
                <Badge className="bg-white/20 text-white mb-4">
                  {categoryNames[eventData.category as keyof typeof categoryNames]}
                </Badge>
              </div>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Share2 size={18} />
              </Button>
            </div>
          </div>

          {/* Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4">
              {/* Location */}
              <div className="flex items-center">
                <MapPin size={18} className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-semibold">{eventData.location}</p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center">
                <Calendar size={18} className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="font-semibold">{formatDateRange()}</p>
                </div>
              </div>

              {/* Budget */}
              <div className="flex items-center">
                <DollarSign size={18} className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Budget</p>
                  <p className="font-semibold">{formatBudget()}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>



        {/* Members Section */}
        <Card className="p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Team Members</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowInviteModal(true)}
            >
              <Users size={16} className="mr-2" />
              Invite
            </Button>
          </div>
          
          <div className="flex items-center">
            <Avatar className="w-10 h-10 mr-3">
              <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face" alt="You" />
            </Avatar>
            <div>
              <p className="font-semibold">Sarah (You)</p>
              <p className="text-sm text-gray-500">Event Creator</p>
            </div>
          </div>
          
          {memberCount > 1 ? (
            <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-700 text-center">
                {memberCount - 1} member{memberCount - 1 !== 1 ? 's' : ''} invited successfully!
              </p>
            </div>
          ) : (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg text-center">
              <p className="text-sm text-gray-600">Invite team members to start planning together</p>
            </div>
          )}
        </Card>

        {/* Next Steps */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-3">Recommended Next Steps</h4>
          <div className="space-y-2 text-sm text-blue-700">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span>Invite team members to join the event</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span>Set up shared wallet for expense tracking</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span>Start planning activities and bookings</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span>Enable live location sharing</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Contact Invite Modal */}
      <ContactInviteModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        eventData={eventData}
        onInviteSent={handleInviteSent}
      />
    </div>
  );
}