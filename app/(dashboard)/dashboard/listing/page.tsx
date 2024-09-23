import { Breadcrumbs } from '@/components/breadcrumbs';
import { ListingClient } from '@/components/tables/listing-tables/client';
import { UserClient } from '@/components/tables/user-tables/client';
import { users } from '@/constants/data';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Listing', link: '/dashboard/listing' }
];
export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <ListingClient data={users} />
      </div>
    </>
  );
}
