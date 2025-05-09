/**
 * Generates a unique ID using current timestamp and random number
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

/**
 * Formats a date string to a more readable format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Calculates how complete a resume is
 */
export const calculateCompletion = (resume: any): number => {
  let totalFields = 0;
  let completedFields = 0;

  // Personal Info
  const personalInfoFields = Object.keys(resume.personalInfo).filter(
    (key) => key !== 'linkedin' && key !== 'website'
  );
  totalFields += personalInfoFields.length;
  completedFields += personalInfoFields.filter(
    (key) => resume.personalInfo[key]?.trim()
  ).length;

  // Education
  if (resume.education.length) {
    resume.education.forEach((edu: any) => {
      const eduFields = Object.keys(edu).filter((key) => key !== 'id');
      totalFields += eduFields.length;
      completedFields += eduFields.filter((key) => edu[key]?.toString().trim()).length;
    });
  } else {
    totalFields += 1; // Add at least one education expected
  }

  // Experience
  if (resume.experience.length) {
    resume.experience.forEach((exp: any) => {
      const expFields = Object.keys(exp).filter((key) => key !== 'id' && key !== 'current');
      totalFields += expFields.length;
      completedFields += expFields.filter((key) => exp[key]?.toString().trim()).length;
    });
  } else {
    totalFields += 1; // Add at least one experience expected
  }

  // Skills
  if (resume.skills.length) {
    totalFields += resume.skills.length * 2; // name and level
    completedFields += resume.skills.length * 2; // Assuming all skills have name and level
  } else {
    totalFields += 1; // At least one skill expected
  }

  const percentage = (completedFields / totalFields) * 100;
  return Math.min(Math.round(percentage), 100);
};

/**
 * Validates an email address
 */
export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validates a phone number
 */
export const validatePhone = (phone: string): boolean => {
  // Simple validation - can be enhanced based on requirements
  return phone.length >= 10;
};

/**
 * Safe JSON parse with fallback
 */
export const safeJsonParse = (str: string, fallback: any = null) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return fallback;
  }
};