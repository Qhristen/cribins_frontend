'use client';

import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { Card } from './ui/card';
import Link from 'next/link';

const Hero = () => {
  const { theme } = useTheme();

  return (
    <Card className="flex h-screen flex-col items-center justify-center border-none">
      <h1 className="text-wrap py-10 text-2xl font-black text-primary lg:text-5xl">
        Seamlessly Connecting <br /> You to Your Next Home.
      </h1>
      <Link href={`/#property`}>
        <Button
          size={`lg`}
          variant={`secondary`}
          className="flex w-full items-center lg:w-auto"
        >
          Get started
        </Button>
      </Link>
    </Card>
  );
};

export default Hero;
