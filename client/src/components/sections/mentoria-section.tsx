import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BookingModal from "@/components/booking-modal";
import { fetchCustomPlans, fetchStandardPlans } from "@/lib/sanity";
import { formatINR } from "@/lib/currency";
import type { CustomPlan, StandardPlan } from "@/types/cms";

const FALLBACK_STANDARD_PLANS: StandardPlan[] = [
  { _id: "pkg-1", planId: "pkg-1", title: "Discover", subgroup: "8-10", price: 5500, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Live webinar invites"] },
  { _id: "pkg-2", planId: "pkg-2", title: "Discover Plus+", subgroup: "8-10", price: 15000, features: ["Psychometric assessments", "8 career counselling sessions (1/year)", "Custom reports & study abroad guidance", "CV building"] },
  { _id: "pkg-3", planId: "pkg-3", title: "Achieve Online", subgroup: "10-12", price: 5999, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"] },
  { _id: "pkg-4", planId: "pkg-4", title: "Achieve Plus+", subgroup: "10-12", price: 10599, features: ["Psychometric assessment", "4 career counselling sessions", "Custom reports & study abroad guidance", "CV reviews"] },
  { _id: "pkg-5", planId: "pkg-5", title: "Ascend Online", subgroup: "college", price: 6499, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"] },
  { _id: "pkg-6", planId: "pkg-6", title: "Ascend Plus+", subgroup: "college", price: 10599, features: ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"] },
  { _id: "mp-3", planId: "mp-3", title: "Ascend Online", subgroup: "working", price: 6499, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"] },
  { _id: "mp-2", planId: "mp-2", title: "Ascend Plus+", subgroup: "working", price: 10599, features: ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"] },
];

const FALLBACK_CUSTOM_PLANS: CustomPlan[] = [
  { _id: "career-report", planId: "career-report", title: "Career Report", price: 1500, description: "Get a detailed report of your psychometric assessment for a scientific analysis of your interests. Find out where your interests lie and which future paths you can potentially consider." },
  { _id: "career-report-counselling", planId: "career-report-counselling", title: "Career Report + Career Counselling", price: 3000, description: "Connect with India's top career coaches to analyse your psychometric report and shortlist the top three career paths you're most likely to enjoy and excel at." },
  { _id: "knowledge-gateway", planId: "knowledge-gateway", title: "Knowledge Gateway + Career Helpline Access", price: 100, description: "Unlock holistic information on your career paths and get direct access to Mentoria's experts, who will resolve your career-related queries through our dedicated Career Helpline. Validate your career decisions from now until you land a job you love." },
  { _id: "one-to-one-session", planId: "one-to-one-session", title: "One-to-One Session with a Career Expert", price: 3500, description: "Resolve your career queries and glimpse into your future world through a one-on-one session with an expert from your chosen field." },
  { _id: "college-admission-planning", planId: "college-admission-planning", title: "College Admission Planning", price: 3000, description: "Get unbiased recommendations and details on your future college options in India and abroad, organised in one resourceful planner." },
  { _id: "exam-stress-management", planId: "exam-stress-management", title: "Exam Stress Management", price: 1000, description: "Get expert guidance on tackling exam stress, planning your study schedule, revision tips and more from India's top educators. Increase your chances of acing exams with a calm and clear mind." },
  { _id: "cap-100", planId: "cap-100", title: "College Admissions Planner - 100 (CAP-100)", price: 199, description: "₹199 for a ranked list of the top 100 colleges in your course. Get an expert-curated list of colleges based on verified cut-offs. CAP-100 ranks the top 100 colleges into four tiers to help you plan smarter: Indian Ivy League, Target, Smart Backup, and Safe Bet colleges. You can then shortlist colleges based on where you stand!" },
];

const TAB_ORDER = [
  { id: "8-10", label: "8-10 Students" },
  { id: "10-12", label: "10-12 Students" },
  { id: "college", label: "College Students" },
  { id: "working", label: "Working Professionals" },
] as const;

export default function MentoriaSection() {
  const [activeTab, setActiveTab] = useState<(typeof TAB_ORDER)[number]["id"]>("8-10");
  const [selectedPlan, setSelectedPlan] = useState<{ planId: string; title: string; price: number } | null>(null);

  const openCheckout = (plan: { planId: string; title: string; price: number }) => {
    setSelectedPlan(plan);
  };

  const { data: standardPlans = [] } = useQuery<StandardPlan[]>({
    queryKey: ["sanity-standard-plans"],
    queryFn: fetchStandardPlans,
  });

  const { data: customPlans = [] } = useQuery<CustomPlan[]>({
    queryKey: ["sanity-custom-plans"],
    queryFn: fetchCustomPlans,
  });

  const effectiveStandardPlans = standardPlans.length ? standardPlans : FALLBACK_STANDARD_PLANS;
  const effectiveCustomPlans = customPlans.length ? customPlans : FALLBACK_CUSTOM_PLANS;

  const groupedPlans = useMemo(() => {
    return effectiveStandardPlans.filter((plan) => plan.subgroup === activeTab);
  }, [activeTab, effectiveStandardPlans]);

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
                    <ul className="space-y-2 list-disc pl-5">
                      {plan.features.map((feature) => (
                        <li key={feature} className="text-sm text-muted-foreground">{feature}</li>
                      ))}
                    </ul>
                    <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => openCheckout(plan)}>
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
              {effectiveCustomPlans.map((plan) => (
                <Card key={plan._id} className="h-full">
                  <CardHeader>
                    <CardTitle>{plan.title}</CardTitle>
                    <div className="text-xl font-semibold text-primary">{formatINR(plan.price)}</div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                    <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => openCheckout(plan)}>
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
        planPrice={selectedPlan?.price ?? 0}
      />
    </>
  );
}
