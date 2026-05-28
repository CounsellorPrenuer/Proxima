import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BookingModal from "@/components/booking-modal";
import { fetchCustomPlans, fetchStandardPlans } from "@/lib/sanity";
import { formatINR } from "@/lib/currency";
import type { CustomPlan, StandardPlan } from "@/types/cms";

const TAB_ORDER = [
  { id: "8-10", label: "8-10 Students" },
  { id: "10-12", label: "10-12 Students" },
  { id: "college", label: "College Students" },
  { id: "working", label: "Working Professionals" },
] as const;

export default function MentoriaSection() {
  const [activeTab, setActiveTab] = useState<(typeof TAB_ORDER)[number]["id"]>("8-10");
  const [selectedPlan, setSelectedPlan] = useState<{ planId: string; title: string } | null>(null);

  const { data: standardPlans = [] } = useQuery<StandardPlan[]>({
    queryKey: ["sanity-standard-plans"],
    queryFn: fetchStandardPlans,
  });

  const { data: customPlans = [] } = useQuery<CustomPlan[]>({
    queryKey: ["sanity-custom-plans"],
    queryFn: fetchCustomPlans,
  });

  const groupedPlans = useMemo(() => {
    return standardPlans.filter((plan) => plan.subgroup === activeTab);
  }, [activeTab, standardPlans]);

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-white to-blue-50" id="mentoria">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold">Mentoria Packages</h2>
            <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
              Pick the package that fits your stage and goals. Checkout supports coupons and secure Razorpay payment.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {TAB_ORDER.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {groupedPlans.map((plan) => (
              <motion.div key={plan._id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Card className="h-full border-blue-100 shadow-sm hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.title}</CardTitle>
                    <div className="text-3xl font-bold text-primary">{formatINR(plan.price)}</div>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="text-sm text-muted-foreground">- {feature}</li>
                      ))}
                    </ul>
                    <Button className="w-full" onClick={() => setSelectedPlan({ planId: plan.planId, title: plan.title })}>
                      Buy Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-16">
            <h3 className="text-3xl font-bold text-center">Want To Customise Your Mentorship Plan?</h3>
            <p className="text-muted-foreground text-center mt-2 max-w-4xl mx-auto">
              If you want to subscribe to specific services from Mentoria that resolve your career challenges, you can choose one or more of the following:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {customPlans.map((plan) => (
                <Card key={plan._id} className="h-full">
                  <CardHeader>
                    <CardTitle>{plan.title}</CardTitle>
                    <div className="text-xl font-semibold text-primary">{formatINR(plan.price)}</div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                    <Button variant="secondary" className="w-full" onClick={() => setSelectedPlan({ planId: plan.planId, title: plan.title })}>
                      Buy Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={Boolean(selectedPlan)}
        onClose={() => setSelectedPlan(null)}
        planId={selectedPlan?.planId ?? ""}
        planTitle={selectedPlan?.title ?? ""}
      />
    </>
  );
}
