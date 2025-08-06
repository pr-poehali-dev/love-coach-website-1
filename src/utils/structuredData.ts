export const getOrganizationStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Workstab",
  "alternateName": "workstab.com",
  "url": "https://workstab.com",
  "logo": "https://workstab.com/favicon.svg",
  "description": "Профессиональный коучинг отношений и близости. Помогаем парам укрепить связь, преодолеть кризисы и построить счастливые отношения.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "RU"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": "Russian"
  },
  "serviceArea": {
    "@type": "Country",
    "name": "Russia"
  },
  "areaServed": "RU",
  "knowsLanguage": "ru"
});

export const getWebsiteStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Workstab - Коучинг отношений",
  "url": "https://workstab.com",
  "description": "Профессиональный коучинг отношений и близости. Помогаем парам укрепить связь, преодолеть кризисы и построить счастливые отношения.",
  "inLanguage": "ru",
  "publisher": {
    "@type": "Organization",
    "name": "Workstab",
    "url": "https://workstab.com"
  }
});

export const getServiceStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Коучинг отношений",
  "description": "Профессиональный коучинг отношений и близости для пар. Индивидуальные консультации онлайн.",
  "provider": {
    "@type": "Organization",
    "name": "Workstab",
    "url": "https://workstab.com"
  },
  "serviceType": "Relationship Coaching",
  "areaServed": "RU",
  "availableLanguage": "ru",
  "category": "Professional Services",
  "offers": {
    "@type": "Offer",
    "description": "Консультации по коучингу отношений",
    "availability": "https://schema.org/InStock"
  }
});

export const getBlogPostStructuredData = (title: string, description: string, publishedDate: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": title,
  "description": description,
  "datePublished": publishedDate,
  "dateModified": publishedDate,
  "url": url,
  "author": {
    "@type": "Organization",
    "name": "Workstab"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Workstab",
    "url": "https://workstab.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://workstab.com/favicon.svg"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": url
  },
  "inLanguage": "ru"
});

export const getBreadcrumbStructuredData = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});