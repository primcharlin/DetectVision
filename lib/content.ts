export type ProductId = "vision" | "voice" | "robot" | "camera";

export type Product = {
  id: ProductId;
  name: string;
  category: string;
  headline: string;
  summary: string;
  features: string[];
  pro?: string[];
};

export const products: Product[] = [
  {
    id: "vision",
    name: "D-Vision",
    category: "Smart monitoring",
    headline: "Spot problems the moment they happen",
    summary:
      "Real-time AI monitoring that spots incidents, anomalies and after-hours activity as they happen, so problems surface before they cost you.",
    features: ["Anomaly event detection", "Camera access management"],
    pro: ["POS integration"],
  },
  {
    id: "voice",
    name: "D-Voice",
    category: "AI receptionist",
    headline: "Never miss another call",
    summary:
      "An AI that answers every call with natural conversation in English and Mandarin, 24/7, turning missed calls into booked tables.",
    features: [
      "Clear answers on pricing, hours and directions",
      "A clean summary of every call, delivered to you",
      "Forwards to your team when a real person is needed",
    ],
    pro: ["Mandarin conversation"],
  },
  {
    id: "robot",
    name: "D-ROBOT",
    category: "Service robots",
    headline: "Keep food moving through the rush",
    summary:
      "Service robots on the floor, dispatched and supervised from the same operations console as everything else.",
    features: ["Food delivery robot", "Dispatched from the operations console"],
    pro: ["Robot with AI function"],
  },
  {
    id: "camera",
    name: "D-Camera",
    category: "Enterprise hardware",
    headline: "Cameras built for around-the-clock work",
    summary:
      "High-definition, enterprise-certified cameras with NVR and storage, engineered for stable, around-the-clock operation.",
    features: [
      "8CH / 16CH NVR bundles with 4TB storage",
      "5MP (2K+) cameras, NDAA & TAA compliant",
      "Enterprise-grade, non-consumer hardware",
    ],
  },
];

/**
 * Pricing from the current detectvision.ai cards.
 * NOTE: the live site lists "Base / Pro" but shows the higher price first. Here Base = lower price, Pro = higher. Confirm.
 */
export const pricing: {
  id: ProductId;
  name: string;
  popular?: boolean;
  unit: "/month" | "one-time";
  base: number;
  pro: number;
  note?: string;
  blurb: string;
  base_features: string[];
  pro_features: string[];
}[] = [
  {
    id: "vision",
    name: "D-Vision",
    popular: true,
    unit: "/month",
    base: 99,
    pro: 149,
    blurb: "Real-time proactive monitoring to resolve immediate operational issues.",
    base_features: ["Anomaly event detection", "Camera access management"],
    pro_features: ["POS integration"],
  },
  {
    id: "voice",
    name: "D-Voice",
    unit: "/month",
    base: 99,
    pro: 149,
    blurb: "An AI receptionist that answers every call in natural English and Mandarin, 24/7.",
    base_features: ["24/7 AI call answering", "English conversation", "150 calls included"],
    pro_features: ["Mandarin conversation"],
  },
  {
    id: "robot",
    name: "D-ROBOT",
    unit: "/month",
    base: 450,
    pro: 600,
    note: "or US$15 / day",
    blurb: "Service robots on the floor, dispatched and supervised from the same console.",
    base_features: ["Food delivery robot"],
    pro_features: ["Robot with AI function"],
  },
  {
    id: "camera",
    name: "D-Camera",
    unit: "one-time",
    base: 1500,
    pro: 2000,
    blurb: "High-definition, enterprise-certified cameras for around-the-clock operation.",
    base_features: ["NDAA & TAA compliant", "Enterprise-grade, non-consumer hardware", "8CH NVR + 1× 4TB HDD + 8× 5MP (2K+) cameras"],
    pro_features: [],
  },
];

export const solutions = [
  {
    slug: "never-miss-a-call",
    name: "Never miss a call",
    products: ["D-Voice"],
    problem: "Calls come in during the rush, after closing and on weekends. Every one that rings out is a booking that went somewhere else.",
    answer: "D-Voice picks up instantly, every time, in English or Mandarin. It books tables, answers questions and sends you a summary of every call.",
    outcomes: ["Every call answered, 24/7", "Bookings made while you’re closed", "A clean summary of every call"],
  },
  {
    slug: "catch-problems-early",
    name: "Catch problems early",
    products: ["D-Vision", "D-Camera"],
    problem: "Cameras record everything, but no one has time to watch them. Incidents are usually found hours later.",
    answer: "D-Vision watches in real time and flags incidents, anomalies and after-hours activity the moment they happen.",
    outcomes: ["Anomaly event detection", "Alerts for after-hours activity", "Detects activity and events, not identities"],
  },
  {
    slug: "faster-service",
    name: "Serve guests faster",
    products: ["D-ROBOT"],
    problem: "At peak hours, staff spend their time walking plates instead of looking after guests.",
    answer: "D-ROBOT carries food from the kitchen to the table, so your team can stay where guests need them.",
    outcomes: ["Food delivery through the rush", "Dispatched from one console", "Staff free to focus on guests"],
  },
  {
    slug: "know-your-numbers",
    name: "Know your numbers",
    products: ["D-Vision Pro"],
    problem: "Sales, cameras and reviews live in different places, so it’s hard to see what’s really driving the day.",
    answer: "With POS integration, DetectVision puts revenue next to what’s happening on the floor, and shows where you’re losing business.",
    outcomes: ["Revenue alongside real-time events", "A free analysis of your online presence", "Clear next steps, not just charts"],
  },
];

export const industries = [
  {
    slug: "restaurants",
    products: ["D-Voice", "D-ROBOT", "D-Vision", "D-Camera"],
    name: "Restaurants",
    summary: "From the phone line to the dining room, keep every table turning.",
    uses: ["D-Voice books tables 24/7, even after closing", "D-ROBOT runs food from the kitchen to the table", "D-Vision flags incidents on the floor and after hours"],
  },
  {
    slug: "cafes",
    products: ["D-Voice", "D-Vision", "D-Camera"],
    name: "Cafés & quick service",
    summary: "Short staffed at the rush? Let the AI answer the phone and watch the floor.",
    uses: ["Answer questions about hours, menu and directions automatically", "Spot unusual activity at the counter as it happens", "See sales next to what’s happening in store"],
  },
  {
    slug: "retail",
    products: ["D-Vision", "D-Camera"],
    name: "Retail",
    summary: "Understand your store the way your best manager does.",
    uses: ["Real-time alerts for incidents and after-hours activity", "Control who can see which cameras", "Enterprise cameras built to run around the clock"],
  },
  {
    slug: "hospitality",
    products: ["D-Voice", "D-ROBOT", "D-Vision"],
    name: "Hotels & hospitality",
    summary: "Look after guests in two languages, day and night.",
    uses: ["Answer guest calls in English and Mandarin, 24/7", "Service robots for deliveries", "Monitor lobbies and back-of-house areas"],
  },
  {
    slug: "multi-location",
    products: ["D-Vision", "D-Voice", "D-ROBOT", "D-Camera"],
    name: "Multi-location groups",
    summary: "Every location in one private, secure system.",
    uses: ["One console across all locations", "Consistent hardware at every site", "Compare locations side by side"],
  },
];

export const stats = [
  { value: "300+", label: "Customers" },
  { value: "60+", label: "Cities covered" },
];

/** The four "By the numbers" figures on detectvision.ai animate from 0, so the real values need to be supplied. */
export const results = [
  { value: "[X]%", label: "Average 90-day revenue lift" },
  { value: "[X]%", label: "Detection accuracy" },
  { value: "[X]+", label: "Deliveries per robot per day" },
  { value: "[X]%", label: "Forecast accuracy" },
];

export const testimonial = {
  quote: "DetectVision isn’t just software. It’s a smart, reliable teammate built to grow with your business.",
  name: "[Customer name]",
  role: "[Business, city]",
};

export const faqs = [
  {
    q: "What exactly does DetectVision do?",
    a: "It’s a real-time AI operating system for your business. It brings everything that keeps you running, from day-to-day operations to smart cameras and delivery robots, into one private, secure system that helps you make better decisions, faster.",
  },
  {
    q: "Do I need any technical experience to get started?",
    a: "None at all. If you can use a phone, computer or tablet, you can use DetectVision. Our specialists handle the full setup for you and walk your team through how to use it day to day.",
  },
  {
    q: "Will it work with my existing cameras and hardware?",
    a: "Yes. The platform supports multi-camera integration and both cloud and on-premise deployment, so it fits into the setup you already have.",
  },
  {
    q: "Is my data secure and private?",
    a: "Absolutely. We follow secure, compliant data practices, and our cameras detect activity and events, not identities, so monitoring never relies on facial recognition.",
  },
  {
    q: "How much does it cost?",
    a: "Pricing is simple and transparent. Each product has a Base and a Pro plan (see pricing), and you can add extra features and customization whenever you need them. Get in touch and we’ll help you build the right fit.",
  },
];
