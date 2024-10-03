'use client';

import fetcher from '@/lib/fetcher';
import { Property } from '@/types';
import Link from 'next/link';
import useSWR from 'swr';
import LinstingCard from './listing-card';
import Container from '../container';
import SkeletonCard from '../skeleton-card';

export default function Linstings() {
  const { data, error, isLoading } = useSWR<Property[]>(
    '/api/listings',
    fetcher
  );

  if (isLoading || error)
    return (
      <Container>
        <div className="grid gap-2 py-5 md:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </Container>
    );

  return (
    <Container>
      <div id="property" className="h-screen">
        {/* <ListingFilter /> */}

        <h4 className="text-3xl font-bold text-primary">Recent Property</h4>

        <div className="grid gap-2 py-5 md:grid-cols-3">
          {data &&
            data?.map((property, i) => (
              <Link key={i} href={`/listing/${property.id}`}>
                <LinstingCard property={property} />
              </Link>
            ))}
        </div>
      </div>
    </Container>
  );
}
