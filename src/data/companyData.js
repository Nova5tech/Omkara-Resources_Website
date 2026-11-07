import { Users, HardHat, Code2 } from 'lucide-react';

export const company = {
  name: 'OMKARA RESOURCES',
  tagline: 'Building People | Building Structures | Building Futures',
  logo: '/images/omkara-logo.png',
  website: 'omkararesources.com',
  contact: {
    phone: '+91 89854 81447',
    email: 'communications@omkararesources.com',
    address:
      '14-1-1/G8, SSSB Vasam Twin Towers, Aditya Nagar, Hukumpet Post, Rajamundry – 533107',
    hours: 'Mon to Sat, 9:30 AM to 6:30 PM',
  },
  // Add real links only, e.g. { label: 'LinkedIn', href: 'https://...' }.
  // The footer shows social links only if this list has entries.
  socials: [],
};

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
];

// EDITABLE: confirm the real offerings and wording before publishing.
export const services = [
  {
    id: 'manpower',
    title: 'Manpower Supplies',
    icon: Users,
    short:
      'Workforce solutions designed to help organizations meet their staffing and operational requirements.',
    description:
      'We provide workforce solutions that help organisations meet their staffing and operational requirements. Whether you need people for a short-term requirement or an ongoing one, we work with you to understand the roles involved and support you in filling them.',
    categories: [
      'Skilled manpower',
      'Unskilled manpower',
      'Recruitment and staffing',
      'Contract manpower',
      'Workforce support',
    ],
    benefits: [
      'Staffing support shaped around your requirements',
      'Options for both short-term and ongoing needs',
      'Less time spent on recruitment effort',
      'Clear communication throughout the process',
    ],
  },
  {
    id: 'civil',
    title: 'Civil Constructions',
    icon: HardHat,
    short:
      'Civil construction and infrastructure-related services focused on professional project execution.',
    description:
      'We offer civil construction and infrastructure-related services with a focus on professional project execution. From planning through to delivery, we aim to keep projects organised, communicated clearly and built to a good standard.',
    categories: [
      'Building construction',
      'Civil engineering works',
      'Infrastructure development',
      'Construction planning',
      'Project execution',
    ],
    benefits: [
      'A structured approach from planning to completion',
      'Attention to quality in execution',
      'Clear communication on project progress',
      'Support across different kinds of civil work',
    ],
  },
  {
    id: 'it',
    title: 'IT Services',
    icon: Code2,
    short:
      'Technology-focused services designed to support digital operations and business requirements.',
    description:
      'We provide technology-focused services that support your digital operations and business requirements. We help you plan, build and maintain the tools and systems your organisation relies on.',
    categories: [
      'Software development',
      'Web development',
      'IT consulting',
      'Technical support',
      'Digital solutions',
    ],
    benefits: [
      'Solutions built around your business needs',
      'Guidance on choosing the right technology',
      'Ongoing technical support',
      'Services that can grow with your organisation',
    ],
  },
];