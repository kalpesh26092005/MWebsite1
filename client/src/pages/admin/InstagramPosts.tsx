import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, ExternalLink, RotateCcw, Instagram } from 'lucide-react';
import { api } from '../../services/api';
import toast from 'react-hot-toast';
import {
  DataTable,
  Modal,
  ImageUpload,
  Input,
  Textarea,
  FormActions,
} from '../../components/admin';
import { InstagramPost, UploadImage } from '../../types';

interface InstagramFormData {
  postUrl: string;
  caption: string;
  displayOrder: string;
  image: UploadImage | null;
}

const initialFormData: InstagramFormData = {
  postUrl: '',
  caption: '',
  displayOrder: '0',
  image: null,
};

export const InstagramPosts = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InstagramPost | null>(null);
  const [formData, setFormData] = useState<InstagramFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{ postUrl?: string; imageError?: string }>({});

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await api.getInstagramPosts();
      if (response.success && response.data) {
        setPosts(response.data);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch Instagram posts');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData(initialFormData);
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
    const errors: { postUrl?: string; imageError?: string } = {};
    if (!formData.postUrl.trim()) errors.postUrl = 'Post URL is required';
    if (!formData.image && !editingItem) errors.imageError = 'Image is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('postUrl', formData.postUrl);
      formDataToSend.append('caption', formData.caption);
      formDataToSend.append('displayOrder', formData.displayOrder);

      if (formData.image?.file) {
        formDataToSend.append('image', formData.image.file);
      }

      const response = await api.createInstagramPost(formDataToSend);
      if (response.success) {
        toast.success('Instagram post added');
        closeModal();
        fetchPosts();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (post: InstagramPost) => {
    if (!confirm('Delete this Instagram post?')) return;
    try {
      const response = await api.deleteInstagramPost(post._id);
      if (response.success) {
        toast.success('Post deleted');
        fetchPosts();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete post');
    }
  };

  const columns = [
    { key: 'image', header: 'Image', width: '100px', render: (post: InstagramPost) => (
      <img src={post.image?.url || '/placeholder.png'} alt={post.caption || 'Instagram post'} className="w-16 h-16 rounded-lg object-cover" />
    )},
    { key: 'postUrl', header: 'Post URL', render: (post: InstagramPost) => (
      <a href={post.postUrl} target="_blank" rel="noopener noreferrer" className="text-[#8B6508] dark:text-[#F3E5AB] hover:underline flex items-center gap-1">
        View Post <ExternalLink className="w-3 h-3" />
      </a>
    )},
    { key: 'caption', header: 'Caption', width: '300px', render: (post: InstagramPost) => (
      <p className="text-[#57534E] dark:text-[#A8A29E] line-clamp-2">{post.caption || '—'}</p>
    )},
    { key: 'order', header: 'Order', width: '80px', render: (post: InstagramPost) => (
      <span className="text-[#57534E] dark:text-[#A8A29E] font-mono">{post.displayOrder || 0}</span>
    )},
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-[#1C1917] dark:text-[#FAF7F5]">Instagram Posts</h1>
          <p className="text-[#57534E] dark:text-[#A8A29E] mt-1">Manage Instagram feed</p>
        </div>
        <button onClick={openCreateModal} className="btn-primary flex items-center gap-2">
          <Instagram className="w-5 h-5" />
          Add Post
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <DataTable
          data={posts}
          columns={columns}
          keyExtractor={(p) => p._id}
          onDelete={handleDelete}
          isLoading={isLoading}
          emptyMessage="No Instagram posts found"
        />
      </motion.div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Add Instagram Post" size="lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Instagram Post URL"
            value={formData.postUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, postUrl: e.target.value }))}
            error={formErrors.postUrl}
            placeholder="https://www.instagram.com/p/..."
            required
          />
          <Textarea
            label="Caption"
            value={formData.caption}
            onChange={(e) => setFormData(prev => ({ ...prev, caption: e.target.value }))}
            placeholder="Post caption (optional)"
            rows={3}
          />
          <Input
            label="Display Order"
            type="number"
            value={formData.displayOrder}
            onChange={(e) => setFormData(prev => ({ ...prev, displayOrder: e.target.value }))}
            placeholder="0"
          />

          <div className="border-t border-[#EAE2D7] dark:border-stone-800 pt-6">
            <h3 className="font-heading text-lg font-semibold text-[#1C1917] dark:text-[#FAF7F5] mb-4">Post Image</h3>
            <ImageUpload
              value={formData.image ? [formData.image] : []}
              onChange={(images) => setFormData(prev => ({ ...prev, image: images[0] || null }))}
              maxFiles={1}
              label="Upload Post Image"
              error={formErrors.imageError}
            />
          </div>

          <FormActions>
            <button type="button" onClick={closeModal} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="btn-primary flex items-center gap-2">
              {isSubmitting ? <RotateCcw className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
              Add Post
            </button>
          </FormActions>
        </form>
      </Modal>
    </div>
  );
};

export default InstagramPosts;