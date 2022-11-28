import jwtDecode from 'jwt-decode';
import { useCallback, useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';

import Sidebar from '../../../components/organisms/sidebar';
import { historyTransactionsTypes, JWTPayloadsTypes, UserTypes } from '../../../services/data-types';
import { getMemberTransactions } from '../../../services/member';
import ButtonTab from './ButtonTab';
import TableRow from './tableRow';

export default function Transactions() {
  const [total, setTotal] = useState(0);
  const [transactions, setTrasanctions] = useState([]);
  const [tab, setTab] = useState('all');
  // const [status, setStatus] = useState('');

  const getMemberTransactionAPI = useCallback(async (value) => {
    const response = await getMemberTransactions(value);
    if (response.error) {
      toast.error(response.error, {
        theme: 'colored',
      });
    } else {
      // console.log('data>>', response);
      setTotal(response.data.total);
      // setStatus(response.data.data);
      setTrasanctions(response.data.data);
    }
  }, []);

  useEffect(() => {
    getMemberTransactionAPI('all');
  }, []);

  const onTabClick = (value: any) => {
    setTab(value);
    getMemberTransactionAPI(value);
  };

  const IMG = process.env.NEXT_PUBLIC_IMG;

  return (
    <section className="transactions overflow-auto">
      <Sidebar />
      <main className="main-wrapper">
        <div className="ps-lg-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-30">My Transactions</h2>
          <div className="mb-30">
            <p className="text-lg color-palette-2 mb-12">You’ve spent</p>
            <h3 className="text-5xl fw-medium color-palette-1">
              <NumberFormat
                // eslint-disable-next-line react/jsx-indent-props
                value={total}
                prefix="RP. "
                displayType="text"
                thousandSeparator="."
                decimalSeparator=","
              />
            </h3>
          </div>
          <div className="row mt-30 mb-20">
            <div className="col-lg-12 col-12 main-content">
              <div id="list_status_title">
                <ButtonTab onClick={() => onTabClick('all')} title="All Trx" active={tab === 'all'} />
                <ButtonTab onClick={() => onTabClick('Success')} title="Success" active={tab === 'Success'} />
                <ButtonTab onClick={() => onTabClick('Pending')} title="Pending" active={tab === 'Pending'} />
                <ButtonTab onClick={() => onTabClick('Failed')} title="Failed" active={tab === 'Failed'} />
              </div>
            </div>
          </div>
          {/* <TopUpHistory /> */}
          <div className="latest-transaction">
            <p className="text-lg fw-medium color-palette-1 mb-14">Latest Transactions</p>
            <div className="main-content main-content-table overflow-auto">
              <table className="table table-borderless">
                <thead>
                  <tr className="color-palette-1">
                    <th className="" scope="col">
                      Game
                    </th>
                    <th scope="col">Item</th>
                    <th scope="col">Price</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody id="list_status_item">
                  {transactions.map((item: historyTransactionsTypes) => (
                    <TableRow
                      key={item._id}
                      price={item.historyVoucherTopup.price}
                      id={item._id}
                      img={`${IMG}/${item.historyVoucherTopup.thumbnail}`}
                      title={item.historyVoucherTopup.gameName}
                      category={item.historyVoucherTopup.category}
                      status={item.status}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

interface GetServerSideProps {
  req: {
    cookies: {
      token: string;
    };
  };
}

export async function getServerSideProps({ req }: GetServerSideProps) {
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }
  const jwtToken = Buffer.from(token, 'base64').toString('ascii');
  const payload: JWTPayloadsTypes = jwtDecode(jwtToken);
  const userFromPayload: UserTypes = payload.player;
  const IMG = process.env.NEXT_PUBLIC_IMG;
  userFromPayload.avatar = `${IMG}/${userFromPayload.avatar}`;

  return {
    // eslint-disable-next-line object-curly-newline
    props: {},
  };
}
