'use client';

import { useAuth } from '@/context/auth-context';
import fetcher from '@/lib/fetcher';
import { auth } from '@/lib/firebase/firebase';
import { Property } from '@/types';
import { Check, DollarSign } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { GoCopy } from 'react-icons/go';
import { PhotoView } from 'react-photo-view';
import useSWR from 'swr';
import GoogleSignInButton from '../google-auth-button';
import { Button } from '../ui/button';
import Carousel from '../ui/carousel';
import DateTimePicker from '../ui/date-time-picker';
import { useToast } from '../ui/use-toast';
import { SolanaQRCode } from '../qr-code';
import { useTheme } from 'next-themes';
import SkeletonCard from '../skeleton-card';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import BlinkComponent from '../blink';

interface PageProps {
  listingId: string;
}

const SingleListingClient = ({ listingId }: PageProps) => {
  const { data, error, isLoading } = useSWR<Property>(
    listingId ? `/api/listings/${listingId}` : null,
    fetcher
  );
  const user = auth.currentUser;
  const [origin, setOrigin] = useState('');
  // const { user: authuser } = useAuth();
  const { toast } = useToast();
  const { theme } = useTheme();

  const onCopy = () => {
    navigator.clipboard.writeText(blinkUrl);
    toast({
      variant: 'default',
      title: 'Success',
      description: 'Blink url copied.'
    });
  };

  const [dateTime, setDateTime] = useState('');

  const handleDateChange = (date: string) => {
    setDateTime(date);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  const RequestInspection = async () => {
    const token = await user?.getIdToken(); // Get the Firebase token
    let newData = {
      propertyId: data?.id
    };

    const response = await fetch('/api/listings/inspection', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: 'same-origin',
      body: JSON.stringify(newData)
    });

    console.log(await response.json(), 'res');
    if (response.ok) {
      toast({
        variant: 'default',
        title: 'Success',
        description: 'Inspection requested'
      });
    }
  };

  const blinkUrl = `${origin}/api/action/${listingId}`;

  if (isLoading || error)
    return (
      <div className="mt-14 grid h-screen w-full grid-cols-1 lg:grid-cols-[60%_40%]">
        <Card className="h-screen rounded-none border-none">
          <Skeleton className="h-screen w-full" />
        </Card>
        <Card className="rounded-none border-none">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-1/5" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex h-auto flex-wrap gap-2 lg:flex-nowrap">
            <Skeleton className="h-6 w-1/5" />
            <Skeleton className="h-6 w-1/5" />
            <Skeleton className="h-6 w-1/5" />
          </CardContent>
        </Card>
      </div>
    );

  return (
    <div id="property" className="mb-20 mt-14">
      <div className="grid h-screen w-full grid-cols-1 lg:grid-cols-[60%_40%]">
        <div className="">
          <Carousel responsive={{ desktop: 1, mobile: 1, tablet: 1 }}>
            {data &&
              data?.imageUrls.map((img, i) => (
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
          {/* <h1 className="py-3 text-3xl font-extrabold capitalize">
            {data?.title}
          </h1>
          <div className="flex items-center gap-2">
            <div className="flex flex-row items-center justify-start gap-2 pb-2">
              <CiLocationOn color={'gray'} size={22} />
              <div className="font-JakartaMedium text-wrap text-sm text-gray-600 dark:text-white/40">
                {data?.location}
              </div>
            </div>

            <div className="flex flex-row items-center justify-start gap-2 pb-2">
              <span className='font-JakartaMedium text-wrap text-sm text-gray-600 dark:text-white/40'>SOL</span>
              <div className="font-JakartaMedium text-wrap text-sm text-gray-600 dark:text-white/40">
                {data?.price}
              </div>
            </div>
          </div> */}

          {/* <div className="border-secondary-200 dark:border-secondary-700/30 mt-2 flex flex-row items-center justify-between rounded-md border p-2 px-4">
            <div className="flex flex-col items-center justify-center">
              <div className="datrk:text-white/50"> Amount</div>
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
              <div className="dark:text-white/50"> For</div>
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
          </div> */}

          {/* <div className="mt-2 py-2">
            <div className="pb-2 font-bold dark:text-white/60">
              Description.
            </div>
            <div className="text-sm leading-6 text-gray-700 dark:text-white/40">
              {data?.description}
            </div>
          </div> */}

          <Tabs defaultValue="send" className="mt-5">
            <TabsList className="flex items-center justify-center">
              <TabsTrigger className="px-5 lg:px-10" value="send">
                Blink
              </TabsTrigger>
              {/* <TabsTrigger className="px-5 lg:px-10" value="qr">
                    Scan QR
                  </TabsTrigger> */}
              <Button
                onClick={onCopy}
                variant={`ghost`}
                className="px-5 lg:px-10"
              >
                Share blink
                <GoCopy size={20} className=" ml-2 cursor-pointer" />
              </Button>
            </TabsList>
            <TabsContent
              value="send"
              className="flex items-center justify-center"
            >
              <BlinkComponent
                actionApiUrl={`${blinkUrl}`}
                // actionApiUrl={`${blinkUrl}&amount=${data?.price}&name=${authuser?.name}&email=${authuser?.email}`}
              />
            </TabsContent>
            {/* <TabsContent
                  value="qr"
                  className="flex flex-col items-center justify-center"
                >
                  <DateTimePicker label='Select inspection date' onDateChange={handleDateChange} />
                  <SolanaQRCode
                    size={300}
                    background={'white'}
                    className="aspect-square rounded-lg [&>svg]:scale-75 md:[&>svg]:scale-100"
                    url={`${blinkUrl}&amount=${data?.price}&name=${authuser?.name}&email=${authuser?.email}&date=${dateTime}`}
                  />
                </TabsContent> */}
          </Tabs>

          {/* 
          {!authuser ? (
            <GoogleSignInButton />
          ) : (
            <Button
              onClick={() => RequestInspection()}
              size={`lg`}
              className="w-full text-white"
            >
              Request Inspection
            </Button>
          )} */}
        </div>
      </div>
      {/* <div>hsvghs</div> */}
    </div>
  );
};

export default SingleListingClient;
