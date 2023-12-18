// import Cart from "../../../Cart";
// import Compair from "../../../Helpers/icons/Compair";
// import ThinBag from "../../../Helpers/icons/ThinBag";
import ThinLove from "../../../Helpers/icons/ThinLove";
import ThinPeople from "../../../Helpers/icons/ThinPeople";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SearchBox from "../../../Helpers/SearchBox";
import Selectbox from "../../../Helpers/Selectbox";
import Arrow from "../../../Helpers/icons/Arrow";



export default function Middlebar({ className }) {

  let userData = JSON.parse(localStorage.getItem("loggedUserData"))
  // const [toggleCart, setToggle] = useState(false);
  // const cartHandler = () => {
  //   setToggle(!toggleCart);
  // };
  return (
    <div className={`w-full h-[86px] bg-white ${className}`}>
      <div className="container-x mx-auto h-full">
        <div className="relative h-full">
          <div className="flex justify-between items-center h-full">
            <div>
              <a href="/">
                <img
                className="rounded-md"
                  width="70"
                  height="50"
                  src={`assets/images/YK Logo2.jpg`}
                  alt="logo"
                />
              </a>
            </div>
            <div className="w-[517px] h-[44px]">
              <SearchBox className="search-com" />
            </div>
            <div className="flex space-x-6 items-center">
              {/* <div className="compaire relative">
                <a href="/products-compaire">
                  <span>
                    <Compair />
                  </span>
                </a>
                <span className="w-[18px] h-[18px] rounded-full bg-qyellow absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]">
                  2
                </span>
              </div> */}
              <div className="favorite relative">
                <a href="/wishlist">
                  <span>
                    <FavoriteBorderIcon className="hover:text-qyellow transition-all" />
                  </span>
                </a>
                <span className="w-[18px] h-[18px] rounded-full bg-qyellow absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]">
                  1
                </span>
              </div>
              {/* <div className="cart-wrapper group relative py-4">
                <div className="cart relative cursor-pointer">
                  <a href="/cart">
                    <span>
                       <ThinBag /> 
                    </span>
                  </a>
                  <span className="w-[18px] h-[18px] rounded-full bg-qyellow absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]">
                    15
                  </span>
                </div>
                {/* <div className="fixed left-0 top-0 w-full h-full z-40"></div> */}
                {/* hidden group-hover:block" 
                <Cart className="absolute -right-[45px] top-11 z-50 hidden group-hover:block" />
              </div> */}
              <div className="mt-2">
                <button type="button" className="group">
               
                  <span className="flex items-center justify-center gap-1 ">
                    <PersonOutlineIcon className="group-hover:text-qyellow " />
                 {userData ? <a href="/profile"> <span className="font-bold text-sm group-hover:text-qyellow ">Profilim</span></a> : <a href="/login"><span className="font-bold text-sm group-hover:text-qyellow ">Daxil ol</span> </a>}
                  </span>
                 
                </button>
              </div>
              <div className="language-select flex space-x-1 items-center mt-1">
                  <Selectbox className="w-fit" datas={["az","en","ru"]} />
                  
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
