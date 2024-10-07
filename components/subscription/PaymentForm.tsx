'use client';

import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { Button } from '../ui/button';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useAuth } from '@/context/auth-context';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import GoogleSignInButton from '../google-auth-button';
import { useToast } from '../ui/use-toast';

interface PaymentFormProps {
  planId: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ planId }) => {
  const [paymentMethod, setPaymentMethod] = useState('web3');
  const { user: authuser } = useAuth();
  const { publicKey, sendTransaction } = useWallet();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'web3' && !publicKey) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Wallet not connected.'
      });
      return;
    }
    // Handle payment submission logic (e.g., API call)
    console.log(
      `Submitting payment for plan: ${planId} with method: ${paymentMethod}`
    );
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-4">
        <label
          htmlFor="payment-method"
          className="block py-3 text-sm font-medium text-gray-700"
        >
          Payment Method
        </label>
        <Select
          value={paymentMethod}
          onValueChange={(e) => setPaymentMethod(e)}
          defaultValue="web3"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="web3">Web3 Wallet</SelectItem>
            <SelectItem value="credit-card">Credit Card</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Credit Card Fields */}
      {paymentMethod === 'credit-card' && (
        <>
          <div className="mb-4">
            <label
              htmlFor="card-number"
              className="block text-sm font-medium text-gray-700"
            >
              Card Number
            </label>
            <input
              type="text"
              id="card-number"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="expiry-date"
              className="block text-sm font-medium text-gray-700"
            >
              Expiry Date
            </label>
            <input
              type="text"
              id="expiry-date"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="cvv"
              className="block text-sm font-medium text-gray-700"
            >
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
              required
            />
          </div>
        </>
      )}

      {!authuser ? (
        <GoogleSignInButton />
      ) : (
        <>
          <Button type="submit" variant={`default`} className="w-full">
            Complete Payment
          </Button>
        </>
      )}
    </form>
  );
};

export default PaymentForm;
