import React from 'react'
import { WhiteBlock } from '../white-block';
import { FormInput } from '../form-components';

interface Props {
   className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {

   //TODO: Add phone mask

   return (
      <WhiteBlock className={className} title="2. Personal information">
         <div className="grid grid-cols-2 gap-5">
            <FormInput name="firstName" className="text-base" placeholder="First name" />
            <FormInput name="lastName" className="text-base" placeholder="Last name" />
            <FormInput name="email" className="text-base" placeholder="E-Mail" />
            <FormInput name="phone" className="text-base" placeholder="Phone" />
         </div>
      </WhiteBlock>
   )
}