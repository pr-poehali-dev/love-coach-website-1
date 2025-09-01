import React from 'react';
import Icon from '@/components/ui/icon';

interface StatusMessagesProps {
  error?: string;
  success?: string;
}

const StatusMessages: React.FC<StatusMessagesProps> = ({ error, success }) => {
  if (!error && !success) return null;

  return (
    <>
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="flex">
            <Icon name="AlertCircle" size={20} className="text-red-400 mr-3 mt-0.5" />
            <div className="text-red-700">{error}</div>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <div className="flex">
            <Icon name="CheckCircle" size={20} className="text-green-400 mr-3 mt-0.5" />
            <div className="text-green-700">{success}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default StatusMessages;