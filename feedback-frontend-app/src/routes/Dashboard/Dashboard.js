import React from "react";
import { Card, Spin, message } from "antd";
import api from "../../utils/Api";

const Dashboard = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [count, setCount] = React.useState(0);

  React.useEffect(async () => {
    setIsLoading(true);
    try {
      const data = await api.request("feedback");
      const count = data._embedded.feedbackList.length;
      setCount(count);
    } catch (e) {
      message.error(e.toString());
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <Spin tip="Loading..." spinning={isLoading} delay={500}>
        <Card title="VOLUME" style={{ width: 300 }}>
          <h2>{count}</h2>
        </Card>
      </Spin>
    </div>
  );
};

export default Dashboard;
