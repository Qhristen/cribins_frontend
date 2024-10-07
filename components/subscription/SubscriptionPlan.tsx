'use client';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';
import PaymentForm from './PaymentForm';

interface SubscriptionPlanProps {
  title: string;
  price: number;
  features: string[];
  planId: string;
  selected: boolean;
  onSelect: (planId: string) => void;
}

const SubscriptionPlan: React.FC<SubscriptionPlanProps> = ({
  title,
  price,
  features,
  planId,
  selected,
  onSelect
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`cursor-pointer rounded-lg border p-6 ${
            selected ? 'border-primary' : 'border-input'
          }`}
          onClick={() => onSelect(planId)}
        >
          <h3 className="mb-4 text-xl font-semibold">{title}</h3>
          <p className="mb-2 text-lg font-bold">${price}/year</p>
          <ul className="mb-4">
            {features.map((feature, index) => (
              <li key={index} className="text-gray-600">
                - {feature}
              </li>
            ))}
          </ul>
          <Button
            variant={`outline`}
            className={`w-full px-4 py-2 ${
              selected ? 'bg-primary text-white' : ''
            }`}
          >
            {selected ? 'Selected' : 'Select Plan'}
          </Button>
        </div>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="" />
        <DialogContent className="w-full">
          <DialogTitle className="">{title}</DialogTitle>
          <DialogDescription className="">
            <ul className="mb-1">
              {features.map((feature, index) => (
                <li key={index} className="text-gray-600">
                  - {feature}
                </li>
              ))}
            </ul>
          </DialogDescription>
          <PaymentForm planId={planId} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default SubscriptionPlan;
