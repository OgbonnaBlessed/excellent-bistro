import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Banner from '../components/Banner/Banner'
import SpecialOffer from '../components/SpecialOffer/SpecialOffer'
import AboutHome from '../components/AboutHome/AboutHome'

const Home = () => {
    return (
        <div>
            <Navbar />
            <Banner />
            <SpecialOffer />
            <AboutHome />
        </div>
    )
}

export default Home