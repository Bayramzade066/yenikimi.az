import React from 'react'
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';

 const  MainLayout:React.FC = ({ children }) => {
 return (
    <div>
    <Header/>
     {children}
     <Footer/>
    </div>
 )
}
export default MainLayout
