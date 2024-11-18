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
} from "react-router-dom";
import Login from "./login";
import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components";
import Article from "./pages/article";
import ArticleDetail from "./pages/ArticleDetail";
import User from "./pages/User";
import {useSnapshot} from "valtio";
import {userinfo} from "./valtio";

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
    path: "/article",
    name: "Article",
    icon: <FileTextOutlined />,
    component: <Article />,
  },
  {
    path: "/article/:id",
    name: "Article",
    hideInMenu: true,
    component: <ArticleDetail />,
  },
  {
    path: "/annotation",
    name: "Annotation",
    icon: <FileDoneOutlined />,
    component: <></>,
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
                children: user.data?.role === "admin" ? allRoutes : allRoutes.filter((item) => item.path !== "/user"),
              }}
              logo={<Avatar>CBA</Avatar>}
              title="Chem Brain Annotation"
              breadcrumbRender={false}
              menuItemRender={(item, dom) => (
                <Link to={item.path || "/"}>{dom}</Link>
              )}
              avatarProps={{
                src: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
                // size: 'small',
                title: user.data?.username,
                render: (props, dom) => {
                  return (
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: 'logout',
                            icon: <LogoutOutlined />,
                            label: 'Logout',
                            onClick: () => {
                              localStorage.removeItem("AUTHORIZE_TOKEN");
                              localStorage.removeItem("userinfo");
                              window.location.href = "/login";
                            }
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
