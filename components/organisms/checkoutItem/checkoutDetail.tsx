import { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';

export default function CheckoutDetail() {
  const [dataTopUp, seDataTopUp] = useState({
    verifyID: '',
    nominalItem: {
      coinName: '',
      coinQuantity: 0,
      price: 0,
    },
    paymentItem: {
      payment: {
        _id: '',
      },
    },
    _id: '',
  });

  useEffect(() => {
    const dataFromLocal = localStorage.getItem('checkout-item');
    const dataItemLocal = JSON.parse(dataFromLocal!);
    console.log('dataTopUp=>>', dataItemLocal);
    seDataTopUp(dataItemLocal);
  }, []);

  const itemPrice = dataTopUp.nominalItem.price;
  const tax = dataTopUp.nominalItem.price * (10 / 100);
  const totalPrice = itemPrice + tax;

  return (
    <div className="purchase pt-md-50 pt-30">
      <h2 className="fw-bold text-xl color-palette-1 mb-20">Purchase Details</h2>
      <p className="text-lg color-palette-1 mb-20">
        Your Game ID
        <span className="purchase-details">{dataTopUp.verifyID}</span>
      </p>
      <p className="text-lg color-palette-1 mb-20">
        Order ID
        <span className="purchase-details">{`#${dataTopUp.paymentItem.payment._id}`}</span>
        {/* <span className="purchase-details">{dataTopUp._id}</span> */}
      </p>
      <p className="text-lg color-palette-1 mb-20">
        Item
        <span className="purchase-details">{`${dataTopUp.nominalItem.coinQuantity} ${dataTopUp.nominalItem.coinName}`}</span>
      </p>
      <p className="text-lg color-palette-1 mb-20">
        Price
        <span className="purchase-details">
          {' '}
          <NumberFormat
            // eslint-disable-next-line react/jsx-indent-props
            value={itemPrice}
            prefix="RP. "
            displayType="text"
            thousandSeparator="."
            decimalSeparator=","
          />
        </span>
      </p>
      <p className="text-lg color-palette-1 mb-20">
        Tax (10%)
        <span className="purchase-details">
          <NumberFormat
            // eslint-disable-next-line react/jsx-indent-props
            value={tax}
            prefix="RP. "
            displayType="text"
            thousandSeparator="."
            decimalSeparator=","
          />
        </span>
      </p>
      <p className="text-lg color-palette-1 mb-20">
        Total
        <span className="purchase-details color-palette-4">
          {' '}
          <NumberFormat
            // eslint-disable-next-line react/jsx-indent-props
            value={totalPrice}
            prefix="RP. "
            displayType="text"
            thousandSeparator="."
            decimalSeparator=","
          />
        </span>
      </p>
    </div>
  );
}
