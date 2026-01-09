import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { getMDXContent } from "@/lib/api";
import {
  BiChip,
  BiTestTube,
  BiCloud,
  BiShield,
  BiLock,
  BiFile,
  BiBroadcast,
  BiAtom,
  BiLinkExternal,
} from "react-icons/bi";

export default function Research({ researchContent }) {
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    company_size: '',
    message: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setFormError('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bagle-api.amitacompany.workers.dev';
      const response = await fetch(`${API_BASE_URL}/api/demo-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'univault-org-research-page'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }

      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        company_size: '',
        message: ''
      });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to submit request. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };
  const researchAreas = [
    {
      category: "Consciousness & AI Research",
      items: [
        {
          title: "Complete AI Architecture",
          description: "Dual-brain system (GPT + Harmonic Frequency - HF Models + Adapter) enabling consciousness-aware AI that understands brain signals directly",
          icon: <BiChip className="text-3xl" />,
          link: "#complete-ai",
        },
        {
          title: "General Learning Encoder (GLE)",
          description: "Pre-trained foundation model for frequency-domain processing, enabling subject-invariant EEG intelligence across multiple applications",
          icon: <BiTestTube className="text-3xl" />,
          link: "#gle",
        },
        {
          title: "Breathing Authentication",
          description: "Research on breathing-based biometric identification with 96.8% accuracy, published in Current Biology (2025)",
          icon: <BiCloud className="text-3xl" />,
          link: "#breathing-auth",
        },
        {
          title: "EEG Foundation Challenge 2025",
          description: "Verified against competition benchmarks: 93.54% accuracy (Challenge 1, +4.87% over winning solution), 0.70879 normalized error (Challenge 2, 27.5% better than winning solution).",
          icon: <BiChip className="text-3xl" />,
          link: "#eeg-challenge",
        },
      ]
    },
    {
      category: "Data Sovereignty Research",
      items: [
        {
          title: "Personal AI Systems",
          description: "Research on AI systems that understand individuals personally while maintaining data sovereignty and privacy",
          icon: <BiShield className="text-3xl" />,
          link: "#personal-ai",
        },
        {
          title: "Privacy Architecture",
          description: "Developing robust privacy-preserving systems for personal data management",
          icon: <BiLock className="text-3xl" />,
          link: "#privacy",
        },
        {
          title: "Data Standards",
          description: "Creating universal data interchange formats for personal data sovereignty",
          icon: <BiFile className="text-3xl" />,
          link: "#data-standards",
        },
      ]
    },
    {
      category: "Protocol & Security Research",
      items: [
        {
          title: "Satellite Data Protocol (SRPT)",
          description: "Developing SRPT protocol for efficient global transfer of large AI models and datasets via satellite networks",
          icon: <BiBroadcast className="text-3xl" />,
          link: "https://github.com/univault-org/srpt-protocol",
          external: true,
        },
        {
          title: "Quantum-Safe Privacy",
          description: "Developing post-quantum cryptographic solutions to ensure long-term data protection",
          icon: <BiAtom className="text-3xl" />,
          link: "#quantum-safe",
        },
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>Research - Univault Research Lab</title>
        <meta name="description" content="Research areas and findings from Univault Research Lab: consciousness-aware AI, data sovereignty, and secure protocols" />
      </Head>

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-neutral-100 dark:to-neutral-300">
            Research Areas
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            We research, develop, and publish technologies across multiple domains: consciousness research, data sovereignty, hardware-to-AI transformation, and secure protocols.
          </p>
        </div>
      </section>

      {/* Research Areas */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {researchAreas.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-neutral-800 dark:text-neutral-100">
              {category.category}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((area, index) => {
                const content = (
                  <div
                    className="p-6 rounded-xl dark:bg-neutral-800 
                      shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
                      dark:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2)] 
                      border-2 border-neutral-200 dark:border-neutral-700
                      hover:border-primary-500 dark:hover:border-primary-500
                      transition-all duration-300 h-full flex flex-col"
                  >
                    <div
                      className="w-16 h-16 mb-4 text-primary-500 
                      flex items-center justify-center 
                      bg-white dark:bg-neutral-700 
                      rounded-full 
                      shadow-md"
                    >
                      {area.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-neutral-800 dark:text-neutral-100 flex items-center">
                      {area.title}
                      {area.external && (
                        <BiLinkExternal className="ml-2 text-sm" />
                      )}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed flex-grow">
                      {area.description}
                    </p>
                  </div>
                );

                if (area.external) {
                  return (
                    <a
                      key={index}
                      href={area.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <div key={index}>
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Publications Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 bg-neutral-50 dark:bg-neutral-900 rounded-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-neutral-800 dark:text-neutral-100">
          Publications & Findings
        </h2>
        <div className="space-y-6">
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-xl font-semibold mb-2 text-neutral-800 dark:text-neutral-100">
              EEG Foundation Challenge 2025
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Our GLE-based models have been verified against the competition benchmarks and exceed the winning solutions from both challenges:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-600 dark:text-neutral-400 mb-4">
              <li><strong>Challenge 1 (Cross-Task Transfer):</strong> 93.54% accuracy (+4.87% over winning solution)</li>
              <li><strong>Challenge 2 (Subject Invariant):</strong> 0.70879 normalized error (27.5% better than winning solution, 13.5x better improvement over baseline)</li>
              <li><strong>Consciousness Classification:</strong> 97.65% accuracy (vs. 60-85% typical range)</li>
            </ul>
            <p className="text-sm text-neutral-500 dark:text-neutral-500 mb-4 italic">
              All results are independently verifiable through our open-source repository. We publish these results to demonstrate the scientific rigor and real-world usefulness of our technology.
            </p>
            <a
              href="https://github.com/paragon-dao/eeg-foundation-challenge-2025"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-4 text-primary-500 hover:text-primary-600"
            >
              View Repository <BiLinkExternal className="ml-2" />
            </a>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">
          Collaborate With Us
        </h2>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
          Request a demo to see our research in action and discuss collaboration opportunities.
        </p>
        <button
          onClick={() => setShowDemoForm(true)}
          className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
        >
          Request Demo
        </button>
      </section>

      {/* Demo Request Modal */}
      {showDemoForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                  Request Demo
                </h2>
                <button
                  onClick={() => {
                    setShowDemoForm(false);
                    setFormSubmitted(false);
                    setFormError('');
                  }}
                  className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {formSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    We've received your demo request. Our team will review it and get back to you soon.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        company_size: '',
                        message: ''
                      });
                    }}
                    className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-neutral-300 dark:border-neutral-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-neutral-700 dark:text-white px-3 py-2"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-neutral-300 dark:border-neutral-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-neutral-700 dark:text-white px-3 py-2"
                      placeholder="you@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Company/Organization <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-neutral-300 dark:border-neutral-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-neutral-700 dark:text-white px-3 py-2"
                      placeholder="Your company or organization"
                    />
                  </div>

                  <div>
                    <label htmlFor="company_size" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Company Size (optional)
                    </label>
                    <select
                      id="company_size"
                      name="company_size"
                      value={formData.company_size}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-neutral-300 dark:border-neutral-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-neutral-700 dark:text-white px-3 py-2"
                    >
                      <option value="">Select company size (optional)</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-1000">201-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Message (optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-neutral-300 dark:border-neutral-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-neutral-700 dark:text-white px-3 py-2"
                      placeholder="Tell us about your research interests or collaboration opportunities..."
                    />
                  </div>

                  {formError && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
                      <p className="text-sm text-red-600 dark:text-red-400">{formError}</p>
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowDemoForm(false);
                        setFormError('');
                      }}
                      className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formLoading ? 'Submitting...' : 'Submit Request'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export async function getStaticProps() {
  try {
    const researchContent = await getMDXContent("pages/research.md").catch(() => null);

    return {
      props: {
        researchContent: researchContent || null,
      },
    };
  } catch (error) {
    console.error("Error loading research content:", error);
    return {
      props: {
        researchContent: null,
      },
    };
  }
}
