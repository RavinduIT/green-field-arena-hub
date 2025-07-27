import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Shield, CheckCircle, Clock, MapPin, User, Calendar } from 'lucide-react';
import heroBackground from '@/assets/hero-background.jpg';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  // Mock booking details - this would come from context/props in real app
  const bookingDetails = {
    type: 'Ground Booking',
    name: 'City Sports Complex',
    date: '2024-01-15',
    time: '14:00 - 16:00',
    duration: '2 hours',
    price: 50.00,
    location: 'Downtown Area',
    amenities: ['Parking', 'Changing Rooms', 'Equipment Rental']
  };

  const fees = {
    subtotal: bookingDetails.price,
    serviceFee: 5.00,
    tax: 4.40,
    total: bookingDetails.price + 5.00 + 4.40
  };

  const handlePayment = () => {
    // Mock payment processing
    alert('Payment processed successfully! Booking confirmed.');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div 
        className="relative h-48 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative text-center text-white">
          <h1 className="text-4xl font-bold mb-2">Secure Payment</h1>
          <p className="text-xl opacity-90">Complete your booking with confidence</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{bookingDetails.name}</h3>
                  <p className="text-sm text-muted-foreground">{bookingDetails.type}</p>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{bookingDetails.location}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{bookingDetails.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Time:</span>
                    <span>{bookingDetails.time}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>{bookingDetails.duration}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Amenities Included:</h4>
                  <div className="flex flex-wrap gap-2">
                    {bookingDetails.amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${fees.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Service Fee</span>
                    <span>${fees.serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Tax</span>
                    <span>${fees.tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${fees.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Method Selection */}
                <div>
                  <Label className="text-base font-medium">Payment Method</Label>
                  <div className="grid grid-cols-3 gap-4 mt-3">
                    <Button
                      variant={paymentMethod === 'card' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('card')}
                      className="p-4 h-auto flex flex-col gap-2"
                    >
                      <CreditCard className="h-6 w-6" />
                      <span>Credit Card</span>
                    </Button>
                    <Button
                      variant={paymentMethod === 'paypal' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('paypal')}
                      className="p-4 h-auto flex flex-col gap-2"
                    >
                      <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                        PP
                      </div>
                      <span>PayPal</span>
                    </Button>
                    <Button
                      variant={paymentMethod === 'wallet' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('wallet')}
                      className="p-4 h-auto flex flex-col gap-2"
                    >
                      <div className="w-6 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center">
                        W
                      </div>
                      <span>Digital Wallet</span>
                    </Button>
                  </div>
                </div>

                {/* Credit Card Form */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* PayPal */}
                {paymentMethod === 'paypal' && (
                  <div className="text-center py-8">
                    <div className="text-4xl text-blue-600 mb-4">PayPal</div>
                    <p className="text-muted-foreground">You will be redirected to PayPal to complete your payment securely.</p>
                  </div>
                )}

                {/* Digital Wallet */}
                {paymentMethod === 'wallet' && (
                  <div className="text-center py-8">
                    <div className="text-4xl text-green-600 mb-4">💳</div>
                    <p className="text-muted-foreground">Pay using your digital wallet (Apple Pay, Google Pay, etc.)</p>
                  </div>
                )}

                {/* Security Notice */}
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Secure Payment</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your payment information is encrypted and processed securely. We never store your card details.
                  </p>
                </div>

                {/* Terms */}
                <div className="text-sm text-muted-foreground">
                  <p>
                    By completing this payment, you agree to our{' '}
                    <a href="#" className="text-primary hover:underline">Terms of Service</a>{' '}
                    and{' '}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                  </p>
                </div>

                {/* Payment Button */}
                <Button 
                  onClick={handlePayment}
                  className="w-full bg-gradient-primary py-6 text-lg"
                  size="lg"
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Complete Payment - ${fees.total.toFixed(2)}
                </Button>
              </CardContent>
            </Card>

            {/* Booking Confirmation Info */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  What happens next?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Instant Confirmation</p>
                      <p className="text-muted-foreground">You'll receive an email confirmation immediately after payment.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Facility Contact</p>
                      <p className="text-muted-foreground">The facility manager will contact you 24 hours before your booking.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Enjoy Your Game</p>
                      <p className="text-muted-foreground">Arrive 15 minutes early and present your booking confirmation.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;