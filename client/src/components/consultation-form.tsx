import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { submitLead } from "@/lib/workerApi";

const SERVICE_TYPES = {
  MENTORIA_STANDARD: "Mentoria Standard Package",
  MENTORIA_CUSTOM: "Mentoria Custom Package",
  COUNSELLING: "Counselling",
  ADMISSION: "Admission Guidance",
};

const consultationFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  serviceType: z.string().min(1, "Please select a service"),
  message: z.string().optional(),
  preferredDate: z.string().optional(),
});

type ConsultationFormData = z.infer<typeof consultationFormSchema>;

export default function ConsultationForm() {
  const { toast } = useToast();

  const form = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      message: "",
      preferredDate: "",
    },
  });

  const submitConsultation = useMutation({
    mutationFn: async (data: ConsultationFormData) => {
      return submitLead({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: `${data.serviceType}${data.preferredDate ? ` | Preferred date: ${data.preferredDate}` : ""}${data.message ? ` | ${data.message}` : ""}`,
      });
    },
    onSuccess: () => {
      toast({
        title: "Consultation Request Submitted!",
        description: "We'll get back to you within 24 hours to schedule your free consultation.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error.message || "Failed to submit consultation request. Please try again.",
      });
    },
  });

  return (
    <form onSubmit={form.handleSubmit((data) => submitConsultation.mutate(data))} className="space-y-4">
      <div>
        <Label htmlFor="consultation-name">Full Name *</Label>
        <Input
          id="consultation-name"
          {...form.register("name")}
          placeholder="Your full name"
          data-testid="input-consultation-name"
        />
        {form.formState.errors.name && (
          <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="consultation-email">Email *</Label>
        <Input
          id="consultation-email"
          type="email"
          {...form.register("email")}
          placeholder="your.email@example.com"
          data-testid="input-consultation-email"
        />
        {form.formState.errors.email && (
          <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="consultation-phone">Phone Number *</Label>
        <Input
          id="consultation-phone"
          {...form.register("phone")}
          placeholder="+91 9876543210"
          data-testid="input-consultation-phone"
        />
        {form.formState.errors.phone && (
          <p className="text-sm text-destructive mt-1">{form.formState.errors.phone.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="consultation-service">Service Interest *</Label>
        <Select onValueChange={(value) => form.setValue("serviceType", value)}>
          <SelectTrigger id="consultation-service" data-testid="select-consultation-service">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(SERVICE_TYPES).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.serviceType && (
          <p className="text-sm text-destructive mt-1">{form.formState.errors.serviceType.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="consultation-date">Preferred Date</Label>
        <Input
          id="consultation-date"
          type="date"
          {...form.register("preferredDate")}
          min={new Date().toISOString().split('T')[0]}
          data-testid="input-consultation-date"
        />
      </div>

      <div>
        <Label htmlFor="consultation-message">Message (Optional)</Label>
        <Textarea
          id="consultation-message"
          {...form.register("message")}
          placeholder="Tell us about your needs or any questions you have..."
          rows={4}
          data-testid="textarea-consultation-message"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full" 
        disabled={submitConsultation.isPending}
        data-testid="button-submit-consultation"
      >
        {submitConsultation.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Request Free Consultation"
        )}
      </Button>
    </form>
  );
}
