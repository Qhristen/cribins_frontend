'use client';

import ListingFilter from './filter';
import LinstingCard from './listing-card';

const properties = [
  {
    name: 'Lagos Island Mansion',
    location: [6.5244, 3.3792], // Lagos, Nigeria
    price: 1500000,
    description:
      'A luxurious mansion located on Lagos Island, perfect for those who want to live in style.'
  },
  {
    name: 'Abuja Luxury Villa',
    location: [9.0765, 7.3986], // Abuja, Nigeria
    price: 2000000,
    description:
      'A luxury villa situated in the heart of Abuja with stunning views of the city.'
  },
  {
    name: 'Ibadan Family Home',
    location: [7.3775, 3.947], // Ibadan, Nigeria
    price: 500000,
    description:
      'A beautiful family home located in a serene neighborhood of Ibadan.'
  },
  {
    name: 'Port Harcourt Waterfront Property',
    location: [4.8156, 7.0498], // Port Harcourt, Nigeria
    price: 1200000,
    description:
      'A modern waterfront property in Port Harcourt, offering great views and access to the water.'
  },
  {
    name: 'Enugu Modern Apartment',
    location: [6.5243, 7.5105], // Enugu, Nigeria
    price: 350000,
    description: 'A stylish apartment in Enugu, close to all major amenities.'
  }
];

export default function Linstings() {
  return (
    <div className="pt-10">
      <h1 className="text-wrap py-10 text-2xl font-black text-primary lg:text-5xl">
        Seamlessly Connecting You
        <br /> to Your Next Home.
      </h1>
      <ListingFilter />

      <div className="grid gap-2 py-5 md:grid-cols-3">
        {properties.map((property, i) => (
          <LinstingCard />
        ))}
      </div>
    </div>
  );
}
