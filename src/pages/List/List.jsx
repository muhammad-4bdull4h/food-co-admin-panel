import React, { useEffect, useState } from "react";
import "./list.css";
import axios from "axios";
import { toast } from "react-toastify";

function List({url}) {
  const URL = url;
  const [list, setList] = useState([]);
  const fetchList = async () => {
    const res = await axios.get(`${URL}/api/food/list`);
    if (res.data.success) {
      return setList(res.data.data);
    } else {
      return toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList().then(console.log(list));
  }, []);

  const remove = async (id) => {
    if (id) {
      let res = await axios.delete(`${URL}/api/food/remove/${id}`);
      if (res.data.success) {
        await fetchList();
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    }
  };

  return (
    <div className="list add flex-col">
      <div className="list-table">
        <div className="table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b>Category</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div className="table-format" key={index}>
              <img src={`${URL}/images/${item.image}`} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={() => remove(item._id)} className="cursor">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List;
