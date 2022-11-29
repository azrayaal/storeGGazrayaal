import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { JWTPayloadsTypes } from '../../../services/data-types';
import FooterSidebar from './footer';
import SidebarItem from './items';

export default function Sidebar() {
  const router = useRouter();
  const [users, setUser] = useState({
    avatar: '',
    email: '',
    username: '',
  });
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const jwtToken = atob(token);
      const payload: JWTPayloadsTypes = jwtDecode(jwtToken);
      const user = payload.player;
      const IMG = process.env.NEXT_PUBLIC_IMG;
      user.avatar = `${IMG}/${user.avatar}`;
      setUser(user);
    }
    // console.log('user==>', jwtToken);
  }, []);

  const onLogOut = () => {
    Cookies.remove('token');
    router.push('/sign-in');
  };
  return (
    <section className="sidebar">
      <div className="content pt-50 pb-30 ps-30">
        <div className="user text-center pb-50 pe-30">
          <Image src={users.avatar} width="90" height="90" alt="hehe" className="img-fluid mb-20 rounded-circle" />
          <h2 className="fw-bold text-xl color-palette-1 m-0">{users.username}</h2>
          <p className="color-palette-2 m-0">{users.email}</p>
        </div>
        <div className="menus">
          <SidebarItem navItem="Overview" iconMenu="ic-menu-over" href="/member" />
          <SidebarItem navItem="Transaction" iconMenu="ic-menu-trans" href="/member/transaction" />
          <SidebarItem navItem="Messages" iconMenu="ic-menu-messg" />
          <SidebarItem navItem="Card" iconMenu="ic-menu-card" />
          <SidebarItem navItem="Rewards" iconMenu="ic-menu-rwrd" />
          <SidebarItem navItem="Settings" iconMenu="ic-menu-setting" href="/member/edit-profile" />
          <SidebarItem navItem="Log Out" iconMenu="ic-menu-logout" onClick={onLogOut} />
        </div>
        <FooterSidebar />
      </div>
    </section>
  );
}
