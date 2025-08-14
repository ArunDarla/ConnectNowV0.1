import { useState } from 'react';
import { BottomNavigation } from './components/BottomNavigation';
import { Dashboard } from './components/Dashboard';
import { TripsScreen } from './components/TripsScreen';
import { WalletScreen } from './components/WalletScreen';
import { ChatScreen } from './components/ChatScreen';
import { EventCreationFlow } from './components/EventCreationFlow';
import { PlanDashboard } from './components/PlanDashboard';
import { EventDetailsScreen } from './components/EventDetailsScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentScreen, setCurrentScreen] = useState('main'); // 'main', 'create-event', 'plan-dashboard', 'event-details'
  const [createdEvent, setCreatedEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dashboardEvents, setDashboardEvents] = useState([]);

  // Mock member data for events
  const getMockMembersForEvent = (eventId: string, memberCount: number = 1) => {
    const allMembers = [
      {
        id: '1',
        name: 'Sarah Johnson (You)',
        photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
        status: 'accepted' as const,
        joinedAt: new Date().toISOString()
      },
      {
        id: '2', 
        name: 'Raj Sharma',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        status: 'accepted' as const,
        joinedAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
      },
      {
        id: '3',
        name: 'Priya Patel', 
        photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
        status: 'tentative' as const,
        joinedAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
      },
      {
        id: '4',
        name: 'Vikram Singh',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face', 
        status: 'pending' as const,
        joinedAt: new Date(Date.now() - 259200000).toISOString() // 3 days ago
      },
      {
        id: '5',
        name: 'Anita Kumar',
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
        status: 'rejected' as const,
        joinedAt: new Date(Date.now() - 345600000).toISOString() // 4 days ago
      },
      {
        id: '6',
        name: 'Rohit Gupta',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
        status: 'postpone' as const,
        joinedAt: new Date(Date.now() - 432000000).toISOString() // 5 days ago
      }
    ];
    
    return allMembers.slice(0, memberCount);
  };

  const handleCreateEvent = () => {
    setCurrentScreen('create-event');
  };

  const handleEventCreated = (eventData) => {
    setCreatedEvent(eventData);
    setCurrentScreen('plan-dashboard');
  };

  const handleBackToMain = () => {
    setCurrentScreen('main');
    setActiveTab('home');
    setSelectedEvent(null);
  };

  const handleEventAddedToDashboard = (eventData, invitationCount) => {
    setDashboardEvents(prev => [...prev, eventData]);
    // Auto navigate back to dashboard and select the home tab to show the new trip
    setCurrentScreen('main');
    setActiveTab('home');
  };

  const handleEventClick = (eventData) => {
    // Convert dashboard event format to event details format
    const detailsEventData = {
      name: eventData.title,
      location: eventData.destination,
      startDate: eventData.dates,
      endDate: eventData.dates,
      budget: eventData.budget || 50000,
      description: eventData.description || `Join us for an amazing ${eventData.title.toLowerCase()} experience! This will be an unforgettable journey with great company and exciting adventures.`,
      category: eventData.category || 'trip'
    };
    
    setSelectedEvent({
      ...detailsEventData,
      members: getMockMembersForEvent(eventData.id, eventData.members || 1)
    });
    setCurrentScreen('event-details');
  };

  const renderMainScreen = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard onCreateEvent={handleCreateEvent} events={dashboardEvents} onEventClick={handleEventClick} />;
      case 'trips':
        return <TripsScreen onEventClick={handleEventClick} />;
      case 'wallet':
        return <WalletScreen />;
      case 'chat':
        return <ChatScreen />;
      case 'profile':
        return (
          <div className="flex-1 flex items-center justify-center pb-20 bg-gray-50">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Profile</h2>
              <p className="text-gray-600">Profile screen coming soon...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard onCreateEvent={handleCreateEvent} events={dashboardEvents} onEventClick={handleEventClick} />;
    }
  };

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'create-event':
        return (
          <EventCreationFlow 
            onEventCreated={handleEventCreated}
            onBack={handleBackToMain}
          />
        );
      case 'plan-dashboard':
        return (
          <PlanDashboard 
            eventData={createdEvent}
            onBack={handleBackToMain}
            onEventAddedToDashboard={handleEventAddedToDashboard}
          />
        );
      case 'event-details':
        return (
          <EventDetailsScreen
            eventData={selectedEvent}
            onBack={handleBackToMain}
            members={selectedEvent?.members || []}
          />
        );
      default:
        return renderMainScreen();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 max-w-md mx-auto relative">
      {/* Main Content */}
      <div className="flex-1">
        {renderActiveScreen()}
      </div>
      
      {/* Bottom Navigation - Hide during event creation and event details */}
      {currentScreen === 'main' && (
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </div>
  );
}