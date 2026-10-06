import { Helmet } from 'react-helmet-async';
import { useProducts } from '../../context/ProductContext';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  productName?: string;
  price?: number;
  category?: string;
}

export const SEOHead = ({
  title,
  description,
  image,
  url,
  type = 'website',
  productName,
  price,
  category,
}: SEOProps) => {
  const { settings } = useProducts();
  const siteName = settings?.metaTitle || "Minal's Art Corner";
  const defaultDescription = settings?.metaDescription || 'Premium handmade decoratives, mehandi, embroidery & gifts by Minal Privin Gurav. Custom orders available. Pan-India delivery.';
  const defaultImage = '/og-image.jpg';

  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const fullDescription = description || defaultDescription;
  const fullImage = image || defaultImage;
  const fullUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#B8860B" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />

      {/* Product specific */}
      {type === 'product' && productName && price && (
        <>
          <meta property="product:retailer" content={siteName} />
          <meta property="product:price:amount" content={price.toString()} />
          <meta property="product:price:currency" content="INR" />
          {category && <meta property="product:category" content={category} />}
        </>
      )}

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': type === 'product' ? 'Product' : 'WebSite',
            name: siteName,
            url: 'https://minalsartcorner.com',
            description: defaultDescription,
            ...(type === 'product' && productName && price && {
              name: productName,
              description: fullDescription,
              image: fullImage,
              offers: {
                '@type': 'Offer',
                price: price,
                priceCurrency: 'INR',
                availability: 'https://schema.org/InStock',
                seller: {
                  '@type': 'Organization',
                  name: siteName,
                },
              },
              brand: {
                '@type': 'Brand',
                name: siteName,
              },
            }),
          }),
        }}
      />
    </Helmet>
  );
};