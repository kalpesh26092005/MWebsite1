import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, RotateCcw, Settings as SettingsIcon } from 'lucide-react';
import { api } from '../../services/api';
import toast from 'react-hot-toast';
import {
  Input,
  Textarea,
} from '../../components/admin';

interface SettingsFormData {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  aboutText: string;
  businessHours: string;
  faqs: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
}

const initialFormData: SettingsFormData = {
  heroTitle: '',
  heroSubtitle: '',
  heroImage: '',
  aboutText: '',
  businessHours: '',
  faqs: [],
  metaTitle: '',
  metaDescription: '',
};

export const Settings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<SettingsFormData>(initialFormData);
  const [originalData, setOriginalData] = useState<SettingsFormData>(initialFormData);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const response = await api.getSettings();
      if (response.success) {
        const settings = response.data;
        const data: SettingsFormData = {
          heroTitle: settings.heroTitle || '',
          heroSubtitle: settings.heroSubtitle || '',
          heroImage: settings.heroImage || '',
          aboutText: settings.aboutText || '',
          businessHours: settings.businessHours || '',
          faqs: settings.faqs || [],
          metaTitle: settings.metaTitle || '',
          metaDescription: settings.metaDescription || '',
        };
        setFormData(data);
        setOriginalData(data);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch settings');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await api.updateSettings(formData);
      if (response.success) {
        toast.success('Settings saved successfully');
        setOriginalData(formData);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setFormData(originalData);
    toast.success('Changes reverted');
  };

  const handleAddFaq = () => {
    if (!newFaq.question.trim() || !newFaq.answer.trim()) {
      toast.error('Please fill both question and answer');
      return;
    }
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { ...newFaq }],
    }));
    setNewFaq({ question: '', answer: '' });
  };

  const handleRemoveFaq = (index: number) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  const handleFaqChange = (index: number, field: 'question' | 'answer', value: string) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) => i === index ? { ...faq, [field]: value } : faq),
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#8B6508] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-[#1C1917] dark:text-[#FAF7F5]">Settings</h1>
          <p className="text-[#57534E] dark:text-[#A8A29E] mt-1">Manage site content and configuration</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleReset} className="btn-secondary flex items-center gap-2">
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
          <button onClick={handleSave} disabled={isSaving} className="btn-primary flex items-center gap-2">
            <Save className="w-5 h-5" />
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          {/* Hero Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
            <h2 className="font-heading text-xl font-semibold text-[#1C1917] dark:text-[#FAF7F5] mb-6 flex items-center gap-2">
              <SettingsIcon className="w-6 h-6 text-[#8B6508] dark:text-[#F3E5AB]" />
              Hero Section
            </h2>
            <div className="space-y-4">
              <Input
                label="Hero Title"
                value={formData.heroTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, heroTitle: e.target.value }))}
                placeholder="Minal's Art Corner"
              />
              <Input
                label="Hero Subtitle"
                value={formData.heroSubtitle}
                onChange={(e) => setFormData(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                placeholder="Handcrafted with Love, Delivered with Heart"
              />
              <Input
                label="Hero Image URL (Optional)"
                value={formData.heroImage}
                onChange={(e) => setFormData(prev => ({ ...prev, heroImage: e.target.value }))}
                placeholder="https://..."
              />
            </div>
          </motion.div>

          {/* About Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6">
            <h2 className="font-heading text-xl font-semibold text-[#1C1917] dark:text-[#FAF7F5] mb-6">About Section</h2>
            <div className="space-y-4">
              <Textarea
                label="About Text"
                value={formData.aboutText}
                onChange={(e) => setFormData(prev => ({ ...prev, aboutText: e.target.value }))}
                placeholder="Tell your story..."
                rows={6}
              />
              <Input
                label="Business Hours"
                value={formData.businessHours}
                onChange={(e) => setFormData(prev => ({ ...prev, businessHours: e.target.value }))}
                placeholder="Mon-Sat, 10 AM - 8 PM IST"
              />
            </div>
          </motion.div>

          {/* SEO Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-6">
            <h2 className="font-heading text-xl font-semibold text-[#1C1917] dark:text-[#FAF7F5] mb-6">SEO Settings</h2>
            <div className="space-y-4">
              <Input
                label="Meta Title"
                value={formData.metaTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                placeholder="Minal's Art Corner - Handcrafted with Love"
                helperText="Recommended: 50-60 characters"
              />
              <Textarea
                label="Meta Description"
                value={formData.metaDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                placeholder="Premium handmade decoratives..."
                rows={3}
                helperText="Recommended: 150-160 characters"
              />
            </div>
          </motion.div>
        </div>

        <div className="xl:col-span-1">
          {/* FAQs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card p-6">
            <h2 className="font-heading text-xl font-semibold text-[#1C1917] dark:text-[#FAF7F5] mb-6">FAQs</h2>
            <div className="space-y-4">
              {formData.faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-xl bg-[#FAF7F2] dark:bg-[#19191E] border border-[#EAE2D7] dark:border-stone-800">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="font-medium text-sm text-[#1C1917] dark:text-[#FAF7F5]">Q: {faq.question}</p>
                    <button
                      onClick={() => handleRemoveFaq(index)}
                      className="p-1 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                      aria-label="Remove FAQ"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-[#57534E] dark:text-[#A8A29E] mb-2">A: {faq.answer}</p>
                  <div className="flex gap-2">
                    <Input
                      label=""
                      value={faq.question}
                      onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                      placeholder="Question"
                      className="text-sm"
                    />
                    <Input
                      label=""
                      value={faq.answer}
                      onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                      placeholder="Answer"
                      className="text-sm"
                    />
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-[#EAE2D7] dark:border-stone-800">
                <Input
                  label="New Question"
                  value={newFaq.question}
                  onChange={(e) => setNewFaq(prev => ({ ...prev, question: e.target.value }))}
                  placeholder="Enter question"
                  className="mb-2"
                />
                <Textarea
                  label="New Answer"
                  value={newFaq.answer}
                  onChange={(e) => setNewFaq(prev => ({ ...prev, answer: e.target.value }))}
                  placeholder="Enter answer"
                  rows={2}
                  className="mb-2"
                />
                <button onClick={handleAddFaq} className="btn-secondary w-full">Add FAQ</button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;