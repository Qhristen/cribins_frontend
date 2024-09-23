'use client';

import Image from 'next/image';
import { Card } from '../ui/card';
import { HouseImage } from '@/assets/images';

export default function LinstingCard() {
  return (
    <Card className="h-80 overflow-clip">
      <Image
        alt={'image'}
        src={HouseImage}
        // objectFit="fit"
        className="object-fit h-full w-full object-center lg:object-cover"
      />
    </Card>
  );
}
