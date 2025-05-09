import React from 'react';
import { Plus, Briefcase, Calendar, Trash, MapPin } from 'lucide-react';
import { Experience } from '../../types/Resume';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import Card, { CardBody } from '../ui/Card';
import { generateId } from '../../utils/helpers';

interface ExperienceFormProps {
  experienceList: Experience[];
  onChange: (experienceList: Experience[]) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ experienceList, onChange }) => {
  const handleAddExperience = () => {
    const newExperience: Experience = {
      id: generateId(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    
    onChange([...experienceList, newExperience]);
  };

  const handleRemoveExperience = (id: string) => {
    onChange(experienceList.filter((experience) => experience.id !== id));
  };

  const handleExperienceChange = (id: string, field: keyof Experience, value: any) => {
    onChange(
      experienceList.map((experience) =>
        experience.id === id ? { ...experience, [field]: value } : experience
      )
    );
  };

  return (
    <div className="space-y-6">
      {experienceList.map((experience, index) => (
        <Card key={experience.id} className="border border-gray-200">
          <CardBody>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium">Experience #{index + 1}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveExperience(experience.id)}
                leftIcon={<Trash size={16} className="text-red-500" />}
                className="text-red-500 hover:bg-red-50"
              >
                Remove
              </Button>
            </div>
            
            <div className="space-y-4">
              <Input
                label="Company/Organization"
                value={experience.company}
                onChange={(e) => handleExperienceChange(experience.id, 'company', e.target.value)}
                placeholder="Example Company"
                leftIcon={<Briefcase size={18} className="text-gray-400" />}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Position/Title"
                  value={experience.position}
                  onChange={(e) => handleExperienceChange(experience.id, 'position', e.target.value)}
                  placeholder="Software Engineer"
                />
                
                <Input
                  label="Location"
                  value={experience.location}
                  onChange={(e) => handleExperienceChange(experience.id, 'location', e.target.value)}
                  placeholder="City, State or Remote"
                  leftIcon={<MapPin size={18} className="text-gray-400" />}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Start Date"
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => handleExperienceChange(experience.id, 'startDate', e.target.value)}
                  leftIcon={<Calendar size={18} className="text-gray-400" />}
                />
                
                <div>
                  <Input
                    label="End Date"
                    type="month"
                    value={experience.endDate}
                    onChange={(e) => handleExperienceChange(experience.id, 'endDate', e.target.value)}
                    disabled={experience.current}
                    leftIcon={<Calendar size={18} className="text-gray-400" />}
                  />
                  
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      id={`current-${experience.id}`}
                      checked={experience.current}
                      onChange={(e) => {
                        handleExperienceChange(experience.id, 'current', e.target.checked);
                        if (e.target.checked) {
                          handleExperienceChange(experience.id, 'endDate', '');
                        }
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`current-${experience.id}`}
                      className="ml-2 block text-sm text-gray-700"
                    >
                      I currently work here
                    </label>
                  </div>
                </div>
              </div>
              
              <TextArea
                label="Description"
                value={experience.description}
                onChange={(e) => handleExperienceChange(experience.id, 'description', e.target.value)}
                placeholder="Describe your responsibilities, achievements, and technologies used..."
                rows={4}
              />
            </div>
          </CardBody>
        </Card>
      ))}
      
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={handleAddExperience}
          leftIcon={<Plus size={16} />}
          className="mt-2"
        >
          Add Experience
        </Button>
      </div>
    </div>
  );
};

export default ExperienceForm;