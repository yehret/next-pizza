import React from 'react';

interface Props {
   orderId: number;
   totalAmount: number;
   paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({ orderId, totalAmount, paymentUrl }) => {
   return (
      <div>
         <h1>Order #{orderId}</h1>

         <p>
            Pay order in total amount of <b>{totalAmount} $</b>. <a href={paymentUrl}>Click here</a>
         </p>
      </div>
   )
}