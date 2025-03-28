import React, { useState } from "react";
import {
  InboxOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

// type MenuItem = Required<MenuProps>["items"][number];

type LayoutAminProps = {
  children: React.ReactNode;
};

const menuItems = [
  {
    key: "/admin/products",
    label: <Link to="/admin/products">Sản phẩm</Link>,
    icon: <ProductOutlined />,
  },
  {
    key: "/admin/users",
    label: <Link to="/admin/users">Tài khoản</Link>,
    icon: <UserOutlined />,
  },
  {
    key: "/admin/orders",
    label: <Link to="/admin/orders">Đơn hàng</Link>,
    icon: <InboxOutlined />,
  },
];

const LayoutAdmin = ({ children }: LayoutAminProps) => {
  const location = useLocation();
  console.log(location.pathname);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="flex justify-center m-4">
          <img
            src="https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/small/fptshop_logo_c5ac91ae46.png"
            alt=""
            width={120}
          />
        </div>
        <Menu
          theme="dark"
          selectedKeys={[location.pathname]}
          // defaultSelectedKeys={["1"]}
          mode="inline"
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
