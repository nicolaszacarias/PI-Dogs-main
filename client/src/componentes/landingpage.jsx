import React from "react";
import {Link} from "react-router-dom"; 
import "./landingpages.modules.css"
export default function LandingPage(){
    return  (
        <div className="container">
        <h3 className="title">Dog api</h3>
        <div className ="">
        <Link to= "/home">
            <button className="btn">Comenzar</button>
        </Link>
        </div>

        </div>
    )
}