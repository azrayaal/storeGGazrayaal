/* eslint-disable consistent-return */
/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
// import stringify from 'json-stringify-safe';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BanksTypes, NominalTypes, PaymentTypes } from '../../../services/data-types';
import NominalItem from './NominalItem';
import PaymentItem from './PaymentItem';

interface TopUpFormProps {
  nominals: NominalTypes[];
  payments: PaymentTypes[];
}

export default function TopUpForm(props: TopUpFormProps) {
  const [verifyID, setVerifyID] = useState('');
  const [bankAccountName, setBankAccountName] = useState('');
  const [paymentItem, setPaymentItem] = useState({});
  const [nominalItem, setNominalItem] = useState({});
  const { nominals, payments } = props;
  const router = useRouter();

  const onNominalItemChange = (data: NominalTypes) => {
    // con sole.log('data nominal=>>', data);
    setNominalItem(data);
  };

  const onPaymentItemChange = (payment: PaymentTypes, bank: BanksTypes) => {
    const data = {
      payment,
      bank,
    };
    // console.log('data payment=>>', data);
    setPaymentItem(data);
  };

  const onSubmit = () => {
    if (verifyID === '' || bankAccountName === '' || paymentItem === '' || nominalItem === '') {
      toast.error('Tidak boleh ada yang kosong', {
        theme: 'colored',
      });
    } else {
      const data = {
        verifyID,
        bankAccountName,
        paymentItem,
        nominalItem,
      };
      localStorage.setItem('checkout-item', JSON.stringify(data));
      // console.log('dataperoleh', data);
      router.push('/checkout');
    }
  };

  return (
    <form action="./checkout.html" method="POST">
      <div className="pt-md-50 pt-30">
        <div className="">
          <label htmlFor="ID" className="form-label text-lg fw-medium color-palette-1 mb-10">
            Verify ID
          </label>
          <input type="text" className="form-control rounded-pill text-lg" id="ID" name="ID" aria-describedby="verifyID" placeholder="Enter your ID" value={verifyID} onChange={(event) => setVerifyID(event.target.value)} />
        </div>
      </div>
      <div className="pt-md-50 pb-md-50 pt-30 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">Nominal Top Up</p>
        <div className="row justify-content-between">
          {nominals.map((nominal) => (
            <NominalItem
              // eslint-disable-next-line react/jsx-max-props-per-line
              key={nominal._id}
              _id={nominal._id}
              coinName={nominal.coinName}
              coinQuantity={nominal.coinQuantity}
              price={nominal.price}
              onChange={() => onNominalItemChange(nominal)}
            />
          ))}
          <div className="col-lg-4 col-sm-6">{/* <!-- Blank --> */}</div>
        </div>
      </div>
      <div className="pb-md-50 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">Payment Method</p>
        <fieldset id="paymentMethod">
          <div className="row justify-content-between">
            {payments.map((payment) =>
              payment.banks.map((bank) => (
                <PaymentItem
                  // eslint-disable-next-line react/jsx-max-props-per-line
                  key={payment._id}
                  _id={bank._id}
                  type={payment.type}
                  name={bank.bankName}
                  onChange={() => onPaymentItemChange(payment, bank)}
                />
              ))
            )}
            <div className="col-lg-4 col-sm-6">{/* <!-- Blank --> */}</div>
          </div>
        </fieldset>
      </div>
      <div className="pb-50">
        <label htmlFor="bankAccount" className="form-label text-lg fw-medium color-palette-1 mb-10">
          Bank Account Name
        </label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          id="bankAccount"
          name="bankAccount"
          aria-describedby="bankAccount"
          placeholder="Enter your Bank Account Name"
          value={bankAccountName}
          onChange={(event) => setBankAccountName(event.target.value)}
        />
      </div>
      <div className="d-sm-block d-flex flex-column w-100">
        <button type="button" className="btn btn-submit rounded-pill fw-medium text-white border-0 text-lg" onClick={onSubmit}>
          Continue
        </button>
      </div>
    </form>
  );
}
