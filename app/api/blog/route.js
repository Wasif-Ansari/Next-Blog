// 4 create API

import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
// import axios from "axios";
// import { response } from "express";
import cloudinary from "@/lib/config/cloudinary";


// will use blogmodel and db to store data in database  

const { NextResponse } = require("next/server")
// import { writeFile } from "fs/promises";

const LoadDB = async () =>{
    await connectDB()
    console.log("✅ Connected to MongoDB");
}

LoadDB();


// API endpoint for fetching all blogs

export async function GET(request) {
    console.log("🟢 API HIT");
    // Impportant get id from url
    const blogId = request.nextUrl.searchParams.get("id");

    if(blogId){
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json(blog);
    }
    const blogs = await BlogModel.find({});
    return NextResponse.json({blogs});
    
}


// API Endpoint for uploading blogs

export async function POST(request) {
    console.log("🟢 API HIT");
    const formData = await request.formData(); 
    //user formdata stored in variable
    console.log("📩 FormData received");
    const timestamp = Date.now();

    const image = formData.get("image");
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    //cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "blogs" }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      })
      .end(buffer);
  });

    // const path = `./public/${timestamp}_${image.name}`;
    // await writeFile(path, buffer);
    // const imgUrl = `/${timestamp}_${image.name}`;

    const blogData = {
        title: `${formData.get('title')}`,
        description: `${formData.get('description')}`,
        category: `${formData.get('category')}`,
        author: `${formData.get('author')}`,
        authorImg: `${formData.get('authorImg')}`,
        //saving cloudinary image url
        image: `${uploadResult.secure_url}`,

    }

    // after extracting from form to blogData variable now store it in database
    await BlogModel.create(blogData);
    console.log("Blog saved")

    return NextResponse.json({success:true, msg: "Blog Added"});
}