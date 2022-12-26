/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
// import { useRouter } from 'next/router';
// import stringify from 'json-stringify-safe';
import { useEffect } from 'react';
import Footer from '../../components/organisms/footer';
import Navbar from '../../components/organisms/navbar';
import TopUpForm from '../../components/organisms/topUpForm';
import TopUpItem from '../../components/organisms/topUpItem';
import { GameItemTypes, NominalTypes, PaymentTypes } from '../../services/data-types';
import { getDetailVoucher, getFeaturedGame } from '../../services/player';

interface DetailProps {
  dataItem: GameItemTypes;
  nominals: NominalTypes[];
  payment: PaymentTypes[];
}
export default function Detail({ dataItem, nominals, payment }: DetailProps) {
  useEffect(() => {
    localStorage.setItem('data-item', JSON.stringify(dataItem));
  }, []);

  return (
    <>
      <Navbar />
      <section className="detail pt-lg-60 pb-50">
        <div className="container-xxl container-fluid">
          <div className="detail-header pb-50">
            <h2 className="text-4xl fw-bold color-palette-1 text-start mb-10">Top Up</h2>
            <p className="text-lg color-palette-1 mb-0">Perkuat akun dan jadilah pemenang</p>
          </div>
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-5 pb-30 pb-md-0 pe-md-25 text-md-start">
              <TopUpItem data={dataItem} type="mobile" />
            </div>
            <div className="col-xl-9 col-lg-8 col-md-7 ps-md-25">
              {/* <!-- Desktop: Game title --> */}
              <TopUpItem data={dataItem} type="desktop" />
              <hr />
              <TopUpForm nominals={nominals} payments={payment} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const data = await getFeaturedGame();
  const paths = data.map((item: GameItemTypes) => ({
    params: {
      id: item._id,
    },
  }));
  // console.log('isi paths=>>', paths);
  return {
    paths,
    fallback: false,
  };
}

interface GetStaticProps {
  params: {
    id: string;
  };
}

export async function getStaticProps({ params }: GetStaticProps) {
  const { id } = params;
  const data = await getDetailVoucher(id);
  // console.log('data dari getstprops=>>', data);
  return {
    props: {
      dataItem: data,
      nominals: data.nominals,
      payment: data.payment,
    },
  };
}
