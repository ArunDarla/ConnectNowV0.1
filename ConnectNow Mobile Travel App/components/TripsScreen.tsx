import { Plus, Search, Filter, Calendar, Users, DollarSign, Vote } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface TripsScreenProps {
  onEventClick?: (eventData: any) => void;
}

export function TripsScreen({ onEventClick }: TripsScreenProps) {
  const trips = [
    {
      id: 1,
      title: 'Tokyo Adventure',
      destination: 'Tokyo, Japan',
      dates: 'Mar 15-22, 2025',
      budget: '$3,500',
      spent: '$1,200',
      members: [
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face'
      ],
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=200&fit=crop',
      status: 'active',
      pendingVotes: 2
    },
    {
      id: 2,
      title: 'Bali Retreat',
      destination: 'Bali, Indonesia',
      dates: 'Apr 5-12, 2025',
      budget: '$2,800',
      spent: '$400',
      members: [
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face'
      ],
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=200&fit=crop',
      status: 'planning',
      pendingVotes: 1
    },
    {
      id: 3,
      title: 'Paris Weekend',
      destination: 'Paris, France',
      dates: 'May 20-23, 2025',
      budget: '$1,500',
      spent: '$0',
      members: [
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face'
      ],
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=200&fit=crop',
      status: 'draft',
      pendingVotes: 0
    }
  ];

  const handleTripClick = (trip: typeof trips[0]) => {
    const eventData = {
      id: `trips-${trip.id}`, // Add prefix to avoid conflicts
      title: trip.title,
      destination: trip.destination,
      dates: trip.dates,
      members: trip.members.length,
      status: trip.status,
      category: 'travel',
      budget: parseInt(trip.budget.replace(/[^0-9]/g, '')),
    };
    onEventClick?.(eventData);
  };

  const renderTripCard = (trip: typeof trips[0]) => (
    <Card 
      key={trip.id} 
      className="p-0 mb-4 overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
      onClick={() => handleTripClick(trip)}
    >
      <div className="relative">
        <img 
          src={trip.image} 
          alt={trip.title}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {trip.pendingVotes > 0 && (
            <Badge variant="destructive" className="bg-red-500">
              <Vote size={12} className="mr-1" />
              {trip.pendingVotes} votes
            </Badge>
          )}
          <Badge variant={
            trip.status === 'active' ? 'default' : 
            trip.status === 'planning' ? 'secondary' : 'outline'
          }>
            {trip.status}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 right-3 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
          <h3 className="font-semibold">{trip.title}</h3>
          <p className="text-sm opacity-90">{trip.destination}</p>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={14} className="mr-1" />
            {trip.dates}
          </div>
          <div className="flex -space-x-2">
            {trip.members.map((member, index) => (
              <Avatar key={index} className="w-6 h-6 border-2 border-white">
                <img src={member} alt="Member" />
              </Avatar>
            ))}
            <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
              <span className="text-xs text-gray-600">+{trip.members.length}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-2 bg-green-50 rounded-lg">
            <div className="text-sm text-green-600 font-medium">{trip.budget}</div>
            <div className="text-xs text-gray-500">Budget</div>
          </div>
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-600 font-medium">{trip.spent}</div>
            <div className="text-xs text-gray-500">Spent</div>
          </div>
        </div>

        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => handleTripClick(trip)}
          >
            View Details
          </Button>
          <Button size="sm" variant="outline">
            <Users size={14} className="mr-1" />
            Invite
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">My Trips</h1>
          <Button size="sm">
            <Plus size={16} className="mr-1" />
            New Trip
          </Button>
        </div>
        
        {/* Search and Filter */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search trips..." 
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter size={16} />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 py-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="planning">Planning</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {trips.map(renderTripCard)}
          </TabsContent>
          
          <TabsContent value="active" className="space-y-4">
            {trips.filter(trip => trip.status === 'active').map(renderTripCard)}
          </TabsContent>
          
          <TabsContent value="planning" className="space-y-4">
            {trips.filter(trip => trip.status === 'planning').map(renderTripCard)}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            <div className="text-center py-8 text-gray-500">
              <Calendar size={48} className="mx-auto mb-4 opacity-50" />
              <p>No completed trips yet</p>
              <p className="text-sm">Your trip memories will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}