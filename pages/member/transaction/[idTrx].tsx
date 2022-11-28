import jwtDecode from 'jwt-decode';
import Sidebar from '../../../components/organisms/sidebar';
import TransactionDetailContent from '../../../components/organisms/transactionsDetailContent';
import { historyTransactionsTypes, JWTPayloadsTypes, UserTypes } from '../../../services/data-types';
import { getTransactionsDetail } from '../../../services/member';

interface TransactionsDetailProps {
  transactionsDetail: historyTransactionsTypes;
}

export default function TransactionDetail(props: TransactionsDetailProps) {
  const { transactionsDetail } = props;
  // console.log('dataaaa', transactionsDetail);
  return (
    <section className="transactions-detail overflow-auto">
      <Sidebar />
      <main className="main-wrapper">
        <TransactionDetailContent data={transactionsDetail} />
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
  params: {
    idTrx: string;
  };
}

export async function getServerSideProps({ req, params }: GetServerSideProps) {
  const { idTrx } = params;
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
  const response = await getTransactionsDetail(idTrx, jwtToken);
  // console.log('response params', response);

  return {
    props: {
      transactionsDetail: response.data,
    },
  };
}
