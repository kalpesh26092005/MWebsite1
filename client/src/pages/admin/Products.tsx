import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Tag, Star, RotateCcw } from 'lucide-react';
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
import { Product, Category, UploadImage } from '../../types';

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  priceLabel: string;
  category: string;
  isFeatured: boolean;
  isAvailable: boolean;
  isCustomizable: boolean;
  tags: string;
  displayOrder: string;
  images: UploadImage[];
}

const initialFormData: ProductFormData = {
  name: '',
  description: '',
  price: '',
  priceLabel: '',
  category: '',
  isFeatured: false,
  isAvailable: true,
  isCustomizable: false,
  tags: '',
  displayOrder: '0',
  images: [],
};

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 });
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'createdAt', direction: 'desc' });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [originalImages, setOriginalImages] = useState<UploadImage[]>([]);
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<ProductFormData> & { imagesError?: string }>({});

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await api.getProducts({
        search: search || undefined,
        category: categoryFilter || undefined,
        sort: `${sortConfig.direction === 'desc' ? '-' : ''}${sortConfig.key}`,
        page: pagination.page,
        limit: pagination.limit,
      });
      if (response.success) {
        setProducts(response.data);
        setPagination(prev => ({
          ...prev,
          total: response.pagination?.total || 0,
          totalPages: response.pagination?.totalPages || 0,
        }));
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.getCategories(true);
      if (response.success && response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [pagination.page, search, categoryFilter, sortConfig]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    setOriginalImages([]);
    setFormData(initialFormData);
    setFormErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setOriginalImages(product.images || []);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      priceLabel: product.priceLabel || '',
      category: typeof product.category === 'object' ? product.category._id : product.category,
      isFeatured: product.isFeatured,
      isAvailable: product.isAvailable,
      isCustomizable: product.isCustomizable,
      tags: product.tags?.join(', ') || '',
      displayOrder: product.displayOrder?.toString() || '0',
      images: product.images || [],
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setOriginalImages([]);
    setFormData(initialFormData);
    setFormErrors({});
  };

  const validateForm = (): boolean => {
    const errors: Partial<ProductFormData> & { imagesError?: string } = {};
    if (!formData.name.trim()) errors.name = 'Product name is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.price || parseFloat(formData.price) <= 0) errors.price = 'Valid price is required';
    if (!formData.category) errors.category = 'Category is required';
    if (formData.images.length === 0 && !editingProduct) errors.imagesError = 'At least one image is required';
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
      formDataToSend.append('price', formData.price);
      formDataToSend.append('priceLabel', formData.priceLabel);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('isFeatured', formData.isFeatured.toString());
      formDataToSend.append('isAvailable', formData.isAvailable.toString());
      formDataToSend.append('isCustomizable', formData.isCustomizable.toString());
      formDataToSend.append('tags', formData.tags);
      formDataToSend.append('displayOrder', formData.displayOrder);

      // Images removed while editing (original images no longer in the list)
      const removedPublicIds = originalImages
        .filter(orig => !formData.images.some(img => img.publicId === orig.publicId))
        .map(img => img.publicId);
      if (removedPublicIds.length > 0) {
        formDataToSend.append('removeImages', JSON.stringify(removedPublicIds));
      }

      // Newly selected images: send the real files so the server can upload
      // them; existing (server-hosted) images are left untouched.
      formData.images.forEach((img) => {
        if (img.file) {
          formDataToSend.append('images', img.file);
        }
      });

      if (editingProduct) {
        const response = await api.updateProduct(editingProduct._id, formDataToSend);
        if (response.success) {
          toast.success('Product updated successfully');
          closeModal();
          fetchProducts();
        }
      } else {
        const response = await api.createProduct(formDataToSend);
        if (response.success) {
          toast.success('Product created successfully');
          closeModal();
          fetchProducts();
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    try {
      const response = await api.deleteProduct(product._id);
      if (response.success) {
        toast.success('Product deleted');
        fetchProducts();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete product');
    }
  };

  const columns = [
    { key: 'image', header: 'Image', width: '80px', render: (product: Product) => (
      <img src={product.images?.[0]?.url || '/placeholder.png'} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
    )},
    { key: 'name', header: 'Name', sortable: true, render: (product: Product) => (
      <div>
        <p className="font-medium text-[#1C1917] dark:text-[#FAF7F5]">{product.name}</p>
        {product.category && typeof product.category === 'object' && (
          <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-amber-500/10 dark:bg-amber-500/10 text-[#8B6508] dark:text-[#F3E5AB] rounded-full">
            {product.category.name}
          </span>
        )}
      </div>
    )},
    { key: 'price', header: 'Price', sortable: true, render: (product: Product) => (
      <span className="font-semibold text-[#8B6508] dark:text-[#F3E5AB]">₹{product.price.toLocaleString()}</span>
    )},
    { key: 'status', header: 'Status', width: '140px', render: (product: Product) => (
      <div className="flex items-center gap-2">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          product.isAvailable ? 'bg-green-500/10 text-green-600 dark:bg-green-500/10 dark:text-green-400' : 'bg-red-500/10 text-red-600 dark:bg-red-500/10 dark:text-red-400'
        }`}>
          {product.isAvailable ? 'Active' : 'Inactive'}
        </span>
        {product.isFeatured && <Star className="w-4 h-4 text-amber-500" />}
        {product.isCustomizable && <Tag className="w-4 h-4 text-[#8B6508] dark:text-[#F3E5AB]" />}
      </div>
    )},
    { key: 'views', header: 'Views', sortable: true, render: (product: Product) => (
      <span className="text-[#57534E] dark:text-[#A8A29E]">{product.viewCount || 0}</span>
    )},
    { key: 'order', header: 'Order', width: '80px', sortable: true, render: (product: Product) => (
      <span className="text-[#57534E] dark:text-[#A8A29E]">{product.displayOrder || 0}</span>
    )},
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-[#1C1917] dark:text-[#FAF7F5]">Products</h1>
          <p className="text-[#57534E] dark:text-[#A8A29E] mt-1">Manage your product catalog</p>
        </div>
        <button onClick={openCreateModal} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#57534E] dark:text-[#A8A29E]" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EAE2D7] dark:border-stone-800 bg-white dark:bg-[#121214] text-[#1C1917] dark:text-[#FAF7F5] focus:border-[#8B6508] dark:focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-[#EAE2D7] dark:border-stone-800 bg-white dark:bg-[#121214] text-[#1C1917] dark:text-[#FAF7F5]"
          >
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <DataTable
          data={products}
          columns={columns}
          keyExtractor={(p) => p._id}
          onEdit={openEditModal}
          onDelete={handleDelete}
          isLoading={isLoading}
          emptyMessage="No products found"
          pagination={{
            page: pagination.page,
            limit: pagination.limit,
            total: pagination.total,
            totalPages: pagination.totalPages,
            onPageChange: (page) => setPagination(prev => ({ ...prev, page })),
          }}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      </motion.div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingProduct ? 'Edit Product' : 'Add Product'}
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Input
              label="Product Name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              error={formErrors.name}
              placeholder="Enter product name"
              required
            />
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="px-4 py-3 rounded-xl border border-[#EAE2D7] dark:border-stone-800 bg-white dark:bg-[#121214] text-[#1C1917] dark:text-[#FAF7F5]"
              required
            >
              <option value="">Select category</option>
              {categories.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
            <Input
              label="Price (₹)"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              error={formErrors.price}
              placeholder="0.00"
              required
            />
            <Input
              label="Price Label (Optional)"
              value={formData.priceLabel}
              onChange={(e) => setFormData(prev => ({ ...prev, priceLabel: e.target.value }))}
              placeholder="e.g., Starting from, Per piece"
            />
            <Input
              label="Display Order"
              type="number"
              value={formData.displayOrder}
              onChange={(e) => setFormData(prev => ({ ...prev, displayOrder: e.target.value }))}
              placeholder="0"
            />
            <Textarea
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              error={formErrors.description}
              placeholder="Describe the product..."
              required
              rows={4}
            />
            <Input
              label="Tags (comma separated)"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="handmade, gift, decor"
            />
          </div>

          <div className="border-t border-[#EAE2D7] dark:border-stone-800 pt-6">
            <h3 className="font-heading text-lg font-semibold text-[#1C1917] dark:text-[#FAF7F5] mb-4">Images</h3>
            <ImageUpload
              value={formData.images}
              onChange={(images) => setFormData(prev => ({ ...prev, images }))}
              maxFiles={5}
              label="Upload Product Images"
              error={formErrors.imagesError}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Checkbox
              label="Featured Product"
              checked={formData.isFeatured}
              onChange={(checked) => setFormData(prev => ({ ...prev, isFeatured: checked }))}
              helperText="Show in featured section on homepage"
            />
            <Checkbox
              label="Available for Sale"
              checked={formData.isAvailable}
              onChange={(checked) => setFormData(prev => ({ ...prev, isAvailable: checked }))}
            />
            <Checkbox
              label="Customizable"
              checked={formData.isCustomizable}
              onChange={(checked) => setFormData(prev => ({ ...prev, isCustomizable: checked }))}
              helperText="Allow custom orders for this product"
            />
          </div>

          <FormActions>
            <button type="button" onClick={closeModal} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="btn-primary flex items-center gap-2">
              {isSubmitting ? <RotateCcw className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
              {editingProduct ? 'Update' : 'Create'} Product
            </button>
          </FormActions>
        </form>
      </Modal>
    </div>
  );
};

export default Products;