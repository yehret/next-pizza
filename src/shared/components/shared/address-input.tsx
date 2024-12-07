'use client'

import React from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';
import { Input } from '../ui';

interface Props {
   className?: string;
   onChange?: (value: string) => void
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
   const { ref } = usePlacesWidget({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
      onPlaceSelected: (place) => {
         onChange?.(place.formatted_address)
      },
      options: {
         types: ['address'],
         componentRestrictions: { country: 'pl' }
      }
    });

   return (
      // <AutoComplete
      //    apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
      //    onPlaceSelected={(place) => onChange?.(place.formatted_address)}
      //    options={{ 
      //       types: ['address'],
      //       componentRestrictions: { country: 'pl' }
      //     }}
      // />

      <Input ref={ref} className="text-base" placeholder="Enter address" />
   )
}