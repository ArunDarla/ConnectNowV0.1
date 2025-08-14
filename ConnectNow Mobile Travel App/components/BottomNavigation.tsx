import { Home, MapPin, Wallet, MessageCircle, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'trips', icon: MapPin, label: 'Trips' },
    { id: 'wallet', icon: Wallet, label: 'Wallet' },
    { id: 'chat', icon: MessageCircle, label: 'Chat' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 pb-safe-area">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={20} className={isActive ? 'mb-1' : 'mb-1'} />
              <span className={`text-xs ${isActive ? 'block' : 'hidden sm:block'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}