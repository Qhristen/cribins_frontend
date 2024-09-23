'use client';

import { HomeAd } from '@/assets/images';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Card } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <Card className="flex items-center justify-center rounded-none border-none">
      <div>
        {/* <h4 className="text-2xl font-medium pb-4 text-center">Follow us on:</h4> */}
        <Link
          href={`https://www.linkedin.com/company/cribins/`}
          target="_blank"
        >
          <Button size={`lg`} variant={`ghost`}>
            Linkedin
          </Button>
        </Link>

        <Link href={`https://x.com/officialcribins`} target="_blank">
          <Button size={`lg`} variant={`ghost`}>
            X
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default Footer;
