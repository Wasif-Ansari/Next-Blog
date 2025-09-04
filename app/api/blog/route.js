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

    const imageUrl = formData.get("imageUrl"); // optional alternative
    const image = formData.get("image"); // file
    let uploadResult;

    try {
        if (imageUrl) {
            // Remote URL upload via Cloudinary
            uploadResult = await cloudinary.uploader.upload(imageUrl, { folder: "blogs" });
        } else if (image) {
            // File upload path
            const imageByteData = await image.arrayBuffer();
            const buffer = Buffer.from(imageByteData);
            uploadResult = await new Promise((resolve, reject) => {
                cloudinary.uploader
                  .upload_stream({ folder: "blogs" }, (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                  })
                  .end(buffer);
              });
        } else {
            return NextResponse.json({ success:false, msg:"No image or URL provided"}, { status:400 });
        }
    } catch (err) {
        console.error("Image upload failed", err);
        return NextResponse.json({ success:false, msg:"Image upload failed"}, { status:500 });
    }

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
    try {
        await BlogModel.create(blogData);
        console.log("Blog saved")
        return NextResponse.json({success:true, msg: "Blog Added"});
    } catch (err) {
        console.error("DB save failed", err);
        return NextResponse.json({success:false, msg:"Database save failed"}, { status:500 });
    }
}

// API Endpoint to update a blog
export async function PUT(request) {
    const blogId = request.nextUrl.searchParams.get("id");
    if(!blogId){
        return NextResponse.json({success:false,msg:"Blog id required"},{status:400});
    }
    let existing;
    try {
        existing = await BlogModel.findById(blogId);
        if(!existing){
            return NextResponse.json({success:false,msg:"Blog not found"},{status:404});
        }
    } catch(err){
        return NextResponse.json({success:false,msg:"Invalid blog id"},{status:400});
    }

    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const category = formData.get('category');
    const author = formData.get('author');
    const imageUrl = formData.get('imageUrl');
    const imageFile = formData.get('image');

    let uploadResult = null;
    try {
        if(imageUrl){
            uploadResult = await cloudinary.uploader.upload(imageUrl, { folder: "blogs" });
        } else if(imageFile && typeof imageFile === 'object'){
            const imageByteData = await imageFile.arrayBuffer();
            const buffer = Buffer.from(imageByteData);
            uploadResult = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ folder: "blogs" }, (error, result) => {
                    if(error) return reject(error);
                    resolve(result);
                }).end(buffer);
            });
        }
    } catch(err){
        console.error("Update image upload failed", err);
        return NextResponse.json({success:false,msg:"Image upload failed"},{status:500});
    }

    // Build update payload only with provided fields
    const updatePayload = {};
    if(title !== null) updatePayload.title = title;
    if(description !== null) updatePayload.description = description;
    if(category !== null) updatePayload.category = category;
    if(author !== null) updatePayload.author = author;
    if(uploadResult) updatePayload.image = uploadResult.secure_url;

    try {
        const updated = await BlogModel.findByIdAndUpdate(blogId, updatePayload, {new:true});
        return NextResponse.json({success:true,msg:"Blog Updated", blog: updated});
    } catch(err){
        console.error("DB update failed", err);
        return NextResponse.json({success:false,msg:"Database update failed"},{status:500});
    }
}

// API Endpoint to delete a blog
export async function DELETE(request){
    const blogId = request.nextUrl.searchParams.get("id");
    if(!blogId){
        return NextResponse.json({success:false,msg:"Blog id required"},{status:400});
    }
    try {
        const deleted = await BlogModel.findByIdAndDelete(blogId);
        if(!deleted){
            return NextResponse.json({success:false,msg:"Blog not found"},{status:404});
        }
        return NextResponse.json({success:true,msg:"Blog Deleted"});
    } catch(err){
        console.error("Delete failed", err);
        return NextResponse.json({success:false,msg:"Delete failed"},{status:500});
    }
}