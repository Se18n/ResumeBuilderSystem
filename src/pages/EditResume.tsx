import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Pencil } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Card, { CardBody } from '../components/ui/Card';
import Alert from '../components/ui/Alert';
import PersonalInfoForm from '../components/resume/PersonalInfoForm';
import EducationForm from '../components/resume/EducationForm';
import ExperienceForm from '../components/resume/ExperienceForm';
import SkillsForm from '../components/resume/SkillsForm';
import ProjectsForm from '../components/resume/ProjectsForm';
import ResumePreview from '../components/resume/ResumePreview';
import { useResume } from '../context/ResumeContext';
import { RESUME_TEMPLATES } from '../utils/constants';
import { calculateCompletion } from '../utils/helpers';
import { Resume } from '../types/Resume';

const EditResume: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchResumeById, currentResume, updateCurrentResume } = useResume();
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [alertMessage, setAlertMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [resumeData, setResumeData] = useState<Resume | null>(null);

  useEffect(() => {
    if (id) {
      fetchResumeById(id);
    }
  }, [id, fetchResumeById]);

  useEffect(() => {
    if (currentResume) {
      setResumeData(currentResume);
      document.title = `Edit ${currentResume.title} | ResumeBuilder`;
    }
  }, [currentResume]);

  if (!resumeData) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p>Loading resume data...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const completion = calculateCompletion(resumeData);

  const handleSave = () => {
    try {
      // Basic validation
      if (!resumeData.title.trim()) {
        setAlertMessage({ type: 'error', message: 'Please provide a title for your resume' });
        return;
      }

      if (!resumeData.personalInfo.firstName || !resumeData.personalInfo.lastName || !resumeData.personalInfo.email) {
        setAlertMessage({ type: 'error', message: 'Please fill out required personal information' });
        setActiveSection('personal');
        return;
      }

      // Update the resume
      updateCurrentResume(resumeData);

      // Show success message
      setAlertMessage({ type: 'success', message: 'Resume updated successfully!' });

      // Clear message after delay
      setTimeout(() => {
        setAlertMessage(null);
      }, 3000);
    } catch (error) {
      setAlertMessage({ type: 'error', message: 'Failed to update resume. Please try again.' });
    }
  };

  const handleChange = <K extends keyof Resume>(field: K, value: Resume[K]) => {
    setResumeData({
      ...resumeData,
      [field]: value,
      updatedAt: new Date().toISOString(),
    });
  };

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'skills', label: 'Skills', icon: '🔧' },
    { id: 'projects', label: 'Projects', icon: '📂' },
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalInfoForm
            personalInfo={resumeData.personalInfo}
            onChange={(personalInfo) => handleChange('personalInfo', personalInfo)}
          />
        );
      case 'education':
        return (
          <EducationForm
            educationList={resumeData.education}
            onChange={(education) => handleChange('education', education)}
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            experienceList={resumeData.experience}
            onChange={(experience) => handleChange('experience', experience)}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            skills={resumeData.skills}
            onChange={(skills) => handleChange('skills', skills)}
          />
        );
      case 'projects':
        return (
          <ProjectsForm
            projects={resumeData.projects}
            onChange={(projects) => handleChange('projects', projects)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<ArrowLeft size={16} />}
            onClick={() => navigate('/')}
            className="mr-4"
          >
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Resume</h1>
            <p className="text-sm text-gray-500">Update your resume details</p>
          </div>
        </div>

        {alertMessage && (
          <Alert
            variant={alertMessage.type}
            message={alertMessage.message}
            onClose={() => setAlertMessage(null)}
            className="mb-6"
          />
        )}

        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  label="Resume Title"
                  value={resumeData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="e.g. Software Developer Resume"
                />
                <Select
                  label="Template"
                  options={RESUME_TEMPLATES.map((template) => ({
                    value: template.id,
                    label: template.name,
                  }))}
                  value={resumeData.template}
                  onChange={(value) => handleChange('template', value as Resume['template'])}
                />
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Completion</span>
                  <span className="font-medium">{completion}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      completion < 30 ? 'bg-red-500' : 
                      completion < 70 ? 'bg-amber-500' : 
                      'bg-green-500'
                    }`}
                    style={{ width: `${completion}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  variant={isPreviewMode ? 'outline' : 'primary'}
                  leftIcon={isPreviewMode ? <Pencil size={16} /> : <Eye size={16} />}
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                >
                  {isPreviewMode ? 'Edit' : 'Preview'}
                </Button>
                <Button
                  variant="success"
                  leftIcon={<Save size={16} />}
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </div>
            </CardBody>
          </Card>

          <Card className="hidden md:block">
            <CardBody>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Resume Sections</h3>
              <nav className="space-y-1" aria-label="Resume Sections">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    <span className="mr-3">{section.icon}</span>
                    {section.label}
                  </button>
                ))}
              </nav>
            </CardBody>
          </Card>
        </div>

        {isPreviewMode ? (
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <div className="bg-gray-100 px-6 py-4 flex justify-between items-center border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Preview</h2>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Pencil size={16} />}
                onClick={() => setIsPreviewMode(false)}
              >
                Return to Edit
              </Button>
            </div>
            <div className="p-6 bg-gray-50">
              <ResumePreview resume={resumeData} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:hidden mb-4">
              <Card>
                <CardBody>
                  <div className="flex overflow-x-auto pb-2 -mx-4 px-4 space-x-2">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        className={`flex-shrink-0 flex items-center px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
                          activeSection === section.id
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-gray-50 text-gray-700'
                        }`}
                        onClick={() => setActiveSection(section.id)}
                      >
                        <span className="mr-2">{section.icon}</span>
                        {section.label}
                      </button>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>

            <div className="w-full">
              <Card>
                <CardBody>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {sections.find((section) => section.id === activeSection)?.label}
                  </h3>
                  {renderSectionContent()}
                </CardBody>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EditResume;