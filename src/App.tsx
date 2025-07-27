import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BookGround from "./pages/BookGround";
import BookCoach from "./pages/BookCoach";
import Shop from "./pages/Shop";
import News from "./pages/News";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import AdminShop from "./pages/AdminShop";
import AdminGround from "./pages/AdminGround";
import AdminCoach from "./pages/AdminCoach";
import Payment from "./pages/Payment";
import GroundDetails from "./pages/GroundDetails";
import ServiceProviderRegister from "./pages/ServiceProviderRegister";
import Cart from "./pages/Cart";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen bg-background">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/book-ground" element={<BookGround />} />
              <Route path="/book-coach" element={<BookCoach />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/news" element={<News />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/shop" element={<AdminShop />} />
              <Route path="/admin/ground" element={<AdminGround />} />
              <Route path="/admin/coach" element={<AdminCoach />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/ground-details" element={<GroundDetails />} />
              <Route path="/service-provider-register" element={<ServiceProviderRegister />} />
              <Route path="/cart" element={<Cart />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
