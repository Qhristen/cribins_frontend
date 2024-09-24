'use client';

import fetcher from '@/lib/fetcher';
import { Property } from '@/types';
import useSWR from 'swr';
import Carousel from '../ui/carousel';
import Image from 'next/image';
import { PhotoView } from 'react-photo-view';
import { Check, LocateIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { CiLocationOn } from 'react-icons/ci';
import Link from 'next/link';
import { GoCopy } from 'react-icons/go';
import { toast, useToast } from '../ui/use-toast';

interface PageProps {
  listingId: string;
}

const SingleListingClient = ({ listingId }: PageProps) => {
  const { data, error, isLoading } = useSWR<Property>(
    listingId ? `/api/listings/${listingId}` : null,
    fetcher
  );
  const { toast } = useToast();
  const blinkUrl = `${window.location.origin}/api/action/${listingId}`;

  const onCopy = () => {
    navigator.clipboard.writeText(blinkUrl);
    toast({
      variant: 'default',
      title: 'Success',
      description: 'Blink url copied.'
    });
  };

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mt-32  overflow-clip rounded-md">
      <div className="grid w-full grid-cols-1 lg:grid-cols-[60%_40%]">
        <div className="">
          <Carousel responsive={{ desktop: 1, mobile: 1, tablet: 1 }}>
            {data?.imageUrls.map((img, i) => (
              <PhotoView key={i} src={img}>
                <Image
                  alt={'image'}
                  width={400}
                  height={200}
                  src={`${img}`}
                  priority
                  className="object-fit z-0 h-full w-full object-center lg:object-cover"
                />
              </PhotoView>
            ))}
          </Carousel>
        </div>
        <div className="bg-gray-100 px-6 py-2 dark:bg-gray-300/5 ">
          <h1 className="py-3 text-3xl font-extrabold">{data?.title}</h1>
          <div className="flex flex-row items-center justify-start gap-2 pb-2">
            <CiLocationOn color={'gray'} size={22} />
            <div className="font-JakartaMedium text-wrap text-sm text-gray-600 dark:text-white/40">
              123 Elmwood Avenue, CA 93927, Lagos, Nigeria
            </div>
          </div>

          <div className="border-secondary-200 dark:border-secondary-700/30 mt-2 flex flex-row items-center justify-between rounded-md border p-2 px-4">
            <div className="flex flex-col items-center justify-center">
              <div className="dark:text-white/50"> Price</div>
              <div className="text-sm font-bold dark:text-white">
                {data?.price}SOL
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="dark:text-white/50"> Type</div>
              <div className="text-sm font-bold dark:text-white">
                {data?.propertyType}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="dark:text-white/50"> Status</div>
              <div className="text-sm font-bold dark:text-white">
                {data?.propertyStatus}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="dark:text-white/50"> Availability</div>
              <div className="rounded-full bg-slate-200 p-1 dark:bg-slate-800">
                <Check name="check" color={'green'} size={13} />
              </div>
            </div>
          </div>

          <div className="mt-2 py-2 pb-10">
            <div className="pb-2 font-bold dark:text-white/60">
              Description.
            </div>
            <div className="text-sm leading-6 text-gray-700 dark:text-white/40">
              {data?.description}
            </div>
          </div>

          <Button size={`lg`} className="w-full text-white">
            Request Inspection
          </Button>

          <div className="mt-8">
            <div className="text-sm">Share blink</div>
            <div className="flex items-center gap-2 text-xs text-primary">
              {blinkUrl}
              <GoCopy onClick={onCopy} size={20} className=" cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleListingClient;
