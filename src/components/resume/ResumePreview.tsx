import React from 'react';
import { Resume } from '../../types/Resume';

interface ResumePreviewProps {
  resume: Resume;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resume }) => {
  const getTemplateClass = () => {
    switch (resume.template) {
      case 'modern':
        return 'bg-white';
      case 'classic':
        return 'bg-white border-t-4 border-blue-600';
      case 'minimal':
        return 'bg-white';
      case 'creative':
        return 'bg-gradient-to-br from-indigo-50 to-white';
      default:
        return 'bg-white';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  const formatDateRange = (startDate: string, endDate: string, current?: boolean) => {
    const start = formatDate(startDate);
    
    if (current) {
      return `${start} - Present`;
    }
    
    const end = formatDate(endDate);
    return end ? `${start} - ${end}` : start;
  };

  return (
    <div className={`shadow-lg mx-auto rounded ${getTemplateClass()} max-w-[900px] min-h-[842px] p-8 print:shadow-none print:p-0`}>
      {/* Header Section */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{resume.personalInfo.firstName} {resume.personalInfo.lastName}</h1>
        
        <div className="text-sm text-gray-600 space-y-1">
          {resume.personalInfo.address && <div>{resume.personalInfo.address}</div>}
          
          <div className="flex flex-wrap justify-center gap-x-4">
            {resume.personalInfo.phone && <span>{resume.personalInfo.phone}</span>}
            {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
            {resume.personalInfo.linkedin && <span>{resume.personalInfo.linkedin}</span>}
            {resume.personalInfo.website && <span>{resume.personalInfo.website}</span>}
          </div>
        </div>
      </div>
      
      {/* Summary Section */}
      {resume.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 pb-1 border-b border-gray-200">Professional Summary</h2>
          <p className="text-gray-700">{resume.personalInfo.summary}</p>
        </div>
      )}
      
      {/* Experience Section */}
      {resume.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b border-gray-200">Experience</h2>
          
          <div className="space-y-4">
            {resume.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-semibold text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-600">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                
                <div className="flex justify-between items-baseline">
                  <h4 className="text-base text-gray-700">{exp.company}</h4>
                  <span className="text-sm text-gray-600">{exp.location}</span>
                </div>
                
                <p className="mt-1 text-sm text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Education Section */}
      {resume.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b border-gray-200">Education</h2>
          
          <div className="space-y-4">
            {resume.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-semibold text-gray-900">{edu.degree} in {edu.fieldOfStudy}</h3>
                  <span className="text-sm text-gray-600">
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </span>
                </div>
                
                <h4 className="text-base text-gray-700">{edu.institution}</h4>
                
                {edu.description && (
                  <p className="mt-1 text-sm text-gray-700">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Skills Section */}
      {resume.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b border-gray-200">Skills</h2>
          
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill) => (
              <div key={skill.id} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                {skill.name}
                <span className="ml-1 text-xs text-gray-500">
                  ({skill.level})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Projects Section */}
      {resume.projects.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b border-gray-200">Projects</h2>
          
          <div className="space-y-4">
            {resume.projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-semibold text-gray-900">{project.name}</h3>
                  <span className="text-sm text-gray-600">
                    {formatDateRange(project.startDate, project.endDate || '')}
                  </span>
                </div>
                
                <p className="mt-1 text-sm text-gray-700">{project.description}</p>
                
                {project.technologies.length > 0 && (
                  <div className="mt-1">
                    <span className="text-sm text-gray-600">Technologies: </span>
                    <span className="text-sm text-gray-700">{project.technologies.join(', ')}</span>
                  </div>
                )}
                
                {project.url && (
                  <div className="mt-1">
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                      {project.url}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;