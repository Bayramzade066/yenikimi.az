import { useEffect, useRef, useState } from 'react'
import { Button, Drawer, Form, Modal, Input, Spin } from 'antd'
import { translateListData } from 'store/actions/translate'
import { connect } from 'react-redux'
import { useActions } from 'hooks/useActions'

import InputCom from '../../Helpers/InputCom'
import Layout from '../../Partials/Layout'
import Thumbnail from './Thumbnail'
import axios from 'axios'
import { login, LoginRegisterData } from '../../../services/Users'
import { useHistory } from 'react-router'
import InputField from 'components/Helpers/InputField'
import 'antd/es/spin/style/css'

const forgetPassword = () => {
  const [responseError, setResponseError] = useState('')
  const [success, setSuccess] = useState(false)
  const [checked, setValue] = useState(false)
  const [Mail, setMail] = useState('')
  const [verf, setVerf] = useState('')

  const history = useHistory()
  const [form] = Form.useForm()

  const refreshCode = async () => {
    let user_form_data = new FormData()

    let registerMail = Mail

    user_form_data.append('email_or_phone', registerMail)

    // user_form_data.append('password', registerPass);

    //@ts-ignore
    const login_user = { status: 'success' }
    //setCounter(59)

    let d = JSON.stringify({
      email: Mail,
    })

    const resReg = await fetch(
      'http://192.168.31.88:7299/api/User/ChechUserRegistered',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: d,
        mode: 'cors',
      }
    )

    if (!resReg.ok) {
      let d = JSON.stringify({
        email: Mail,
      })

      const resSend = await fetch(
        'http://192.168.31.88:7299/api/User/SendLogedUserMail',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: d,
          mode: 'cors',
        }
      )

      if (resSend) {
        setValue(true)
        setSuccess(true)
      }

      onReset()
    }
    // }else{
    // setResponseError(resReg.statusText)
    // }
  }

  const onFinish2 = async () => {
    //@ts-ignore
    let registerMail = Mail
    //@ts-ignore

    //@ts-ignore
    let user_form_data = new FormData()
    user_form_data.append('email_or_phone', registerMail)
    // user_form_data.append('verify_code', values.verify_code);

    //@ts-ignore
    //  const login_user = await verifyUser(user_form_data);

    let d = JSON.stringify({
      email: Mail,
      verfCode: verf,
    })

    const res = await fetch(
      'http://192.168.31.88:7299/api/User/CheckRegisterMail',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: d,
        mode: 'cors',
      }
    )

    if (res.ok) {
      console.log('Ugurlu sifre')
      localStorage.setItem('auth_token', 'true')
      localStorage.setItem('loggedUserData', JSON.stringify(registerMail))

      // setSuccess(false)
    } else {
      setSuccess(false)
      console.log('Ugursuz sifre')

      //setResponseError(login_user.message)
      onReset()
    }
  }

  const onFinish = async (values) => {
    // setSuccess(true)
    // @ts-ignore
    let user_form_data = new FormData()

    // user_form_data.append('email_or_phone', values.email_or_phone);
    // user_form_data.append('password', values.password);
    const login_user = await login(user_form_data)

    console.log(values.password)
    let d = JSON.stringify({
      email: Mail,
      newPassword: values.password,
    })

    const resReset = await fetch(
      'http://192.168.31.88:7299/api/User/ResetPassword',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: d,
        mode: 'cors',
      }
    )

    if (resReset.ok) {
      localStorage.setItem('auth_token', 'true')

      history.push('/')
      onReset()

      // Modal.success({
      //   content: 'Daxil olursunuz...',
      //   onOk : () => {
      //     //history.push('/profile')

      //     window.location.href='/profile';
      //   }
      // });
    } else {
      //setResponseError(login_user.message)
      // setSuccess(false)
      onReset()

      // Modal.error({
      //   content: login_user.status,
      //   onOk : () => {
      //     if(login_user.status=='userNotActivated'){
      //       history.push('/verify_account/'+login_user.user_token)
      //     }
      //   }
      // })
    }
  }

  const onReset = () => {
    form.resetFields()
  }

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
                    Şifrəni yenilə
                  </h1>
                  <div className="shape -mt-6">
                    <svg
                      width="172"
                      height="29"
                      viewBox="0 0 172 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5.08742C17.6667 19.0972 30.5 31.1305 62.5 27.2693C110.617 21.4634 150 -10.09 171 5.08727"
                        stroke="#FFBB38"
                      />
                    </svg>
                  </div>
                </div>
                <div className="input-area">
                  <Form
                    form={form}
                    onFinish={onFinish}
                    // ref={formRef}
                  >
                    {checked ? (
                      <>
                        {success ? (
                          <div className="input-item mb-5">
                            <InputField
                              form={form}
                              onChange={(e) => {
                                setVerf(e.target.value)
                              }}
                              name={'verify_code'}
                              rules={{
                                required: true,
                                message: 'Bu xana boş buraxıla bilməz',
                              }}
                              className={
                                'border border-gray px-1 h-[40px] tracking-widest text-lg text-center w-full'
                              }
                              type={'number'}
                              maxs={true}
                              placeholder={'6 Rəqəmli kodu daxil edin *'}
                            />
                          </div>
                        ) : (
                          <div className="input-item mb-5 ">
                            <InputField
                              form={form}
                              name={'password'}
                              rules={{
                                required: true,
                                message: 'Bu xana boş buraxıla bilməz',
                              }}
                              className={' h-full w-full flex '}
                              type={'password'}
                              placeholder={'Yeni şifrə təyin edin *'}
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="input-item mb-5">
                        <input
                          form={form}
                          onChange={(e) => {
                            setMail(e.target.value)
                          }}
                          name={'email_or_phone'}
                          rules={{
                            required: true,
                            message: 'Bu xana boş buraxıla bilməz',
                          }}
                          className={'border border-gray px-1 h-[40px]  w-full'}
                          type={'email'}
                          placeholder={
                            'Qeydiyyatdan keçdiyiniz E-mail daxil edin *'
                          }
                        />
                      </div>
                    )}

                    <div className="signin-area mb-3 text-center">
                      {responseError && (
                        <span className="text-center text-red-600">
                          {responseError} :(
                        </span>
                      )}
                      <div className="flex justify-center pt-2">
                        {checked ? (
                          <>
                            {success ? (
                              <button
                                onClick={onFinish2}
                                className="black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center hover:text-qyellow"
                              >
                                <span>
                                  {!success ? (
                                    <Spin className="text-qyellow" />
                                  ) : (
                                    'Kodu daxil edin'
                                  )}
                                </span>
                              </button>
                            ) : (
                              <button
                                type="submit"
                                className="black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center hover:text-qyellow"
                              >
                                <span>
                                  {success ? (
                                    <Spin className="text-qyellow" />
                                  ) : (
                                    'Şifrəni yenilə'
                                  )}
                                </span>
                              </button>
                            )}
                          </>
                        ) : (
                          <button
                            onClick={refreshCode}
                            className="black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center hover:text-qyellow"
                          >
                            <span>
                              {success ? (
                                <Spin className="text-qyellow" />
                              ) : (
                                'Kod göndər'
                              )}
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
            <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100   xl:justify-center ">
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

export default forgetPassword
