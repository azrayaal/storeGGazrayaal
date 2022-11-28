import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import { HistoryTopUpCatgoriesTypes } from '../../../../services/data-types';
import { getMemberOverview } from '../../../../services/member';

export default function CategoriesTopUp() {
  const [count, setCount] = useState([]);

  // kalo make async harus pake callback
  const getMemberOverviewAPI = useCallback(async () => {
    const response = await getMemberOverview();
    if (response.error) {
      toast.error(response.message);
    } else {
      // console.log('data=>>>', response.data);
      setCount(response.data.count);
    }
  }, []);

  useEffect(() => {
    getMemberOverviewAPI();
  }, []);
  return (
    <div className="top-up-categories mb-30">
      <p className="text-lg fw-medium color-palette-1 mb-14">Top Up Categories</p>
      <div className="main-content">
        <div className="row">
          {count.map((item: HistoryTopUpCatgoriesTypes) => (
            <div className="col-lg-4 ps-15 pe-15 pb-lg-0 pb-4" key={item._id}>
              <div className="categories-card">
                <div className="d-flex align-items-center mb-24">
                  <Image src="/icon/categorylogo1.svg" width={60} height={60} />
                  <p className="color-palette-1 mb-0 ms-12">
                    Game
                    <br />
                    {item.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm color-palette-2 mb-1">Total Spent</p>
                  <p className="text-2xl color-palette-1 fw-medium m-0">
                    <NumberFormat
                      // eslint-disable-next-line react/jsx-indent-props
                      value={item.value}
                      prefix="RP. "
                      displayType="text"
                      thousandSeparator="."
                      decimalSeparator=","
                    />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
