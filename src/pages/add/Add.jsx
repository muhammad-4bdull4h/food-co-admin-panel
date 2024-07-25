import React, { useState } from "react";
import "./add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

function Add({ url }) {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setData((prev) => ({ ...prev, [name]: val }));
  };

  const onSubmitHandler = async (e) => {
    const URL = url;
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const response = await axios.post(`${URL}/api/food/add`, formData);

    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(
        response.data.message || "there is an error in server. Try Again!"
      );
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            type="text"
            name="name"
            value={data.name}
            placeholder="type here"
          />
        </div>
        <div className="description flex-col">
          <p>Add product Description</p>
          <textarea
            value={data.description}
            onChange={onChangeHandler}
            name="description"
            rows="6"
            placeholder="Add description"
          ></textarea>
        </div>
        <div className="category-price">
          <div className="category flex-col">
            <p>Product category</p>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
            >
              <option value={"Salad"}>Salad </option>
              <option value={"Rolls"}>Rolls </option>
              <option value={"Veg"}>Veg </option>
              <option value={"Pasta"}>Pasta </option>
              <option value={"Cake"}>Cake </option>
              <option value={"dessert"}>dessert </option>
              <option value={"Sandwich"}>Sandwich </option>
              <option value={"Noodles"}>Noodles </option>
            </select>
          </div>
          <div className="price flex-col">
            <p>Price</p>
            <input
              value={data.price}
              onChange={onChangeHandler}
              type="number"
              name="price"
              placeholder="type here"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
}

export default Add;
