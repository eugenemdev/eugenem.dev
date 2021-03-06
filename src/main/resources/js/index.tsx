import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App";
import Footer from "./components/Footer/Footer"
import "../styles/style.scss"


const ROOT = document.querySelector(".container")
ReactDOM.render(
<BrowserRouter>
    <App/>
</BrowserRouter>
, ROOT)

const FOOTER = document.querySelector(".footer")
ReactDOM.render(<Footer/>, FOOTER)
