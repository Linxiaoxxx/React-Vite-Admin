import { useEcharts } from "@/hooks/useEcharts";
import { getStatsTrend } from "@/request/apis/screen";
import { useLayoutEffect } from "react";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";

const TrendChart = () => {
  const options = {
    color: ["#35FF92", "#0A82E6", "#FF8421", "#FF4B4B"],
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "12",
      right: 10,
      lineStyle: {
        width: 0,
      },
      icon: "circle",
      itemWidth: 8,
      itemHeight: 8,
      textStyle: {
        color: "#fff",
      },
      data: ["低危", "中危", "高危", "紧急"],
    },
    grid: {
      left: "3%",
      right: "5%",
      top: 48,
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["本周", "上周", "前两周", "前三周", "前四周"],
      axisLine: {
        show: true,
        lineStyle: {
          color: "#E9FBFF",
          width: 0.5,
        },
      },
      axisLabel: {
        color: "#BFE7FF",
        fontSize: 10,
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        lineStyle: {
          color: "#2F3E52",
        },
      },
      axisLabel: {
        color: "#BFE7FF",
      },
    },
    series: [
      {
        name: "低危",
        type: "line",
        showSymbol: true,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(53, 255, 146, 0.6)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(53, 255, 146, 0)", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        emphasis: {
          focus: "series",
        },
        data: [],
      },
      {
        name: "中危",
        type: "line",
        showSymbol: true,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(10, 130, 230, 0.6)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(10, 130, 230, 0)", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        emphasis: {
          focus: "series",
        },
        data: [],
      },
      {
        name: "高危",
        type: "line",
        showSymbol: true,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(255, 132, 33, 0.6)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(255, 132, 33, 0)", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        emphasis: {
          focus: "series",
        },
        data: [],
      },
      {
        name: "紧急",
        type: "line",
        showSymbol: true,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(255, 75, 75, 0.6)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(255, 75, 75, 0)", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        emphasis: {
          focus: "series",
        },
        data: [],
      },
    ],
  };
  const [echartsRef, updateEcharts] = useEcharts(options, [
    CanvasRenderer,
    GridComponent,
    LineChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
  ]);

  const getData = async () => {
    const res = await getStatsTrend();
    if (res && !res.err_no) {
      const trendData = res.data;

      updateEcharts({
        xAxis: {
          data: trendData.map((item: any) => {
            return item.week;
          }),
        },
        series: [
          {
            name: "低危",
            data: trendData.map((item: any) => {
              return item.low;
            }),
          },
          {
            name: "中危",
            data: trendData.map((item: any) => {
              return item.medium;
            }),
          },
          {
            name: "高危",
            data: trendData.map((item: any) => {
              return item.high;
            }),
          },
          {
            name: "紧急",
            data: trendData.map((item: any) => {
              return item.urgent;
            }),
          },
        ],
      });
    }
  };

  useLayoutEffect(() => {
    // getData();
  }, []);

  return <div ref={echartsRef} style={{ width: "100%", height: "100%" }}></div>;
};

export default TrendChart;
