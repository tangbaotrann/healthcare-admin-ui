// lib
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { OrderedListOutlined, ClockCircleOutlined } from "@ant-design/icons";
import {
  FormOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TableOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons/lib/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";

// me
import "./DefaultLayout.css";
import constants from "../../utils/constants";
import layoutSlice from "../../redux/features/layoutSlice";
import ParticlesBackground from "../../components/ParticlesBackground";
import { logo } from "../../asset/images";
import { endPoints } from "../../routers";
import userSlice from "../../redux/features/userSlice";

const { Header, Sider, Content } = Layout;

function DefaultLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token_user_login");
    dispatch(userSlice.actions.clickedLogoutAdmin([]));
    navigate(`${endPoints.login}`);
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={280}
        className="sidebar"
      >
        {!collapsed && (
          <img
            style={{
              margin: "12px",
              width: "220px",
              // height: "120px",
              objectFit: "cover",
            }}
            // src="https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/logo.svg"
            src={logo.logo}
            alt="logo"
          />
        )}
        <Menu
          mode="inline"
          defaultSelectedKeys={[constants.layoutDashboard]}
          items={[
            {
              key: constants.layoutDashboard,
              icon: <TableOutlined />,
              label: "Bảng điều khiển",
            },
            {
              key: "listAccount",
              icon: <OrderedListOutlined />,
              label: "Quản lý tài khoản Bác sĩ",
              children: [
                {
                  label: "Tài khoản đợi duyệt",
                  key: constants.layoutListAccount,
                },
                {
                  label: "Tài khoản bị chặn",
                  key: constants.layoutAccountDeleted,
                },
              ],
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
                {
                  label: "Chỉ số đường huyết",
                  key: constants.layoutMetricTypeGlycemic,
                },
                {
                  label: "Chỉ số huyết áp",
                  key: constants.layoutMetricTypeBloodPressure,
                },
              ],
            },
          ]}
          // Change layout
          onSelect={(item) => {
            if (item.key === constants.layoutDashboard) {
              dispatch(layoutSlice.actions.btnClickMenuChangeLayout(item.key));
            } else if (item.key === constants.layoutListAccount) {
              dispatch(layoutSlice.actions.btnClickMenuChangeLayout(item.key));
            } else if (item.key === constants.layoutShiftsDoctor) {
              dispatch(layoutSlice.actions.btnClickMenuChangeLayout(item.key));
            } else if (item.key === constants.layoutDaysDoctor) {
              dispatch(layoutSlice.actions.btnClickMenuChangeLayout(item.key));
            } else if (item.key === constants.layoutMetricTypeMBI) {
              dispatch(layoutSlice.actions.btnClickMenuChangeLayout(item.key));
            } else if (item.key === constants.layoutMetricTypeGlycemic) {
              // dispatch(dispatch(fetchApiAllMetric()));
              dispatch(layoutSlice.actions.btnClickMenuChangeLayout(item.key));
            } else if (item.key === constants.layoutMetricTypeBloodPressure) {
              // dispatch(dispatch(fetchApiAllMetric()));
              dispatch(layoutSlice.actions.btnClickMenuChangeLayout(item.key));
            } else if (item.key === constants.layoutAccountDeleted) {
              dispatch(layoutSlice.actions.btnClickMenuChangeLayout(item.key));
            }
          }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0 }}>
          <div className="admin-header-logout">
            <Button className="btn-logout" onClick={handleLogout}>
              Đăng xuất
            </Button>
          </div>

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
