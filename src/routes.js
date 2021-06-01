/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import Factory from "views/Factory";
import {
  FactoryAddFormContainer,
  ThingAddFormContainer,
  FactoryEditContainer,
  ProductionLineEditContainer,
  ProductionLineAddFormContainer,
  FactoryEditFormContainer
} from "./components/Factory/"
import Notifications from "views/Notifications.js";
import TableList from "views/TableList.js";
import { Route, Switch } from "react-router-dom";
import UserProfile from "views/UserProfile.js";


function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}

export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, key) => {
        return <RouteWithSubRoutes key={key} {...route} />;
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}
// return (
//   <div classname="content">
//     <RouteWithSubRoutes key={route.key} {...route} />;
//   </div>
// )

var routes = [
  { path: "/", name: "Home", exact: true, icon: "tim-icons icon-world", component: Dashboard },
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: "tim-icons icon-atom",
  //   component: Icons,
  //   layout: "/admin",
  // },
  {
    path: "/map",
    name: "Map",
    rtlName: "خرائط",
    icon: "tim-icons icon-pin",
    component: Map,
    layout: "/admin",
  },
  {
    path: "/factories",
    name: "FACTORIES",
    rtlName: "خط الإنتاج",
    icon: "tim-icons icon-components",
    component: RenderRoutes, // here's the update
    routes: [
      {
        path: "/factories",
        name: "ROOT_FACTORIES",
        exact: true,
        component: Factory,
      },
      {
        path: "/factories/add_factory",
        name: "ADD_FACTORY_FACTORIES",
        exact: true,
        component: FactoryAddFormContainer,
      },
      {
        path: "/factories/:id",
        name: "EDIT_FACTORIES",
        exact: true,
        component: FactoryEditContainer
      },
      {
        path: "/factories/:id/edit_factory/",
        name: "EDIT_FACTORY_DATA",
        exact: true,
        component: FactoryEditFormContainer
      },
      {
        path: "/factories/:id/add_pline/",
        name: "ADD_PRODUCTION_LINE_FACTORIES",
        exact: true,
        component: ProductionLineAddFormContainer
      },
      {
        path: "/factories/:id/edit_pline/:id",
        name: "EDIT_PRODUCTION_LINE_FACTORIES",
        exact: true,
        component: ProductionLineEditContainer
      },
      {
        path: "/factories/add_factory/add_thing",
        name: "ADD_THING_FACTORIES",
        exact: true,
        component: ThingAddFormContainer,
      },
    ],
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/admin",
  },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: "tim-icons icon-align-center",
  //   component: Typography,
  //   layout: "/admin",
  // },
  // {
  //   path: "/rtl-support",
  //   name: "RTL Support",
  //   rtlName: "ار تي ال",
  //   icon: "tim-icons icon-world",
  //   component: Rtl,
  //   layout: "/rtl",
  // },
];
export default routes;
// export default ROUTES;
