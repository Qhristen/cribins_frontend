'use client';

import Image from 'next/image';
import { Card } from '../ui/card';
import { HouseImage } from '@/assets/images';
import { Property } from '@/types';

interface Props {
  property: Property;
}

export default function LinstingCard({ property }: Props) {
  return (
    <Card className="relative h-80 overflow-clip">
      <Image
        alt={'image'}
        width={400}
        height={200}
        priority
        src={`${property.imageUrls && property.imageUrls[3]}`}
        className="object-fit z-0 h-full w-full object-center lg:object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 flex h-16 items-center justify-start bg-gradient-to-t from-black via-black/85 to-transparent p-3">
        <h1 className="text-xl font-bold capitalize text-white">
          {property.title}
        </h1>
      </div>
    </Card>
  );
}
