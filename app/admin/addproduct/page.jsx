"use client";
import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "startup",
    author: "Wasif Ansari",
  });

  const onchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
    console.log(data);
  };

  const onsubmitHandler = async (e) => {
    // from data
    e.preventDefault(); //preventing reload after add button click
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("image", image);

    // using axios to post formdata to api

    const response = axios.post("/api/blog", formData);
    if ((await response).data.success) {
      toast.success((await response).data.msg);
      setImage(false);
      setData({
        title: "",
        description: "",
        category: "startup",
        author: "Wasif Ansari",
      });
    } else {
      toast.error("Error!");
    }
  };

  return (
    <>
      <form onSubmit={onsubmitHandler} className="p-5 ml-84" action="">
        <p className="text-xl text-red-500">Upload Thumbnail</p>
        <label className="p-3">
          <Image
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            width={140}
            height={70}
            alt=""
          />
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
            id="image"
            hidden
            required
          />
        </label>

        <p className="text-2xl mt-4 font-bold">Blog Title</p>
        <input
          name="title"
          onChange={onchangeHandler}
          value={data.title}
          className="text-white border mt-3 w-1/3 p-2 border-red-400"
          type="text"
          placeholder="Enter Title "
        />

        <p className="text-2xl mt-4 pt-2 font-bold">Blog Description</p>
        <textarea
          name="description"
          onChange={onchangeHandler}
          value={data.description}
          className="text-white border mt-3 w-1/3 p-2 border-red-400"
          type="text"
          placeholder="Enter Description "
        />

        <p className="text-2xl mt-4 pt-2 font-bold">Blog Category</p>
        <select
          onChange={onchangeHandler}
          value={data.category}
          className="text-white bg-black w-1/3 p-1.5 border border-red-400 mt-4"
          name="category"
        >
          <option value="startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button
          className="mt-8 hover:cursor-pointer p-2 font-extrabold  w-1/6 text-center text-black bg-white "
          type="submit"
        >
          ADD
        </button>
      </form>
    </>
  );
};

export default page;
