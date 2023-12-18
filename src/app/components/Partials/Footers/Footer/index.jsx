import { Link } from 'react-router-dom'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TikTokIcon from 'components/Helpers/icons/tiktok';
export default function Footer() {
  return (
    <footer className="footer-section-wrapper bg-white print:hidden">
      <div className="w-full h-[1px] bg-[#E9E9E9] my-2"></div>
      <div className="container-x block mx-auto pt-[10px]">
        <div className="lg:flex justify-between mb-[50px] mt-[40px]">
          <div className="lg:w-[424px]  ml-0 w-full mb-10 lg:mb-0 ">
            <div>
              <a href="/">
                <img
                  className="rounded-md mb-2"
                  width="60"
                  src={`assets/images/YK Logo2.jpg`}
                  alt="logo"
                />
              </a>
            </div>
            <p className="text-[#9A9A9A] text-[15px] w-[247px] leading-[28px]">
              Bizim məqsədimiz alıcı ilə satıcı arasında ən güvənilir və rahat
              platform olmaqdır.
            </p>
          </div>
          <div className="flex-1 lg:flex">
            <div className="lg:w-1/2 lg:flex lg:flex-col items-center w-full mb-10 lg:mb-0 ">
              <div>
                <div className="mb-5">
                  <h6 className="text-[18] font-500 text-[#2F2F2F]">
                    Ümumi linklər
                  </h6>
                </div>
                <div>
                  <ul className="flex flex-col space-y-4 ">
                    <li>
                      <a href="/about">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Haqqımızda
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="/privacy-policy">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Qaydalar və şərtlər
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="/become-saller">
                        <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack cursor-pointer capitalize">
                          Satıcı olmaq
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 lg:flex lg:flex-col items-center w-full mb-10 lg:mb-0">
              <div>
                <div className="mb-5">
                  <h6 className="text-[18] font-500 text-[#2F2F2F]">Əlaqə</h6>
                </div>
                <div className="flex  space-x-5 items-center">
              <a href="#">
                <InstagramIcon />
              </a>
              <a href="#">
              <FacebookIcon/>
              </a>
              <a href="#">
              <LinkedInIcon/>
              </a>
              <a href="#">
              <WhatsAppIcon/>
              </a>
              <a href="#">
              <TikTokIcon/>
              </a>
              
            </div>
            <p className="text-[#9A9A9A] text-[15px] w-[247px] leading-[28px] pt-3">
              Bakı şəh. Nizami rayonu, Rüstəmzadə küç,120
            </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-bar border-t border-qgray-border lg:h-[82px] lg:flex justify-between items-center">
          <div className="flex lg:space-x-5 justify-between items-center mb-3">
            
            <span className="sm:text-base text-[10px] text-qgray font-300">
              ©2023
              <a
                href="/"
                rel="noreferrer"
                className="font-500 text-qyellow mx-1"
              >
                YENİKİMİ.AZ
              </a>
              Bütün haqqlar qorunur
            </span>
          </div>
          <div className="">
            {/* <a href="#">
                            <img
                                width="318"
                                height="28"
                                src={`${process.env.PUBLIC_URL}/assets/images/payment-getways.png`}
                                alt="payment-getways"
                            />
                        </a> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
