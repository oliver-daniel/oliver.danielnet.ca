import useScrollDirection, { UP } from "@/lib/useScrollDirection";
import Image from "next/image";
import Link from "next/link";

import Logo from '../public/svg/logo_v2.svg'

const Header = ({ children }) => {
  const scrollDirection = useScrollDirection();
  return (
    <header
      data-show={scrollDirection === UP}
      className="navbar hide-sm container grid-lg"
      role="banner"
    >
      <section className="navbar-section">
        <div className="hide-sm" id="logo">
          <Link href="#" tabIndex={-1}>
            <Image src={Logo} unoptimized alt="" />
          </Link>
        </div>
      </section>
      {children}
    </header>
  );
};

export default Header;
