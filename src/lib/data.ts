import {
  Eye,
  Glasses,
  Contact,
  Stethoscope,
  ScanEye,
  Baby,
  HeartPulse,
  Microscope,
  ShieldCheck,
  Sparkles,
  Clock,
  Award,
  Users,
  ThumbsUp,
  type LucideIcon,
} from "lucide-react";

export const business = {
  name: "Islamabad Optical & Clinic",
  shortName: "Islamabad Optical",
  tagline: "Clarity You Can Trust",
  taglineUrdu: "آپ کی بینائی، ہماری ذمہ داری",
  description:
    "A premier optical shop and eye clinic delivering comprehensive vision care, premium eyewear, and advanced diagnostics — all under one roof in Islamabad.",
  phone: "+92 51 111 000 111",
  phoneRaw: "+9251111000111",
  whatsapp: "+923001234567",
  whatsappRaw: "923001234567",
  email: "info@islamabadoptical.pk",
  address: "Main Road, Islamabad — Rawalpindi Region, Pakistan",
  addressShort: "Islamabad, Pakistan",
  // Google Maps embed center (from client's Google Maps link)
  mapLat: 33.1882027,
  mapLng: 73.139836,
  mapQuery: "Islamabad Optical & Clinic",
  hours: [
    { day: "Monday – Friday", time: "9:00 AM – 8:00 PM" },
    { day: "Saturday", time: "10:00 AM – 7:00 PM" },
    { day: "Sunday", time: "11:00 AM – 5:00 PM" },
  ],
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    whatsapp: "https://wa.me/923001234567",
  },
};

export const stats: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "15+", label: "Years of Excellence", icon: Award },
  { value: "25K+", label: "Happy Patients", icon: Users },
  { value: "10K+", label: "Frames Dispensed", icon: Glasses },
  { value: "98%", label: "Satisfaction Rate", icon: ThumbsUp },
];

export const services: {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  price?: string;
}[] = [
  {
    icon: Eye,
    title: "Comprehensive Eye Exams",
    description:
      "State-of-the-art diagnostic eye examinations performed by certified optometrists to assess your complete visual health.",
    features: ["Visual acuity testing", "Refraction assessment", "Eye pressure check", "Color vision test"],
    price: "From Rs. 1,500",
  },
  {
    icon: Glasses,
    title: "Prescription Eyewear",
    description:
      "A curated collection of premium frames and precision lenses tailored to your prescription, face shape, and lifestyle.",
    features: ["Designer frames", "Anti-reflective lenses", "Blue-light protection", "Photochromic options"],
    price: "From Rs. 4,500",
  },
  {
    icon: Contact,
    title: "Contact Lenses",
    description:
      "Soft, RGP, and specialty contact lenses fitted with expert guidance for optimal comfort and crystal-clear vision.",
    features: ["Daily & monthly lenses", "Toric for astigmatism", "Multifocal lenses", "Free fitting session"],
    price: "From Rs. 2,800",
  },
  {
    icon: ScanEye,
    title: "Retinal & OCT Imaging",
    description:
      "Advanced retinal photography and optical coherence tomography for early detection of eye diseases.",
    features: ["Digital retinal scan", "Glaucoma screening", "Macular assessment", "Diabetic eye check"],
    price: "From Rs. 3,000",
  },
  {
    icon: Baby,
    title: "Pediatric Eye Care",
    description:
      "Gentle, child-friendly vision care including squint assessment and amblyopia (lazy eye) management.",
    features: ["Children's vision test", "Squint evaluation", "Lazy eye therapy", "Myopia control"],
    price: "From Rs. 2,000",
  },
  {
    icon: Stethoscope,
    title: "Eye Disease Management",
    description:
      "Diagnosis and management of common eye conditions with referrals to specialist surgeons when needed.",
    features: ["Cataract evaluation", "Glaucoma care", "Dry eye treatment", "Allergy management"],
    price: "Consultation",
  },
];

export const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Award,
    title: "Certified Specialists",
    description:
      "Our optometrists and opticians are fully qualified and continually trained on the latest in vision science.",
  },
  {
    icon: Microscope,
    title: "Advanced Technology",
    description:
      "We invest in cutting-edge diagnostic equipment to deliver accurate, early, and reliable results.",
  },
  {
    icon: ShieldCheck,
    title: "Genuine Products",
    description:
      "Only authentic, warrantied frames and lenses from trusted global and local brands.",
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description:
      "Most single-vision glasses are ready the same or next day — vision shouldn't wait.",
  },
  {
    icon: Sparkles,
    title: "Personalized Care",
    description:
      "Every recommendation is tailored to your eyes, your style, and your budget — never one-size-fits-all.",
  },
  {
    icon: HeartPulse,
    title: "Holistic Approach",
    description:
      "We look beyond the prescription — screening for systemic conditions that show signs in the eyes.",
  },
];

export const products: {
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
}[] = [
  {
    name: "Designer Optical Frames",
    category: "Eyewear",
    description: "Hand-picked designer frames blending fashion and durability for everyday elegance.",
    price: "From Rs. 6,500",
    image: "/images/glasses-collection.jpg",
    badge: "Best Seller",
  },
  {
    name: "Daily Contact Lenses",
    category: "Contact Lenses",
    description: "Ultra-thin, breathable daily lenses for all-day comfort and hygiene.",
    price: "From Rs. 2,800",
    image: "/images/contact-lenses.jpg",
    badge: "Popular",
  },
  {
    name: "Blue-Light Lenses",
    category: "Lenses",
    description: "Advanced blue-light filtering lenses that protect your eyes during screen time.",
    price: "From Rs. 5,500",
    image: "/images/eye-exam.jpg",
    badge: "New",
  },
  {
    name: "Sunglasses Collection",
    category: "Eyewear",
    description: "UV-protective sunglasses with polarized lenses in timeless, stylish designs.",
    price: "From Rs. 4,000",
    image: "/images/hero-eye.jpg",
  },
];

export const team: {
  name: string;
  role: string;
  qualifications: string;
  image: string;
  bio: string;
}[] = [
  {
    name: "Dr. Ahmed Raza Malik",
    role: "Chief Optometrist & Founder",
    qualifications: "OD, FAAO — 18 yrs experience",
    image: "/images/doctor-1.jpg",
    bio: "Dr. Ahmed founded the clinic with a vision to bring world-class eye care to Islamabad. He specializes in complex refraction and contact lens fitting.",
  },
  {
    name: "Dr. Sana Tariq",
    role: "Consultant Optometrist",
    qualifications: "MPhil Optometry — 12 yrs experience",
    image: "/images/doctor-2.jpg",
    bio: "Dr. Sana leads our pediatric and low-vision services, with a gentle approach loved by children and seniors alike.",
  },
  {
    name: "Bilal Hussain",
    role: "Senior Optician & Lab Lead",
    qualifications: "Dip. Opticianry — 10 yrs experience",
    image: "/images/doctor-3.jpg",
    bio: "Bilal crafts and fits every pair of glasses with precision, ensuring your lenses are accurate and your frames sit perfectly.",
  },
];

export const testimonials: {
  name: string;
  role: string;
  rating: number;
  text: string;
  initials: string;
}[] = [
  {
    name: "Ayesha Khan",
    role: "Teacher, Islamabad",
    rating: 5,
    initials: "AK",
    text: "The most thorough eye exam I've ever had. The staff explained everything clearly and helped me pick frames that suit my face perfectly. Highly recommended!",
  },
  {
    name: "Mohammad Imran",
    role: "Software Engineer",
    rating: 5,
    initials: "MI",
    text: "Got my blue-light glasses here and my screen headaches are gone. Quick service, fair prices, and genuinely caring doctors. Will return with my family.",
  },
  {
    name: "Fatima Noor",
    role: "Parent",
    rating: 5,
    initials: "FN",
    text: "Brought my daughter for her first eye check. Dr. Sana was incredibly patient and kind. The whole experience was stress-free and professional.",
  },
  {
    name: "Usman Ghani",
    role: "Business Owner",
    rating: 5,
    initials: "UG",
    text: "Been a customer for 5 years. The consistency in quality and care is remarkable. Their contact lens fitting service is the best in the city.",
  },
  {
    name: "Zainab Ali",
    role: "University Student",
    rating: 5,
    initials: "ZA",
    text: "Affordable, stylish, and professional. Found my dream frames within budget and got them the next day. Couldn't ask for more!",
  },
];

export const faqs: { question: string; answer: string }[] = [
  {
    question: "How often should I get an eye exam?",
    answer:
      "Adults should have a comprehensive eye exam every 1–2 years, and annually after age 40. Children, contact lens wearers, and those with diabetes or a family history of eye disease should be seen yearly. Our optometrists will recommend a schedule tailored to you.",
  },
  {
    question: "Do I need an appointment, or can I walk in?",
    answer:
      "We welcome walk-ins, but we strongly recommend booking an appointment to guarantee your slot and minimize waiting time. You can book online in under a minute using the appointment form on this page.",
  },
  {
    question: "How long does it take to get my glasses ready?",
    answer:
      "Most single-vision prescriptions are ready the same or next business day. Bifocals, progressives, and specialized coatings typically take 2–4 working days depending on the lens complexity.",
  },
  {
    question: "Do you accept insurance?",
    answer:
      "We accept most major health insurance plans that include vision coverage. Please bring your insurance card to your appointment, and our team will verify your coverage and assist with the paperwork.",
  },
  {
    question: "What brands of frames and lenses do you carry?",
    answer:
      "We stock a curated mix of international designer brands and high-quality local frames, paired with precision lenses from leading manufacturers. Our opticians will help you find the perfect match for your style, needs, and budget.",
  },
  {
    question: "Can you fit contact lenses if I have astigmatism?",
    answer:
      "Absolutely. We specialize in fitting toric contact lenses for astigmatism, as well as multifocal and specialty lenses. A proper fitting ensures comfort, health, and crisp vision — book a contact lens consultation today.",
  },
];

export const steps: { step: string; title: string; description: string; icon: LucideIcon }[] = [
  {
    step: "01",
    title: "Book Your Visit",
    description: "Reserve your slot online or by phone in under a minute. Pick the service and time that suits you.",
    icon: Clock,
  },
  {
    step: "02",
    title: "Expert Examination",
    description: "Our optometrist performs a thorough, painless eye exam using advanced diagnostic technology.",
    icon: Stethoscope,
  },
  {
    step: "03",
    title: "Personalized Solution",
    description: "Get clear recommendations — prescription, eyewear, or treatment — tailored to your eyes and lifestyle.",
    icon: Sparkles,
  },
  {
    step: "04",
    title: "Ongoing Care",
    description: "Leave with your solution in hand and follow-up reminders so your vision stays sharp for years.",
    icon: HeartPulse,
  },
];

export const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
];
