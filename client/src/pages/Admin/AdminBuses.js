import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import BusForm from "../../components/BusForm";
import { Table, message } from "antd";
import { axiosInstance } from "../../helpers/axiosInstance";


const AdminBuses = () => {
  const [showBusForm, setShowBusForm] = useState(false);
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus]=useState(null)

  const getBuses = async () => {
    try {
      const response = await axiosInstance.post("/api/buses/get-all-buses", {});
      if (response.data.success) {
        setBuses(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };


  const deleteBus = async (id) => {
    try {
      const response = await axiosInstance.post("/api/buses/delete-bus", {
        _id:id
      });
      if (response.data.success) {
        message.success(response.data.message)
        getBuses()
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Number",
      dataIndex: "number",
    },
    {
      title: "From",
      dataIndex: "from",
    },
    {
      title: "To",
      dataIndex: "to",
    },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => (
        <div className="d-flex gap-3">
          <i class="ri-delete-bin-7-line" onClick={()=>{
            deleteBus(record._id)
          }}></i>
          <i class="ri-edit-line" onClick={()=>{
            setSelectedBus(record)
            setShowBusForm(true);
          }}></i>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getBuses();
  }, []);
  return (
    <div>
      <div className="d-flex justify-content-between">
        <PageTitle title="Buses" />
        <button className="primary-btn" onClick={() => setShowBusForm(true)}>
          Add Bus
        </button>
      </div>

      <Table columns={columns} dataSource={buses} />

      {showBusForm && (
        <BusForm
          showBusForm={showBusForm}
          setShowBusForm={setShowBusForm}
          type={selectedBus ? "edit" : "add"}
          selectedBus={selectedBus}
          setSelectedBus={setSelectedBus}
          getData={getBuses}
        />
      )}
    </div>
  );
};

export default AdminBuses;
