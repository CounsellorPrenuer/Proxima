import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "qbf8rv9m",
  dataset: "production",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_EDITOR_TOKEN,
  useCdn: false,
});

const standardPlans = [
  { _id: "standard-pkg-1", _type: "standardPlan", planId: "pkg-1", title: "Discover", subgroup: "8-10", price: 5500, sortOrder: 1, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Live webinar invites"] },
  { _id: "standard-pkg-2", _type: "standardPlan", planId: "pkg-2", title: "Discover Plus+", subgroup: "8-10", price: 15000, sortOrder: 2, features: ["Psychometric assessments", "8 career counselling sessions (1/year)", "Custom reports & study abroad guidance", "CV building"] },
  { _id: "standard-pkg-3", _type: "standardPlan", planId: "pkg-3", title: "Achieve Online", subgroup: "10-12", price: 5999, sortOrder: 3, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"] },
  { _id: "standard-pkg-4", _type: "standardPlan", planId: "pkg-4", title: "Achieve Plus+", subgroup: "10-12", price: 10599, sortOrder: 4, features: ["Psychometric assessment", "4 career counselling sessions", "Custom reports & study abroad guidance", "CV reviews"] },
  { _id: "standard-pkg-5", _type: "standardPlan", planId: "pkg-5", title: "Ascend Online", subgroup: "college", price: 6499, sortOrder: 5, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"] },
  { _id: "standard-pkg-6", _type: "standardPlan", planId: "pkg-6", title: "Ascend Plus+", subgroup: "college", price: 10599, sortOrder: 6, features: ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"] },
  { _id: "standard-mp-3", _type: "standardPlan", planId: "mp-3", title: "Ascend Online", subgroup: "working", price: 6499, sortOrder: 7, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"] },
  { _id: "standard-mp-2", _type: "standardPlan", planId: "mp-2", title: "Ascend Plus+", subgroup: "working", price: 10599, sortOrder: 8, features: ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"] },
];

const customPlans = [
  { _id: "custom-career-report", _type: "customPlan", planId: "career-report", title: "Career Report", price: 1500, sortOrder: 1, description: "Get a detailed report of your psychometric assessment for a scientific analysis of your interests. Find out where your interests lie and which future paths you can potentially consider." },
  { _id: "custom-career-report-counselling", _type: "customPlan", planId: "career-report-counselling", title: "Career Report + Career Counselling", price: 3000, sortOrder: 2, description: "Connect with India's top career coaches to analyse your psychometric report and shortlist the top three career paths you're most likely to enjoy and excel at." },
  { _id: "custom-knowledge-gateway", _type: "customPlan", planId: "knowledge-gateway", title: "Knowledge Gateway + Career Helpline Access", price: 100, sortOrder: 3, description: "Unlock holistic information on your career paths and get direct access to Mentoria's experts, who will resolve your career-related queries through our dedicated Career Helpline. Validate your career decisions from now until you land a job you love." },
  { _id: "custom-one-to-one-session", _type: "customPlan", planId: "one-to-one-session", title: "One-to-One Session with a Career Expert", price: 3500, sortOrder: 4, description: "Resolve your career queries and glimpse into your future world through a one-on-one session with an expert from your chosen field." },
  { _id: "custom-college-admission-planning", _type: "customPlan", planId: "college-admission-planning", title: "College Admission Planning", price: 3000, sortOrder: 5, description: "Get unbiased recommendations and details on your future college options in India and abroad, organised in one resourceful planner." },
  { _id: "custom-exam-stress-management", _type: "customPlan", planId: "exam-stress-management", title: "Exam Stress Management", price: 1000, sortOrder: 6, description: "Get expert guidance on tackling exam stress, planning your study schedule, revision tips and more from India's top educators. Increase your chances of acing exams with a calm and clear mind." },
  { _id: "custom-cap-100", _type: "customPlan", planId: "cap-100", title: "College Admissions Planner - 100 (CAP-100)", price: 199, sortOrder: 7, description: "₹199 for a ranked list of the top 100 colleges in your course. Get an expert-curated list of colleges based on verified cut-offs. CAP-100 ranks the top 100 colleges into four tiers to help you plan smarter: Indian Ivy League, Target, Smart Backup, and Safe Bet colleges. You can then shortlist colleges based on where you stand!" },
];

async function seed() {
  const allDocs = [...standardPlans, ...customPlans];
  for (const doc of allDocs) {
    await client.createOrReplace(doc);
  }
  console.log(`Seeded ${allDocs.length} docs`);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
