// lib
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

// me
import "./StatisticsChart.css";
import moment from "moment";

function StatisticsChart({ doctors, filterChartOfDoctor }) {
  console.log("filterChartOfDoctor", filterChartOfDoctor);
  // console.log("filterChartOfDoctor", [filterChartOfDoctor.revenue]);

  // option
  const option = {
    color: ["#FE4C00"],
    toolbox: {
      feature: {
        saveAsImage: {},
      },
      color: "red",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      backgroundColor: "#fff",
      borderWidth: 0,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
      show: false,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data:
          // filterChartOfDoctor[0] !== []
          //   ? filterChartOfDoctor.map((__doctor) => {
          //       // const _day = __doctor?.ratings?.map((_rating) =>
          //       //   moment(_rating.createdAt).format("DD/MM/YYYY")
          //       // );

          //       // return _day;
          //     })
          //   :
          doctors
            ?.filter(
              (__doctor) =>
                __doctor.is_accepted === true && __doctor.deleted === false
            )
            ?.map((_doctor) => _doctor.person.username),
      },
    ],
    yAxis: [
      {
        type: "value",
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        type: "line",
        smooth: true,
        lineStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgb(255, 191, 0)" },
            { offset: 1, color: "#F450D3" },
          ]),
          width: 4,
        },
        areaStyle: {
          opacity: 0.5,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [
            { offset: 0, color: "#FE4C00" },
            { offset: 1, color: "rgba(255, 144, 70, 0.1)" },
          ]),
        },
        emaphasis: {
          focus: "series",
        },
        showSymbol: false,
        data:
          // filterChartOfDoctor[0] !== []
          //   ? filterChartOfDoctor.map((__doctorChart) => __doctorChart.revenue)
          //   :
          doctors?.map((_doctor) => _doctor.revenue),
      },
    ],
  };

  return (
    <div className="statistics-chart-wrapper">
      <ReactECharts option={option} />

      <div className="statistics-chart-note-text">
        <p className="statistics-chart-note-text-title">Biểu đồ: </p>
        <p className="statistics-chart-note-text-desc">
          Thống kê tổng doanh thu của các bác sĩ
        </p>
      </div>
    </div>
  );
}

export default StatisticsChart;
