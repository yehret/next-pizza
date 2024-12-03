import React from 'react'
import { WhiteBlock } from '../white-block';
import { FormInput } from '../form-components';
import { Input, Textarea } from '../../ui';

interface Props {
   className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
   return (
      <WhiteBlock title="3. Delivery">
         <div className="flex flex-col gap-5">
            <Input name="address" className="text-base" placeholder="Enter address" /> 
            <Textarea 
               rows={5}
               className="text-base"
               placeholder="Order commentary"
            />
         </div>
      </WhiteBlock>
   )
}