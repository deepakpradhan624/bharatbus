import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import { Col, Row, message } from "antd";
import Bus from "../components/Bus";

const Home = () => {
  const { user } = useSelector((state) => state.users);
  const [buses, setBuses] = useState([]);

  const getBuses = async () => {
    try {
      const response = await axiosInstance.post("/api/buses/get-all-buses", {});
      if (response.data.success) {
        setBuses(response.data.data);
        console.log(buses)
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    getBuses();
  }, []);
  return (
    <div>
      <div></div>
      <div>
        <Row>
          {buses.map((bus) => {
            return <Col lg={12} xs={24} sm={24}>
              <Bus bus={bus}/>
            </Col>;
          })}
        </Row>
      </div>
    </div>
  );
};

export default Home;
