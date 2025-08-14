import { Plus, ArrowUpDown, CreditCard, PieChart, TrendingUp, Users, Receipt } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Progress } from './ui/progress';

export function WalletScreen() {
  const balance = 2450.50;
  const monthlySpent = 890.25;
  const monthlyBudget = 1500;

  const recentTransactions = [
    {
      id: 1,
      title: 'Hotel Booking - Tokyo',
      amount: -320.00,
      date: '2 hours ago',
      category: 'Accommodation',
      participants: ['Sarah', 'Emma', 'Alex'],
      status: 'split'
    },
    {
      id: 2,
      title: 'Group Dinner',
      amount: -85.50,
      date: '1 day ago',
      category: 'Food',
      participants: ['Sarah', 'Emma'],
      status: 'pending'
    },
    {
      id: 3,
      title: 'Flight to Bali',
      amount: -450.00,
      date: '3 days ago',
      category: 'Transport',
      participants: ['Sarah', 'Emma', 'Alex', 'Mike'],
      status: 'completed'
    },
    {
      id: 4,
      title: 'Added Funds',
      amount: +500.00,
      date: '1 week ago',
      category: 'Top-up',
      participants: [],
      status: 'completed'
    }
  ];

  const expenseCategories = [
    { name: 'Accommodation', amount: 650, percentage: 40, color: 'bg-blue-500' },
    { name: 'Food & Dining', amount: 325, percentage: 20, color: 'bg-green-500' },
    { name: 'Transport', amount: 520, percentage: 32, color: 'bg-purple-500' },
    { name: 'Activities', amount: 130, percentage: 8, color: 'bg-orange-500' }
  ];

  const pendingSplits = [
    {
      id: 1,
      title: 'Restaurant Bill - Tokyo',
      amount: 125.30,
      from: 'Emma',
      participants: 3,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face'
    },
    {
      id: 2,
      title: 'Uber to Airport',
      amount: 45.80,
      from: 'Alex',
      participants: 2,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face'
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 px-4 pt-12 pb-6 text-white">
        <div className="text-center mb-6">
          <p className="text-green-100 mb-2">Total Balance</p>
          <h1 className="text-3xl font-bold">${balance.toFixed(2)}</h1>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <Button 
            variant="ghost" 
            className="flex flex-col items-center p-4 bg-white/20 backdrop-blur-sm hover:bg-white/30"
          >
            <Plus size={20} className="mb-2" />
            <span className="text-sm">Add Money</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center p-4 bg-white/20 backdrop-blur-sm hover:bg-white/30"
          >
            <ArrowUpDown size={20} className="mb-2" />
            <span className="text-sm">Split Bill</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center p-4 bg-white/20 backdrop-blur-sm hover:bg-white/30"
          >
            <CreditCard size={20} className="mb-2" />
            <span className="text-sm">Pay</span>
          </Button>
        </div>
      </div>

      <div className="px-4 py-4 space-y-6">
        {/* Monthly Budget Overview */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Monthly Budget</h2>
            <Badge variant="secondary">
              <TrendingUp size={12} className="mr-1" />
              On Track
            </Badge>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Spent this month</span>
              <span className="font-medium">${monthlySpent.toFixed(2)} / ${monthlyBudget}</span>
            </div>
            <Progress value={(monthlySpent / monthlyBudget) * 100} className="h-2" />
            <div className="text-sm text-gray-500">
              ${(monthlyBudget - monthlySpent).toFixed(2)} remaining
            </div>
          </div>
        </Card>

        {/* Pending Split Requests */}
        {pendingSplits.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Pending Splits</h2>
              <Badge variant="destructive">{pendingSplits.length}</Badge>
            </div>
            
            {pendingSplits.map((split) => (
              <Card key={split.id} className="p-4 mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="w-10 h-10 mr-3">
                      <img src={split.avatar} alt={split.from} />
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{split.title}</p>
                      <p className="text-xs text-gray-500">
                        {split.from} • {split.participants} participants
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-600">-${(split.amount / split.participants).toFixed(2)}</p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">Decline</Button>
                      <Button size="sm">Accept</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Expense Categories */}
        <div>
          <h2 className="font-semibold mb-4">Expense Breakdown</h2>
          <Card className="p-4">
            {expenseCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full ${category.color} mr-3`}></div>
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">${category.amount}</p>
                  <p className="text-xs text-gray-500">{category.percentage}%</p>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent Transactions</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          
          {recentTransactions.map((transaction) => (
            <Card key={transaction.id} className="p-4 mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <Receipt size={16} className={
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    } />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{transaction.title}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>{transaction.date}</span>
                      {transaction.participants.length > 0 && (
                        <>
                          <span className="mx-1">•</span>
                          <Users size={10} className="mr-1" />
                          <span>{transaction.participants.length} people</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <Badge 
                    variant={
                      transaction.status === 'completed' ? 'default' :
                      transaction.status === 'pending' ? 'secondary' : 'outline'
                    }
                    className="text-xs"
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}