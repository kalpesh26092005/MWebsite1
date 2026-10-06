import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, GripVertical, Star, RotateCcw } from 'lucide-react';
import { api } from '../../services/api';
import toast from 'react-hot-toast';
import {
  DataTable,
  Modal,
  ImageUpload,
  Input,
  Textarea,
  Checkbox,
  FormActions,
} from '../../components/admin';
import { Testimonial } from '../../types';

interface TestimonialFormData {
  customerName: string;
  review: string;
  rating: number;
  isVisible: boolean;
  displayOrder: string;
  image: { url: string; publicId: string } | null;
}

const initialFormData: TestimonialFormData = {
  customerName: '',
  review: '',
  rating: 5,
  isVisible: true,
  displayOrder: '0',
  image: null,
};

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [draggedItem, setDraggedItem] = useState<Testimonial | null>(null);
  const [isReordering, setIsReordering] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<TestimonialFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<TestimonialFormData>>({});

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const response = await api.getTestimonials();
      if (response.success && response.data) {
        setTestimonials(response.data);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch testimonials');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData(initialFormData);
    setFormErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (testimonial: Testimonial) => {
    setEditingItem(testimonial);
    setFormData({
      customerName: testimonial.customerName,
      review: testimonial.review,
      rating: testimonial.rating || 5,
      isVisible: testimonial.isVisible,
      displayOrder: testimonial.displayOrder?.toString() || '0',
      image: testimonial.image || null,
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData(initialFormData);
    setFormErrors({});
  };

  const validateForm = (): boolean => {
    const errors: Partial<TestimonialFormData> = {};
    if (!formData.customerName.trim()) errors.customerName = 'Customer name is required';
    if (!formData.review.trim()) errors.review = 'Review is required';
    if (formData.rating < 1 || formData.rating > 5) errors.rating = 5 as any;
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('customerName', formData.customerName);
      formDataToSend.append('review', formData.review);
      formDataToSend.append('rating', formData.rating.toString());
      formDataToSend.append('isVisible', formData.isVisible.toString());
      formDataToSend.append('displayOrder', formData.displayOrder);

      if (formData.image && formData.image.publicId.startsWith('temp_')) {
        console.warn('Local image upload not implemented');
      } else if (formData.image) {
        formDataToSend.append('existingImage', JSON.stringify(formData.image));
      }

      if (editingItem) {
        const response = await api.updateTestimonial(editingItem._id, formDataToSend);
        if (response.success) {
          toast.success('Testimonial updated');
          closeModal();
          fetchTestimonials();
        }
      } else {
        const response = await api.createTestimonial(formDataToSend);
        if (response.success) {
          toast.success('Testimonial created');
          closeModal();
          fetchTestimonials();
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save testimonial');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (testimonial: Testimonial) => {
    if (!confirm(`Delete testimonial from "${testimonial.customerName}"?`)) return;
    try {
      const response = await api.deleteTestimonial(testimonial._id);
      if (response.success) {
        toast.success('Testimonial deleted');
        fetchTestimonials();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete testimonial');
    }
  };

  const handleDragStart = (e: React.DragEvent, testimonial: Testimonial) => {
    if (!isReordering) return;
    setDraggedItem(testimonial);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!isReordering) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, target: Testimonial) => {
    if (!isReordering || !draggedItem || draggedItem._id === target._id) return;
    e.preventDefault();

    const newOrder = [...testimonials];
    const fromIndex = newOrder.findIndex(t => t._id === draggedItem._id);
    const toIndex = newOrder.findIndex(t => t._id === target._id);
    const [removed] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, removed);

    const reordered = newOrder.map((t, i) => ({ id: t._id, displayOrder: i }));
    api.reorderTestimonials(reordered).then(response => {
      if (response.success) {
        setTestimonials(newOrder);
        toast.success('Reordered');
      }
    }).catch(() => {
      toast.error('Reorder failed');
      fetchTestimonials();
    });
  };

  const renderStars = (rating: number) => {
    return [1, 2, 3, 4, 5].map(star => (
      <Star key={star} className={`w-5 h-5 ${star <= rating ? 'text-amber-500 fill-amber-500' : 'text-[#D6D3D1] dark:text-[#3F3F46]'}`} />
    ));
  };

  const columns = [
    { key: 'customerName', header: 'Customer', sortable: true, render: (t: Testimonial) => (
      <div className="flex items-center gap-3">
        {isReordering && (
          <button onMouseDown={(e) => handleDragStart(e as any, t)} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e as any, t)} draggable className="p-1 text-[#57534E] dark:text-[#A8A29E] cursor-grab active:cursor-grabbing">
            <GripVertical className="w-5 h-5" />
          </button>
        )}
        <div className="flex items-center gap-3">
          {t.image ? (
            <img src={t.image.url} alt={t.customerName} className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B6508] to-[#B8860B] flex items-center justify-center text-white font-medium">
              {t.customerName.charAt(0)}
            </div>
          )}
          <div>
            <p className="font-medium text-[#1C1917] dark:text-[#FAF7F5]">{t.customerName}</p>
            <p className="text-xs text-[#57534E] dark:text-[#A8A29E]">Verified Customer</p>
          </div>
        </div>
      </div>
    )},
    { key: 'review', header: 'Review', width: '300px', render: (t: Testimonial) => (
      <p className="text-[#57534E] dark:text-[#A8A29E] line-clamp-2">"{t.review}"</p>
    )},
    { key: 'rating', header: 'Rating', width: '150px', render: (t: Testimonial) => (
      <div className="flex items-center gap-1">
        {renderStars(t.rating)}
        <span className="ml-1 text-sm text-[#57534E] dark:text-[#A8A29E]">{t.rating}/5</span>
      </div>
    )},
    { key: 'visibility', header: 'Status', width: '120px', render: (t: Testimonial) => (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        t.isVisible ? 'bg-green-500/10 text-green-600 dark:bg-green-500/10 dark:text-green-400' : 'bg-gray-500/10 text-gray-600 dark:bg-gray-500/10 dark:text-gray-400'
      }`}>
        {t.isVisible ? 'Visible' : 'Hidden'}
      </span>
    )},
    { key: 'order', header: 'Order', width: '80px', render: (t: Testimonial) => (
      <span className="text-[#57534E] dark:text-[#A8A29E] font-mono">{t.displayOrder || 0}</span>
    )},
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-[#1C1917] dark:text-[#FAF7F5]">Testimonials</h1>
          <p className="text-[#57534E] dark:text-[#A8A29E] mt-1">Manage customer reviews</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsReordering(!isReordering)} className={`btn-secondary flex items-center gap-2 ${isReordering ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:bg-amber-500/10 dark:border-amber-500/30 dark:text-amber-400' : ''}`}>
            <GripVertical className="w-5 h-5" />
            {isReordering ? 'Done' : 'Reorder'}
          </button>
          <button onClick={openCreateModal} className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Testimonial
          </button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <DataTable
          data={testimonials}
          columns={columns}
          keyExtractor={(t) => t._id}
          onEdit={openEditModal}
          onDelete={handleDelete}
          isLoading={isLoading}
          emptyMessage="No testimonials found"
        />
      </motion.div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingItem ? 'Edit Testimonial' : 'Add Testimonial'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Customer Name"
            value={formData.customerName}
            onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
            error={formErrors.customerName}
            placeholder="Enter customer name"
            required
          />
          <Textarea
            label="Review"
            value={formData.review}
            onChange={(e) => setFormData(prev => ({ ...prev, review: e.target.value }))}
            error={formErrors.review}
            placeholder="What did the customer say?"
            required
            rows={4}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1C1917] dark:text-[#FAF7F5] mb-2">Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                    className="p-1 transition-colors"
                    aria-label={`${star} star${star > 1 ? 's' : ''}`}
                  >
                    <Star className={`w-8 h-8 ${star <= formData.rating ? 'text-amber-500 fill-amber-500' : 'text-[#D6D3D1] dark:text-[#3F3F46] hover:text-amber-400'}`} />
                  </button>
                ))}
              </div>
            </div>
            <Input
              label="Display Order"
              type="number"
              value={formData.displayOrder}
              onChange={(e) => setFormData(prev => ({ ...prev, displayOrder: e.target.value }))}
              placeholder="0"
            />
          </div>
          <Checkbox
            label="Visible on website"
            checked={formData.isVisible}
            onChange={(checked) => setFormData(prev => ({ ...prev, isVisible: checked }))}
          />

          <div className="border-t border-[#EAE2D7] dark:border-stone-800 pt-6">
            <h3 className="font-heading text-lg font-semibold text-[#1C1917] dark:text-[#FAF7F5] mb-4">Customer Photo (Optional)</h3>
            <ImageUpload
              value={formData.image ? [formData.image] : []}
              onChange={(images) => setFormData(prev => ({ ...prev, image: images[0] || null }))}
              maxFiles={1}
              label="Upload Customer Photo"
            />
          </div>

          <FormActions>
            <button type="button" onClick={closeModal} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="btn-primary flex items-center gap-2">
              {isSubmitting ? <RotateCcw className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
              {editingItem ? 'Update' : 'Add'} Testimonial
            </button>
          </FormActions>
        </form>
      </Modal>
    </div>
  );
};

export default Testimonials;