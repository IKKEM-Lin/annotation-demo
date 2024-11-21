/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FileDoneOutlined,
  FileTextOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Empty } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate
} from "react-router-dom";
import Login from "./login";
import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components";
import Article from "./pages/Article";
import ArticleDetail from "./pages/ArticleDetail";
import User from "./pages/User";
import { useSnapshot } from "valtio";
import { userinfo } from "./valtio";
import Annotation from "./pages/Annotation";
import { useState } from "react";

const routeRender = (routes: any[]) => {
  return (
    <>
      {routes.map((item, ind) => {
        const children = routeRender(item.children || []);
        return (
          <Route
            key={`${item.name}-${ind}`}
            path={item.path}
            element={item.component}
          >
            {children}
          </Route>
        );
      })}
    </>
  );
};

export const allRoutes = [
  {
    path: "/",
    name: "Root",
    hideInMenu: true,
    component: <Navigate to="/article" replace={true} />,
  },
  {
    path: "/article",
    name: "All Tasks",
    icon: <FileTextOutlined />,
    component: <Article />,
  },
  {
    path: "/article/:id",
    name: "Task Detail",
    hideInMenu: true,
    component: <ArticleDetail />,
  },
  {
    path: "/annotation",
    name: "My Tasks",
    icon: <FileDoneOutlined />,
    component: <Annotation />,
  },
  {
    path: "/user",
    name: "User",
    icon: <UserOutlined />,
    component: <User />,
  },
  {
    path: "*",
    name: "Nothing Here",
    hideInMenu: true,
    component: <Empty description="Nothing here" />,
  },
];

function App() {
  // const navigate = useNavigate();
  const [pathname, setPathname] = useState("");
  const user = useSnapshot(userinfo);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProLayout
              siderWidth={256}
              route={{
                path: "/",
                children:
                  user.data?.role === "admin"
                    ? allRoutes
                    : allRoutes.filter((item) => item.path !== "/user"),
              }}
              location={{
                pathname,
              }}
              logo={<Avatar>CBA</Avatar>}
              title="Chem Brain Annotation"
              // breadcrumbRender={false}
              menuItemRender={(item, dom) => (
                <Link
                  to={item.path || "/"}
                  onClick={() => setPathname(item.path || "/")}
                >
                  {dom}
                </Link>
              )}
              avatarProps={{
                src: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80",
                // size: 'small',
                title: user.data?.username,
                render: (_, dom) => {
                  return (
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: "logout",
                            icon: <LogoutOutlined />,
                            label: "Logout",
                            onClick: () => {
                              localStorage.removeItem("AUTHORIZE_TOKEN");
                              localStorage.removeItem("userinfo");
                              window.location.href = "/login";
                            },
                          },
                        ],
                      }}
                    >
                      {dom}
                    </Dropdown>
                  );
                },
              }}
            >
              <PageContainer>
                <ProCard
                  style={{
                    height: "calc(100vh - 100px)",
                    overflow: "auto",
                  }}
                >
                  <Outlet />
                </ProCard>
              </PageContainer>
            </ProLayout>
          }
        >
          {routeRender(allRoutes)}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
