import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { setCheckout } from '../../../services/player';
// import Link from 'next/link';

export default function CheckoutConfirmation() {
  const [checkbox, setCheckBox] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    const dataItemFromLocal = localStorage.getItem('data-item');
    const dataTopupFromLocal = localStorage.getItem('checkout-item');
    const dataItem = JSON.parse(dataItemFromLocal!);
    const dataTopup = JSON.parse(dataTopupFromLocal!);
    // console.log('submit', dataTopup);

    if (!checkbox) {
      toast.error('Pastikan anda telah melakukan pembayaran', {
        theme: 'colored',
      });
    }
    const data = {
      voucher: dataItem._id,
      nominal: dataTopup.nominalItem._id,
      payment: dataTopup.paymentItem.payment._id,
      bank: dataTopup.paymentItem.bank._id,
      name: dataTopup.bankAccountName,
      accountUser: dataTopup.verifyID,
    };
    // console.log('data conya', data);
    const response = await setCheckout(data);
    if (response.error) {
      toast.error(response.message, {
        theme: 'colored',
      });
    } else {
      toast.success('Check-Out Berhasil!!', {
        theme: 'colored',
      });
      router.push('/complete-checkout');
    }
  };
  return (
    <>
      <label className="checkbox-label text-lg color-palette-1">
        I have transferred the money
        <input type="checkbox" checked={checkbox} onChange={() => setCheckBox(!checkbox)} />
        <span className="checkmark" />
      </label>
      <div className="d-md-block d-flex flex-column w-100 pt-50">
        <button type="button" onClick={onSubmit} className="btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg">
          Confirm Payment
        </button>
      </div>
    </>
  );
}
