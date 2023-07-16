import { Col, Row } from "antd";
import React from "react";
import "../resourses/bus.css";

const SeatSelection = ({ selectedSeats, setSelectedSeats, bus }) => {
  const capacity = bus.capacity;

  const selectOrUnselectedSeats = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  }
    return (
      <div>
        <div className="bus-container">
          <Row gutter={[10, 10]}>
            {Array.from(Array(capacity).keys()).map((seat) => {
             let seatClass=""
             if(selectedSeats.includes(seat+1)){
              seatClass="selected-seat"
             }else if(bus.seatsBooked.includes(seat+1)){
              seatClass="booked-seat"
             }
             return (
                <Col span={6}>
                  <div
                    className={`seat ${seatClass}`}
                    onClick={() => selectOrUnselectedSeats(seat + 1)}
                  >
                    {seat + 1}
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    );
  
};

export default SeatSelection;
