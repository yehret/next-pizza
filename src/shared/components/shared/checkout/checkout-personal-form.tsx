import React from 'react'
import { WhiteBlock } from '../white-block';
import { FormInput } from '../form-components';
import { Input } from '../../ui';

interface Props {
   className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
   return (
      <WhiteBlock title="2. Personal information">
         <div className="grid grid-cols-2 gap-5">
            <Input name="firstName" className="text-base" placeholder="First name" />
            <Input name="lastName" className="text-base" placeholder="Last name" />
            <Input name="email" className="text-base" placeholder="E-Mail" />
            <FormInput name="phone" className="text-base" placeholder="Phone" />
         </div>
      </WhiteBlock>
   )
}