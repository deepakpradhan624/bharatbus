import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetUser } from "../redux/usersSlice";
import DefaultLayout from "./DefaultLayout";
// import { HideLoading, ShowLoading } from "../redux/alertsSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const validateToken = async () => {
    try {
      // dispatch(ShowLoading())
      const response = await axios.post(
        "/api/users/get-user-by-id",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        // dispatch(HideLoading())
        setLoading(false);
        dispatch(SetUser(response.data.data));
      } else {
        // dispatch(HideLoading())
        setLoading(false);
        localStorage.removeItem("token");
        message.error(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      // dispatch(HideLoading())
      setLoading(false);
      localStorage.removeItem("token");
      message.error(error.message);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  });
  return (
    <div>
      {!loading &&<DefaultLayout>{children}</DefaultLayout>}
    </div>
  );
};

export default ProtectedRoute;
