import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import { Col, Row, message } from "antd";
import Bus from "../components/Bus";
import axios from "axios";

const Home = () => {
  const { user } = useSelector((state) => state.users);
  const [filters = {}, setFilters] = useState({});
  const [buses, setBuses] = useState([]);

  const getBuses = async () => {
 
    try {
      const response = await axios.post("/api/buses/get-all-buses", 
      {},
      {
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`,
        }
      }
      );
      if (response.data.success) {
        setBuses(response.data.data);
        console.log(buses);
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
      <div>
        {/* <Row gutter={10}>
          <Col lg={6} sm={24}>
            <input
              type="text"
              placeholder="From"
              value={filters.from}
              onChange={(e) => setFilters({ ...filters, from: e.target.value })}
            />
          </Col>
          <Col lg={6} sm={24}>
            <input
              type="text"
              placeholder="To"
              value={filters.to}
              onChange={(e) => setFilters({ ...filters, to: e.target.value })}
            />
          </Col>
          <Col lg={6} sm={24}>
            <input
              type="date"
              placeholder="Date"
              value={filters.journeyDate}
              onChange={(e) =>
                setFilters({ ...filters, journeyDate: e.target.value })
              }
            />
          </Col>

          <Col lg={6} sm={24}>
            <button className="primary-btn" onClick={() => getBuses()}>
              Filter
            </button>
          </Col>
        </Row> */}
      </div>
      <div>
        {/* <Row>
          {buses.filter((bus) => bus.status !== "Yet To Start").map((bus) => (
             <Col lg={12} xs={24} sm={24}>
              <Bus bus={bus}/>
            </Col>
          ))}
        </Row> */}
        <Row gutter={[15, 15]}>
          {buses.map((bus) => (
            <Col lg={12} xs={24} sm={24} key={bus.id}>
              <Bus bus={bus} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;
