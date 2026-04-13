interface Review {
  author: string;
  datePublished: string;
  reviewBody: string;
  rating: number;
}

interface ReviewSchemaProps {
  businessName?: string;
  reviews?: Review[];
  aggregateRating?: {
    rating: number;
    reviewCount: number;
  };
  businessInfo: {
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    latitude: number;
    longitude: number;
  };
}

export const generateReviewSchema = (props: ReviewSchemaProps): string => {
  const {
    businessName = "Afternoon Plumbing",
    reviews = [],
    aggregateRating = { rating: 5.0, reviewCount: 10 },
    businessInfo
  } = props;

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://afternoonplumbing.com/#organization`,
    name: businessName,
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
    telephone: `+1${businessInfo.phone.replace(/\D/g, '')}`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.rating,
      reviewCount: aggregateRating.reviewCount
    }
  };

  if (reviews.length > 0) {
    schema.review = reviews.slice(0, 5).map(review => ({
      "@type": "Review",
      author: review.author,
      datePublished: review.datePublished,
      reviewBody: review.reviewBody,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1
      }
    }));
  }

  return JSON.stringify(schema, null, 2);
};

export const sampleReviews: Review[] = [
  {
    author: "Mike S.",
    datePublished: "2025-12-15",
    reviewBody: "Afternoon Plumbing replaced my water heater quickly and professionally. Highly recommend!",
    rating: 5
  },
  {
    author: "Sarah L.",
    datePublished: "2025-11-20",
    reviewBody: "Had a well pump emergency on a Sunday. They responded within an hour. Great service!",
    rating: 5
  }
];

export const ReviewSchema: React.FC<ReviewSchemaProps> = (props) => {
  const schemaJson = generateReviewSchema(props);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schemaJson }}
    />
  );
};

export default ReviewSchema;
