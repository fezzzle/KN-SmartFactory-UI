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
import Map from "views/Map.js";
import CompanyAdmin from "views/CompanyAdmin";
import BusinessUnitAdmin from "views/BusinessUnitAdmin";
import Factory from "views/Factory";
import {
  FactoryAddFormContainer,
  ThingAddFormContainer,
  FactoryEditContainer,
  ProductionLineEditTableContainer,
  ProductionLineAddFormContainer,
  FactoryEditFormContainer,
  ProductionLineEditFormContainer,
  DeviceAddFormContainer
} from "./components/Factory/Containers"
import { Route, Switch } from "react-router-dom";
import UserProfile from "views/UserProfile.js";
import ImportUserTable from "../src/components/ImportUserTable"

// function RouteWithSubRoutes(route) {
//   return (
//     <Route
//       path={route.path}
//       exact={route.exact}
//       render={(props) => <route.component {...props} routes={route.routes} />}
//     />
//   );
// }

// export function RenderRoutes({ routes }) {
//   return (
//     <Switch>
//     {routes.map((route, key) => {
//       return <RouteWithSubRoutes key={key} {...route} />;
//     })}
//     <Route component={() => <h1>Not Found!</h1>} />
//   </Switch>
//   );
// }


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
  {
    path: "/map",
    name: "Map",
    rtlName: "خرائط",
    icon: "tim-icons icon-pin",
    component: Map,
    layout: "/admin",
  },
  // {
  //   path: "/companyadmin",
  //   name: "Company Admin",
  //   rtlName: "خط الإنتاج",
  //   icon: "tim-icons icon-puzzle-10",
  //   component: RenderRoutes, // here's the update
  //   routes: [
  //     {
  //       path: "/companyadmin",
  //       name: "ROOT_ADMIN_PANEL",
  //       exact: true,
  //       component: CompanyAdmin,
  //     },
  //     {
  //       path: "/companyadmin/import-users",
  //       name: "ADD_USERS_EXCEL",
  //       exact: true,
  //       component: ImportUserTable,
  //     },
  //   ],
  //   layout: "/admin",
  // },
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
        path: "/factories/add_factory/add_thing",
        name: "ADD_FACTORY_ADD_THING_FACTORIES",
        exact: true,
        component: ThingAddFormContainer,
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
        component: ProductionLineEditFormContainer
      },
      {
        path: "/factories/:id/pline/:id",
        name: "LIST_PRODUCTION_LINE_FACTORIES",
        exact: true,
        component: ProductionLineEditTableContainer
      },
      {
        path: "/factories/:id/pline/:id/add_thing",
        name: "ADD_THING_TO_EXISTING_PRODUCTION_LINE",
        exact: true,
        component: ThingAddFormContainer
      },
      {
        path: "/factories/:id/pline/:id/add_device/:id/",
        name: "ADD_DEVICE_TO_EXISTING_THING",
        exact: true,
        component: DeviceAddFormContainer,
      },
    ],
    layout: "/admin",
  },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: "tim-icons icon-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // },
  {
    path: "/user-profile",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/companyadmin",
    name: "Company Admin",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: CompanyAdmin,
    layout: "/admin" ,
  },
  {
    path: "/business-unit",
    name: "Business Unit Admin",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: BusinessUnitAdmin,
    layout: "/admin" ,
  },

];
export default routes;
// export default ROUTES;
