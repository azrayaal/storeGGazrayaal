import React from 'react';
import NumberFormat from 'react-number-format';
import { historyTransactionsTypes } from '../../../services/data-types';

interface TransactionDetailContentProps {
  data: historyTransactionsTypes;
}

export default function TransactionDetailContent(props: TransactionDetailContentProps) {
  const IMG = process.env.NEXT_PUBLIC_IMG;
  const { data } = props;
  return (
    <div className="ps-lg-0">
      <h2 className="text-4xl fw-bold color-palette-1 mb-30">{`Details ${data._id}`}</h2>
      <div className="details">
        <div className="main-content main-content-card overflow-auto">
          <section className="checkout mx-auto">
            <div className="d-flex flex-row  align-items-center justify-content-between mb-30">
              <div className="game-checkout d-flex flex-row align-items-center">
                <div className="pe-4">
                  <div className="cropped">
                    <img src={`${IMG}/${data.historyVoucherTopup.thumbnail}`} width="200" height="130" className="img-fluid" alt="" />
                  </div>
                </div>
                <div>
                  <p className="fw-bold text-xl color-palette-1 mb-10">{data.historyVoucherTopup.gameName}</p>
                  <p className="color-palette-2 m-0">
                    Category:
                    {data.historyVoucherTopup.category}
                  </p>
                </div>
              </div>
              <div>
                <p className={`fw-medium text-center label ${data.status} m-0 rounded-pill`}>{data.status}</p>
              </div>
            </div>
            <hr />
            <div className="purchase pt-30">
              <h2 className="fw-bold text-xl color-palette-1 mb-20">Purchase Details</h2>
              <p className="text-lg color-palette-1 mb-20">
                Your Game ID
                <span className="purchase-details">{data.accountUser}</span>
              </p>
              <p className="text-lg color-palette-1 mb-20">
                Order ID
                <span className="purchase-details">{data._id}</span>
              </p>
              <p className="text-lg color-palette-1 mb-20">
                Item
                <span className="purchase-details">{`${data.historyVoucherTopup.coinQuantity} ${data.historyVoucherTopup.coinName}`}</span>
              </p>
              <p className="text-lg color-palette-1 mb-20">
                Price
                <span className="purchase-details">
                  <NumberFormat
                    // eslint-disable-next-line react/jsx-indent-props
                    value={data.historyVoucherTopup.price}
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
                    value={data.tax}
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
                  <NumberFormat
                    // eslint-disable-next-line react/jsx-indent-props
                    value={data.value}
                    prefix="RP. "
                    displayType="text"
                    thousandSeparator="."
                    decimalSeparator=","
                  />
                </span>
              </p>
            </div>
            <div className="payment pt-10 pb-10">
              <h2 className="fw-bold text-xl color-palette-1 mb-20">Payment Informations</h2>
              <p className="text-lg color-palette-1 mb-20">
                Your Account Name
                <span className="purchase-details">{data.name}</span>
              </p>
              <p className="text-lg color-palette-1 mb-20">
                Type
                <span className="payment-details">{data.historyPayment.type}</span>
              </p>
              <p className="text-lg color-palette-1 mb-20">
                Bank Name
                <span className="payment-details">{data.historyPayment.bankName}</span>
              </p>
              <p className="text-lg color-palette-1 mb-20">
                Bank Account Name
                <span className="payment-details">{data.historyPayment.name}</span>
              </p>
              <p className="text-lg color-palette-1 mb-20">
                Bank Number
                <span className="payment-details">{data.historyPayment.noRekening}</span>
              </p>
            </div>
            <div className="d-md-block d-flex flex-column w-100">
              <a className="btn btn-whatsapp rounded-pill fw-medium text-white border-0 text-lg" href="#.com" role="button">
                WhatsApp ke Admin
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
