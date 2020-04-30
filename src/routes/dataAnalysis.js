import asyncComponent from "../lazy";

const RealtimeData = asyncComponent(() =>
  import(
    /* webpackChunkName: "dataAnalysis" */ "../pages/dataAnalysis/realtimeData"
  )
);

const HistoricalTrend = asyncComponent(() =>
  import(
    /* webpackChunkName: "dataAnalysis" */ "../pages/dataAnalysis/historicalTrend"
  )
);

const UsingFrequency = asyncComponent(() =>
  import(
    /* webpackChunkName: "dataAnalysis" */ "../pages/dataAnalysis/usingFrequency"
  )
);

const UsingDuration = asyncComponent(() =>
  import(
    /* webpackChunkName: "dataAnalysis" */ "../pages/dataAnalysis/usingDuration"
  )
);

const DeviceData = asyncComponent(() =>
  import(
    /* webpackChunkName: "dataAnalysis" */ "../pages/dataAnalysis/deviceData"
  )
);

// const EventAnalysis = asyncComponent(() =>
//   import(
//     /* webpackChunkName: "dataAnalysis" */ "../pages/dataAnalysis/eventAnalysis"
//   )
// );

const route = {
  icon: "area-chart",
  name: "数据分析",
  path: "/dataAnalysis",
  redirect: "/dataAnalysis/realtimeData",
  routes: [
    {
      name: "实时数据",
      path: "/dataAnalysis/realtimeData",
      component: RealtimeData
    },
    {
      name: "历史趋势",
      path: "/dataAnalysis/historicalTrend",
      component: HistoricalTrend
    },
    {
      name: "使用频率",
      path: "/dataAnalysis/usingFrequency",
      component: UsingFrequency
    },
    {
      name: "使用时长",
      path: "/dataAnalysis/usingDuration",
      component: UsingDuration
    },
    {
      name: "设备数据",
      path: "/dataAnalysis/deviceData",
      component: DeviceData
    }
    // {
    //   name: "事件分析",
    //   path: "/dataAnalysis/eventAnalysis",
    //   component: EventAnalysis
    // }
  ]
};

export default route;
