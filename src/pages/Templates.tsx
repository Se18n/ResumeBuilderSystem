import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Check } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card, { CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { RESUME_TEMPLATES } from '../utils/constants';
import { useResume } from '../context/ResumeContext';

const Templates: React.FC = () => {
  const navigate = useNavigate();
  const { resetToEmptyResume, currentResume, updateCurrentResume } = useResume();

  const handleSelectTemplate = (templateId: string) => {
    if (currentResume) {
      updateCurrentResume({ template: templateId as any });
      navigate('/create');
    } else {
      resetToEmptyResume();
      updateCurrentResume({ template: templateId as any });
      navigate('/create');
    }
  };

  const templateImages = {
    modern: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    classic: 'https://images.pexels.com/photos/1181290/pexels-photo-1181290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    minimal: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    creative: 'https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Resume Templates</h1>
          <p className="mt-1 text-sm text-gray-500">
            Choose a template for your resume
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESUME_TEMPLATES.map((template) => (
            <Card key={template.id} hoverable className="overflow-hidden transition-all duration-200">
              <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                  src={templateImages[template.id as keyof typeof templateImages]}
                  alt={template.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardBody>
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{template.description}</p>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    leftIcon={<Eye size={16} />}
                    onClick={() => {
                      // View template preview functionality would go here
                    }}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    leftIcon={<Check size={16} />}
                    onClick={() => handleSelectTemplate(template.id)}
                  >
                    Use
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Templates;