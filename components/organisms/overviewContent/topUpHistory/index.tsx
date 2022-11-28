import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { historyTransactionsTypes } from '../../../../services/data-types';
import { getMemberOverview } from '../../../../services/member';
import ItemHistory from './item-history';

export default function TopUpHistory() {
  const [data, setData] = useState([]);

  const getMemberOverviewAPI = useCallback(async () => {
    const response = await getMemberOverview();
    if (response.error) {
      toast.error(response.message);
    } else {
      // console.log('data=>>>', response.data);
      setData(response.data.data);
    }
  }, []);

  useEffect(() => {
    getMemberOverviewAPI();
  }, []);

  const IMG = process.env.NEXT_PUBLIC_IMG;

  return (
    <div className="latest-transaction">
      <p className="text-lg fw-medium color-palette-1 mb-14">Latest Transactions</p>
      <div className="main-content main-content-table overflow-auto">
        <table className="table table-borderless">
          <thead>
            <tr className="color-palette-1">
              <th className="text-start" scope="col">
                Game
              </th>
              <th scope="col">Item</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: historyTransactionsTypes) => (
              <ItemHistory
                key={item._id}
                image={`${IMG}/${item.historyVoucherTopup.thumbnail}`}
                gameName={item.historyVoucherTopup.gameName}
                type={item.historyVoucherTopup.category}
                item={`${item.historyVoucherTopup.coinName} ${item.historyVoucherTopup.coinQuantity}`}
                price={item.value}
                status={item.status}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
