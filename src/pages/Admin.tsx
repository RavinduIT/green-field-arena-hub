import { useState } from 'react';
import { Users, Settings, BarChart3, Shield, UserCheck, Building, Store, Download, Bell, Wrench, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Martinez',
      email: 'john@email.com',
      role: 'Coach',
      status: 'Active',
      joinDate: '2023-01-15',
      avatar: '👨‍💼',
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'Sarah Thompson',
      email: 'sarah@email.com',
      role: 'Player',
      status: 'Active',
      joinDate: '2023-02-20',
      avatar: '👩‍💼',
      lastActive: '1 day ago'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@email.com',
      role: 'Shop Owner',
      status: 'Pending',
      joinDate: '2024-01-10',
      avatar: '👨‍🏫',
      lastActive: '3 days ago'
    },
    {
      id: 4,
      name: 'Lisa Chen',
      email: 'lisa@email.com',
      role: 'Complex Owner',
      status: 'Active',
      joinDate: '2023-08-05',
      avatar: '👩‍🏫',
      lastActive: '5 hours ago'
    }
  ]);

  const [stats] = useState({
    totalUsers: 1247,
    activeBookings: 89,
    totalRevenue: 15420,
    newRegistrations: 23
  });

  const [recentActivity] = useState([
    { id: 1, action: 'New user registered', user: 'Alex Wilson', time: '2 minutes ago', type: 'user' },
    { id: 2, action: 'Ground booking confirmed', user: 'City Sports Complex', time: '15 minutes ago', type: 'booking' },
    { id: 3, action: 'Coach profile updated', user: 'Sarah Thompson', time: '1 hour ago', type: 'profile' },
    { id: 4, action: 'Payment processed', user: 'Mike Johnson', time: '2 hours ago', type: 'payment' },
    { id: 5, action: 'New equipment listed', user: 'Sports Store Pro', time: '3 hours ago', type: 'shop' }
  ]);

  const updateUserRole = (userId: number, newRole: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    toast({
      title: "Role Updated",
      description: `User role has been updated to ${newRole}`,
    });
  };

  const updateUserStatus = (userId: number, newStatus: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    toast({
      title: "Status Updated",
      description: `User status has been updated to ${newStatus}`,
    });
  };

  const handleGeneralSettings = () => {
    toast({
      title: "General Settings",
      description: "Opening general settings panel...",
    });
  };

  const handleSecuritySettings = () => {
    toast({
      title: "Security Settings",
      description: "Opening security configuration...",
    });
  };

  const handleUserPermissions = () => {
    toast({
      title: "User Permissions",
      description: "Opening permissions management...",
    });
  };

  const handleAnalyticsSettings = () => {
    toast({
      title: "Analytics Settings",
      description: "Opening analytics configuration...",
    });
  };

  const handleSendNotification = () => {
    toast({
      title: "System Notification Sent",
      description: "Notification has been sent to all users successfully.",
    });
  };

  const handleExportData = () => {
    const userData = users.map(user => ({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      joinDate: user.joinDate
    }));
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'user-data-export.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Data Exported",
      description: "User data has been exported successfully.",
    });
  };

  const handleGenerateReports = () => {
    toast({
      title: "Generating Reports",
      description: "Platform reports are being generated...",
    });
  };

  const handleSystemMaintenance = () => {
    toast({
      title: "System Maintenance",
      description: "Maintenance mode has been activated.",
      variant: "destructive"
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return <Users className="h-4 w-4" />;
      case 'booking': return <BarChart3 className="h-4 w-4" />;
      case 'profile': return <UserCheck className="h-4 w-4" />;
      case 'payment': return <Settings className="h-4 w-4" />;
      case 'shop': return <Store className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Manage users, roles, and monitor platform activity
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">{stats.activeBookings}</p>
                  <p className="text-sm text-muted-foreground">Active Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">${stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">{stats.newRegistrations}</p>
                  <p className="text-sm text-muted-foreground">New This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  User Management & Role Assignment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
                          <AvatarFallback>{user.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-card-foreground">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <p className="text-xs text-muted-foreground">
                            Joined {user.joinDate} • Last active {user.lastActive}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col gap-2">
                          <Select 
                            defaultValue={user.role}
                            onValueChange={(value) => updateUserRole(user.id, value)}
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Player">
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4" />
                                  Player
                                </div>
                              </SelectItem>
                              <SelectItem value="Coach">
                                <div className="flex items-center gap-2">
                                  <UserCheck className="h-4 w-4" />
                                  Coach
                                </div>
                              </SelectItem>
                              <SelectItem value="Shop Owner">
                                <div className="flex items-center gap-2">
                                  <Store className="h-4 w-4" />
                                  Shop Owner
                                </div>
                              </SelectItem>
                              <SelectItem value="Complex Owner">
                                <div className="flex items-center gap-2">
                                  <Building className="h-4 w-4" />
                                  Complex Owner
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Select 
                            defaultValue={user.status}
                            onValueChange={(value) => updateUserStatus(user.id, value)}
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="Suspended">Suspended</SelectItem>
                              <SelectItem value="Inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <Badge 
                          variant={user.status === 'Active' ? 'secondary' : 
                                  user.status === 'Pending' ? 'default' : 'destructive'}
                        >
                          {user.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Platform Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-card-foreground">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">by {activity.user}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={handleGeneralSettings}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    General Settings
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={handleSecuritySettings}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Security Settings
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={handleUserPermissions}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    User Permissions
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={handleAnalyticsSettings}
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Analytics Settings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full bg-gradient-primary"
                    onClick={handleSendNotification}
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Send System Notification
                  </Button>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={handleExportData}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export User Data
                  </Button>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={handleGenerateReports}
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Generate Reports
                  </Button>
                  <Button 
                    className="w-full" 
                    variant="destructive"
                    onClick={handleSystemMaintenance}
                  >
                    <Wrench className="mr-2 h-4 w-4" />
                    System Maintenance
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;