import "./homePage.scss";
import { Button, Layout, Modal } from "antd";
import Slider from "react-slick";
import { useEffect } from "react";
// import { loadProducts } from "../../services/HomeController";
import { useState } from "react";
const { Sider, Content } = Layout;
import { Link } from "react-router-dom";
const siderStyle = {
  backgroundColor: "white",
};

const layoutStyle = {
  borderRadius: 8,
  width: "100%",
  backgroundColor: "white",
};

const contentStyle = {
  minHeight: 100,
  color: "#fff",
  backgroundColor: "white",
};

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const HomePage = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  useEffect(() => {
    checkPaymentSuccess();
  }, []);
  const checkPaymentSuccess = async () => {
    const params = new URLSearchParams(window.location.search); // Get query parameters
    const vnp_ResponseCode = params.get("vnp_ResponseCode");

    if (vnp_ResponseCode === "00") {
      // If VNPay response code indicates success
      setPaymentSuccess(true); // Set payment success state to true
      // Optional: Redirect to home or a success page after handling payment
      // history.push("/success"); // Example redirect to /success route
    }
  };
  const handleModalCancel = () => {
    setPaymentSuccess(false); // Close the modal
    window.location.href = "http://localhost:5173/"; // Redirect to home page
  };
  return (
    <div>
      <Layout>
        <Layout style={layoutStyle}>
          <Sider width="100%" style={siderStyle}>
            <Slider {...settings}>
              <div className="img-slide">
                <img
                  width="100%"
                  src="https://www.nhatot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2FzIh0fMVwm4s_oXUjr3qxqkS_yBU5Bkm9DGuLB71FDdk%2Fpreset%3Araw%2Fplain%2F783e1bdb38f0a3d310cfbc68714b37aa-2899704715189481874.jpg&w=1920&q=75"
                  alt=""
                />
              </div>
              <div className="img-slide">
                <img
                  width="100%"
                  src="https://www.nhatot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2FF1Iy8pIV295wRSonsdRDkQyFRY2Thcip3egSSilkyBg%2Fpreset%3Araw%2Fplain%2F9b8dc9ce0f6367d20b2b06856688d446-2820459848732268726.jpg&w=1920&q=75"
                  alt=""
                />
              </div>
              <div className="img-slide">
                  <img
                    width="100%"
                    src="https://www.nhatot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fadmincentre%2F18EhfuL3oykcfvfCt4A3LRAiZmJNTblWozOlozjKnk0%2Fpreset%3Araw%2Fplain%2F675ac78099c6e75e66bdad87ab9d872e-2900882918942164427.jpg&w=1920&q=75"
                    alt=""
                />
              </div>
            </Slider>
          </Sider>
        </Layout>
        <Content style={contentStyle}>
          <div className="container">
            <div className="service--wrapper">
              <div className="service--card">
                <div className="service--img">
                <i className="fa-solid fa-credit-card"></i>
                </div>
                <div className="service--info">
                  <h4 className="service--title">Mua bán</h4>
                  <p className="service--description">
                    <b>153.678</b>
                    <span>tin đăng mua bán</span>
                  </p>
                </div>
              </div>
              <div className="service--card">
                <div className="service--img">
                <i className="fa-solid fa-credit-card"></i>
                </div>
                <div className="service--info">
                  <h4 className="service--title">Cho thuê</h4>
                  <p className="service--description">
                    <b>122.618</b>
                    <span>tin đăng cho thuê</span>
                    </p>
                </div>
              </div>
              <div className="service--card">
                <div className="service--img">
                <i class="fa-solid fa-building-user"></i>
                </div>
                <div className="service--info">
                  <h4 className="service--title">Dự án</h4>
                  <p className="service--description">
                    <b>3.998</b>
                    <span>dự án</span>
                    </p>
                </div>
              </div>
              <div className="service--card">
                <div className="service--img">
                <i class="fa-solid fa-user-tie"></i>
                </div>
                <div className="service--info">
                  <h4 className="service--title">Môi giới</h4>
                  <p className="service--description">
                    <b>324</b>
                    <span>chuyên trang</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="gb--wrapper">
              <div className="title flip-animation">
                <span>I</span>
                <span>N</span>
                <span>S</span>
                <span>T</span>
                <span>O</span>
                <span>C</span>
                <span>K</span>
              </div>
              <div className="actions">
                <Link to={"/shop/product/all"}>
                  <Button shape="round" type="primary">
                    View more details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
      <Modal
        title="Thanh toán thành công"
        open={paymentSuccess}
        onCancel={handleModalCancel}
        onOk={handleModalCancel}
      >
        <p>Đơn hàng của bạn đã được tiếp nhận.</p>
        {/* Add additional content or actions here */}
      </Modal>
    </div>
  );
};

export default HomePage;
