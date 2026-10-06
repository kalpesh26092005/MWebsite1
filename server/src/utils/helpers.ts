export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export const validateEmail = (email: string): boolean => {
  return /^\S+@\S+\.\S+$/.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(phone);
};

export const calculatePagination = (page: number, limit: number, total: number) => {
  const totalPages = Math.ceil(total / limit);
  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
};

export const sanitizeString = (str: string): string => {
  return str.trim().replace(/[<>]/g, '');
};

export const generateWhatsAppUrl = (phone: string, message: string): string => {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};