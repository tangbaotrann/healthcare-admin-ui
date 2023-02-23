// lib
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { OrderedListOutlined, ClockCircleOutlined } from "@ant-design/icons";
import {
  FormOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons/lib/icons";
import { Layout, Menu, theme } from "antd";

// me
import "./DefaultLayout.css";
import constants from "../../utils/constants";
import layoutSlice from "../../redux/features/layoutSlice";
import ParticlesBackground from "../../components/ParticlesBackground";

const { Header, Sider, Content } = Layout;

function DefaultLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch();

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
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
          defaultSelectedKeys={[constants.layoutListAccount]}
          items={[
            {
              key: constants.layoutListAccount,
              icon: <OrderedListOutlined />,
              label: "Danh sách Bác sĩ đợi duyệt",
            },
            {
              key: constants.layoutShiftsDoctor,
              icon: <ClockCircleOutlined />,
              label: "Quản lý ca làm cho Bác sĩ",
            },
            {
              key: constants.layoutDaysDoctor,
              icon: <FormOutlined />,
              label: "Quản lý ngày làm cho Bác sĩ",
            },
            {
              key: "4",
              icon: <UnorderedListOutlined />,
              label: "Quản lý các chỉ số",
              children: [
                { label: "Chỉ số BMI", key: constants.layoutMetricTypeMBI },
                { label: "Chỉ số Glycemic", key: "glycemic" },
              ],
            },
          ]}
          // Change layout
          onSelect={(item) => {
            if (item.key === constants.layoutListAccount) {
              dispatch(layoutSlice.actions.btnClickMenuChangeLayout(item.key));
            } else if (item.key === constants.layoutShiftsDoctor) {
              dispatch(layoutSlice.actions.btnClickMenuChangeLayout(item.key));
            } else if (item.key === constants.layoutDaysDoctor) {
              dispatch(layoutSlice.actions.btnClickMenuChangeLayout(item.key));
            } else if (item.key === constants.layoutMetricTypeMBI) {
              dispatch(layoutSlice.actions.btnClickMenuChangeLayout(item.key));
            } else if (item.key === constants.layoutMetricTypeGlycemic) {
              dispatch(layoutSlice.actions.btnClickMenuChangeLayout(item.key));
            }
          }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0 }}>
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
            minHeight: 280,
          }}
        >
          {children}
        </Content>
        <ParticlesBackground />
      </Layout>
    </Layout>
  );
}

export default DefaultLayout;
