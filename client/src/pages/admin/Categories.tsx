import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, GripVertical, RotateCcw } from 'lucide-react';
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
import { Category, UploadImage } from '../../types';

interface CategoryFormData {
  name: string;
  description: string;
  displayOrder: string;
  isActive: boolean;
  image: UploadImage | null;
}

const initialFormData: CategoryFormData = {
  name: '',
  description: '',
  displayOrder: '0',
  isActive: true,
  image: null,
};

export const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReordering, setIsReordering] = useState(false);
  const [draggedItem, setDraggedItem] = useState<Category | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{ name?: string; imageError?: string }>({});

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await api.getCategories();
      if (response.success && response.data) {
        setCategories(response.data);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch categories');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormData(initialFormData);
    setFormErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      displayOrder: category.displayOrder?.toString() || '0',
      isActive: category.isActive,
      image: category.image || null,
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData(initialFormData);
    setFormErrors({});
  };

  const validateForm = (): boolean => {
    const errors: { name?: string; imageError?: string } = {};
    if (!formData.name.trim()) errors.name = 'Category name is required';
    if (!formData.image?.file && !editingCategory) errors.imageError = 'Category image is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('displayOrder', formData.displayOrder);
      formDataToSend.append('isActive', formData.isActive.toString());

      // Newly selected image: send the real file so the server can upload it.
      // Without a file (edits that keep the current image) the server
      // preserves the existing image.
      if (formData.image?.file) {
        formDataToSend.append('image', formData.image.file);
      }

      if (editingCategory) {
        const response = await api.updateCategory(editingCategory._id, formDataToSend);
        if (response.success) {
          toast.success('Category updated successfully');
          closeModal();
          fetchCategories();
        }
      } else {
        const response = await api.createCategory(formDataToSend);
        if (response.success) {
          toast.success('Category created successfully');
          closeModal();
          fetchCategories();
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save category');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (category: Category) => {
    if (!confirm(`Delete "${category.name}"? This cannot be undone.`)) return;
    try {
      const response = await api.deleteCategory(category._id);
      if (response.success) {
        toast.success('Category deleted');
        fetchCategories();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete category');
    }
  };

  const handleDragStart = (e: React.DragEvent, category: Category) => {
    if (!isReordering) return;
    setDraggedItem(category);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!isReordering) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetCategory: Category) => {
    if (!isReordering || !draggedItem || draggedItem._id === targetCategory._id) return;
    e.preventDefault();

    const newOrder = [...categories];
    const fromIndex = newOrder.findIndex(c => c._id === draggedItem._id);
    const toIndex = newOrder.findIndex(c => c._id === targetCategory._id);
    
    const [removed] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, removed);

    const reorderedCategories = newOrder.map((cat, index) => ({
      id: cat._id,
      displayOrder: index,
    }));

    api.reorderCategories(reorderedCategories).then(response => {
      if (response.success) {
        setCategories(newOrder);
        toast.success('Categories reordered');
      }
    }).catch(() => {
      toast.error('Failed to reorder');
      fetchCategories();
    });
  };

  const handleReorderToggle = () => {
    setIsReordering(!isReordering);
    if (!isReordering) {
      setDraggedItem(null);
    }
  };

  const columns = [
    { key: 'image', header: 'Image', width: '70px', render: (category: Category) => (
      <img src={category.image?.url || '/placeholder.png'} alt={category.name} className="w-14 h-14 rounded-lg object-cover" />
    )},
    { key: 'name', header: 'Name', sortable: true, render: (category: Category) => (
      <div className="flex items-center gap-3">
        {isReordering && (
          <button
            onMouseDown={(e) => handleDragStart(e as any, category)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e as any, category)}
            draggable
            className="p-2 text-[#57534E] dark:text-[#A8A29E] hover:text-[#8B6508] dark:hover:text-[#F3E5AB] cursor-grab active:cursor-grabbing"
            aria-label="Drag to reorder"
          >
            <GripVertical className="w-5 h-5" />
          </button>
        )}
        <div>
          <p className="font-medium text-[#1C1917] dark:text-[#FAF7F5]">{category.name}</p>
          <p className="text-xs text-[#57534E] dark:text-[#A8A29E]">{category.productCount || 0} products</p>
        </div>
      </div>
    )},
    { key: 'description', header: 'Description', render: (category: Category) => (
      <p className="text-[#57534E] dark:text-[#A8A29E] line-clamp-2 max-w-xs">{category.description || '—'}</p>
    )},
    { key: 'status', header: 'Status', width: '120px', render: (category: Category) => (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        category.isActive ? 'bg-green-500/10 text-green-600 dark:bg-green-500/10 dark:text-green-400' : 'bg-red-500/10 text-red-600 dark:bg-red-500/10 dark:text-red-400'
      }`}>
        {category.isActive ? 'Active' : 'Inactive'}
      </span>
    )},
    { key: 'order', header: 'Order', width: '80px', render: (category: Category) => (
      <span className="text-[#57534E] dark:text-[#A8A29E] font-mono">{category.displayOrder || 0}</span>
    )},
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-[#1C1917] dark:text-[#FAF7F5]">Categories</h1>
          <p className="text-[#57534E] dark:text-[#A8A29E] mt-1">Organize your products</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleReorderToggle} className={`btn-secondary flex items-center gap-2 ${isReordering ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:bg-amber-500/10 dark:border-amber-500/30 dark:text-amber-400' : ''}`}>
            <GripVertical className="w-5 h-5" />
            {isReordering ? 'Done' : 'Reorder'}
          </button>
          <button onClick={openCreateModal} className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Category
          </button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <DataTable
          data={categories}
          columns={columns}
          keyExtractor={(c) => c._id}
          onEdit={openEditModal}
          onDelete={handleDelete}
          isLoading={isLoading}
          emptyMessage="No categories found"
        />
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingCategory ? 'Edit Category' : 'Add Category'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Category Name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            error={formErrors.name}
            placeholder="Enter category name"
            required
          />
          <Textarea
            label="Description (Optional)"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe this category..."
            rows={3}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Display Order"
              type="number"
              value={formData.displayOrder}
              onChange={(e) => setFormData(prev => ({ ...prev, displayOrder: e.target.value }))}
              placeholder="0"
            />
            <Checkbox
              label="Active"
              checked={formData.isActive}
              onChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
            />
          </div>

          <div className="border-t border-[#EAE2D7] dark:border-stone-800 pt-6">
            <h3 className="font-heading text-lg font-semibold text-[#1C1917] dark:text-[#FAF7F5] mb-4">Category Image</h3>
            <ImageUpload
              value={formData.image ? [formData.image] : []}
              onChange={(images) => setFormData(prev => ({ ...prev, image: images[0] || null }))}
              maxFiles={1}
              label="Upload Category Image"
              error={formErrors.imageError}
            />
          </div>

          <FormActions>
            <button type="button" onClick={closeModal} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="btn-primary flex items-center gap-2">
              {isSubmitting ? <RotateCcw className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
              {editingCategory ? 'Update' : 'Create'} Category
            </button>
          </FormActions>
        </form>
      </Modal>
    </div>
  );
};

export default Categories;