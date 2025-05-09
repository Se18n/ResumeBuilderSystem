import React from 'react';
import { Plus, Trash, Link, Calendar } from 'lucide-react';
import { Project } from '../../types/Resume';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import Card, { CardBody } from '../ui/Card';
import { generateId } from '../../utils/helpers';

interface ProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ projects, onChange }) => {
  const handleAddProject = () => {
    const newProject: Project = {
      id: generateId(),
      name: '',
      description: '',
      technologies: [],
      startDate: '',
      endDate: '',
    };
    
    onChange([...projects, newProject]);
  };

  const handleRemoveProject = (id: string) => {
    onChange(projects.filter((project) => project.id !== id));
  };

  const handleProjectChange = (id: string, field: keyof Project, value: any) => {
    onChange(
      projects.map((project) =>
        project.id === id
          ? { ...project, [field]: value }
          : project
      )
    );
  };

  const handleTechnologiesChange = (id: string, value: string) => {
    const technologies = value.split(',').map(tech => tech.trim()).filter(Boolean);
    
    onChange(
      projects.map((project) =>
        project.id === id
          ? { ...project, technologies }
          : project
      )
    );
  };

  return (
    <div className="space-y-6">
      {projects.map((project, index) => (
        <Card key={project.id} className="border border-gray-200">
          <CardBody>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium">Project #{index + 1}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveProject(project.id)}
                leftIcon={<Trash size={16} className="text-red-500" />}
                className="text-red-500 hover:bg-red-50"
              >
                Remove
              </Button>
            </div>
            
            <div className="space-y-4">
              <Input
                label="Project Name"
                value={project.name}
                onChange={(e) => handleProjectChange(project.id, 'name', e.target.value)}
                placeholder="My Awesome Project"
              />
              
              <TextArea
                label="Description"
                value={project.description}
                onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                placeholder="Describe the project, your role, and the outcome..."
                rows={3}
              />
              
              <Input
                label="Technologies Used"
                value={project.technologies.join(', ')}
                onChange={(e) => handleTechnologiesChange(project.id, e.target.value)}
                placeholder="React, TypeScript, Node.js, etc. (comma separated)"
              />
              
              <Input
                label="Project URL (optional)"
                value={project.url || ''}
                onChange={(e) => handleProjectChange(project.id, 'url', e.target.value)}
                placeholder="https://example.com"
                leftIcon={<Link size={18} className="text-gray-400" />}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Start Date"
                  type="month"
                  value={project.startDate}
                  onChange={(e) => handleProjectChange(project.id, 'startDate', e.target.value)}
                  leftIcon={<Calendar size={18} className="text-gray-400" />}
                />
                
                <Input
                  label="End Date (optional)"
                  type="month"
                  value={project.endDate || ''}
                  onChange={(e) => handleProjectChange(project.id, 'endDate', e.target.value)}
                  leftIcon={<Calendar size={18} className="text-gray-400" />}
                  helper="Leave blank if ongoing"
                />
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
      
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={handleAddProject}
          leftIcon={<Plus size={16} />}
          className="mt-2"
        >
          Add Project
        </Button>
      </div>
    </div>
  );
};

export default ProjectsForm;