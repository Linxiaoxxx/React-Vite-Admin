import React from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Spin } from "antd";

export default class Nprogress extends React.Component {
    constructor(props: any) {
        super(props);
        // console.log(0);
        NProgress.start();
    }
    componentDidMount() {
        // console.log(2);
    }
    componentWillUnmount() {
        NProgress.done();
    }
    render() {
        return (
            <Spin
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                }}
            />
        );
    }
}
