import React from 'react'
import { WhiteBlock } from '../white-block';
import { FormTextarea } from '../form-components';
import { Input, } from '../../ui';

interface Props {
   className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
   return (
      <WhiteBlock title="3. Delivery" className={className}>
         <div className="flex flex-col gap-5">
            <Input name="address" className="text-base" placeholder="Enter address" /> 
            <FormTextarea 
               rows={5}
               name={'comment'}
               className="text-base"
               placeholder="Order commentary"
            />
         </div>
      </WhiteBlock>
   )
}