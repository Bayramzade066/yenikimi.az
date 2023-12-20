import React, { useEffect } from 'react'
import { Layout } from 'antd'
const { Content } = Layout
import { Route, Switch, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'

/**/
import HomePage from 'components/Home/index'
import About from 'components/About/index'
import { translateListData } from 'store/actions/translate'
import ScrollToTop from './ScrollToTop'
import Contact from 'components/Contact/index'
import BecomeSaller from 'components/BecomeSaller'
import AddProduct from 'components/AddProduct'
import Wishlist from 'components/Wishlist'
import AllProductPage from 'components/AllProductPage'
import HomeTwo from 'components/HomeTwo'
import SingleProductPage from 'components/SingleProductPage'
import PrivacyPolicy from 'components/PrivacyPolicy'
import Login from 'components/Auth/Login'
import Signup from 'components/Auth/Signup'
import Verification from 'components/Auth/Login/verification'
import SallerPage from 'components/SallerPage'
import Profile from 'components/Auth/Profile'
import Sallers from 'components/Sellers'
import PasswordTab from 'components/Auth/Profile/tabs/PasswordTab'
import forgetPassword from 'components/Auth/Login/forgetPassword'
import CheakoutPage from 'components/CheakoutPage'
import ProductsCompaire from 'components/ProductsCompaire'

const routes = [
  {
    component: HomePage,
    exact: true,
    path: '/',
  },
  {
    component: HomeTwo,
    exact: true,
    path: '/home-two',
  },
  {
    component: About,
    exact: true,
    path: '/about',
  },
  {
    component: Contact,
    exact: true,
    path: '/contact',
  },
  {
    component: BecomeSaller,
    exact: true,
    path: '/become-saller',
  },
  {
    component: AddProduct,
    exact: true,
    path: '/add-product',
  },
//   {
//     component: CheakoutPage,
//     exact: true,
//     path: '/checkout',
//   },

  {
    component: Wishlist,
    exact: true,
    path: '/wishlist',
  },
  {
    component: AllProductPage,
    exact: true,
    path: '/all-products',
  },
  {
    component: SingleProductPage,
    exact: true,
    path: '/single-product/:userId',
  },
//   {
//     component: ProductsCompaire,
//     exact: true,
//     path: '/products-compaire',
//   },
  {
    component: PrivacyPolicy,
    exact: true,
    path: '/privacy-policy',
  },
  {
    component: Login,
    exact: true,
    path: '/login',
  },
  {
    component: Signup,
    exact: true,
    path: '/signup',
  },
  {
    component: Verification,
    exact: true,
    path: '/verification',
  },
  {
    component: forgetPassword,
    exact: true,
    path: '/forget-password',
  },
  {
    component: PasswordTab,
    exact: true,
    path: '/forgot-password',
  },
  {
    component: SallerPage,
    exact: true,
    path: '/saller-page',
  },
  {
    component: Profile,
    exact: true,
    path: '/profile',
  },
  {
    component: Sallers,
    exact: true,
    path: '/sallers',
  },
]

const Routes: React.FC<any> = ({ translate }) => {
  const location = useLocation()
  const pathname = location.pathname

  useEffect(() => {
    if (pathname === '/home-two') {
      document.body.classList.add('home-two')
    } else if (pathname === '/') {
      document.body.classList.remove('home-two')
      document.body.classList.add('home-one')
    }

    document.body.classList.add('home-one')
    return () => {
      document.body.classList.remove('home-two')
      document.body.classList.add('home-one')
    }
  }, [pathname])

  // @ts-ignore
  return (
    <>
      <ScrollToTop />

      <Switch>
        {routes.map((route: any) => (
          <Route {...route} key={route.path} />
        ))}
      </Switch>
    </>
  )
}

const mapDispatchToProps = { translateListData }

const mapStateToProps = (state: any) => ({
  translate: state.translate.translateData.result,
})

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
