import React, { useState } from "react";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

// type MenuItem = Required<MenuProps>["items"][number];

type LayoutAminProps = {
  children: React.ReactNode;
};

const menuItems = [
  {
    key: 1,
    label: <Link to="/admin/products">Sản phẩm</Link>,
    icon: <PieChartOutlined />,
  },
  {
    key: 2,
    label: <Link to="/admin/users">Tài khoản</Link>,
    icon: <DesktopOutlined />,
  },
];

const LayoutAdmin = ({ children }: LayoutAminProps) => {
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
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            style={{
              padding: 24,
              minHeight: 360,
              // background: colorBgContainer,
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
