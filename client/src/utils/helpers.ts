import React from 'react';

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export const generateWhatsAppUrl = (phone: string, message: string): string => {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

export const generateProductWhatsAppMessage = (product: { name: string; price: number; category?: any }): string => {
  const categoryName = typeof product.category === 'object' && product.category?.name 
    ? product.category.name 
    : typeof product.category === 'string' 
      ? product.category 
      : '';

  return `Hi Minal! 👋\n\nI'm interested in ordering:\n\n📦 *${product.name}*\n💰 Price: ${formatPrice(product.price)}${categoryName ? `\n🏷️ Category: ${categoryName}` : ''}\n\nPlease share availability and delivery details. Thank you! 🙏`;
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const truncate = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const getStarRating = (rating: number): React.ReactNode => {
  const stars: React.ReactNode[] = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(React.createElement('span', { key: i, className: 'text-amber-500' }, '★'));
    } else if (i - 0.5 <= rating) {
      stars.push(React.createElement('span', { key: i, className: 'text-amber-500' }, '☆'));
    } else {
      stars.push(React.createElement('span', { key: i, className: 'text-stone-300 dark:text-stone-700' }, '☆'));
    }
  }
  return React.createElement('span', { className: 'flex gap-0.5' }, ...stars);
};

export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919307791258';
export const INSTAGRAM_URL = 'https://www.instagram.com/minals_art_corner_?stkn=MTIwZzBmMXg3YWxjNg==';
export const PHONE_NUMBER = '+91 9307791258';
