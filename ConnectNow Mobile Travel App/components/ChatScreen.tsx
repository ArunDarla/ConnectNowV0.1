import { Plus, Search, Phone, Video, MoreVertical, Send, Paperclip, Smile } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Avatar } from './ui/avatar';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function ChatScreen() {
  const chatGroups = [
    {
      id: 1,
      name: 'Tokyo Adventure',
      lastMessage: 'Emma: Hotel booked! Check the details 🏨',
      time: '2m ago',
      unread: 3,
      avatar: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=50&h=50&fit=crop',
      members: 4,
      type: 'trip'
    },
    {
      id: 2,
      name: 'Bali Retreat',
      lastMessage: 'Alex: Should we book the spa session?',
      time: '1h ago',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=50&h=50&fit=crop',
      members: 6,
      type: 'trip'
    },
    {
      id: 3,
      name: 'Travel Buddies',
      lastMessage: 'Mike: Found a great deal for flights!',
      time: '3h ago',
      unread: 1,
      avatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=50&h=50&fit=crop',
      members: 8,
      type: 'general'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Emma',
      content: 'Just booked our hotel in Shibuya! 🏨',
      time: '10:30 AM',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
      isMe: false
    },
    {
      id: 2,
      sender: 'You',
      content: 'Amazing! Is it close to the train station?',
      time: '10:32 AM',
      avatar: '',
      isMe: true
    },
    {
      id: 3,
      sender: 'Emma',
      content: 'Yes! Only 3 minutes walk. Perfect location 📍',
      time: '10:33 AM',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
      isMe: false
    },
    {
      id: 4,
      sender: 'Alex',
      content: 'Great choice! I found some amazing restaurants nearby too 🍜',
      time: '10:35 AM',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      isMe: false
    },
    {
      id: 5,
      sender: 'You',
      content: 'Can\'t wait! This trip is going to be incredible 🎌',
      time: '10:36 AM',
      avatar: '',
      isMe: true
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-gray-50">
      <Tabs defaultValue="groups" className="h-full">
        {/* Header */}
        <div className="bg-white px-4 pt-12 pb-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Messages</h1>
            <Button size="sm">
              <Plus size={16} className="mr-1" />
              New Group
            </Button>
          </div>
          
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="chat">Tokyo Adventure</TabsTrigger>
            <TabsTrigger value="calls">Calls</TabsTrigger>
          </TabsList>
        </div>

        {/* Groups List */}
        <TabsContent value="groups" className="px-4 py-4 space-y-0">
          <div className="mb-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search conversations..." className="pl-10" />
            </div>
          </div>

          <div className="space-y-2">
            {chatGroups.map((group) => (
              <Card key={group.id} className="p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <Avatar className="w-12 h-12 mr-3">
                    <img src={group.avatar} alt={group.name} />
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold">{group.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{group.time}</span>
                        {group.unread > 0 && (
                          <Badge className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                            {group.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{group.lastMessage}</p>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="text-xs">
                        {group.members} members
                      </Badge>
                      <Badge variant="secondary" className="text-xs ml-2">
                        {group.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Chat View */}
        <TabsContent value="chat" className="h-full flex flex-col">
          {/* Chat Header */}
          <div className="bg-white px-4 py-3 border-b flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="w-10 h-10 mr-3">
                <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=50&h=50&fit=crop" alt="Tokyo Adventure" />
              </Avatar>
              <div>
                <h3 className="font-semibold">Tokyo Adventure</h3>
                <p className="text-xs text-gray-500">4 members • Online</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                <Phone size={16} />
              </Button>
              <Button variant="ghost" size="sm">
                <Video size={16} />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical size={16} />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end max-w-xs ${message.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                  {!message.isMe && (
                    <Avatar className="w-8 h-8 mr-2">
                      <img src={message.avatar} alt={message.sender} />
                    </Avatar>
                  )}
                  <div className={`px-4 py-2 rounded-2xl ${
                    message.isMe 
                      ? 'bg-blue-500 text-white rounded-br-md' 
                      : 'bg-white border rounded-bl-md'
                  }`}>
                    {!message.isMe && (
                      <p className="text-xs text-gray-500 mb-1">{message.sender}</p>
                    )}
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="bg-white border-t p-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Paperclip size={16} />
              </Button>
              <div className="flex-1 relative">
                <Input 
                  placeholder="Type a message..." 
                  className="pr-10"
                />
                <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                  <Smile size={16} />
                </Button>
              </div>
              <Button size="sm">
                <Send size={16} />
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Calls List */}
        <TabsContent value="calls" className="px-4 py-4">
          <div className="text-center py-8 text-gray-500">
            <Phone size={48} className="mx-auto mb-4 opacity-50" />
            <p>No recent calls</p>
            <p className="text-sm">Voice and video calls will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}