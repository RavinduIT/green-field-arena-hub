import { useState } from 'react';
import { Users, Settings, BarChart3, Shield, UserCheck, Building, Store, Download, Bell, Wrench, Lock, FileText, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [notificationDialog, setNotificationDialog] = useState(false);
  
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
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'david@email.com',
      role: 'Coach',
      status: 'Pending',
      joinDate: '2024-01-20',
      avatar: '👨‍🏫',
      lastActive: '1 hour ago'
    },
    {
      id: 6,
      name: 'Emma Davis',
      email: 'emma@email.com',
      role: 'Shop Owner',
      status: 'Active',
      joinDate: '2023-11-15',
      avatar: '👩‍💼',
      lastActive: '4 hours ago'
    },
    {
      id: 7,
      name: 'Robert Brown',
      email: 'robert@email.com',
      role: 'Complex Owner',
      status: 'Pending',
      joinDate: '2024-01-25',
      avatar: '👨‍💼',
      lastActive: '2 days ago'
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
    // Navigate to a settings page or open a modal
    toast({
      title: "General Settings",
      description: "Redirecting to general settings configuration...",
    });
    // In a real app: navigate('/admin/settings/general');
  };

  const handleSecuritySettings = () => {
    toast({
      title: "Security Settings", 
      description: "Opening security configuration panel...",
    });
    // In a real app: navigate('/admin/settings/security');
  };

  const handleUserPermissions = () => {
    toast({
      title: "User Permissions",
      description: "Opening user permissions management...",
    });
    // In a real app: navigate('/admin/permissions');
  };

  const handleAnalyticsSettings = () => {
    toast({
      title: "Analytics Settings",
      description: "Opening analytics dashboard configuration...",
    });
    // In a real app: navigate('/admin/analytics');
  };

  const handleSendNotification = async (title: string, message: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setNotificationDialog(false);
    
    toast({
      title: "Notification Sent Successfully",
      description: `"${title}" has been sent to ${users.length} users.`,
    });
  };

  const handleExportData = () => {
    setIsLoading(true);
    
    // Create comprehensive export data
    const exportData = {
      exportDate: new Date().toISOString(),
      summary: {
        totalUsers: users.length,
        activeUsers: users.filter(u => u.status === 'Active').length,
        pendingUsers: users.filter(u => u.status === 'Pending').length,
        totalRevenue: stats.totalRevenue,
        activeBookings: stats.activeBookings
      },
      users: users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        joinDate: user.joinDate,
        lastActive: user.lastActive
      })),
      recentActivity: recentActivity
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `admin-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Export Complete",
        description: `Complete admin data exported with ${users.length} users and ${recentActivity.length} activities.`,
      });
    }, 1500);
  };

  const handleGenerateReports = async () => {
    setIsLoading(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create a sample report
    const reportData = {
      reportDate: new Date().toISOString(),
      period: "Last 30 Days",
      metrics: {
        userGrowth: "+15.3%",
        revenue: `$${stats.totalRevenue.toLocaleString()}`,
        activeBookings: stats.activeBookings,
        conversionRate: "68.2%",
        avgSessionDuration: "24m 18s"
      },
      topPerformers: {
        bestCoach: "Sarah Thompson",
        mostBookedGround: "City Sports Complex", 
        topSellingItem: "Professional Basketball"
      },
      recommendations: [
        "Increase marketing for tennis courts",
        "Add more football coaching slots",
        "Promote basketball equipment bundle"
      ]
    };
    
    const reportStr = JSON.stringify(reportData, null, 2);
    const reportBlob = new Blob([reportStr], { type: 'application/json' });
    const url = URL.createObjectURL(reportBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `admin-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setIsLoading(false);
    toast({
      title: "Reports Generated",
      description: "Complete analytics report has been generated and downloaded.",
    });
  };

  const handleSystemMaintenance = () => {
    setMaintenanceMode(!maintenanceMode);
    
    if (!maintenanceMode) {
      toast({
        title: "Maintenance Mode Activated",
        description: "System is now in maintenance mode. New registrations are disabled.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Maintenance Mode Deactivated", 
        description: "System is back online. All features are now available.",
      });
    }
  };

  const confirmUpdateUserRole = (userId: number, newRole: string, userName: string) => {
    return new Promise<boolean>((resolve) => {
      const confirmed = window.confirm(`Are you sure you want to change ${userName}'s role to ${newRole}?`);
      if (confirmed) {
        updateUserRole(userId, newRole);
      }
      resolve(confirmed);
    });
  };

  const confirmUpdateUserStatus = (userId: number, newStatus: string, userName: string) => {
    return new Promise<boolean>((resolve) => {
      const confirmed = window.confirm(`Are you sure you want to change ${userName}'s status to ${newStatus}?`);
      if (confirmed) {
        updateUserStatus(userId, newStatus);
      }
      resolve(confirmed);
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

  const UserCard = ({ user, updateUserRole, updateUserStatus }: {
    user: any;
    updateUserRole: (userId: number, newRole: string) => void;
    updateUserStatus: (userId: number, newStatus: string) => void;
  }) => (
    <div className="flex items-center justify-between p-4 border rounded-lg">
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Select 
                value={user.role}
                onValueChange={(value) => {
                  if (value !== user.role) {
                    confirmUpdateUserRole(user.id, value, user.name);
                  }
                }}
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
            </AlertDialogTrigger>
          </AlertDialog>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Select 
                value={user.status}
                onValueChange={(value) => {
                  if (value !== user.status) {
                    confirmUpdateUserStatus(user.id, value, user.name);
                  }
                }}
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
            </AlertDialogTrigger>
          </AlertDialog>
        </div>
        
        <Badge 
          variant={user.status === 'Active' ? 'secondary' : 
                  user.status === 'Pending' ? 'default' : 'destructive'}
        >
          {user.status}
        </Badge>
      </div>
    </div>
  );

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
            <div className="space-y-6">
              {/* Pending Service Provider Registrations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-600">
                    <AlertTriangle className="h-5 w-5" />
                    Pending Service Provider Registrations ({users.filter(u => u.status === 'Pending' && ['Coach', 'Shop Owner', 'Complex Owner'].includes(u.role)).length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.filter(u => u.status === 'Pending' && ['Coach', 'Shop Owner', 'Complex Owner'].includes(u.role)).map((user) => (
                      <UserCard key={user.id} user={user} updateUserRole={updateUserRole} updateUserStatus={updateUserStatus} />
                    ))}
                    {users.filter(u => u.status === 'Pending' && ['Coach', 'Shop Owner', 'Complex Owner'].includes(u.role)).length === 0 && (
                      <p className="text-center text-muted-foreground py-8">No pending service provider registrations</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Active Coaches */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5" />
                    Active Coaches ({users.filter(u => u.role === 'Coach' && u.status === 'Active').length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.filter(u => u.role === 'Coach' && u.status === 'Active').map((user) => (
                      <UserCard key={user.id} user={user} updateUserRole={updateUserRole} updateUserStatus={updateUserStatus} />
                    ))}
                    {users.filter(u => u.role === 'Coach' && u.status === 'Active').length === 0 && (
                      <p className="text-center text-muted-foreground py-8">No active coaches</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Active Shop Owners */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Store className="h-5 w-5" />
                    Active Shop Owners ({users.filter(u => u.role === 'Shop Owner' && u.status === 'Active').length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.filter(u => u.role === 'Shop Owner' && u.status === 'Active').map((user) => (
                      <UserCard key={user.id} user={user} updateUserRole={updateUserRole} updateUserStatus={updateUserStatus} />
                    ))}
                    {users.filter(u => u.role === 'Shop Owner' && u.status === 'Active').length === 0 && (
                      <p className="text-center text-muted-foreground py-8">No active shop owners</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Active Ground Owners */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Active Ground Owners ({users.filter(u => u.role === 'Complex Owner' && u.status === 'Active').length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.filter(u => u.role === 'Complex Owner' && u.status === 'Active').map((user) => (
                      <UserCard key={user.id} user={user} updateUserRole={updateUserRole} updateUserStatus={updateUserStatus} />
                    ))}
                    {users.filter(u => u.role === 'Complex Owner' && u.status === 'Active').length === 0 && (
                      <p className="text-center text-muted-foreground py-8">No active ground owners</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Regular Users (Players) */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Regular Users ({users.filter(u => u.role === 'Player').length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.filter(u => u.role === 'Player').map((user) => (
                      <UserCard key={user.id} user={user} updateUserRole={updateUserRole} updateUserStatus={updateUserStatus} />
                    ))}
                    {users.filter(u => u.role === 'Player').length === 0 && (
                      <p className="text-center text-muted-foreground py-8">No regular users</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
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
                  <Dialog open={notificationDialog} onOpenChange={setNotificationDialog}>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full bg-gradient-primary"
                        disabled={isLoading}
                      >
                        <Bell className="mr-2 h-4 w-4" />
                        Send System Notification
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Send System Notification</DialogTitle>
                        <DialogDescription>
                          Send a notification to all {users.length} registered users
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <Label htmlFor="title">Notification Title</Label>
                          <Input
                            id="title"
                            placeholder="Enter notification title"
                            defaultValue="System Update"
                          />
                        </div>
                        <div>
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            placeholder="Enter your message here..."
                            defaultValue="We have updated our system with new features and improvements."
                            rows={4}
                          />
                        </div>
                        <Button 
                          onClick={() => {
                            const title = (document.getElementById('title') as HTMLInputElement)?.value || "System Update";
                            const message = (document.getElementById('message') as HTMLTextAreaElement)?.value || "System notification";
                            handleSendNotification(title, message);
                          }}
                          className="w-full"
                          disabled={isLoading}
                        >
                          {isLoading ? "Sending..." : `Send to ${users.length} Users`}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={handleExportData}
                    disabled={isLoading}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {isLoading ? "Exporting..." : "Export Complete Data"}
                  </Button>
                  
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={handleGenerateReports}
                    disabled={isLoading}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    {isLoading ? "Generating..." : "Generate Analytics Report"}
                  </Button>
                  
                  <Button 
                    className={`w-full ${maintenanceMode ? 'bg-red-600 hover:bg-red-700' : ''}`}
                    variant={maintenanceMode ? "default" : "destructive"}
                    onClick={handleSystemMaintenance}
                  >
                    {maintenanceMode ? (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        Exit Maintenance Mode
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Enter Maintenance Mode
                      </>
                    )}
                  </Button>
                  
                  {maintenanceMode && (
                    <div className="text-center p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-700 font-medium">⚠️ System is in Maintenance Mode</p>
                      <p className="text-xs text-red-600">New registrations are disabled</p>
                    </div>
                  )}
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