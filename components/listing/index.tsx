'use client';

import fetcher from '@/lib/fetcher';
import ListingFilter from './filter';
import LinstingCard from './listing-card';
import useSWR from 'swr';
import { Property } from '@/types';
import Link from 'next/link';

export default function Linstings() {
  const { data, error, isLoading } = useSWR<Property[]>(
    '/api/listings',
    fetcher
  );
  console.log(data);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="pt-10">
      <h1 className="text-wrap py-10 text-2xl font-black text-primary lg:text-5xl">
        Seamlessly Connecting You
        <br /> to Your Next Home.
      </h1>
      <ListingFilter />

      <div className="grid gap-2 py-5 md:grid-cols-3">
        {data &&
          data.map((property, i) => (
            <Link key={i} href={`/listing/${property.id}`}>
              <LinstingCard property={property} />
            </Link>
          ))}
      </div>
    </div>
  );
}
