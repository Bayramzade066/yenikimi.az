import { useState, useEffect } from "react";
import Layout from "../../Partials/Layout";
import Thumbnail from "./Thumbnail";
import { useHistory } from "react-router-dom";
import InputField from "components/Helpers/InputField";
import { Button, Drawer, Form, Modal, Input, Spin } from 'antd';
import 'antd/es/spin/style/css';
import { register } from "../../../services/Users";

export default function Signup() {
  const [checked, setValue] = useState(false);
  const [responseError, setResponseError] = useState("");
  const [success, setSuccess] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();

  const rememberMe = () => {
    setValue(!checked);
  };


  // let data = new FormData();
  // data.append('email_or_phone', mail);
  // data.append('password', pass);

  // let config = {
  //   method: 'post',
  //   maxBodyLength: Infinity,
  //   url: 'https://yenikimi.store/api/users/register',
  //   headers: {
  //     'Content-Language': 'az',
  //   },
  //   data: data
  // };


  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async (values: any) => {
    setSuccess(true)
    // @ts-ignore
    let user_form_data = new FormData<LoginRegisterData>();

    user_form_data.append('email_or_phone', values.email_or_phone);
    user_form_data.append('password', values.password);

    //@ts-ignore
    const login_user = await register(user_form_data);


    if (login_user.status == 'success') {
     
      localStorage.setItem('auth_token', 'true');
      localStorage.setItem('loggedUserData', JSON.stringify(values.email_or_phone));
      localStorage.setItem('loggedUserDataPass', JSON.stringify(values.password));
      
      history.push('/verification')

      onReset();

      // Modal.success({
      //   content: 'Daxil olursunuz...',
      //   onOk : () => {
      //     //history.push('/profile')

      //     window.location.href='/profile';
      //   }
      // });

    }
    else {
      setSuccess(false)
      setResponseError(login_user.message)

      // Modal.error({
      //   content: login_user.status,
      //   onOk : () => {
      //     if(login_user.status=='userNotActivated'){
      //       history.push('/verify_account/'+login_user.user_token)
      //     }
      //   }
      // })
    }

  };



  // const  form = ()=>{
  //   axios.request(config)
  //   .then((response) => {
  //      console.log(response.data);
  //     //  localStorage.setItem('auth_token', 'true');
  //     //  localStorage.setItem('responseData', JSON.stringify(response.data));
  //       history.push('/verification')

  //   })
  //   // .catch((error) => {
  //   //   console.log(error.response.data);
  //   // });

  // }

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="login-page-wrapper w-full py-10">
        <div className="container-x mx-auto">
          <div className="lg:flex items-center relative">
            <div className="lg:w-[572px] w-full lg:h-[783px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
              <div className="w-full">
                <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                  <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
                    Hesab yaradın
                  </h1>
                  <div className="shape -mt-6">
                    <svg
                      width="354"
                      height="30"
                      viewBox="0 0 354 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1"
                        stroke="#FFBB38"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <Form
                  form={form}
                  onFinish={onFinish}
                // ref={formRef}
                >
                  <div className="input-area">
                    {/* <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                    <InputCom
                      placeholder="Adınız"
                      label="Ad*"
                      name="fname"
                      type="text"
                      inputClasses="h-[50px]"
                      inputHandler={(e) => setName(e.target.value)}
                    />

                    <InputCom
                      placeholder="Soyadınız"
                      label="Soyad*"
                      name="lname"
                      type="text"
                      inputClasses="h-[50px]"
                      inputHandler={(e) => setSurname(e.target.value)}
                    />
                  </div> */}
                    <div className="w-full flex sm:flex-row flex-col justify-between  sm:space-y-0 sm:space-x-3 mb-5">
                      <InputField
                        form={form}
                        name={'email_or_phone'}
                        rules={{ required: true, message: 'Bu xana boş buraxıla bilməz' }}
                        className={'border border-gray px-1 h-[30px] w-full sm:min-w-[230px] mb-5 sm:mb-0'}
                        type={'email'}
                        placeholder={'E-mail *'}

                      />
                      <InputField
                        form={form}
                        name={'phone'}
                        rules={{ required: false, message: 'Bu xana boş buraxıla bilməz' }}
                        className={'border border-gray px-1 h-[30px] w-full sm:min-w-[230px]'}
                        type={'tel'}
                        placeholder={'Telefon Nömrə'}

                      />
                    </div>

                    <div className="input-item mb-5">
                      <InputField
                        form={form}
                        name={'password'}
                        rules={{ required: true, message: 'Bu xana boş buraxıla bilməz' }}
                        className={'h-full w-full flex '}
                        type={'password'}
                        placeholder={'Şifrə *'}
                      />
                    </div>
                    {/* <>
                  <div className="input-item mb-5">
                    <h6 className="input-label text-qgray capitalize text-[13px] font-normal block mb-2 ">
                      Country*
                    </h6>
                    <div className="w-full h-[50px] border border-[#EDEDED] px-5 flex justify-between items-center mb-2">
                      <span className="text-[13px] text-qgraytwo">
                        Select Country
                      </span>
                      <span>
                        <svg
                          width="11"
                          height="7"
                          viewBox="0 0 11 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.4 6.8L0 1.4L1.4 0L5.4 4L9.4 0L10.8 1.4L5.4 6.8Z"
                            fill="#222222"
                          />
                        </svg>
                      </span>
                    </div>
                  </div> 
                  
                  <div className="input-item mb-5">
                    <InputCom
                      placeholder="Your address Here"
                      label="Ünvan*"
                      name="address"
                      type="text"
                      inputClasses="h-[50px]"
                      inputHandler={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                    <div className="w-1/2">
                      <h6 className="input-label text-qgray capitalize text-[13px] font-normal block mb-2 ">
                        Town / City*
                      </h6>
                      <div className="w-full h-[50px] border border-[#EDEDED] px-5 flex justify-between items-center mb-2">
                        <span className="text-[13px] text-qgraytwo">
                          Maiyami
                        </span>
                        <span>
                          <svg
                            width="11"
                            height="7"
                            viewBox="0 0 11 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.4 6.8L0 1.4L1.4 0L5.4 4L9.4 0L10.8 1.4L5.4 6.8Z"
                              fill="#222222"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="w-full h-[50px] mb-5 sm:mb-0">
                        <InputCom
                          label="Postcode / ZIP*"
                          inputClasses="w-full h-full"
                          type="text"
                          placeholder="00000"
                        />
                      </div>
                    </div>
                  </div> 
                  </> */}
                    <div className="forgot-password-area mb-7">
                      <div className="remember-checkbox flex items-center space-x-2.5">
                        <button
                          onClick={rememberMe}
                          type="button"
                          className="w-5 h-5 text-qblack flex justify-center items-center border border-light-gray"
                        >
                          {checked && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </button>
                        <span
                          onClick={rememberMe}
                          className="text-base text-black"
                        >
                          Bütün şərtləri qəbul edirəm !
                        </span>
                      </div>
                    </div>
                    <div className="signin-area mb-3 text-center">
                      {responseError && <span className="text-center text-red-600">{responseError} :(</span>}
                      <div className="flex justify-center pt-2">
                        {/* <a className="w-full h-full" href={`/verification`}> */}
                        <button

                        
                          type="submit"
                          className="black-btn text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center hover:text-qyellow"
                        >
                          <span >{success ? <Spin className="text-qyellow" /> : 'Hesab yarat'}</span>
                        </button>
                        {/* </a> */}
                      </div>
                    </div>

                    <div className="signup-area flex justify-center">
                      <p className="text-base text-qgraytwo font-normal">
                        Qeydiyyatdan keçmisən?
                        <a href="/login" className="ml-2 text-qyellow">
                          Daxil ol
                        </a>
                      </p>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
            <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100   xl:justify-center">
              <div
                className="absolute xl:-right-20 -right-[138px]"
                style={{ top: "calc(50% - 258px)" }}
              >
                <Thumbnail />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
