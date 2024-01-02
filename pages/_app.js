import React from "react"
import Footer from "../components/footer"
import '../styles/global.css'
import NavBar from "../components/nav_bar"


export default function App({ Component, pageProps }) {

    return (
        <div className="main-bg">
            {/* <NavBar /> */}
            <Component {...pageProps} />
            <Footer />
        </div>
    )
}