import { motion } from 'framer-motion';
import { Instagram, ExternalLink } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { INSTAGRAM_URL } from '../../utils/helpers';

export const InstagramFeed = () => {
  const { instagramPosts } = useProducts();

  if (instagramPosts.length === 0) return null;

  return (
    <section className="py-20 md:py-32 bg-white dark:bg-[#121214]">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-accent text-2xl text-[#9F1239] dark:text-[#FB7185]">Connect</span>
          <h2 className="section-title mt-2 mb-4">Follow Us on Instagram</h2>
          <p className="text-[#57534E] dark:text-[#A8A29E] text-lg max-w-2xl mx-auto mb-6">
            Stay updated with our latest creations and behind-the-scenes moments
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#8B6508] dark:text-[#F3E5AB] hover:text-[#9F1239] dark:hover:text-[#FB7185] transition-colors font-medium"
          >
            <Instagram className="w-5 h-5" aria-hidden="true" />
            @minals_art_corner_
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        </motion.div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {instagramPosts.slice(0, 12).map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <a
                href={post.postUrl || INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-square rounded-2xl overflow-hidden"
              >
                <img
                  src={post.image.url}
                  alt={post.caption || 'Instagram post'}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  {post.caption && (
                    <p className="text-white text-sm line-clamp-2">
                      {post.caption}
                    </p>
                  )}
                </div>

                {/* Instagram Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Instagram className="w-4 h-4 text-white" aria-hidden="true" />
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Follow Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Instagram className="w-5 h-5" aria-hidden="true" />
            Follow on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
};