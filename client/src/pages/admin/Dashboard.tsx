import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, FolderOpen, MessageSquare, Instagram, TrendingUp, Clock } from 'lucide-react';
import { api } from '../../services/api';

export const Dashboard = () => {
  const [stats, setStats] = useState([
    { label: 'Total Products', value: '—', icon: ShoppingBag, color: 'bg-amber-500/10 dark:bg-amber-500/10', iconColor: 'text-[#8B6508] dark:text-[#F3E5AB]' },
    { label: 'Categories', value: '—', icon: FolderOpen, color: 'bg-green-500/10 dark:bg-green-500/10', iconColor: 'text-green-600 dark:text-green-400' },
    { label: 'Testimonials', value: '—', icon: MessageSquare, color: 'bg-red-500/10 dark:bg-red-500/10', iconColor: 'text-red-600 dark:text-red-400' },
    { label: 'Instagram Posts', value: '—', icon: Instagram, color: 'bg-purple-500/10 dark:bg-purple-500/10', iconColor: 'text-purple-600 dark:text-purple-400' },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, categoriesRes, testimonialsRes, instagramRes] = await Promise.all([
          api.getProducts({ limit: 1 }),
          api.getCategories(),
          api.getTestimonials(),
          api.getInstagramPosts(),
        ]);

        setStats(prev => prev.map((stat, index) => {
          switch(index) {
            case 0: return { ...stat, value: String(productsRes.pagination?.total || 0) };
            case 1: return { ...stat, value: String(categoriesRes.data?.length || 0) };
            case 2: return { ...stat, value: String(testimonialsRes.data?.length || 0) };
            case 3: return { ...stat, value: String(instagramRes.data?.length || 0) };
            default: return stat;
          }
        }));
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-3xl font-semibold text-[#1C1917] dark:text-[#FAF7F5]">Dashboard</h1>
        <p className="text-[#57534E] dark:text-[#A8A29E] mt-1">Welcome to your admin control panel</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#57534E] dark:text-[#A8A29E] text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-[#1C1917] dark:text-[#FAF7F5] mt-2">
                  {isLoading ? (
                    <span className="inline-block w-12 h-8 bg-[#EAE2D7] dark:bg-stone-800 rounded animate-pulse" />
                  ) : (
                    stat.value
                  )}
                </p>
              </div>
              <div className={`w-14 h-14 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className={`w-7 h-7 ${stat.iconColor}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card p-6 lg:col-span-2">
          <h2 className="font-heading text-xl font-semibold text-[#1C1917] dark:text-[#FAF7F5] mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a href="/admin_access/products" className="p-4 rounded-xl bg-[#FAF7F2] dark:bg-[#19191E] border border-[#EAE2D7] dark:border-stone-800 hover:border-[#8B6508] dark:hover:border-amber-500 transition-colors">
              <ShoppingBag className="w-8 h-8 text-[#8B6508] dark:text-[#F3E5AB] mb-2" />
              <p className="font-medium text-[#1C1917] dark:text-[#FAF7F5]">Add Product</p>
              <p className="text-sm text-[#57534E] dark:text-[#A8A29E]">Create new product</p>
            </a>
            <a href="/admin_access/categories" className="p-4 rounded-xl bg-[#FAF7F2] dark:bg-[#19191E] border border-[#EAE2D7] dark:border-stone-800 hover:border-[#8B6508] dark:hover:border-amber-500 transition-colors">
              <FolderOpen className="w-8 h-8 text-green-600 dark:text-green-400 mb-2" />
              <p className="font-medium text-[#1C1917] dark:text-[#FAF7F5]">Add Category</p>
              <p className="text-sm text-[#57534E] dark:text-[#A8A29E]">Organize products</p>
            </a>
            <a href="/admin_access/testimonials" className="p-4 rounded-xl bg-[#FAF7F2] dark:bg-[#19191E] border border-[#EAE2D7] dark:border-stone-800 hover:border-[#8B6508] dark:hover:border-amber-500 transition-colors">
              <MessageSquare className="w-8 h-8 text-red-600 dark:text-red-400 mb-2" />
              <p className="font-medium text-[#1C1917] dark:text-[#FAF7F5]">Add Testimonial</p>
              <p className="text-sm text-[#57534E] dark:text-[#A8A29E]">Customer review</p>
            </a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="card p-6">
          <h2 className="font-heading text-xl font-semibold text-[#1C1917] dark:text-[#FAF7F5] mb-4">Site Info</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#FAF7F2] dark:bg-[#19191E]">
              <Clock className="w-5 h-5 text-[#8B6508] dark:text-[#F3E5AB]" />
              <div>
                <p className="text-sm font-medium text-[#1C1917] dark:text-[#FAF7F5]">Business Hours</p>
                <p className="text-xs text-[#57534E] dark:text-[#A8A29E]">Mon-Sat, 10 AM - 8 PM IST</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#FAF7F2] dark:bg-[#19191E]">
              <TrendingUp className="w-5 h-5 text-[#8B6508] dark:text-[#F3E5AB]" />
              <div>
                <p className="text-sm font-medium text-[#1C1917] dark:text-[#FAF7F5]">Status</p>
                <p className="text-xs text-[#57534E] dark:text-[#A8A29E]">All systems operational</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;