'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';

const SkeletonCard = () => {
  return (
    <div>
      <Card>
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
};

export default SkeletonCard;
