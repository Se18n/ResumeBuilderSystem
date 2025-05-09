export const RESUME_TEMPLATES = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with a focus on readability',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional resume layout favored by established industries',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simplified design that puts content first',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold design for creative industries and positions',
  },
];

export const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export const EMPTY_RESUME = {
  id: '',
  title: 'Untitled Resume',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  template: 'modern',
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    website: '',
    summary: '',
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
};