import React from 'react';
import { Plus, GraduationCap, Calendar, Trash } from 'lucide-react';
import { Education } from '../../types/Resume';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import Card, { CardBody } from '../ui/Card';
import { generateId } from '../../utils/helpers';

interface EducationFormProps {
  educationList: Education[];
  onChange: (educationList: Education[]) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ educationList, onChange }) => {
  const handleAddEducation = () => {
    const newEducation: Education = {
      id: generateId(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    
    onChange([...educationList, newEducation]);
  };

  const handleRemoveEducation = (id: string) => {
    onChange(educationList.filter((education) => education.id !== id));
  };

  const handleEducationChange = (id: string, field: keyof Education, value: string) => {
    onChange(
      educationList.map((education) =>
        education.id === id ? { ...education, [field]: value } : education
      )
    );
  };

  return (
    <div className="space-y-6">
      {educationList.map((education, index) => (
        <Card key={education.id} className="border border-gray-200">
          <CardBody>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium">Education #{index + 1}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveEducation(education.id)}
                leftIcon={<Trash size={16} className="text-red-500" />}
                className="text-red-500 hover:bg-red-50"
              >
                Remove
              </Button>
            </div>
            
            <div className="space-y-4">
              <Input
                label="Institution"
                value={education.institution}
                onChange={(e) => handleEducationChange(education.id, 'institution', e.target.value)}
                placeholder="University of Example"
                leftIcon={<GraduationCap size={18} className="text-gray-400" />}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Degree"
                  value={education.degree}
                  onChange={(e) => handleEducationChange(education.id, 'degree', e.target.value)}
                  placeholder="Bachelor of Science"
                />
                
                <Input
                  label="Field of Study"
                  value={education.fieldOfStudy}
                  onChange={(e) => handleEducationChange(education.id, 'fieldOfStudy', e.target.value)}
                  placeholder="Computer Science"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Start Date"
                  type="month"
                  value={education.startDate}
                  onChange={(e) => handleEducationChange(education.id, 'startDate', e.target.value)}
                  leftIcon={<Calendar size={18} className="text-gray-400" />}
                />
                
                <Input
                  label="End Date (or Expected)"
                  type="month"
                  value={education.endDate}
                  onChange={(e) => handleEducationChange(education.id, 'endDate', e.target.value)}
                  leftIcon={<Calendar size={18} className="text-gray-400" />}
                />
              </div>
              
              <TextArea
                label="Description (optional)"
                value={education.description}
                onChange={(e) => handleEducationChange(education.id, 'description', e.target.value)}
                placeholder="Relevant coursework, honors, achievements..."
                rows={3}
              />
            </div>
          </CardBody>
        </Card>
      ))}
      
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={handleAddEducation}
          leftIcon={<Plus size={16} />}
          className="mt-2"
        >
          Add Education
        </Button>
      </div>
    </div>
  );
};

export default EducationForm;