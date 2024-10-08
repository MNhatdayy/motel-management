import "./headercomponent.scss";
import { useState, useEffect } from "react";
import { Button, Input, Dropdown } from "antd";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { logout, parseToken } from "../../service/authController";
// const { Search } = Input;

// const onSearch = (value, _e, info) => console.log(info?.source, value);

const HeaderComponent = () => {
  const [isLoggedIn, setLogin] = useState(false);
  const [userName, setUsername] = useState("");
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();
  //   const onClick = (e) => {
  //     setCurrent(e.key);
  //   };

  const logOut = () => {
    logout();
    setLogin(false);
    setUsername("");
    return navigate("/");
  };

  useEffect(() => {
    const tokenInfo = parseToken();
    if (tokenInfo !== null) {
      setLogin(true);
      setUsername(tokenInfo.name);
    }
  }, [current]);

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <i class="fa-solid fa-dollar-sign menuicon"></i>
        <Link to="/recharge">Nạp tiền</Link>
      </Menu.Item>
      <hr />
      <Menu.Item key="2">
        <i class="fa-solid fa-circle-plus menuicon"></i>
        <Link to="/post">Đăng tin</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <i class="fa-solid fa-rectangle-list menuicon"></i>
        <Link to="/post-management">Quản lý tin đăng</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <i class="fa-solid fa-clock-rotate-left menuicon"></i>
        <Link to="/recharge-history">Lịch sử nạp tiền</Link>
      </Menu.Item>
      <Menu.Item key="5">
        <i class="fa-solid fa-user menuicon"></i>
        <Link to="/account-info">Thông tin tài khoản</Link>
      </Menu.Item>
      <hr />
      <Menu.Item key="6" danger onClick={logOut}>
        <i class="fa-solid fa-arrow-right-from-bracket menuicon"></i>Thoát
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="header--wrapper">
      <div className="header">
        <div className="header--logo">
          <i className="fa fa-cloud" aria-hidden="true"></i>
          <span>RentalStore</span>
        </div>
        <div className="header--actions">
          <div className="header--auth">
            {isLoggedIn ? (
              <>
                <div className="user--wrapper">
                  <p className="username">
                    Hi, <span>{userName}</span>
                  </p>

                  <Dropdown overlay={menu}>
                    <Button type="primary logout" shape="round">
                      Quản lý tài khoản <i class="fa-solid fa-angle-down"></i>
                    </Button>
                  </Dropdown>
                </div>
              </>
            ) : (
              <div className="auth-buttons">
                <Link to={"/auth/login"}>
                  <Button type="primary" className="login" shape="round">
                    Đăng nhập
                  </Button>
                </Link>
                <Link to={"/auth/register"}>
                  <Button type="primary" className="register" shape="round">
                    Đăng ký
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
