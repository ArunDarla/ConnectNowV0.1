import { useState } from 'react';
import { ArrowLeft, Share2, MapPin, Calendar, DollarSign, Users, Check, Clock, X, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar } from './ui/avatar';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { ContactInviteModal } from './ContactInviteModal';

interface Member {
  id: string;
  name: string;
  photo?: string;
  status: 'accepted' | 'tentative' | 'rejected' | 'postpone' | 'pending';
  joinedAt?: string;
}

interface EventDetailsProps {
  eventData: any;
  onBack: () => void;
  members: Member[];
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'accepted':
      return {
        label: 'Accepted',
        variant: 'default' as const,
        className: 'bg-green-100 text-green-800 border-green-200',
        icon: Check
      };
    case 'tentative':
      return {
        label: 'Tentative',
        variant: 'secondary' as const,
        className: 'bg-orange-100 text-orange-800 border-orange-200',
        icon: Clock
      };
    case 'rejected':
      return {
        label: 'Rejected',
        variant: 'destructive' as const,
        className: 'bg-red-100 text-red-800 border-red-200',
        icon: X
      };
    case 'postpone':
      return {
        label: 'Postpone',
        variant: 'outline' as const,
        className: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: AlertCircle
      };
    default:
      return {
        label: 'Pending',
        variant: 'outline' as const,
        className: 'bg-gray-100 text-gray-600 border-gray-200',
        icon: Clock
      };
  }
};

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'trip':
      return '🎒';
    case 'party':
      return '🎉';
    case 'meeting':
      return '💼';
    case 'dinner':
      return '🍽️';
    case 'concert':
      return '🎵';
    case 'sports':
      return '⚽';
    default:
      return '📅';
  }
};

export function EventDetailsScreen({ eventData, onBack, members }: EventDetailsProps) {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: eventData.name,
          text: `Join me for ${eventData.name} at ${eventData.location}!`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleInviteSent = (invitationCount: number) => {
    // Handle invitation success - could update member count here
    setShowInviteModal(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b pt-safe-area">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1 text-center">
            <div className="flex items-center justify-center">
              <span className="text-2xl mr-2">{getCategoryIcon(eventData.category)}</span>
              <h1 className="font-semibold text-lg">{eventData.name}</h1>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 size={20} />
          </Button>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Event Details Section */}
          <Card className="p-4">
            <h2 className="font-semibold mb-4">Event Details</h2>
            
            <div className="space-y-3">
              {/* Location */}
              <div className="flex items-start">
                <MapPin size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-gray-600 text-sm">{eventData.location}</p>
                </div>
              </div>

              {/* Dates */}
              <div className="flex items-start">
                <Calendar size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium">Date & Time</p>
                  <p className="text-gray-600 text-sm">
                    {formatDate(eventData.startDate)}
                    {eventData.endDate && eventData.endDate !== eventData.startDate && (
                      <> - {formatDate(eventData.endDate)}</>
                    )}
                  </p>
                </div>
              </div>

              {/* Budget */}
              {eventData.budget && (
                <div className="flex items-start">
                  <DollarSign size={18} className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Budget</p>
                    <p className="text-gray-600 text-sm">{formatCurrency(eventData.budget)} per person</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            {eventData.description && (
              <div className="mt-4 pt-4 border-t">
                <p className="font-medium mb-2">Description</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {eventData.description}
                </p>
              </div>
            )}
          </Card>

          {/* Members Section */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Members & Status</h2>
              <div className="flex items-center text-sm text-gray-500">
                <Users size={16} className="mr-1" />
                {members.length} member{members.length !== 1 ? 's' : ''}
              </div>
            </div>

            <div className="space-y-3">
              {members.length === 0 ? (
                <div className="text-center py-8">
                  <Users size={32} className="text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">No members yet</p>
                  <p className="text-sm text-gray-400">Invite friends to join your event</p>
                </div>
              ) : (
                members.map((member) => {
                  const statusConfig = getStatusConfig(member.status);
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Avatar className="w-10 h-10 mr-3">
                          {member.photo ? (
                            <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500 font-medium text-sm">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          )}
                        </Avatar>
                        
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          {member.joinedAt && (
                            <p className="text-xs text-gray-500">
                              Joined {new Date(member.joinedAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <Badge 
                        variant={statusConfig.variant}
                        className={`${statusConfig.className} flex items-center px-2 py-1`}
                      >
                        <StatusIcon size={12} className="mr-1" />
                        {statusConfig.label}
                      </Badge>
                    </div>
                  );
                })
              )}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3 pb-8">
            <Button 
              className="w-full h-12 bg-blue-600 hover:bg-blue-700"
              onClick={() => setShowInviteModal(true)}
            >
              <Users size={18} className="mr-2" />
              Invite More Members
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-12">
                <MapPin size={18} className="mr-2" />
                View Location
              </Button>
              <Button variant="outline" className="h-12" onClick={handleShare}>
                <Share2 size={18} className="mr-2" />
                Share Event
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>

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