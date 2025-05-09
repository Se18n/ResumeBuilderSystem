import { Resume } from '../types/Resume';
import { generateId } from '../utils/helpers';

const STORAGE_KEY = 'resume_builder_data';

/**
 * Get all resumes from localStorage
 */
export const getAllResumes = (): Resume[] => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

/**
 * Get a single resume by ID
 */
export const getResumeById = (id: string): Resume | null => {
  const resumes = getAllResumes();
  return resumes.find(resume => resume.id === id) || null;
};

/**
 * Create a new resume
 */
export const createResume = (resumeData: Omit<Resume, 'id' | 'createdAt' | 'updatedAt'>): Resume => {
  const resumes = getAllResumes();
  
  const newResume: Resume = {
    ...resumeData,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...resumes, newResume]));
  
  return newResume;
};

/**
 * Update an existing resume
 */
export const updateResume = (id: string, resumeData: Partial<Resume>): Resume | null => {
  const resumes = getAllResumes();
  const index = resumes.findIndex(resume => resume.id === id);
  
  if (index === -1) return null;
  
  const updatedResume: Resume = {
    ...resumes[index],
    ...resumeData,
    updatedAt: new Date().toISOString()
  };
  
  resumes[index] = updatedResume;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
  
  return updatedResume;
};

/**
 * Delete a resume by ID
 */
export const deleteResume = (id: string): boolean => {
  const resumes = getAllResumes();
  const filteredResumes = resumes.filter(resume => resume.id !== id);
  
  if (filteredResumes.length === resumes.length) {
    return false; // Resume not found
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredResumes));
  return true;
};

/**
 * Duplicate a resume
 */
export const duplicateResume = (id: string): Resume | null => {
  const resume = getResumeById(id);
  
  if (!resume) return null;
  
  const duplicatedResume: Resume = {
    ...resume,
    id: generateId(),
    title: `${resume.title} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  const resumes = getAllResumes();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...resumes, duplicatedResume]));
  
  return duplicatedResume;
};