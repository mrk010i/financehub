import { StudentTip } from '../types';

export const STUDENT_FINANCIAL_TIPS: StudentTip[] = [
  {
    id: '1',
    title: 'Track Every Rupee',
    description: 'Even small expenses like chai and samosa add up. Track everything to see where your money goes.',
    category: 'budgeting',
    icon: '📱'
  },
  {
    id: '2',
    title: 'Cook More, Order Less',
    description: 'Home-cooked meals cost 60-70% less than ordering food. Save ₹3000+ monthly!',
    category: 'saving',
    icon: '🍳'
  },
  {
    id: '3',
    title: 'Student Discounts',
    description: 'Use your student ID for discounts on movies, transport, software, and online courses.',
    category: 'saving',
    icon: '🎓'
  },
  {
    id: '4',
    title: 'Emergency Fund First',
    description: 'Save ₹500-1000 monthly for emergencies. Start small, build the habit.',
    category: 'saving',
    icon: '🛡️'
  },
  {
    id: '5',
    title: 'Freelance Skills',
    description: 'Develop skills like content writing, tutoring, or graphic design for extra income.',
    category: 'earning',
    icon: '💻'
  },
  {
    id: '6',
    title: 'Buy Used Textbooks',
    description: 'Save 50-70% on textbooks by buying used or sharing with classmates.',
    category: 'saving',
    icon: '📚'
  },
  {
    id: '7',
    title: '50-30-20 Rule',
    description: '50% needs, 30% wants, 20% savings. Adapt percentages based on your pocket money.',
    category: 'budgeting',
    icon: '📊'
  },
  {
    id: '8',
    title: 'Start Investing Early',
    description: 'Even ₹500/month in SIP can grow to lakhs over time. Time is your biggest asset.',
    category: 'investing',
    icon: '📈'
  }
];

export const getRandomTip = (): StudentTip => {
  return STUDENT_FINANCIAL_TIPS[Math.floor(Math.random() * STUDENT_FINANCIAL_TIPS.length)];
};

export const getTipsByCategory = (category: StudentTip['category']): StudentTip[] => {
  return STUDENT_FINANCIAL_TIPS.filter(tip => tip.category === category);
};