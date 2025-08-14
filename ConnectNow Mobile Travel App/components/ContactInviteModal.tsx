import { useState, useMemo } from 'react';
import { X, Phone, MessageCircle, Send, Check, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar } from './ui/avatar';
import { Checkbox } from './ui/checkbox';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';

interface Contact {
  id: string;
  name: string;
  phone: string;
  photo?: string;
  hasConnectNow?: boolean;
}

interface ContactInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventData: any;
  onInviteSent: (invitationCount: number) => void;
}

export function ContactInviteModal({ isOpen, onClose, eventData, onInviteSent }: ContactInviteModalProps) {
  // Mock contact data
  const [contacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Raj Sharma',
      phone: '+91 98765 43210',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      hasConnectNow: true
    },
    {
      id: '2',
      name: 'Priya Patel',
      phone: '+91 87654 32109',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      hasConnectNow: true
    },
    {
      id: '3',
      name: 'Vikram Singh',
      phone: '+91 76543 21098',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      hasConnectNow: false
    },
    {
      id: '4',
      name: 'Anita Kumar',
      phone: '+91 65432 10987',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      hasConnectNow: true
    },
    {
      id: '5',
      name: 'Rohit Gupta',
      phone: '+91 54321 09876',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      hasConnectNow: false
    },
    {
      id: '6',
      name: 'Meera Reddy',
      phone: '+91 43210 98765',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      hasConnectNow: true
    },
    {
      id: '7',
      name: 'Arjun Nair',
      phone: '+91 32109 87654',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
      hasConnectNow: false
    },
    {
      id: '8',
      name: 'Kavya Iyer',
      phone: '+91 21098 76543',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
      hasConnectNow: true
    }
  ]);

  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());
  const [isInviting, setIsInviting] = useState(false);
  const [invitationSent, setInvitationSent] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleContactToggle = (contactId: string) => {
    const newSelected = new Set(selectedContacts);
    if (newSelected.has(contactId)) {
      newSelected.delete(contactId);
    } else {
      newSelected.add(contactId);
    }
    setSelectedContacts(newSelected);
  };

  // Filter contacts based on search query
  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) return contacts;
    
    const query = searchQuery.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(query) ||
      contact.phone.replace(/\D/g, '').includes(query.replace(/\D/g, ''))
    );
  }, [contacts, searchQuery]);

  const handleClose = () => {
    setSearchQuery('');
    setSelectedContacts(new Set());
    onClose();
  };

  const generateInviteLink = () => {
    const eventId = Math.random().toString(36).substr(2, 9);
    return `https://connectnow.app/join/${eventId}`;
  };

  const handleSendInvitations = async () => {
    setIsInviting(true);
    
    // Simulate API calls
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const selectedContactsList = contacts.filter(c => selectedContacts.has(c.id));
    const inviteLink = generateInviteLink();
    
    selectedContactsList.forEach(contact => {
      if (contact.hasConnectNow) {
        // Mock ConnectNow app invitation
        console.log(`Sending ConnectNow invite to ${contact.name}: ${inviteLink}`);
      } else {
        // Mock WhatsApp invitation with deep link
        const whatsappMessage = `🎉 You're invited to ${eventData.name}!\n\nJoin us at ${eventData.location} for an amazing time!\n\nTap to join: ${inviteLink}`;
        const whatsappUrl = `https://wa.me/${contact.phone.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
        console.log(`Sending WhatsApp invite to ${contact.name}: ${whatsappUrl}`);
      }
    });
    
    setIsInviting(false);
    setInvitationSent(true);
    
    // Close modal after 3 seconds and trigger callback with invitation count
    setTimeout(() => {
      onInviteSent(selectedContacts.size);
      onClose();
      setInvitationSent(false);
      setSelectedContacts(new Set());
      setSearchQuery(''); // Reset search
    }, 3000);
  };

  if (!isOpen) return null;

  if (invitationSent) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-sm p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Invitations Sent!</h3>
          <p className="text-gray-600 mb-2">
            {selectedContacts.size} invitation{selectedContacts.size !== 1 ? 's' : ''} sent successfully
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to dashboard...
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
      <Card className="w-full max-w-md bg-white rounded-t-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Invite to Event</h3>
            <p className="text-sm text-gray-500">{eventData.name}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X size={20} />
          </Button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search Contacts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg h-12"
            />
          </div>
        </div>

        {/* Contact List - Scrollable area */}
        <div className="flex-1 min-h-0 overflow-hidden relative">
          {/* Scroll gradient indicators */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
          
          <ScrollArea className="h-full max-h-[400px] scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
            <div className="p-4 space-y-3">
            {filteredContacts.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-500">
                  {searchQuery ? 'No contacts found matching your search.' : 'No contacts available.'}
                </p>
                {searchQuery && (
                  <p className="text-sm text-gray-400 mt-2">Try adjusting your search terms</p>
                )}
              </div>
            ) : (
              filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => handleContactToggle(contact.id)}
                className={`w-full p-3 rounded-lg border transition-all duration-150 cursor-pointer transform hover:scale-[1.01] ${
                  selectedContacts.has(contact.id)
                    ? 'bg-blue-50 border-blue-200 shadow-sm'
                    : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <Checkbox 
                    checked={selectedContacts.has(contact.id)}
                    className="mr-3"
                  />
                  
                  <Avatar className="w-12 h-12 mr-3">
                    {contact.photo ? (
                      <img src={contact.photo} alt={contact.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 font-medium">
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}
                  </Avatar>
                  
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">{contact.name}</p>
                      <div className="flex items-center space-x-1">
                        {contact.hasConnectNow ? (
                          <div className="w-2 h-2 bg-green-500 rounded-full" title="Has ConnectNow" />
                        ) : (
                          <MessageCircle size={14} className="text-green-500" title="WhatsApp" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone size={12} className="mr-1" />
                      {contact.phone}
                    </div>
                  </div>
                </div>
              </div>
              ))
            )}
            </div>
          </ScrollArea>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="flex-shrink-0 p-4 border-t bg-gray-50 rounded-b-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">
              {selectedContacts.size} contact{selectedContacts.size !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
              ConnectNow
              <MessageCircle size={12} className="text-green-500 ml-2 mr-1" />
              WhatsApp
            </div>
          </div>
          
          <Button
            onClick={handleSendInvitations}
            disabled={selectedContacts.size === 0 || isInviting}
            className={`w-full h-12 transition-all duration-200 ${
              selectedContacts.size > 0 && !isInviting
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg transform hover:scale-[1.02]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300 hover:text-gray-500'
            }`}
          >
            {isInviting ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Sending Invitations...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Send 
                  size={18} 
                  className={`mr-2 transition-all ${
                    selectedContacts.size === 0 ? 'opacity-60' : 'opacity-100'
                  }`} 
                />
                <span className={`transition-all ${
                  selectedContacts.size === 0 ? 'opacity-60' : 'opacity-100'
                }`}>
                  Send Invitation{selectedContacts.size !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}