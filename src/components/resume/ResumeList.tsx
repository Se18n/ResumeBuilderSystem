import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, Edit, Trash, Copy, Eye, FileDown } from 'lucide-react';
import Card, { CardBody } from '../ui/Card';
import { Resume } from '../../types/Resume';
import { formatDate, calculateCompletion } from '../../utils/helpers';
import Button from '../ui/Button';

interface ResumeListProps {
  resumes: Resume[];
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

const ResumeList: React.FC<ResumeListProps> = ({ resumes, onDelete, onDuplicate }) => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

  const toggleMenu = (id: string) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const closeMenu = () => {
    setActiveMenu(null);
  };

  React.useEffect(() => {
    const handleClickOutside = () => {
      closeMenu();
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  if (resumes.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No resumes found</h3>
        <p className="text-gray-500 mb-6">Get started by creating your first resume</p>
        <Button
          variant="primary"
          onClick={() => navigate('/create')}
        >
          Create Resume
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {resumes.map((resume) => {
        const completion = calculateCompletion(resume);
        return (
          <Card
            key={resume.id}
            hoverable
            className="transition-all duration-200 h-full"
          >
            <CardBody className="flex flex-col h-full">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 truncate" title={resume.title}>
                    {resume.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Last updated {formatDate(resume.updatedAt)}
                  </p>
                </div>
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu(resume.id);
                    }}
                  >
                    <MoreVertical size={18} className="text-gray-500" />
                  </button>
                  
                  {activeMenu === resume.id && (
                    <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <button
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/view/${resume.id}`);
                            closeMenu();
                          }}
                        >
                          <Eye size={16} className="mr-2" />
                          View
                        </button>
                        <button
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/edit/${resume.id}`);
                            closeMenu();
                          }}
                        >
                          <Edit size={16} className="mr-2" />
                          Edit
                        </button>
                        <button
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDuplicate(resume.id);
                            closeMenu();
                          }}
                        >
                          <Copy size={16} className="mr-2" />
                          Duplicate
                        </button>
                        <button
                          className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(resume.id);
                            closeMenu();
                          }}
                        >
                          <Trash size={16} className="mr-2" />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4 mb-2">
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
              
              <div className="mt-auto pt-4">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => navigate(`/edit/${resume.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="primary"
                    size="sm" 
                    className="flex-1"
                    onClick={() => navigate(`/view/${resume.id}`)}
                  >
                    View
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

export default ResumeList;