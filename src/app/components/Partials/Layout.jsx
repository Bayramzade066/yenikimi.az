import { useState } from "react";
import DiscountBanner from "../Home/DiscountBanner";
import Drawer from "../Mobile/Drawer";
import Footer from "./Footers/Footer";
import Header from "./Headers/HeaderOne";
import { useLocation } from "react-router-dom";

export default function Layout({ children, childrenClasses }) {
  const [drawer, setDrawer] = useState(false);
  const location = useLocation();
const pathname=location.pathname;


  return (
    <>
    {/* MOBILE ACTIVE */}
      {/* <Drawer open={drawer} action={() => setDrawer(!drawer)} /> */}  
      <div className="w-full overflow-x-hidden">
        <Header drawerAction={() => setDrawer(!drawer)} className={`${pathname === '/signup' || pathname === '/login' || pathname === '/verification' || pathname === '/forget-password'  ? '!hidden' : 'block'}`} />
        <div className={`w-full  ${childrenClasses || "pt-[30px] pb-[60px]"}`}>
          {children && children}
        </div>
        <DiscountBanner />
        <Footer />
      </div>
    </>
  );
}
