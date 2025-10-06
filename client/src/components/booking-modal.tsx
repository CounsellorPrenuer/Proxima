import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertBookingSchema, SERVICE_TYPES, SERVICE_PRICING } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const bookingFormSchema = insertBookingSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: string | null;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function BookingModal({ isOpen, onClose, serviceType }: BookingModalProps) {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const serviceName = serviceType ? SERVICE_TYPES[serviceType as keyof typeof SERVICE_TYPES] : "";
  const amount = serviceType ? SERVICE_PRICING[serviceType as keyof typeof SERVICE_PRICING] : 0;

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: serviceType || "",
      amount: amount,
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      return await apiRequest("POST", "/api/payments/create-order", data);
    },
  });

  const verifyPaymentMutation = useMutation({
    mutationFn: async (paymentData: any) => {
      return await apiRequest("POST", "/api/payments/verify", paymentData);
    },
  });

  const handlePayment = async (data: BookingFormData) => {
    try {
      setIsProcessing(true);

      const orderData = await createOrderMutation.mutateAsync(data);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "",
        amount: orderData.amount,
        currency: "INR",
        name: "PROXIMA",
        description: serviceName,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            await verifyPaymentMutation.mutateAsync({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              bookingId: orderData.bookingId,
            });

            toast({
              title: "Payment Successful!",
              description: "Your booking has been confirmed. We'll contact you shortly.",
            });

            form.reset();
            onClose();
          } catch (error) {
            toast({
              variant: "destructive",
              title: "Payment Verification Failed",
              description: "Please contact us for assistance.",
            });
          }
        },
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone,
        },
        theme: {
          color: "#3b82f6",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Booking Failed",
        description: error.message || "Failed to create booking. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" data-testid="modal-booking">
        <DialogHeader>
          <DialogTitle>Book Service</DialogTitle>
          <DialogDescription>
            Complete your booking for {serviceName}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handlePayment)} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              {...form.register("name")}
              placeholder="Your full name"
              data-testid="input-booking-name"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              placeholder="your.email@example.com"
              data-testid="input-booking-email"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              {...form.register("phone")}
              placeholder="+91 9876543210"
              data-testid="input-booking-phone"
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.phone.message}</p>
            )}
          </div>

          <div className="bg-secondary p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Service</span>
              <span className="text-sm text-muted-foreground">{serviceName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Amount</span>
              <span className="text-2xl font-bold text-primary">₹{amount.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1" data-testid="button-cancel-booking">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1" 
              disabled={isProcessing}
              data-testid="button-proceed-payment"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Proceed to Payment"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
