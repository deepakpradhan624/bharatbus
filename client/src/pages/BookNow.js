import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import { Col, Row, message } from "antd";
import { useParams } from "react-router-dom";
import SeatSelection from "../components/SeatSelection";
import StripeCheckout from "react-stripe-checkout";

const BookNow = () => {
  const params = useParams();
  const [bus, setBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const getBus = async () => {
    try {
      const response = await axiosInstance.post("/api/buses/book-now/:id", {
        _id: params.id,
      });
      if (response.data.success) {
        setBus(response.data.data);
        console.log(bus);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const bookNow = async (transactionId) => {
    try {
      const response = await axiosInstance.post("/api/bookings/book-seat", {
        bus: bus._id,
        seats: selectedSeats,
        transactionId, 

      });
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const onToken = async (token) => {
    try {
      const response = await axiosInstance.post("/api/bookings/make-payment", {
        token,
        amount: selectedSeats.length * bus.fare * 100,
      });
      if (response.data.success) {
        message.success(response.data.message);
        bookNow(response.data.data.transactionId)
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    getBus();
  }, []);
  return (
    <div>
      {bus && (
        <Row className="md-3" gutter={[30,30]}>
          <Col lg={12} xs={24} sm={24}>
            <h1 className="text-primary">{bus.name}</h1>
            <p className="text-md">
              {bus.from} - {bus.to}
            </p>
            <hr />
            <div className="flex flex-col gap-1">
              <p>
                <b>Journey Date</b>: {bus.journeyDate}
              </p>
              <p>
                <b>Departure Time</b>: {bus.departure}
              </p>
              <p>
                <b>Arrival Time</b>: {bus.arrival}
              </p>
              <p>
                <b>Bus Capacity</b>: {bus.capacity}
              </p>
              <p>
                <b>Seats Left</b>: {bus.capacity - bus.seatsBooked.length}
              </p>
              <p>
                <b>Fare</b>:₹ {bus.fare}/-
              </p>
            </div>
            <hr />
            <div className="flex flex-col gap-1">
              <h2 className="text-lg">
                <b>Selected Seats:</b>
                {selectedSeats.join(", ")}
              </h2>
              <h1 className="text-lg mt-2">
                <b>Fare:</b> ₹ {bus.fare * selectedSeats.length}/-
              </h1>
              <hr />

              <StripeCheckout
                billingAddress
                token={onToken}
                amount={bus.fare * selectedSeats.length * 100}
                currency="INR"
                payment_method= 'pm_card_visa'
                stripeKey="pk_test_51NUgubSJLLofikp9W4YRlUAxVrfWNJBORF5lFPZE6cWDq76sbmSY5YkMuRi1AUOFZ1GV6lv7PkyXzbzxTC5FnenB00BbsDF8yM"
              >
                <button
                  className={`btn secondary-btn ${
                    selectedSeats.length === 0 && "disabled-btn"
                  }`}
                  disabled={selectedSeats.length === 0}
                >
                  Book Now
                </button>
              </StripeCheckout>
            </div>
          </Col>
          <Col lg={12} xs={24} sm={24}>
            <SeatSelection
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              bus={bus}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default BookNow;
