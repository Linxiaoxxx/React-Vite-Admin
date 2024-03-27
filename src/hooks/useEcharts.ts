import { MutableRefObject, useEffect } from "react";
import * as echarts from "echarts/core";
import { useRef } from "react";

export const useEcharts = (
    options: echarts.EChartsCoreOption,
    components: any[]
): [MutableRefObject<HTMLDivElement | null>, (data: any) => void] => {
    const myChart = useRef<echarts.EChartsType>();
    const echartsRef = useRef<HTMLDivElement | null>(null);

    const echartsResize = () => {
        myChart.current && myChart.current.resize();
    };

    const echartsUpdate = (data: any) => {
        myChart.current?.setOption(data);
    };

    useEffect(() => {
        echarts.use([...components]);
        if (echartsRef.current) {
            myChart.current = echarts.init(echartsRef.current);
        }
        myChart.current?.setOption(options);
        window.addEventListener("resize", echartsResize, false);

        return () => {
            window.removeEventListener("resize", echartsResize);
            myChart.current?.dispose();
        };
    }, []);

    return [echartsRef, echartsUpdate];
};
