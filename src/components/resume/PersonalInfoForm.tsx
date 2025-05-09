import React from 'react';
import { User, Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import { PersonalInfo } from '../../types/Resume';

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo;
  onChange: (personalInfo: PersonalInfo) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ personalInfo, onChange }) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...personalInfo,
      [field]: value,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          value={personalInfo.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
          placeholder="John"
          leftIcon={<User size={18} className="text-gray-400" />}
        />
        
        <Input
          label="Last Name"
          value={personalInfo.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
          placeholder="Doe"
          leftIcon={<User size={18} className="text-gray-400" />}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Email"
          type="email"
          value={personalInfo.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="john.doe@example.com"
          leftIcon={<Mail size={18} className="text-gray-400" />}
        />
        
        <Input
          label="Phone"
          value={personalInfo.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="(123) 456-7890"
          leftIcon={<Phone size={18} className="text-gray-400" />}
        />
      </div>
      
      <Input
        label="Address"
        value={personalInfo.address}
        onChange={(e) => handleChange('address', e.target.value)}
        placeholder="123 Main St, City, State, Zip"
        leftIcon={<MapPin size={18} className="text-gray-400" />}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="LinkedIn (optional)"
          value={personalInfo.linkedin || ''}
          onChange={(e) => handleChange('linkedin', e.target.value)}
          placeholder="linkedin.com/in/johndoe"
          leftIcon={<Linkedin size={18} className="text-gray-400" />}
        />
        
        <Input
          label="Website (optional)"
          value={personalInfo.website || ''}
          onChange={(e) => handleChange('website', e.target.value)}
          placeholder="johndoe.com"
          leftIcon={<Globe size={18} className="text-gray-400" />}
        />
      </div>
      
      <TextArea
        label="Professional Summary"
        value={personalInfo.summary}
        onChange={(e) => handleChange('summary', e.target.value)}
        placeholder="A brief summary of your career, skills, and achievements..."
        rows={5}
      />
    </div>
  );
};

export default PersonalInfoForm;