import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function ApplicantProfile() {
    const navigate = useNavigate();
    const [applicantData, setApplicantData] = useState(null);
    const [activeSection, setActiveSection] = useState('personal');
    const [isEditing, setIsEditing] = useState(false);

    // Mock data - replace with actual API call
    useEffect(() => {
        // Fetch applicant data from API
        const fetchApplicantData = async () => {
            const applicantId = localStorage.getItem('applicant_id');
            if (applicantId) {
                try {
                    const response = await fetch(`http://localhost:5000/applicant/fetch-applicant/${applicantId}`);
                    const data = await response.json();
                    if (data.success) {
                        setApplicantData(data.result[0]);
                    }
                } catch (error) {
                    console.error('Error fetching applicant data:', error);
                }
            }
        };
        fetchApplicantData();
    }, []);

    const [formData, setFormData] = useState({
        // Personal Information
        first_name: '',
        middle_name: '',
        last_name: '',
        phone_no: '',
        email: '',
        country: '',
        city: '',
        house_no: '',
        street: '',
        
        // Professional Information
        job_title: '',
        summary: '',
        
        // Experience
        experiences: [
            {
                id: 1,
                company: '',
                position: '',
                start_date: '',
                end_date: '',
                current: false,
                description: ''
            }
        ],
        
        // Education
        education: [
            {
                id: 1,
                institution: '',
                degree: '',
                field: '',
                graduation_year: '',
                gpa: ''
            }
        ],
        
        // Skills
        skills: [''],
        
        // Certifications
        certifications: [
            {
                id: 1,
                name: '',
                issuer: '',
                date_issued: '',
                expiry_date: ''
            }
        ],
        
        // Languages
        languages: [
            {
                id: 1,
                language: '',
                proficiency: 'Intermediate'
            }
        ]
    });

    const handleInputChange = (section, index, field, value) => {
        if (section === 'personal' || section === 'professional') {
            setFormData(prev => ({
                ...prev,
                [field]: value
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [section]: prev[section].map((item, i) => 
                    i === index ? { ...item, [field]: value } : item
                )
            }));
        }
    };

    const addItem = (section) => {
        setFormData(prev => ({
            ...prev,
            [section]: [...prev[section], { id: Date.now(), ...getEmptyItem(section) }]
        }));
    };

    const removeItem = (section, index) => {
        setFormData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index)
        }));
    };

    const getEmptyItem = (section) => {
        const emptyItems = {
            experiences: {
                company: '',
                position: '',
                start_date: '',
                end_date: '',
                current: false,
                description: ''
            },
            education: {
                institution: '',
                degree: '',
                field: '',
                graduation_year: '',
                gpa: ''
            },
            certifications: {
                name: '',
                issuer: '',
                date_issued: '',
                expiry_date: ''
            },
            languages: {
                language: '',
                proficiency: 'Intermediate'
            }
        };
        return emptyItems[section] || {};
    };

    const handleSave = async () => {
        try {
            // Save profile data to API
            const applicantId = localStorage.getItem('applicant_id');
            const response = await fetch(`http://localhost:5000/applicant/update-profile/${applicantId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setIsEditing(false);
                alert('Profile updated successfully!');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile');
        }
    };

    const SectionButton = ({ section, label, icon }) => (
        <button
            onClick={() => setActiveSection(section)}
            className={`flex items-center gap-3 px-6 py-4 w-full text-left rounded-lg transition-colors ${
                activeSection === section 
                    ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
            }`}
        >
            {icon}
            <span className="font-medium">{label}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                {isEditing ? 'Cancel' : 'Edit Profile'}
                            </button>
                            {isEditing && (
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Save Changes
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                            <div className="space-y-2">
                                <SectionButton 
                                    section="personal" 
                                    label="Personal Information"
                                    icon="👤"
                                />
                                <SectionButton 
                                    section="professional" 
                                    label="Professional Summary"
                                    icon="💼"
                                />
                                <SectionButton 
                                    section="experiences" 
                                    label="Work Experience"
                                    icon="🏢"
                                />
                                <SectionButton 
                                    section="education" 
                                    label="Education"
                                    icon="🎓"
                                />
                                <SectionButton 
                                    section="skills" 
                                    label="Skills"
                                    icon="⚡"
                                />
                                <SectionButton 
                                    section="certifications" 
                                    label="Certifications"
                                    icon="📜"
                                />
                                <SectionButton 
                                    section="languages" 
                                    label="Languages"
                                    icon="🌐"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-lg shadow-sm p-8">
                            {/* Personal Information */}
                            {activeSection === 'personal' && (
                                <PersonalInfoSection 
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    isEditing={isEditing}
                                />
                            )}

                            {/* Professional Summary */}
                            {activeSection === 'professional' && (
                                <ProfessionalSummarySection 
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    isEditing={isEditing}
                                />
                            )}

                            {/* Work Experience */}
                            {activeSection === 'experiences' && (
                                <ExperienceSection 
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    addItem={addItem}
                                    removeItem={removeItem}
                                    isEditing={isEditing}
                                />
                            )}

                            {/* Education */}
                            {activeSection === 'education' && (
                                <EducationSection 
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    addItem={addItem}
                                    removeItem={removeItem}
                                    isEditing={isEditing}
                                />
                            )}

                            {/* Skills */}
                            {activeSection === 'skills' && (
                                <SkillsSection 
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    isEditing={isEditing}
                                />
                            )}

                            {/* Certifications */}
                            {activeSection === 'certifications' && (
                                <CertificationsSection 
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    addItem={addItem}
                                    removeItem={removeItem}
                                    isEditing={isEditing}
                                />
                            )}

                            {/* Languages */}
                            {activeSection === 'languages' && (
                                <LanguagesSection 
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    addItem={addItem}
                                    removeItem={removeItem}
                                    isEditing={isEditing}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Component for Personal Information Section
function PersonalInfoSection({ formData, handleInputChange, isEditing }) {
    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                        type="text"
                        value={formData.first_name}
                        onChange={(e) => handleInputChange('personal', null, 'first_name', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                        type="text"
                        value={formData.last_name}
                        onChange={(e) => handleInputChange('personal', null, 'last_name', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('personal', null, 'email', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                        type="tel"
                        value={formData.phone_no}
                        onChange={(e) => handleInputChange('personal', null, 'phone_no', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => handleInputChange('personal', null, 'country', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('personal', null, 'city', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                </div>
            </div>
        </div>
    );
}

// Component for Professional Summary Section
function ProfessionalSummarySection({ formData, handleInputChange, isEditing }) {
    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Professional Summary</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                    <input
                        type="text"
                        value={formData.job_title}
                        onChange={(e) => handleInputChange('professional', null, 'job_title', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        placeholder="e.g. Senior Software Engineer"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Professional Summary</label>
                    <textarea
                        value={formData.summary}
                        onChange={(e) => handleInputChange('professional', null, 'summary', e.target.value)}
                        disabled={!isEditing}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        placeholder="Describe your professional background, skills, and career objectives..."
                    />
                </div>
            </div>
        </div>
    );
}

// Component for Experience Section
function ExperienceSection({ formData, handleInputChange, addItem, removeItem, isEditing }) {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
                {isEditing && (
                    <button
                        onClick={() => addItem('experiences')}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                    >
                        Add Experience
                    </button>
                )}
            </div>
            <div className="space-y-6">
                {formData.experiences.map((exp, index) => (
                    <div key={exp.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                                <input
                                    type="text"
                                    value={exp.company}
                                    onChange={(e) => handleInputChange('experiences', index, 'company', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                                <input
                                    type="text"
                                    value={exp.position}
                                    onChange={(e) => handleInputChange('experiences', index, 'position', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                                <input
                                    type="date"
                                    value={exp.start_date}
                                    onChange={(e) => handleInputChange('experiences', index, 'start_date', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                                <input
                                    type="date"
                                    value={exp.end_date}
                                    onChange={(e) => handleInputChange('experiences', index, 'end_date', e.target.value)}
                                    disabled={!isEditing || exp.current}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                />
                                <div className="flex items-center mt-2">
                                    <input
                                        type="checkbox"
                                        checked={exp.current}
                                        onChange={(e) => handleInputChange('experiences', index, 'current', e.target.checked)}
                                        disabled={!isEditing}
                                        className="mr-2"
                                    />
                                    <label className="text-sm text-gray-600">I currently work here</label>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                value={exp.description}
                                onChange={(e) => handleInputChange('experiences', index, 'description', e.target.value)}
                                disabled={!isEditing}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                            />
                        </div>
                        {isEditing && formData.experiences.length > 1 && (
                            <button
                                onClick={() => removeItem('experiences', index)}
                                className="mt-4 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// Component for Education Section
function EducationSection({ formData, handleInputChange, addItem, removeItem, isEditing }) {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Education</h2>
                {isEditing && (
                    <button
                        onClick={() => addItem('education')}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                    >
                        Add Education
                    </button>
                )}
            </div>
            <div className="space-y-6">
                {formData.education.map((edu, index) => (
                    <div key={edu.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                                <input
                                    type="text"
                                    value={edu.institution}
                                    onChange={(e) => handleInputChange('education', index, 'institution', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                                <input
                                    type="text"
                                    value={edu.degree}
                                    onChange={(e) => handleInputChange('education', index, 'degree', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
                                <input
                                    type="text"
                                    value={edu.field}
                                    onChange={(e) => handleInputChange('education', index, 'field', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                                <input
                                    type="number"
                                    value={edu.graduation_year}
                                    onChange={(e) => handleInputChange('education', index, 'graduation_year', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                />
                            </div>
                        </div>
                        {isEditing && formData.education.length > 1 && (
                            <button
                                onClick={() => removeItem('education', index)}
                                className="mt-4 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// Component for Skills Section
function SkillsSection({ formData, handleInputChange, isEditing }) {
    const addSkill = () => {
        handleInputChange('skills', null, 'skills', [...formData.skills, '']);
    };

    const removeSkill = (index) => {
        handleInputChange('skills', null, 'skills', formData.skills.filter((_, i) => i !== index));
    };

    const updateSkill = (index, value) => {
        const newSkills = [...formData.skills];
        newSkills[index] = value;
        handleInputChange('skills', null, 'skills', newSkills);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
                {isEditing && (
                    <button
                        onClick={addSkill}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                    >
                        Add Skill
                    </button>
                )}
            </div>
            <div className="space-y-3">
                {formData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <input
                            type="text"
                            value={skill}
                            onChange={(e) => updateSkill(index, e.target.value)}
                            disabled={!isEditing}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                            placeholder="Enter a skill"
                        />
                        {isEditing && formData.skills.length > 1 && (
                            <button
                                onClick={() => removeSkill(index)}
                                className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// Component for Certifications Section
function CertificationsSection({ formData, handleInputChange, addItem, removeItem, isEditing }) {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Certifications</h2>
                {isEditing && (
                    <button
                        onClick={() => addItem('certifications')}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                    >
                        Add Certification
                    </button>
                )}
            </div>
            <div className="space-y-6">
                {formData.certifications.map((cert, index) => (
                    <div key={cert.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Certification Name</label>
                                <input
                                    type="text"
                                    value={cert.name}
                                    onChange={(e) => handleInputChange('certifications', index, 'name', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Issuing Organization</label>
                                <input
                                    type="text"
                                    value={cert.issuer}
                                    onChange={(e) => handleInputChange('certifications', index, 'issuer', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Date Issued</label>
                                <input
                                    type="date"
                                    value={cert.date_issued}
                                    onChange={(e) => handleInputChange('certifications', index, 'date_issued', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                                <input
                                    type="date"
                                    value={cert.expiry_date}
                                    onChange={(e) => handleInputChange('certifications', index, 'expiry_date', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                />
                            </div>
                        </div>
                        {isEditing && formData.certifications.length > 1 && (
                            <button
                                onClick={() => removeItem('certifications', index)}
                                className="mt-4 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// Component for Languages Section
function LanguagesSection({ formData, handleInputChange, addItem, removeItem, isEditing }) {
    const proficiencyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Native'];
    
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Languages</h2>
                {isEditing && (
                    <button
                        onClick={() => addItem('languages')}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                    >
                        Add Language
                    </button>
                )}
            </div>
            <div className="space-y-6">
                {formData.languages.map((lang, index) => (
                    <div key={lang.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                                <input
                                    type="text"
                                    value={lang.language}
                                    onChange={(e) => handleInputChange('languages', index, 'language', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Proficiency</label>
                                <select
                                    value={lang.proficiency}
                                    onChange={(e) => handleInputChange('languages', index, 'proficiency', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                >
                                    {proficiencyLevels.map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {isEditing && formData.languages.length > 1 && (
                            <button
                                onClick={() => removeItem('languages', index)}
                                className="mt-4 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}