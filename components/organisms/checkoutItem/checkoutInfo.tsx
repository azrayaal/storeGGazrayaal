import { useEffect, useState } from 'react';

export default function CheckoutInfo() {
  const [dataPayment, setDataPayment] = useState({
    bankAccountName: '',
    paymentItem: {
      payment: {
        bankName: '',
        name: '',
        noRekening: '',
      },
      bank: {
        type: '',
      },
    },
  });

  useEffect(() => {
    const dataFromLocal = localStorage.getItem('checkout-item');
    const dataItemFromLocal = JSON.parse(dataFromLocal!);
    setDataPayment(dataItemFromLocal);
    // console.log('datapayment', dataItemFromLocal);
  }, []);
  return (
    <div className="payment pt-md-50 pb-md-50 pt-10 pb-10">
      <h2 className="fw-bold text-xl color-palette-1 mb-20">Payment Informations</h2>
      <p className="text-lg color-palette-1 mb-20">
        Your Account Name
        <span className="purchase-details">{dataPayment.bankAccountName}</span>
      </p>
      <p className="text-lg color-palette-1 mb-20">
        Type
        <span className="payment-details">{dataPayment.paymentItem.bank.type}</span>
      </p>
      <p className="text-lg color-palette-1 mb-20">
        Bank Name
        <span className="payment-details">{dataPayment.paymentItem.payment.bankName}</span>
      </p>
      <p className="text-lg color-palette-1 mb-20">
        Bank Account Name
        <span className="payment-details">{dataPayment.paymentItem.payment.name}</span>
      </p>
      <p className="text-lg color-palette-1 mb-20">
        Bank Number
        <span className="payment-details">{dataPayment.paymentItem.payment.noRekening}</span>
      </p>
    </div>
  );
}
