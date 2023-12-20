import { useState, useEffect } from 'react'
import Layout from '../../Partials/Layout'
import Thumbnail from './Thumbnail'
import { useHistory } from 'react-router-dom'
import InputField from 'components/Helpers/InputField'
import { Button, Drawer, Form, Modal, Input, Spin } from 'antd'
import 'antd/es/spin/style/css'
import { register } from '../../../services/Users'

export default function Signup() {
  const [checked, setValue] = useState(false)
  const [responseError, setResponseError] = useState('')
  const [success, setSuccess] = useState(false)
  const [successAlert, setSuccessAlert] = useState(false)
  const [loginChoose, setLoginChoose] = useState(false);
  const [passTrue, setPassTrue] = useState(0);
  const [form] = Form.useForm()
  const history = useHistory()

  const rememberMe = () => {
    setValue(!checked)
  }

  const onReset = () => {
    form.resetFields()
  }

  const onFinish = async (values: any) => {
  

    // @ts-ignore
    let user_form_data = new FormData<LoginRegisterData>()

    if(values.password === values.password2 && checked){
      setPassTrue(1)
      setSuccess(true)
      setSuccessAlert(false)
      
      user_form_data.append('password', values.password)
      user_form_data.append('email', values.email)
      user_form_data.append('phone', values.phone)
  
  
      let mail = JSON.stringify({
        email: values.email,
        password: values.password
  
      })
      let phone = JSON.stringify({
        phone: values.phone,
        password: values.password
  
      })
      const resReg = await fetch(
        'http://192.168.31.88:7299/api/User/ChechUserRegistered',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: loginChoose ? mail : phone,
          mode: 'cors',
        }
      )

      if (resReg.ok) {
        localStorage.setItem('auth_token', 'true')
        localStorage.setItem(
          'loggedUserData',
          JSON.stringify(values.email_or_phone)
        )
        localStorage.setItem(
          'loggedUserDataPass',
          JSON.stringify(values.password)
        )
  
        let d = JSON.stringify({
          email: values.email_or_phone,
        })
  
        const resVerf = await fetch(
          'http://192.168.31.88:7299/api/User/SendRegisterMail',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: d,
            mode: 'cors',
          }
        )
  
        if (resVerf) {
          history.push('/verification')
        }
  
        onReset()
  
        // Modal.success({
        //   content: 'Daxil olursunuz...',
        //   onOk : () => {
        //     //history.push('/profile')
  
        //     window.location.href='/profile';
        //   }
        // });
      } else {
        setSuccess(false)
        setResponseError(resReg.statusText)
      }
      
    }else{
      if(values.password !== values.password2)setPassTrue(2)
      if(!checked){
        setSuccessAlert(true)
      }
    }





  }
console.log(passTrue)
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="login-page-wrapper w-full py-10">
        <div className="container-x mx-auto">
          <div className="lg:flex items-center relative">
            <div className="lg:w-[572px] w-full h-[700px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
              <div className="absolute top-5 left-5">
                <a href="/">
                  <img
                    className="w-[50px] lg:w-[75px] rounded-md"
                    src={`assets/images/YK Logo2.jpg`}
                    alt="logo"
                  />
                </a>
              </div>
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
                    {/* <div className="w-full flex sm:flex-row flex-col justify-between  sm:space-y-0 sm:space-x-3 mb-5">
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
                    </div> */}

                    <div className="input-item">
                      {!loginChoose ? (
                        <InputField
                          form={form}
                          name={'email'}
                          rules={{
                            required: true,
                            message: 'Bu xana boş buraxıla bilməz',
                          }}
                          className={'border border-gray px-1 h-[40px] w-full'}
                          type={'email'}
                          placeholder={'E-mail *'}
                        />
                      ) : (
                        <InputField
                          form={form}
                          name={'phone'}
                          rules={{
                            required: false,
                            message: 'Bu xana boş buraxıla bilməz',
                          }}
                          className={
                            'border border-gray px-1 h-[40px] w-full sm:min-w-[230px]'
                          }
                          type={'tel'}
                          placeholder={'Telefon Nömrə'}
                        />
                      )}
                    </div>
                    {!loginChoose ? (
                      <span
                        className="cursor-pointer font-semibold text-base text-qyellow hover:text-qblack"
                        onClick={() => setLoginChoose(!loginChoose)}
                      >
                        Nömrə ilə Qeydiyyatdan keç
                      </span>
                    ) : (
                      <span
                        className="cursor-pointer font-semibold text-base text-qyellow hover:text-qblack"
                        onClick={() => setLoginChoose(!loginChoose)}
                      >
                        Mail ilə Qeydiyyatdan keç
                      </span>
                    )}

                    <div className="input-item mb-5 mt-5">
                      <InputField
                        form={form}
                        name={'password'}
                        rules={{
                          required: true,
                          message: 'Bu xana boş buraxıla bilməz',
                        }}
                        className={`h-full w-full border border-solid flex relative ${passTrue == 1 ? '!border-green-600' : passTrue == 2 && '!border-red-600'}`}
                        type={'password'}
                        placeholder={'Şifrə *'}
                      />
                    </div>
                    <div className="input-item mb-5 mt-5">
                      <InputField
                        form={form}
                        name={'password2'}
                        rules={{
                          required: true,
                          message: 'Bu xana boş buraxıla bilməz',
                        }}
                        className={`h-full w-full border border-solid flex relative ${passTrue == 1 ? '!border-green-600' : passTrue == 2 && '!border-red-600'} `}
                        type={'password'}
                        placeholder={'Şifrəni təkrar daxil edin*'}
                      />
                    </div>
                    <div className="forgot-password-area mb-7">
                      <div className="remember-checkbox flex items-center space-x-2.5">
                        <button
                          onClick={rememberMe}
                          type="button"
                          className={`w-5 h-5 text-qblack flex justify-center items-center border  border-light-gray ${successAlert ? 'border-red-600' : ''} `}
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
                      {responseError && (
                        <span className="text-center text-red-600">
                          {responseError} :(
                        </span>
                      )}
                      <div className="flex justify-center pt-2">
                        {/* <a className="w-full h-full" href={`/verification`}> */}
                        <button
                          type="submit"
                          className="black-btn text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center hover:text-qyellow"
                        >
                          <span>
                            {success ? (
                              <Spin className="text-qyellow" />
                            ) : (
                              'Hesab yarat'
                            )}
                          </span>
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
                style={{ top: 'calc(50% - 258px)' }}
              >
                <Thumbnail />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
