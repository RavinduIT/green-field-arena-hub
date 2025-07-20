import { useState } from 'react';
import { User, Edit, Calendar, MapPin, Phone, Mail, Camera, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    bio: 'Passionate sports enthusiast who loves playing football and tennis. Always looking for new challenges and ways to improve my game.',
    role: 'Player',
    joinDate: '2023-01-15',
    sports: ['Football', 'Tennis', 'Basketball'],
    avatar: '👤'
  });

  const [bookingHistory] = useState([
    {
      id: 1,
      type: 'Ground',
      name: 'City Sports Complex',
      date: '2024-01-15',
      time: '14:00-16:00',
      status: 'Completed',
      amount: 50
    },
    {
      id: 2,
      type: 'Coach',
      name: 'Sarah Thompson - Tennis',
      date: '2024-01-10',
      time: '10:00-11:00',
      status: 'Completed',
      amount: 60
    },
    {
      id: 3,
      type: 'Ground',
      name: 'Basketball Arena Pro',
      date: '2024-01-20',
      time: '18:00-20:00',
      status: 'Upcoming',
      amount: 40
    }
  ]);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleInputChange = (field: string, value: string) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-primary-foreground">
                <AvatarImage src="/placeholder-user.jpg" alt={userProfile.name} />
                <AvatarFallback className="text-4xl">{userProfile.avatar}</AvatarFallback>
              </Avatar>
              <Button size="icon" className="absolute bottom-0 right-0 rounded-full bg-primary">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-center md:text-left text-primary-foreground">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{userProfile.name}</h1>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{userProfile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{userProfile.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Member since {new Date(userProfile.joinDate).getFullYear()}</span>
                </div>
              </div>
              <Badge className="bg-primary-foreground text-primary">
                {userProfile.role}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                  {isEditing ? (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={userProfile.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={userProfile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={userProfile.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={userProfile.role}
                    onValueChange={(value) => handleInputChange('role', value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Player">Player</SelectItem>
                      <SelectItem value="Coach">Coach</SelectItem>
                      <SelectItem value="Shop Owner">Shop Owner</SelectItem>
                      <SelectItem value="Complex Owner">Complex Owner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={userProfile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Favorite Sports</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {userProfile.sports.map((sport) => (
                      <Badge key={sport} variant="secondary" className="bg-primary/10 text-primary">
                        {sport}
                      </Badge>
                    ))}
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        + Add Sport
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking History & Stats */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Bookings:</span>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">This Month:</span>
                    <span className="font-bold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Spent:</span>
                    <span className="font-bold text-primary">$520</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Favorite Sport:</span>
                    <span className="font-bold">Football</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookingHistory.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-sm">{booking.name}</p>
                          <p className="text-xs text-muted-foreground">{booking.type}</p>
                        </div>
                        <Badge 
                          variant={booking.status === 'Completed' ? 'secondary' : 'default'}
                          className="text-xs"
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{booking.date} • {booking.time}</span>
                        <span className="font-medium text-primary">${booking.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Bookings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;