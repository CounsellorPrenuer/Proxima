# PROXIMA Website Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from trusted wellness and educational platforms like Calm, Headspace, and Coursera - combining professional credibility with approachable warmth. The design emphasizes trust, expertise, and accessibility for students, parents, and professionals seeking guidance.

## Core Design Principles
- **Trust Through Clarity**: Clean layouts with generous whitespace to convey professionalism
- **Warm Professionalism**: Balance clinical credibility with approachable, empathetic design
- **Guided Experience**: Clear visual hierarchy directing users toward consultation and services
- **Credibility Signals**: Strategic placement of credentials, years of experience, and partnerships

## Color Palette

**Primary Colors**:
- Medium Blue: 222 45% 50% (#4567B7) - primary brand, headers, CTAs
- Sky Blue: 197 71% 73% (#87CEEB) - accent, highlights, interactive elements
- Pure White: 0 0% 100% (backgrounds, cards)

**Supporting Colors**:
- Light Sky Blue: 197 40% 92% (section backgrounds, subtle highlights)
- Soft Blue Grey: 197 20% 85% (borders, dividers)
- Deep Navy Blue: 222 50% 25% (text, footer)
- Success Green: 150 60% 45% (confirmation states for Razorpay)

**Color Strategy**: The soft blue palette (#87CEEB, #4567B7) creates a calming, trustworthy atmosphere that's both professional and approachable - perfect for educational and counseling services.

**Avoid**: Bright yellows, harsh reds, or overly saturated colors that undermine professional trust.

## Typography

**Font Stack**:
- **Primary**: 'Inter' or 'DM Sans' (Google Fonts) - clean, modern, highly readable
- **Headings**: 'Poppins' Medium/SemiBold - friendly authority
- **Body**: 'Inter' Regular - optimal readability for long-form content

**Scale**:
- Hero Headlines: text-5xl to text-6xl (font-semibold)
- Section Titles: text-3xl to text-4xl (font-semibold)
- Card Headers: text-xl to text-2xl (font-medium)
- Body Text: text-base to text-lg (font-normal, leading-relaxed)
- Small Labels: text-sm (text-gray-600)

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Component padding: p-6, p-8
- Section spacing: py-16, py-20, py-24
- Card gaps: gap-6, gap-8
- Container max-width: max-w-7xl

**Grid Strategy**:
- Why PROXIMA cards: 3-column desktop (lg:grid-cols-3), 2-column tablet, 1-column mobile
- Services: 3 main category cards, 2-column layout for tablet
- Blog articles: 2-column grid (md:grid-cols-2)
- Testimonials: 3-card slider/carousel

## Component Library

**Navigation**:
- Sticky header with blur backdrop (backdrop-blur-md bg-white/90)
- Logo (image 1) on left, nav links center, CTAs on right
- Smooth shadow on scroll (shadow-sm)
- Mobile: Hamburger menu with slide-in drawer

**Hero Section**:
- Full-width gradient background (from-blue-50 via-purple-50 to-blue-50)
- Large inspiring image or abstract pattern as background
- Centered content with max-w-4xl container
- Headline + subtext + primary CTA button
- Soft floating elements or subtle particles for depth

**Cards**:
- Rounded corners: rounded-xl to rounded-2xl
- Soft shadows: shadow-md hover:shadow-lg transition
- White backgrounds with subtle borders (border border-gray-200)
- Icon + title + description pattern for feature cards
- Hover lift effect: hover:-translate-y-1

**Buttons**:
- Primary CTA: bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3
- Secondary: border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full
- Payment CTAs: Razorpay brand green for checkout actions
- Consistent rounded-full shape with shadow-sm

**About Ashu Section**:
- Two-column layout: Professional photo (image 2) on left, biography on right
- Photo: rounded-2xl with subtle shadow
- Highlight credentials with badge-style elements
- Warm, approachable copy emphasizing empathy + expertise

**Mentoria Partnership Section**:
- Dedicated full section with Mentoria branding integration
- 4-step process visualized with numbered cards or timeline
- Icon representations for: Assessment, Counselling, Career Library, Webinars
- Emphasize 12,000+ career options and certified counsellor access
- CTA: "Start Your Career Discovery" linking to consultation booking

**Services Grid**:
- Three main category cards with icons (Counselling, Educational, Workshops)
- Expandable details or modal for pricing
- Razorpay integration: "Book Now" buttons with secure payment flow
- Clear pricing display with optional packages

**Razorpay Integration**:
- Secure checkout modal with PROXIMA branding
- Payment confirmation with receipt generation
- Success states with green checkmarks
- Test mode indicator for development

**Testimonials**:
- Card-based carousel with client quotes
- Photo placeholders, name, designation
- 5-star ratings display
- Auto-rotating slider with manual controls

**Blog/Resources**:
- Featured article cards with images
- Title + excerpt + "Read More" link
- Grid layout with consistent card heights
- Category tags (Cyber Security, Career, Mental Health, Education)

**Contact Section**:
- Split layout: Contact form on left, details + map placeholder on right
- Social icons with hover color transitions
- Prominent "Book Free Consultation" CTA
- Contact details with icons (phone, email, location)

**Footer**:
- Dark background (bg-navy-900)
- Three columns: About PROXIMA, Quick Links, Contact Info
- Social media icons
- Copyright + legal links (Privacy, Terms)

## Images

**Logo (Image 1)**: Header navigation (h-12 to h-16), retina-ready

**Ashu Manchanda Photo (Image 2)**: About section, professional portrait, rounded corners, max-w-md

**Hero Background**: Inspiring educational imagery or soft abstract pattern conveying growth/guidance

**Service Icons**: Use Heroicons or Lucide React for consistency (Book, Users, Lightbulb, Award, etc.)

**Blog Thumbnails**: Placeholder images for articles (768x512px recommended)

## Animations

**Framer Motion Effects** (minimal, purposeful):
- Section fade-in on scroll: opacity 0→1, y 20→0, duration 0.6s
- Card hover lifts: slight translateY and shadow increase
- CTA button hover: subtle scale (1.02) and shadow depth
- Page transitions: smooth fade between sections
- NO complex scroll-triggered animations or parallax

## Accessibility & Polish

- High contrast ratios (WCAG AA minimum)
- Focus states on all interactive elements (ring-2 ring-blue-500)
- Smooth scroll behavior for anchor links
- Mobile-first responsive breakpoints (sm, md, lg, xl)
- Loading states for Razorpay payment processing
- Error handling with clear user feedback

## Layout Structure

1. **Header** (sticky, h-20)
2. **Hero** (min-h-screen with gradient)
3. **About Ashu** (py-20, two-column)
4. **Why PROXIMA** (py-20, 6-card grid)
5. **Mentoria Partnership** (py-24, featured section with branding)
6. **Services** (py-20, 3-category grid with pricing)
7. **Testimonials** (py-20, carousel)
8. **Blog/Resources** (py-20, article grid)
9. **Contact** (py-24, split layout)
10. **Footer** (bg-dark, py-12)

This design balances professional credibility with approachable warmth, ensuring users feel confident in PROXIMA's expertise while maintaining accessibility and trust throughout their journey.