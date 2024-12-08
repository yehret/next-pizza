'use client'

import React from 'react'
import { WhiteBlock } from '../white-block';
import { FormTextarea } from '../form-components';
import { AddressInput } from '../address-input';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText } from '../error-text';

interface Props {
   className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
   const { control } = useFormContext()

   return (
      <>
         <WhiteBlock title="3. Delivery" className={className}>
            <div className="flex flex-col gap-5">
               <Controller
                  control={control}
                  name='address' 
                  render={({ field, fieldState }) => (
                     <>
                        <AddressInput onChange={field.onChange} />
                        {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
                     </>
                  )}
               />

               <FormTextarea 
                  rows={5}
                  name={'comment'}
                  className="text-base"
                  placeholder="Order commentary"
               />
            </div>
         </WhiteBlock>
      </>
   )
}