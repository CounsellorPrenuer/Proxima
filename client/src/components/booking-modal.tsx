import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { createOrder, previewCoupon, verifyPayment } from "@/lib/workerApi";
import { formatINR } from "@/lib/currency";
import { SUGGESTED_COUPON_CODE } from "@/lib/config";

const bookingFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  couponCode: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId: string;
  planTitle: string;
  planPrice: number;
}

interface CreateOrderResponse {
  amount: number;
  razorpay_order_id?: string;
  orderId?: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function BookingModal({ isOpen, onClose, planId, planTitle, planPrice }: BookingModalProps) {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [displayAmount, setDisplayAmount] = useState(planPrice);
  const [couponApplied, setCouponApplied] = useState(false);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      couponCode: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      setDisplayAmount(planPrice);
      setCouponApplied(false);
      form.reset({ name: "", email: "", phone: "", couponCode: "" });
    }
  }, [isOpen, planId, planPrice, form]);

  const createOrderMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      return createOrder({
        plan_id: planId,
        coupon_code: data.couponCode,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
    },
  });

  const verifyPaymentMutation = useMutation({
    mutationFn: async (paymentData: any) => {
      return verifyPayment(paymentData);
    },
  });

  const previewCouponMutation = useMutation({
    mutationFn: async (couponCode: string) => previewCoupon({ plan_id: planId, coupon_code: couponCode }),
  });

  const handlePayment = async (data: BookingFormData) => {
    try {
      setIsProcessing(true);

      const orderData = (await createOrderMutation.mutateAsync(data)) as CreateOrderResponse;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "",
        amount: orderData.amount, // amount in paise from backend
        currency: "INR",
        name: "PROXIMA",
        description: planTitle,
        order_id: orderData.razorpay_order_id || orderData.orderId,
        handler: async function (response: any) {
          try {
            await verifyPaymentMutation.mutateAsync({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan_id: planId,
            });

            toast({
              title: "Payment Successful!",
              description: "Your booking has been confirmed. We'll contact you shortly.",
            });

            form.reset();
            onClose();
          } catch (error: any) {
            toast({
              variant: "destructive",
              title: "Payment Verification Failed",
              description: error.message || "Please contact us for assistance",
            });
          }
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
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
        description: error.message || "Failed to create booking. Please try again",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" data-testid="modal-booking">
        <DialogHeader>
          <DialogTitle>Complete Your Purchase</DialogTitle>
          <DialogDescription>
            {planTitle} — {formatINR(planPrice)}
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
              <span className="font-medium">Plan</span>
              <span className="text-sm text-muted-foreground">{planTitle}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">{couponApplied ? "Total after discount" : "Package Price"}</span>
              <div className="text-right">
                {couponApplied && displayAmount < planPrice && (
                  <span className="text-sm text-muted-foreground line-through mr-2">{formatINR(planPrice)}</span>
                )}
                <span className="text-2xl font-bold text-primary">{formatINR(displayAmount)}</span>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="couponCode">Have a coupon?</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="couponCode"
                {...form.register("couponCode")}
                placeholder={`e.g. ${SUGGESTED_COUPON_CODE}`}
              />
              <Button
                type="button"
                variant="outline"
                disabled={previewCouponMutation.isPending}
                onClick={async () => {
                  const couponCode = form.getValues("couponCode")?.trim();
                  if (!couponCode) {
                    toast({ variant: "destructive", title: "Enter a coupon code", description: `Try ${SUGGESTED_COUPON_CODE} or PROXIMA500.` });
                    return;
                  }
                  try {
                    const result: any = await previewCouponMutation.mutateAsync(couponCode);
                    const amount = result?.final_amount ?? result?.amount_in_rupees ?? result?.amount;
                    if (typeof amount === "number") {
                      const normalized = amount > planPrice * 10 ? amount / 100 : amount;
                      setDisplayAmount(normalized);
                      setCouponApplied(true);
                      toast({ title: "Coupon applied", description: result?.message || `New total: ${formatINR(normalized)}` });
                    } else {
                      setDisplayAmount(planPrice);
                      setCouponApplied(false);
                      toast({ title: "Coupon applied", description: result?.message || "Discount preview loaded." });
                    }
                  } catch (error: any) {
                    setDisplayAmount(planPrice);
                    setCouponApplied(false);
                    toast({ variant: "destructive", title: "Coupon invalid", description: error.message || "Could not apply coupon" });
                  }
                }}
              >
                Apply
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Try {SUGGESTED_COUPON_CODE} (10% off) or PROXIMA500 (Rs. 500 off).</p>
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
