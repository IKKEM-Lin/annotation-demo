/* eslint-disable @typescript-eslint/no-explicit-any */
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginForm,
  ProConfigProvider,
  ProFormText,
} from "@ant-design/pro-components";
import { OtherEndpointsService } from "./services/service";
import { message } from "antd";
import { AUTHORIZE_TOKEN } from "./constant";
import { useNavigate } from "react-router";
import {updateUserInfo} from "./valtio";

const Login = () => {
  const navigate = useNavigate();
  return (
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: "#fff" }}>
        <LoginForm
          //   logo="https://github.githubassets.com/favicons/favicon.png"
          title="ChemBrain Annotation"
          subTitle="ChemBrain 论文标注平台"
          onFinish={async (values: any) => {
            // console.log(values);
            try {
              const msg = await OtherEndpointsService.login(values);
              localStorage.setItem(AUTHORIZE_TOKEN, msg.token);
              const strings = msg.token.split(".");
              const userinfo = JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/")))));
              updateUserInfo(userinfo);
              navigate("/article");
            } catch (err) {
              console.error(err);
              message.error("登录失败，请重试！");
            }
          }}
        >
          <ProFormText
            name="username"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined className={"prefixIcon"} />,
            }}
            placeholder={"用户名"}
            rules={[
              {
                required: true,
                message: "请输入用户名!",
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined className={"prefixIcon"} />,
            }}
            placeholder={"密码"}
            rules={[
              {
                required: true,
                message: "请输入密码！",
              },
            ]}
          />
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};

export default Login;
