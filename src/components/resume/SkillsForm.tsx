import React from 'react';
import { Plus, X } from 'lucide-react';
import { Skill } from '../../types/Resume';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { generateId } from '../../utils/helpers';
import { SKILL_LEVELS } from '../../utils/constants';

interface SkillsFormProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ skills, onChange }) => {
  const [newSkill, setNewSkill] = React.useState('');
  const [newSkillLevel, setNewSkillLevel] = React.useState<Skill['level']>('Intermediate');

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    
    const skill: Skill = {
      id: generateId(),
      name: newSkill.trim(),
      level: newSkillLevel,
    };
    
    onChange([...skills, skill]);
    setNewSkill('');
  };

  const handleRemoveSkill = (id: string) => {
    onChange(skills.filter((skill) => skill.id !== id));
  };

  const handleSkillLevelChange = (id: string, level: Skill['level']) => {
    onChange(
      skills.map((skill) =>
        skill.id === id ? { ...skill, level } : skill
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end space-x-2">
        <div className="flex-1">
          <Input
            label="Add Skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="React, JavaScript, Python, Project Management, etc."
          />
        </div>
        
        <div className="w-48">
          <Select
            label="Skill Level"
            options={SKILL_LEVELS.map(level => ({ value: level, label: level }))}
            value={newSkillLevel}
            onChange={(value) => setNewSkillLevel(value as Skill['level'])}
          />
        </div>
        
        <Button
          variant="primary"
          onClick={handleAddSkill}
          className="mb-0.5"
          leftIcon={<Plus size={16} />}
        >
          Add
        </Button>
      </div>
      
      {skills.length > 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-7 font-medium text-gray-700">Skill</div>
              <div className="col-span-4 font-medium text-gray-700">Level</div>
              <div className="col-span-1"></div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {skills.map((skill) => (
              <div key={skill.id} className="px-6 py-4">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-7 font-medium">{skill.name}</div>
                  <div className="col-span-4">
                    <Select
                      options={SKILL_LEVELS.map(level => ({ value: level, label: level }))}
                      value={skill.level}
                      onChange={(value) => handleSkillLevelChange(skill.id, value as Skill['level'])}
                    />
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">No skills added yet. Add skills to showcase your expertise.</p>
        </div>
      )}
    </div>
  );
};

export default SkillsForm;