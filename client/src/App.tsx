import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { WhatsAppFloat } from './components/common/WhatsAppFloat';
import { ScrollToTop } from './components/common/ScrollToTop';
import { useAuth } from './context/AuthContext';
import { PageLoader } from './components/common/Loader';
import { AdminLayout } from './components/admin/AdminLayout';

// Pages
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminCategories from './pages/admin/Categories';
import AdminTestimonials from './pages/admin/Testimonials';
import AdminInstagramPosts from './pages/admin/InstagramPosts';
import AdminSettings from './pages/admin/Settings';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin_access" replace />;
  }

  return <>{children}</>;
};

// Public Route Component (redirect if authenticated)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isAuthenticated) {
    return <Navigate to="/admin_access/dashboard" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<><Navbar /><Home /><Footer /><WhatsAppFloat /><ScrollToTop /></>} />
          <Route path="/gallery" element={<><Navbar /><Gallery /><Footer /><WhatsAppFloat /><ScrollToTop /></>} />
          <Route path="/product/:id" element={<><Navbar /><ProductDetail /><Footer /><WhatsAppFloat /><ScrollToTop /></>} />
          <Route path="/about" element={<><Navbar /><About /><Footer /><WhatsAppFloat /><ScrollToTop /></>} />
          <Route path="/contact" element={<><Navbar /><Contact /><Footer /><WhatsAppFloat /><ScrollToTop /></>} />

          {/* Admin Login (Public) */}
          <Route
            path="/admin_access"
            element={
              <PublicRoute>
                <AdminLogin />
              </PublicRoute>
            }
          />

          {/* Admin Routes (Protected + Layout) */}
          <Route
            path="/admin_access/dashboard"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin_access/products"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminProducts />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin_access/categories"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminCategories />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin_access/testimonials"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminTestimonials />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin_access/instagram"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminInstagramPosts />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin_access/settings"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminSettings />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<><Navbar /><NotFound /><Footer /></>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;