import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initSettings } from "../../utills/initSettings";

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        initSettings(dispatch);
    }, []);

    return (
        <div>
            <h1>Home Page</h1>
        </div>
    );
};

export default Home;
