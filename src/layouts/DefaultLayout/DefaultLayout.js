// lib
import React, { useState } from "react";
import { OrderedListOutlined } from "@ant-design/icons";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons/lib/icons";
import { Layout, Menu, theme } from "antd";

// me
import "./DefaultLayout.css";

const { Header, Sider, Content } = Layout;

function DefaultLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={400}
        className="sidebar"
      >
        {!collapsed && (
          <img
            style={{ margin: "12px" }}
            src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/logo.svg"
            alt="logo"
          />
        )}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <OrderedListOutlined />,
              label: "Danh sách duyệt tài khoản cho các bác sĩ",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Lựa chọn 2",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default DefaultLayout;
