'use client';

import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { Card } from './ui/card';
import Link from 'next/link';
import Container from './container';

const Hero = () => {
  const { theme } = useTheme();

  return (
    <Card
      className={`border-none  bg-[url('/mapbg.png')] from-black via-black/85 to-transparent bg-cover bg-no-repeat dark:bg-[url('/mapbgdark.png')]`}
    >
      <Container>
        <div className="flex h-screen flex-col items-center justify-center lg:items-start">
          <h1 className="text-wrap py-10 text-3xl font-black text-gray-600 lg:text-6xl dark:text-gray-300">
            Seamlessly Connecting <br /> You to Your Next Home.
          </h1>
          <Link href={`/#property`}>
            <Button
              size={`lg`}
              variant={`default`}
              className="flex w-full items-center lg:w-auto"
            >
              Get started
            </Button>
          </Link>
        </div>
      </Container>
    </Card>
  );
};

export default Hero;
