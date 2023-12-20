import { useEffect, useRef, useState } from 'react'
import { Button, Drawer, Form, Modal, Input, Spin } from 'antd'
import { translateListData } from 'store/actions/translate'
import { connect } from 'react-redux'
import { useActions } from 'hooks/useActions'
import InputCom from '../../Helpers/InputCom'
import Layout from '../../Partials/Layout'
import Thumbnail from './Thumbnail'
import axios from 'axios'
import {
  login,
  LoginRegisterData,
  LoginVerifyData,
  register,
  resendVerifyCode,
  verifyUser,
} from '../../../services/Users'
import { useHistory } from 'react-router'
import InputField from 'components/Helpers/InputField'
import { useLocation } from 'react-router-dom'
import 'antd/es/spin/style/css'

export default function Verification() {
  const [responseError, setResponseError] = useState('')
  const [success, setSuccess] = useState(false)
  const [form] = Form.useForm()
  const [userInfo, setUserInfo] = useState(false)
  const history = useHistory()
  const [counter, setCounter] = useState(59)
  const [items, setItems] = useState([])

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
  }, [counter])

  const onReset = () => {
    form.resetFields()
  }

  if (responseError !== '') {
    setTimeout(() => {
      setResponseError('')
    }, 4000)
  }

  const onFinish = async (values: any) => {
    setSuccess(true)
    //@ts-ignore
    let registerMail = JSON.parse(localStorage.getItem('loggedUserData'))
    //@ts-ignore
    let registerPass = JSON.parse(localStorage.getItem('loggedUserDataPass'))
    //@ts-ignore
    let user_form_data = new FormData<LoginVerifyData>()
    user_form_data.append('email_or_phone', registerMail)
    user_form_data.append('verify_code', values.verify_code)

    //@ts-ignore
    // const login_user = await verifyUser(user_form_data);

    let d = JSON.stringify({
      email: registerMail,
      verfCode: values.verify_code,
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
      let d = JSON.stringify({
        email: registerMail,
        password: registerPass,
      })

      const resRegister = await fetch(
        'http://192.168.31.88:7299/api/User/Register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: d,
          mode: 'cors',
        }
      )

      // const data = await res.text();
      localStorage.setItem('auth_token', 'true')
      localStorage.setItem('loggedUserData', JSON.stringify(registerMail))
      if (resRegister.ok) {
        history.push('/login')
      }
    } else {
      setSuccess(false)
      setResponseError(res.statusText)
      onReset()
    }
  }

  const refreshCode = async () => {
    setSuccess(true)
    // @ts-ignore
    let user_form_data = new FormData<LoginRegisterData>()
    //@ts-ignore
    let registerMail = JSON.parse(localStorage.getItem('loggedUserData'))
    //@ts-ignore
    let registerPass = JSON.parse(localStorage.getItem('loggedUserDataPass'))
    //@ts-ignore

    user_form_data.append('email_or_phone', registerMail)
    user_form_data.append('password', registerPass)

    //@ts-ignore
    const login_user = await resendVerifyCode(user_form_data)

    let d = JSON.stringify({
      email: registerMail,
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
      setCounter(59)

      setSuccess(false)
      setResponseError(login_user.message)
      console.log(login_user.status)

      history.push('/verification')

      onReset()
    }
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
                    Təsdiqləmə
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
                  <Form form={form} onFinish={onFinish}>
                    <div className="input-item mb-5">
                      <InputField
                        form={form}
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
                        placeholder={'4 Rəqəmli kodu daxil edin *'}
                      />
                    </div>
                    <div className="signin-area mb-3 text-center">
                      {responseError && (
                        <span
                          className={`text-center ${
                            responseError == 'Yeni təsdiq kodu göndərildi'
                              ? 'text-qyellow'
                              : 'text-red-600'
                          } `}
                        >
                          {responseError}
                        </span>
                      )}
                      <div className="flex justify-center pt-2">
                        {/* <a className="w-full h-full" href={`/`}> */}
                        <button
                          type="submit"
                          className="black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center hover:text-qyellow"
                        >
                          <span>
                            {success ? (
                              <Spin className="text-qyellow" />
                            ) : (
                              'Təsdiqlə'
                            )}
                          </span>
                        </button>
                        {/* </a> */}
                      </div>
                    </div>
                  </Form>
                  <div className="signup-area flex justify-center">
                    <p className="text-base text-qgraytwo font-normal cursor-pointer">
                      Kod almadınız ?{' '}
                      {counter == 0 ? (
                        <span onClick={refreshCode} className="text-qyellow">
                          Yenidən kod göndərin{' '}
                        </span>
                      ) : (
                        <span className="text-qyellow">
                          00 : {counter < 10 && <span>0</span>}
                          {counter}
                        </span>
                      )}
                    </p>
                  </div>
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
