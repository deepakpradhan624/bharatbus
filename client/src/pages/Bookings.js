import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../helpers/axiosInstance";
import { Modal, Table, message } from "antd";
import PageTitle from "../components/PageTitle";
import moment from "moment";
import { useReactToPrint } from "react-to-print";

const Bookings = () => {
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try {
      const response = await axiosInstance.post(
        "/api/bookings/get-bookings-by-user-id",
        {}
      );
      if (response.data.success) {
        const mappedData = response.data.data.map((booking) => {
          return {
            ...booking,
            ...booking.bus,
            key: booking._id,
          };
        });
        setBookings(mappedData);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Bus Name",
      dataIndex: "name",
      key: "bus",
    },
    {
      title: "Bus Number",
      dataIndex: "number",
      key: "bus",
    },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
    },
    {
      title: "Journey Time",
      dataIndex: "departure",
    },
    {
      title: "Seats",
      dataIndex: "seats",
      render: (seats) => seats.join(", "),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          <p
            className="text-md underline"
            onClick={() => {
              setSelectedBooking(record);
              setShowPrintModal(true);
            }}
          >
            Print Ticket
          </p>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getBookings();
  }, []);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
      <PageTitle title="Bus Bookings" />

      <div className="mt-2">
        <Table dataSource={bookings} columns={columns} />
      </div>

      {showPrintModal && (
        <Modal
          title="Print Ticket"
          onCancel={() => {
            setShowPrintModal(false);
            setSelectedBooking(null);
          }}
          visible={showPrintModal}
          okText="Print"
          onOk={handlePrint}
        >
          <div className="d-flex flex-column p-5" ref={componentRef}>
            <p className="text-lg">Bus: {selectedBooking.name}</p>
            <p className="text-md">
              {selectedBooking.from} - {selectedBooking.to}
            </p>
            <hr />
            <p className="text-sm">
              Journey Date:
              {moment(selectedBooking.journeyDate).format("DD-MM-YYYY")}
            </p>
            <p className="text-sm">Departure:{selectedBooking.departure}</p>
            <hr />
            <p className="text-sm">
              Seat Number:{selectedBooking.seats.join(", ")}
            </p>{" "}
            <br />
            <hr />
            <p>
              Total Amount: ₹
              {selectedBooking.fare * selectedBooking.seats.length} /-
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Bookings;
