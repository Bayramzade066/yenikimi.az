import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Arrow from '../../../Helpers/icons/Arrow'
import StoreIcon from '@material-ui/icons/Store';
import AddIcon from '@material-ui/icons/Add';
import { useParams } from 'react-router-dom'
export default function Navbar({ className }) {
  const [categoryToggle, setToggle] = useState(false)
  const [elementsSize, setSize] = useState('0px')
  const [CategoryApi, setCategoryApi] = useState(null)
  const [navbarOff, setnavbarOff] = useState(false)

  // const getItems = document.querySelectorAll(`.categories-list li`).length;
  // if (categoryToggle && getItems > 0) {
  //   setSize(`${40 * getItems}px`);
  // }
  useEffect(() => {
    fetch('https://yenikimi.store/api/meta/list/1')
      .then((res) => {
        if (res.ok && res.status === 200) {
          return res.json()
        }
      })
      .then((data) => setCategoryApi(data))
      .catch((err) => console.log(err))
  }, [])

  const handler = () => {
    setToggle(!categoryToggle)
  }
  useEffect(() => {
    if (categoryToggle) {
      const getItems = document.querySelectorAll(`.categories-list li`).length
      if (categoryToggle && getItems > 0) {
        setSize(`${42 * getItems}px`)
      }
    } else {
      setSize(`0px`)
    }
  }, [categoryToggle])

  return (
    <div
      className={`nav-widget-wrapper w-full bg-qyellow h-[60px] relative z-30  ${
        className || ''
      }`}
    >
      <div className={`container-x mx-auto h-full  `}>
        <div className="w-full h-full relative">
          <div className="w-full h-full flex justify-between items-center">
            <div className="category-and-nav flex xl:space-x-7 space-x-3 items-center ">
              <div className="category group w-[270px] h-[53px] bg-qblack text-white px-5 border border-2 border-qgray rounded-t-md mt-[6px] relative transition-all duration-500 hover:duration-500 hover:transition-all hover:bg-[#fec820]">
                <button
                  onClick={handler}
                  type="button"
                  className="w-full h-full flex justify-between items-center text-qyellow group-hover:text-qblacktext"
                >
                  <div className="flex space-x-3 items-center text-qyellow group-hover:text-qblacktext ">
                    <span className="!text-qyellow group-hover:!text-qblacktext text-lg pb-1">
                      &#8801;
                    </span>
                    <span className="text-sm font-600 text-qyellow group-hover:text-qblack">
                      Bütün Kateqoriyalar
                    </span>
                  </div>
                  <div>
                    <Arrow
                      width="5.78538"
                      height="1.28564"
                      className="fill-current text-qyellow group-hover:text-qblacktext"
                    />
                  </div>
                </button>
                {categoryToggle && (
                  <div
                    className="fixed top-0 left-0  -z-10"
                    onClick={handler}
                  ></div>
                )}
                <div
                  className="category-dropdown w-full absolute left-0 top-[51px] overflow-hidden bg-qgray"
                  style={{ height: `${elementsSize} ` }}
                >
                  <ul className="categories-list ">
                    {CategoryApi &&
                      CategoryApi.data.map((category) => (
                        <li key={category.id} className="category-item ">
                          <a href="/all-products">
                            <div className=" flex justify-between items-center  px-5 h-10 hover:bg-qyellow category-hover  transition-all duration-300 ease-in-out cursor-pointer">
                              <div className="flex items-center space-x-6 ">
                                <span>
                                  <img
                                    src={`assets/images/${category.title.toLowerCase()}.png`}
                                    className="w-8 p-1 h-8 rounded-full bg-qyellow "
                                    alt=""
                                  />
                                </span>
                                <span className="text-xs font-400 text-qyellow category-hover">
                                  {category.title}
                                </span>
                              </div>
                              <div>
                                <span className="text-qyellow category-hover text-md pb-1 font-bold">
                                  &#62;
                                </span>
                              </div>
                            </div>
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <div className="nav">
                <ul className="nav-wrapper flex xl:space-x-10 space-x-5">
                  <li>
                    <a href="/">
                      <span className="text-qblack text-sm font-400 border-b border-transparent hover:border-qgray hover:text-qgray">
                        Ana Səhifə
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="/about">
                      <span className="text-qblack text-sm font-400 border-b border-transparent hover:border-qgray hover:text-qgray">
                        <span>Haqqında</span>
                      </span>
                    </a>
                  </li>
                  {/* <li>
                    <Link to="/blogs">
                      <span className="flex items-center text-sm text-qblacktext font-600 cursor-pointer ">
                        <span>Blog</span>
                      </span>
                    </Link>
                  </li> */}
                  <li>
                    <Link to="/contact">
                      <span className="text-qblack text-sm font-400 border-b border-transparent hover:border-qgray hover:text-qgray">
                        <span>Əlaqə</span>
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="add-product-btn">
                <Link to="/add-product">
                  <div className="bg-qblack hover:bg-qyellow hover:border hover:border-2 hover:border-black transition-all group rounded-md w-[161px] h-[40px] flex justify-center items-center cursor-pointer ">
                    <div className="flex space-x-2 items-center">
                      <span className="text-sm text-qyellow group-hover:text-black font-600">
                        Məhsul yarat
                      </span>
                      <AddIcon className='text-qyellow group-hover:text-black'/>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="become-seller-btn">
                <Link to="/become-saller">
                  <div className="bg-qblack hover:bg-qyellow hover:border hover:border-2 hover:border-black transition-all group rounded-md w-[161px] h-[40px] flex justify-center items-center cursor-pointer">
                    <div className="flex space-x-2 items-center">
                      <span className="text-sm text-qyellow group-hover:text-black font-600">
                        Satıcı olmaq
                      </span>
                     <StoreIcon className='text-qyellow group-hover:text-black'/>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
