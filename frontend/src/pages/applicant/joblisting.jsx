import { useState } from "react";

export default function JobListing() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Hardcoded job data
  const jobs = [
    {
      id: 1,
      title: "Full Stack React/.NET Developer | Work from Home",
      company: "Satellite Office",
      type: "Full time",
      location: "Bonifacio Global City, Taguig City, Metro Manila",
      badges: ["Work from home", "Great place to work", "Day shift"],
      timePosted: "4d ago",
      isNew: true,
      description: `
        We are looking for a skilled Full Stack Developer with expertise in React and .NET to join our remote team. 
        This position offers the flexibility to work from home while collaborating with our international team.

        Responsibilities:
        • Develop and maintain web applications using React and .NET
        • Collaborate with cross-functional teams
        • Implement responsive UI components
        • Write clean, maintainable code
        • Participate in code reviews

        Requirements:
        • 3+ years experience with React and .NET
        • Strong knowledge of C# and TypeScript
        • Experience with Azure cloud services
        • Bachelor's degree in Computer Science or related field
      `,
      salary: "₱80,000 - ₱120,000 per month"
    },
    {
      id: 2,
      title: "Full Stack Developer (C#, TypeScript, React, Azure) | WFH | Day 1 HMO",
      company: "Empra",
      type: "Full time",
      location: "Remote",
      badges: ["Work from home", "Day 1 HMO"],
      timePosted: "1d ago",
      isNew: true,
      description: `
        Join our dynamic team as a Full Stack Developer working with cutting-edge technologies. 
        We offer comprehensive healthcare benefits from day one.

        Tech Stack:
        • C# .NET Core
        • TypeScript & React
        • Azure Cloud Services
        • SQL Server
        • REST APIs

        What we offer:
        • Competitive salary package
        • Comprehensive HMO from day 1
        • Remote work setup
        • Professional development opportunities
      `,
      salary: "₱90,000 - ₱130,000 per month"
    },
    {
      id: 3,
      title: "Node/React Developer",
      company: "ARTECH TECHNOLOGY INC",
      type: "Full time",
      location: "Metro Manila",
      badges: ["Hybrid setup", "Flexible hours"],
      timePosted: "2d ago",
      isNew: false,
      description: `
        We are seeking a talented Node/React Developer to join our growing technology team. 
        This role offers a hybrid work setup with flexible working hours.

        Key Responsibilities:
        • Develop server-side applications using Node.js
        • Build responsive front-end applications with React
        • Design and implement database schemas
        • Optimize application performance
        • Collaborate with UI/UX designers

        Qualifications:
        • 2+ years experience with Node.js and React
        • Knowledge of MongoDB or PostgreSQL
        • Experience with Express.js
        • Strong problem-solving skills
      `,
      salary: "₱70,000 - ₱100,000 per month"
    }
  ];

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Recommended</h1>
          <p className="text-gray-600">Jobs that match your profile and preferences</p>
        </div>

        <div className="flex gap-8">
          {/* Left Side - Job List */}
          <div className="flex-1 max-w-2xl">
            {/* Jobs List */}
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleJobClick(job)}
                >
                  {/* New Badge */}
                  {job.isNew && (
                    <div className="flex items-center mb-2">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        New to you
                      </span>
                    </div>
                  )}

                  {/* Job Title and Company */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {job.title}
                  </h3>
                  <p className="text-gray-700 font-medium mb-3">{job.company}</p>

                  {/* Job Details */}
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <span className="mr-4">{job.type}</span>
                    <span>{job.location}</span>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {job.badges.map((badge, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Time Posted */}
                  <div className="text-sm text-gray-500">{job.timePosted}</div>
                </div>
              ))}
            </div>

            {/* Saved Searches Section */}
            <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Saved searches
              </h3>
              <p className="text-gray-600 text-sm">
                Use the Save search button below the search results to save your search and receive every new job.
              </p>
            </div>

            {/* Saved Jobs Section */}
            <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Saved jobs
              </h3>
              <div className="space-y-3">
                <div className="border-b border-gray-100 pb-3">
                  <h4 className="font-medium text-gray-900">Node/React Developer</h4>
                  <p className="text-sm text-gray-600">ARTECH TECHNOLOGY INC</p>
                  <p className="text-sm text-gray-600">Metro Manila</p>
                  <p className="text-xs text-gray-500">2d ago</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View all (↑)
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Modal */}
          {showModal && selectedJob && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 bg-opacity-50 z-40"
                onClick={closeModal}
              ></div>
              
              {/* Modal */}
              <div className="fixed right-0 top-0 h-full w-[55%] bg-white z-50 overflow-y-auto shadow-2xl">
                <div className="p-8">
                  {/* Close Button */}
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>

                  {/* Job Header */}
                  <div className="mb-6">
                    {selectedJob.isNew && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded mb-3 inline-block">
                        New to you
                      </span>
                    )}
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedJob.title}
                    </h1>
                    <p className="text-xl text-gray-700 font-medium mb-4">
                      {selectedJob.company}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <span className="mr-4">{selectedJob.type}</span>
                      <span>{selectedJob.location}</span>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedJob.badges.map((badge, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    <div className="text-sm text-gray-500 mb-6">
                      Posted {selectedJob.timePosted}
                    </div>
                  </div>

                  {/* Salary */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-1">Salary</h3>
                    <p className="text-lg text-gray-800">{selectedJob.salary}</p>
                  </div>

                  {/* Job Description */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Job Description
                    </h3>
                    <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                      {selectedJob.description}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6 border-t border-gray-200">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex-1">
                      Apply Now
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex-1">
                      Save Job
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}