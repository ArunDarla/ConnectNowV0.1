import { Plus, Calendar, Users, MapPin, Zap, Bell, Navigation, Circle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar } from './ui/avatar';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

interface DashboardProps {
  onCreateEvent?: () => void;
  events?: any[];
  onEventClick?: (eventData: any) => void;
}

export function Dashboard({ onCreateEvent, events = [], onEventClick }: DashboardProps) {
  const upcomingTrips = [
    {
      id: 'static-upcoming-1',
      title: 'Tokyo Adventure',
      destination: 'Tokyo, Japan',
      dates: 'Mar 15-22, 2025',
      members: 4,
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=200&fit=crop',
      status: 'active'
    },
    {
      id: 'static-upcoming-2',
      title: 'Bali Retreat',
      destination: 'Bali, Indonesia',
      dates: 'Apr 5-12, 2025',
      members: 6,
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=200&fit=crop',
      status: 'planning'
    },
    {
      id: 'static-upcoming-3',
      title: 'Paris Weekend',
      destination: 'Paris, France',
      dates: 'May 20-23, 2025',
      members: 2,
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=200&fit=crop',
      status: 'upcoming'
    }
  ];

  const formatEventForDisplay = (eventData: any) => {
    const formatDateRange = () => {
      if (eventData.dates.type === 'flexible') {
        return 'TBD';
      }
      
      if (eventData.dates.type === 'single' && eventData.dates.startDate) {
        return eventData.dates.startDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
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

    // Get appropriate image based on category
    const categoryImages = {
      travel: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=200&fit=crop',
      party: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=200&fit=crop',
      spiritual: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop',
      business: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop',
      education: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=200&fit=crop',
      personal: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=200&fit=crop',
      other: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=200&fit=crop'
    };

    // Use existing ID if available, otherwise generate a unique one
    const uniqueId = eventData.id || `created-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      id: uniqueId,
      title: eventData.name,
      destination: eventData.location,
      dates: formatDateRange(),
      members: eventData.memberCount || 1, // Use the member count from invitations
      image: categoryImages[eventData.category as keyof typeof categoryImages] || categoryImages.other,
      status: 'planning',
      isNewTrip: eventData.createdAt && new Date(eventData.createdAt) > new Date(Date.now() - 60000) // Created within last minute
    };
  };

  // Combine created events with existing trips - show new trips first
  const formattedEvents = events.map(formatEventForDisplay);
  const allTrips = [...formattedEvents, ...upcomingTrips];

  const quickActions = [
    { icon: Plus, label: 'New Event', color: 'bg-blue-500', action: onCreateEvent },
    { icon: Calendar, label: 'Active Trips', color: 'bg-green-500' },
    { icon: Users, label: 'Groups', color: 'bg-purple-500' },
    { icon: Zap, label: 'AI Suggest', color: 'bg-orange-500' }
  ];

  const runningEvent = {
    title: 'Tokyo Adventure',
    currentLocation: 'Shibuya Crossing, Tokyo',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=200&fit=crop',
    status: 'running'
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Fixed Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 pt-12 pb-6 text-white flex-shrink-0 overflow-hidden touch-none select-none">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Good morning, Sarah! 👋</h1>
            <p className="text-blue-100 mt-1">Ready for your next adventure?</p>
          </div>
          <div className="relative">
            <Bell size={24} className="text-white" />
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">3</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className="flex flex-col items-center p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all"
              >
                <div className={`p-2 rounded-lg ${action.color} mb-2`}>
                  <Icon size={20} className="text-white" />
                </div>
                <span className="text-xs text-center">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scrollable Content Area */}
      <ScrollArea className="flex-1 pb-20">
        {/* Running Event Section */}
        <div className="px-4 py-4">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold mr-3">Current Trip</h2>
              <Badge className="bg-green-500 text-white">
                <Circle size={8} className="mr-1 fill-current" />
                Running
              </Badge>
            </div>
          </div>

          <Card className="p-0 overflow-hidden">
            {/* Image Section - Reduced Height */}
            <div className="relative">
              <img 
                src={runningEvent.image} 
                alt={runningEvent.title}
                className="w-full h-32 object-cover"
              />
              <div className="absolute top-3 right-3">
                <Badge className="bg-green-500 text-white">
                  <Circle size={8} className="mr-1 fill-current" />
                  Live
                </Badge>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4">
              {/* Two Column Layout */}
              <div className="flex gap-4">
                {/* Left Side - Trip Schedule Details */}
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{runningEvent.title}</h3>
                  
                  {/* Trip Info */}
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <MapPin size={14} className="mr-1" />
                    Tokyo, Japan
                  </div>
                  
                  {/* Schedule Items */}
                  <div className="space-y-2">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Today's Schedule</div>
                    <div className="space-y-2 max-h-32 overflow-y-auto scrollbar-hide">
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <div>
                          <p className="font-medium">Currently at Shibuya</p>
                          <p className="text-xs text-gray-500">9:30 AM - 11:00 AM</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                        <div>
                          <p>Meiji Shrine Visit</p>
                          <p className="text-xs">11:30 AM - 1:00 PM</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                        <div>
                          <p>Lunch at Harajuku</p>
                          <p className="text-xs">1:30 PM - 3:00 PM</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                        <div>
                          <p>Shopping in Ginza</p>
                          <p className="text-xs">3:30 PM - 5:00 PM</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                        <div>
                          <p>Tokyo Skytree Visit</p>
                          <p className="text-xs">5:30 PM - 7:00 PM</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                        <div>
                          <p>Dinner at Roppongi</p>
                          <p className="text-xs">7:30 PM - 9:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Members */}
                  <div className="flex items-center mt-3">
                    <Users size={14} className="mr-1 text-gray-400" />
                    <span className="text-sm text-gray-600">4 members</span>
                  </div>
                </div>

                {/* Right Side - Map with Location Details */}
                <div className="w-32 flex flex-col items-center">
                  {/* Navigation Icon */}
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mb-2 shadow-lg">
                    <MapPin size={14} className="text-white" />
                  </div>
                  
                  {/* Current Location */}
                  <div className="text-center mb-3">
                    <div className="flex items-center justify-center mb-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                      <span className="text-xs font-medium text-gray-800">Live Location</span>
                    </div>
                    <p className="text-xs text-gray-600 text-center leading-tight">
                      {runningEvent.currentLocation}
                    </p>
                  </div>
                  
                  {/* Map Visualization */}
                  <div className="w-24 h-16 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border relative overflow-hidden">
                    <svg className="w-full h-full opacity-40" viewBox="0 0 96 64">
                      <defs>
                        <pattern id="mapGrid" width="12" height="12" patternUnits="userSpaceOnUse">
                          <path d="M 12 0 L 0 0 0 12" fill="none" stroke="#3b82f6" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#mapGrid)" />
                      <circle cx="48" cy="32" r="3" fill="#10b981" className="animate-pulse" />
                      <circle cx="30" cy="20" r="1.5" fill="#6b7280" />
                      <circle cx="65" cy="45" r="1.5" fill="#6b7280" />
                      <path d="M 20 50 Q 48 20 76 35" stroke="#3b82f6" strokeWidth="1" fill="none" strokeDasharray="2,1" />
                    </svg>
                    
                    {/* User Location Dot */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg animate-ping"></div>
                      <div className="absolute top-0 left-0 w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-2 text-center">
                    Updated 2m ago
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Upcoming Trips */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Upcoming Events</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>

          <div className="space-y-4">
            {allTrips.map((trip) => (
              <Card 
                key={trip.id} 
                className={`p-0 overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] ${trip.isNewTrip ? 'ring-2 ring-green-200 shadow-lg' : ''}`}
                onClick={() => onEventClick?.(trip)}
              >
                <div className="relative">
                  <img 
                    src={trip.image} 
                    alt={trip.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    {trip.isNewTrip && (
                      <Badge className="bg-green-500 text-white animate-pulse">
                        New!
                      </Badge>
                    )}
                    <Badge variant={trip.status === 'active' ? 'default' : 'secondary'}>
                      {trip.status === 'active' ? 'Active' : trip.status === 'planning' ? 'Planning' : 'Upcoming'}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold flex-1">{trip.title}</h3>
                    {trip.isNewTrip && (
                      <Badge variant="outline" className="text-green-600 border-green-300 ml-2">
                        Just Created
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin size={14} className="mr-1" />
                    {trip.destination}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{trip.dates}</span>
                    <div className="flex items-center">
                      <Users size={14} className="mr-1 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {trip.members} member{trip.members !== 1 ? 's' : ''}
                        {trip.isNewTrip && trip.members > 1 && (
                          <span className="text-green-600 ml-1">
                            ({trip.members - 1} invited)
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            
            {/* Additional Events for Scrolling Demo */}
            <Card 
              className="p-0 overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
              onClick={() => onEventClick?.({
                id: 'static-additional-1',
                title: 'Mountain Adventure',
                destination: 'Swiss Alps, Switzerland',
                dates: 'Jun 10-17, 2025',
                members: 3,
                status: 'draft',
                category: 'travel'
              })}
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop" 
                  alt="Mountain Adventure"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="outline">Draft</Badge>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">Mountain Adventure</h3>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <MapPin size={14} className="mr-1" />
                  Swiss Alps, Switzerland
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Jun 10-17, 2025</span>
                  <div className="flex items-center">
                    <Users size={14} className="mr-1 text-gray-400" />
                    <span className="text-sm text-gray-600">3 members</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card 
              className="p-0 overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
              onClick={() => onEventClick?.({
                id: 'static-additional-2',
                title: 'Beach Getaway',
                destination: 'Maldives',
                dates: 'Jul 5-12, 2025',
                members: 5,
                status: 'planning',
                category: 'travel'
              })}
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=200&fit=crop" 
                  alt="Beach Getaway"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary">Planning</Badge>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">Beach Getaway</h3>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <MapPin size={14} className="mr-1" />
                  Maldives
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Jul 5-12, 2025</span>
                  <div className="flex items-center">
                    <Users size={14} className="mr-1 text-gray-400" />
                    <span className="text-sm text-gray-600">5 members</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-white rounded-lg border">
              <Avatar className="w-10 h-10 mr-3">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face" alt="User" />
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">Emma</span> added hotel booking to Tokyo Adventure
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white rounded-lg border">
              <Avatar className="w-10 h-10 mr-3">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" alt="User" />
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">Alex</span> voted on restaurant for Bali Retreat
                </p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white rounded-lg border">
              <Avatar className="w-10 h-10 mr-3">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face" alt="User" />
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">Sophie</span> shared photos from Paris Weekend
                </p>
                <p className="text-xs text-gray-500">8 hours ago</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white rounded-lg border">
              <Avatar className="w-10 h-10 mr-3">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" alt="User" />
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">James</span> created expense for group dinner
                </p>
                <p className="text-xs text-gray-500">12 hours ago</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white rounded-lg border">
              <Avatar className="w-10 h-10 mr-3">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face" alt="User" />
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">Maria</span> updated Tokyo Adventure itinerary
                </p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </ScrollArea>
    </div>
  );
}