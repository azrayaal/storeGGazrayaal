import Image from 'next/image';
import Link from 'next/link';

interface SidebarItemProps {
  navItem: string;
  href: string;
  iconMenu: 'ic-menu-over' | 'ic-menu-trans' | 'ic-menu-messg' | 'ic-menu-card' | 'ic-menu-rwrd' | 'ic-menu-setting' | 'ic-menu-logout';
  onClick: () => void;
}

export default function SidebarItem(props: Partial<SidebarItemProps>) {
  const { navItem, iconMenu, href = '/', onClick } = props;
  // const router = useRouter();
  // console.log(router);

  //

  return (
    <div>
      <button type="button" className="btn bg-transparent item mb-30" onClick={onClick}>
        <div className="me-3">
          <Image src={`/icon/sidebar/${iconMenu}.svg`} width={25} height={25} alt="logo" />
        </div>

        <p className="item-title m-0">
          {!onClick ?? <a className="text-lg text-decoration-none ">{navItem}</a>}
          <Link href={href}>
            <a className="text-lg text-decoration-none ">{navItem}</a>
          </Link>
        </p>
      </button>
    </div>
  );
}
//
// className={router.pathname === '/member' ? styles.active : ''}
// className=" active item mb-30"
// className="text-lg text-decoration-none"
