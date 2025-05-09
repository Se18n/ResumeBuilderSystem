import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, Download, Edit, Share } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Card, { CardBody } from '../components/ui/Card';
import Alert from '../components/ui/Alert';
import ResumePreview from '../components/resume/ResumePreview';
import { useResume } from '../context/ResumeContext';

const ViewResume: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchResumeById, currentResume } = useResume();
  const [alertMessage, setAlertMessage] = useState<{ type: 'success' | 'info', message: string } | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      fetchResumeById(id);
    }
  }, [id, fetchResumeById]);

  useEffect(() => {
    if (currentResume) {
      document.title = `${currentResume.title} | ResumeBuilder`;
    }
  }, [currentResume]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    setAlertMessage({
      type: 'info',
      message: 'PDF generation functionality will be available in the next update. For now, you can use the Print option and save as PDF.',
    });

    setTimeout(() => {
      setAlertMessage(null);
    }, 5000);
  };

  const handleShare = () => {
    const resumeUrl = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: currentResume?.title || 'My Resume',
        text: 'Check out my resume created with ResumeBuilder',
        url: resumeUrl,
      }).catch(() => {
        navigator.clipboard.writeText(resumeUrl);
        setAlertMessage({
          type: 'success',
          message: 'Resume URL copied to clipboard!',
        });
        
        setTimeout(() => {
          setAlertMessage(null);
        }, 3000);
      });
    } else {
      navigator.clipboard.writeText(resumeUrl);
      setAlertMessage({
        type: 'success',
        message: 'Resume URL copied to clipboard!',
      });
      
      setTimeout(() => {
        setAlertMessage(null);
      }, 3000);
    }
  };

  if (!currentResume) {
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
          <div className="flex-grow">
            <h1 className="text-2xl font-bold text-gray-900">{currentResume.title}</h1>
            <p className="text-sm text-gray-500">View and download your resume</p>
          </div>
          <div className="hidden sm:block">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Edit size={16} />}
                onClick={() => navigate(`/edit/${id}`)}
              >
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Printer size={16} />}
                onClick={handlePrint}
              >
                Print
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Download size={16} />}
                onClick={handleDownloadPDF}
              >
                Download PDF
              </Button>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Share size={16} />}
                onClick={handleShare}
              >
                Share
              </Button>
            </div>
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

        <div className="sm:hidden mb-6">
          <Card>
            <CardBody className="p-4">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Edit size={16} />}
                  onClick={() => navigate(`/edit/${id}`)}
                  fullWidth
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Printer size={16} />}
                  onClick={handlePrint}
                  fullWidth
                >
                  Print
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Download size={16} />}
                  onClick={handleDownloadPDF}
                  fullWidth
                >
                  Download
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<Share size={16} />}
                  onClick={handleShare}
                  fullWidth
                >
                  Share
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>

        <Card className="print:shadow-none print:border-0">
          <CardBody className="bg-gray-50 p-8 print:p-0 print:bg-white">
            <div ref={previewRef}>
              <ResumePreview resume={currentResume} />
            </div>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default ViewResume;