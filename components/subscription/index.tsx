'use client';

import { useState } from 'react';
import SubscriptionPlan from './SubscriptionPlan';

const SubscriptionClient = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handlePlanSelection = (planId: string) => {
    setSelectedPlan(planId);
  };

  const subscriptionPlans = [
    {
      id: 'basic',
      title: 'Basic',
      price: 19,
      features: ['5 listings per month', 'Basic support']
    },
    {
      id: 'pro',
      title: 'Pro Plan',
      price: 49,
      features: ['Unlimited listings', 'Priority support', 'Featured agent']
    },
    {
      id: 'premium',
      title: 'Premium Plan',
      price: 99,
      features: [
        'Unlimited listings',
        'Personalized support',
        'Agent dashboard'
      ]
    }
  ];

  return (
    <div className="">
      <h1 className="mb-6 py-20 text-center text-3xl font-bold">
        Agent Subscription Plans
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {subscriptionPlans.map((plan) => (
          <SubscriptionPlan
            key={plan.id}
            title={plan.title}
            price={plan.price}
            features={plan.features}
            planId={plan.id}
            onSelect={handlePlanSelection}
            selected={selectedPlan === plan.id}
          />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionClient;
