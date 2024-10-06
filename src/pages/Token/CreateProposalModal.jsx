import { useState } from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';

const CreateProposalModal = ({ isOpen, onClose, onSubmit }) => {
  const [proposalData, setProposalData] = useState({
    title: '',
    description: '',
    type: 'Standard DAO Proposal', // default type
    duration: '7', // default 7 days
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(proposalData);
    setProposalData({ title: '', description: '', type: 'Standard DAO Proposal', duration: '7' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#2A2A2A] rounded-xl w-full max-w-lg p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Create Proposal</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-200 mb-2">
              Proposal Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter proposal title"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={proposalData.title}
              onChange={(e) => setProposalData({ ...proposalData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-200 mb-2">
              Proposal Type
            </label>
            <select
              id="type"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={proposalData.type}
              onChange={(e) => setProposalData({ ...proposalData, type: e.target.value })}
            >
              <option value="Standard DAO Proposal">Standard DAO Proposal</option>
              <option value="Option Voting Proposal">Option Voting Proposal</option>
              <option value="Emergency Proposal">Emergency Proposal</option>
            </select>
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-200 mb-2">
              Duration (days)
            </label>
            <select
              id="duration"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={proposalData.duration}
              onChange={(e) => setProposalData({ ...proposalData, duration: e.target.value })}
            >
              <option value="3">3 days</option>
              <option value="7">7 days</option>
              <option value="14">14 days</option>
              <option value="30">30 days</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-2">
              Proposal Description
            </label>
            <textarea
              id="description"
              placeholder="Enter proposal description"
              rows="6"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={proposalData.description}
              onChange={(e) => setProposalData({ ...proposalData, description: e.target.value })}
              required
            />
          </div>

          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg text-white bg-gray-600 hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg text-white bg-[#4782E0] hover:bg-blue-700 transition-colors"
            >
              Create Proposal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
CreateProposalModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CreateProposalModal;