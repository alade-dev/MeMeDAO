/* eslint-disable react/prop-types */
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { proposals } from "../../proposals";

const StatusBadge = ({ status }) => {
  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case "ongoing":
        return "bg-orange-500/20 text-orange-500";
      case "completed":
        return "bg-green-500/20 text-green-500";
      default:
        return "bg-gray-500/20 text-gray-500";
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm ${getStatusStyles(status)}`}
    >
      {status}
    </span>
  );
};

export default function ProposalsSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProposals = proposals.filter((proposal) =>
    proposal.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#2A2A2A] rounded-lg p-4 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Proposals</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search Proposal"
            className="bg-gray-800 text-white px-4 py-2 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-gray-400">
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Voted</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Results</th>
              <th className="py-3 px-4">Start</th>
              <th className="py-3 px-4">End</th>
            </tr>
          </thead>
          <tbody>
            {filteredProposals.map((proposal) => (
              <tr
                key={proposal.id}
                className="border-t border-gray-700 hover:bg-gray-800/50 transition-colors"
              >
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-white">{proposal.title}</p>
                    <p className="text-sm text-gray-400">{proposal.type}</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  {proposal.voted && (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  )}
                </td>
                <td className="py-4 px-4">
                  <StatusBadge status={proposal.status} />
                </td>
                <td className="py-4 px-4">
                  <div className="w-32">
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div
                        className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        style={{ width: `${proposal.results}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <p className="text-white">{proposal.startDate}</p>
                    <p className="text-sm text-gray-400">
                      {proposal.startTime}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <p className="text-white">{proposal.endDate}</p>
                    <p className="text-sm text-gray-400">{proposal.endTime}</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
