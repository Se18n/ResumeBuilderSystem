import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Resume } from '../types/Resume';
import { getAllResumes, getResumeById, createResume, updateResume, deleteResume, duplicateResume } from '../services/resumeService';
import { EMPTY_RESUME } from '../utils/constants';

interface ResumeContextType {
  resumes: Resume[];
  currentResume: Resume | null;
  loading: boolean;
  error: string | null;
  fetchResumes: () => void;
  fetchResumeById: (id: string) => void;
  createNewResume: (resumeData: Omit<Resume, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCurrentResume: (resumeData: Partial<Resume>) => void;
  removeResume: (id: string) => void;
  duplicateResumeById: (id: string) => void;
  setCurrentResume: (resume: Resume | null) => void;
  resetToEmptyResume: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [currentResume, setCurrentResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchResumes = () => {
    try {
      setLoading(true);
      const data = getAllResumes();
      setResumes(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch resumes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchResumeById = (id: string) => {
    try {
      setLoading(true);
      const resume = getResumeById(id);
      if (resume) {
        setCurrentResume(resume);
        setError(null);
      } else {
        setError('Resume not found');
      }
    } catch (err) {
      setError('Failed to fetch resume');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createNewResume = (resumeData: Omit<Resume, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      const newResume = createResume(resumeData);
      setResumes([...resumes, newResume]);
      setCurrentResume(newResume);
      setError(null);
    } catch (err) {
      setError('Failed to create resume');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateCurrentResume = (resumeData: Partial<Resume>) => {
    if (!currentResume) {
      setError('No resume selected');
      return;
    }

    try {
      setLoading(true);
      const updated = updateResume(currentResume.id, resumeData);
      
      if (updated) {
        setCurrentResume(updated);
        setResumes(resumes.map(r => r.id === updated.id ? updated : r));
        setError(null);
      } else {
        setError('Failed to update resume');
      }
    } catch (err) {
      setError('Failed to update resume');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeResume = (id: string) => {
    try {
      setLoading(true);
      const success = deleteResume(id);
      
      if (success) {
        setResumes(resumes.filter(r => r.id !== id));
        if (currentResume?.id === id) {
          setCurrentResume(null);
        }
        setError(null);
      } else {
        setError('Failed to delete resume');
      }
    } catch (err) {
      setError('Failed to delete resume');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const duplicateResumeById = (id: string) => {
    try {
      setLoading(true);
      const duplicated = duplicateResume(id);
      
      if (duplicated) {
        setResumes([...resumes, duplicated]);
        setError(null);
      } else {
        setError('Failed to duplicate resume');
      }
    } catch (err) {
      setError('Failed to duplicate resume');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetToEmptyResume = () => {
    setCurrentResume({
      ...EMPTY_RESUME,
      id: 'temp-' + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const contextValue: ResumeContextType = {
    resumes,
    currentResume,
    loading,
    error,
    fetchResumes,
    fetchResumeById,
    createNewResume,
    updateCurrentResume,
    removeResume,
    duplicateResumeById,
    setCurrentResume,
    resetToEmptyResume
  };

  return (
    <ResumeContext.Provider value={contextValue}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};