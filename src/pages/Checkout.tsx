import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CreditCard, MapPin, Phone, User, Mail, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import basketballEquipment from '@/assets/basketball-equipment.jpg';

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  // Get product details from URL params
  const productId = searchParams.get('productId');
  const productName = searchParams.get('productName');
  const productPrice = parseFloat(searchParams.get('productPrice') || '0');
  const selectedColor = searchParams.get('color');
  const selectedSize = searchParams.get('size');
  const quantity = parseInt(searchParams.get('quantity') || '1');
  
  const [currentStep, setCurrentStep] = useState(1); // 1: Contact Details, 2: Payment
  const [contactDetails, setContactDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  // Mock product data (in real app, you'd fetch this)
  const product = {
    id: productId,
    name: productName || 'Professional Basketball',
    price: productPrice || 89,
    image: basketballEquipment
  };

  const totalAmount = product.price * quantity;
  const tax = totalAmount * 0.08; // 8% tax
  const shipping = 9.99;
  const finalTotal = totalAmount + tax + shipping;

  const handleContactSubmit = () => {
    // Validate required fields
    if (!contactDetails.fullName || !contactDetails.email || !contactDetails.phone || !contactDetails.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactDetails.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setCurrentStep(2);
  };

  const handlePayment = () => {
    // Here you would integrate with payment gateway
    toast({
      title: "Payment Processing",
      description: "Redirecting to payment gateway..."
    });
    
    // For now, navigate to a success page after a short delay
    setTimeout(() => {
      navigate('/payment-success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              1
            </div>
            <span className="text-sm font-medium">Contact Details</span>
            <div className="w-16 h-0.5 bg-muted"></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              2
            </div>
            <span className="text-sm font-medium">Payment</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Color: {selectedColor} | Size: {selectedSize}
                      </p>
                      <p className="text-sm text-muted-foreground">Qty: {quantity}</p>
                    </div>
                    <span className="font-medium">${product.price.toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Contact & Delivery Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={contactDetails.fullName}
                        onChange={(e) => setContactDetails({...contactDetails, fullName: e.target.value})}
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactDetails.email}
                        onChange={(e) => setContactDetails({...contactDetails, email: e.target.value})}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={contactDetails.phone}
                        onChange={(e) => setContactDetails({...contactDetails, phone: e.target.value})}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={contactDetails.country}
                        onChange={(e) => setContactDetails({...contactDetails, country: e.target.value})}
                        placeholder="United States"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Textarea
                        id="address"
                        value={contactDetails.address}
                        onChange={(e) => setContactDetails({...contactDetails, address: e.target.value})}
                        placeholder="123 Main Street, Apt 4B"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={contactDetails.city}
                        onChange={(e) => setContactDetails({...contactDetails, city: e.target.value})}
                        placeholder="New York"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="state">State/Province</Label>
                      <Input
                        id="state"
                        value={contactDetails.state}
                        onChange={(e) => setContactDetails({...contactDetails, state: e.target.value})}
                        placeholder="NY"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                      <Input
                        id="zipCode"
                        value={contactDetails.zipCode}
                        onChange={(e) => setContactDetails({...contactDetails, zipCode: e.target.value})}
                        placeholder="10001"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Button 
                      onClick={handleContactSubmit}
                      className="w-full bg-gradient-primary"
                      size="lg"
                    >
                      Continue to Payment
                      <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Delivery Address Summary */}
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Delivery Address</h3>
                      <p className="text-sm text-muted-foreground">
                        {contactDetails.fullName}<br />
                        {contactDetails.address}<br />
                        {contactDetails.city}, {contactDetails.state} {contactDetails.zipCode}<br />
                        {contactDetails.phone}
                      </p>
                      <Button 
                        variant="link" 
                        onClick={() => setCurrentStep(1)}
                        className="p-0 h-auto mt-2"
                      >
                        Edit Details
                      </Button>
                    </div>

                    {/* Payment Options */}
                    <div>
                      <h3 className="font-medium mb-4">Select Payment Method</h3>
                      <div className="space-y-3">
                        <Card className="border-2 border-primary cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <CreditCard className="h-5 w-5" />
                              <div>
                                <p className="font-medium">Credit/Debit Card</p>
                                <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="cursor-pointer opacity-50">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded"></div>
                              <div>
                                <p className="font-medium">Google Pay</p>
                                <p className="text-sm text-muted-foreground">Coming soon...</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Order Total */}
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total Amount</span>
                        <span>${finalTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Payment Button */}
                    <Button 
                      onClick={handlePayment}
                      className="w-full bg-gradient-primary"
                      size="lg"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Pay Now ${finalTotal.toFixed(2)}
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      By placing this order, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;