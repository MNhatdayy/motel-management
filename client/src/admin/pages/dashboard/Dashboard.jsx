import { Card, Statistic, Button } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";

const Dashboard = () => {
  const onClick = function () {};

  return (
    <>
      <h1>Dashboard</h1>
      <Card bordered={false}>
        <Statistic
          title="Active"
          value={11.28}
          precision={2}
          valueStyle={{
            color: "#3f8600",
          }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
      </Card>

      <Button text="Click" onClick={onClick}>
        Click
      </Button>
    </>
  );
};

export default Dashboard;
