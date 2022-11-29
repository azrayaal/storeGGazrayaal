import jwtDecode from 'jwt-decode';
import Image from 'next/image';
import Link from 'next/link';
import CheckOutItem from '../components/organisms/checkoutItem';
import CheckoutConfirmation from '../components/organisms/checkoutItem/checkoutConfirmation';
import CheckoutDetail from '../components/organisms/checkoutItem/checkoutDetail';
import CheckoutInfo from '../components/organisms/checkoutItem/checkoutInfo';
import { JWTPayloadsTypes, UserTypes } from '../services/data-types';

export default function CheckOut() {
  return (
    <div>
      <section className="checkout mx-auto pt-md-100 pb-md-145 pt-30 pb-30">
        <div className="container-fluid">
          <div className="logo text-md-center text-start pb-50">
            <Link href="#.com">
              <a className="">
                <Image src="/icon/logo.svg" width={60} height={60} alt="logo" />
              </a>
            </Link>
          </div>
          <div className="title-text pt-md-50 pt-0">
            <h2 className="text-4xl fw-bold color-palette-1 mb-10">Checkout</h2>
            <p className="text-lg color-palette-1 mb-0">Waktunya meningkatkan cara bermain</p>
          </div>
          <CheckOutItem />
          <hr />
          <CheckoutDetail />
          <CheckoutInfo />
          <CheckoutConfirmation />
        </div>
      </section>
    </div>
  );
}

// dilakukan diserver side
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
    props: {
      user: userFromPayload,
    },
  };
}
