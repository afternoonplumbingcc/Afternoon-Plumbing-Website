import { useState, useEffect } from 'react';

interface GBPSchemaProps {
  businessName?: string;
  businessInfo: {
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    website: string;
    latitude: number;
    longitude: number;
    serviceArea: string[];
    yearsInBusiness: number;
  };
  services: Array<{
    name: string;
    description: string;
    serviceType: string;
  }>;
}

export const generateGBPSchema = (props: GBPSchemaProps): string => {
  const {
    businessName = "Afternoon Plumbing",
    businessInfo,
    services
  } = props;

  const serviceArea = businessInfo.serviceArea || [
    "Westminster, MD",
    "Carroll County, MD",
    "Finksburg, MD",
    "Hampstead, MD"
  ];

  const gbpSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://afternoonplumbing.com/#organization`,
    name: businessName,
    description: `Professional plumbing services in ${businessInfo.city}, ${businessInfo.state}. Licensed and insured plumbers serving ${serviceArea.join(', ')}.`,
    url: businessInfo.website,
    telephone: `+1${businessInfo.phone.replace(/\D/g, '')}`,
    priceRange: "$$",
    foundingDate: `${new Date().getFullYear() - (businessInfo.yearsInBusiness || 10)}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: businessInfo.address,
      addressLocality: businessInfo.city,
      addressRegion: businessInfo.state,
      postalCode: businessInfo.zip,
      addressCountry: "US"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: businessInfo.latitude,
      longitude: businessInfo.longitude
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "14:00"
      }
    ],
    areaServed: serviceArea,
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: businessInfo.latitude,
        longitude: businessInfo.longitude
      },
      radius: 32186
    },
    makesOffer: services.map(service => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        serviceType: service.serviceType
      }
    })),
    sameAs: [
      `https://www.google.com/maps/place/${businessName.replace(/\s/g, '+')}/${businessInfo.latitude},${businessInfo.longitude}`,
      businessInfo.website
    ]
  };

  return JSON.stringify(gbpSchema, null, 2);
};

export const generateServiceSchema = (props: GBPSchemaProps): string => {
  const { businessName = "Afternoon Plumbing", businessInfo, services } = props;

  const serviceSchema = services[0] ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "provider": {
      "@type": "LocalBusiness",
      "name": businessName,
      "@id": `https://afternoonplumbing.com/#organization`
    },
    "areaServed": {
      "@type": "City",
      "name": businessInfo.city
    },
    "name": services[0].name,
    "description": services[0].description,
    "offers": {
      "@type": "Offer",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "USD",
        "price": "Contact for quote"
      }
    }
  } : '';

  return JSON.stringify(serviceSchema, null, 2);
};

export const GBPSchema: React.FC<GBPSchemaProps> = (props) => {
  const [schema1, setSchema1] = useState<string>('');
  const [schema2, setSchema2] = useState<string>('');

  useEffect(() => {
    setSchema1(generateGBPSchema(props));
    setSchema2(generateServiceSchema(props));
  }, [props]);

  if (!schema1 || !schema2) return null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schema1 }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schema2 }}
      />
    </>
  );
};

export default GBPSchema;
