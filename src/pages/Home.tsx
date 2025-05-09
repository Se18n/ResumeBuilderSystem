import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Search } from 'lucide-react';
import Layout from '../components/layout/Layout';
import ResumeList from '../components/resume/ResumeList';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import Alert from '../components/ui/Alert';
import { useResume } from '../context/ResumeContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { resumes, removeResume, duplicateResumeById } = useResume();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const filteredResumes = resumes.filter(resume => 
    resume.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = (id: string) => {
    setResumeToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (resumeToDelete) {
      removeResume(resumeToDelete);
      setShowDeleteModal(false);
      setResumeToDelete(null);
      setAlertMessage('Resume deleted successfully');
      
      setTimeout(() => {
        setAlertMessage(null);
      }, 3000);
    }
  };

  const handleDuplicate = (id: string) => {
    duplicateResumeById(id);
    setAlertMessage('Resume duplicated successfully');
    
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Resumes</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your resumes and create new ones
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button
              variant="primary"
              leftIcon={<PlusCircle size={16} />}
              onClick={() => navigate('/create')}
            >
              Create Resume
            </Button>
          </div>
        </div>

        {alertMessage && (
          <Alert
            variant="success"
            message={alertMessage}
            onClose={() => setAlertMessage(null)}
            className="mb-6"
          />
        )}

        <div className="mb-6">
          <Input
            placeholder="Search resumes..."
            value={searchQuery}
            onChange={handleSearch}
            leftIcon={<Search size={18} className="text-gray-400" />}
          />
        </div>

        <ResumeList
          resumes={filteredResumes}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
        />

        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Delete Resume"
          footer={
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          }
        >
          <p className="text-gray-700">
            Are you sure you want to delete this resume? This action cannot be undone.
          </p>
        </Modal>
      </div>
    </Layout>
  );
};

export default Home;
