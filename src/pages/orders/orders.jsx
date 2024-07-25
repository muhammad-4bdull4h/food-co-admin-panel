import React, { useEffect, useState } from "react";
import "./order.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

function Orders({ url }) {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const res = await axios.get(`${url}/api/order/list`);
    if (res.data.success) {
      setOrders(res.data.data);
    } else {
      toast.error("error");
    }
  };

  useEffect(() => {
    (async () => {
      await fetchAllOrders();
    })();
  }, []);

  const statusHandler = async (e, orderId) => {
    const res = await axios.post(url + "/api/order/status", {
      orderId,
      status: e.target.value,
    });
    if (res.data.success) {
      await fetchAllOrders();
    }
  };

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, idx) => (
          <div key={idx} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, idx) => {
                  if (idx === order.items.length - 1) {
                    return item.name + "x" + item.quantity;
                  } else {
                    return item.name + "x" + item.quantity + ",";
                  }
                })}
              </p>
              <p className="order-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city + ","}
                  {order.address.state + ","}
                  {order.address.state + ","}
                  {order.address.state + ","}
                  {order.address.country + ","}
                  {order.address.zipCode + ","}
                </p>
              </div>
              <div className="order-phone">{order.address.phone}</div>
            </div>
            <p>items : {order.items.length}</p>
            <p>${order.amount}</p>
            <select
              value={order.status}
              onChange={(e) => statusHandler(e, order._id)}
            >
              <option value="Food Procssing">Food Procssing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
