import { useState, useContext } from "react";
import DashboardDUO from "./Dashboards/DashboardDUO";
import DashboardSGA from "./Dashboards/DashboardSGA";

import { Button, Link, Text } from "@paco_ua/pacoui";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import useFetch from "./Helper/useFetch";
import { Link as RouterLink} from "react-router-dom";
import { UserContext } from "./Helper/Context";

const Home = () => {


    const URL_DPUC = "http://localhost:8000/dpuc/" + 1;

    const { userType } = useContext(UserContext);
    
    return ( 
        <>
        {
            userType === "DUO" &&
            <DashboardDUO/>
        }
        {
            userType === "DR" &&
            <DashboardDUO/>
        }
        {
            userType === "SGA" &&
            <DashboardSGA/>
        }
        </>
     );
}
 
export default Home;