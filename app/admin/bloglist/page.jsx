"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { toast } from 'react-toastify';

const Bloglist = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // blog object
  const [editData, setEditData] = useState({ title:'', category:'', author:'', description:'', imageUrl:'' });
  const [submitting, setSubmitting] = useState(false);

  const loadBlogs = async () => {
    try {
      const res = await axios.get('/api/blog');
      setBlogs(res.data.blogs || []);
    } catch (err) {
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{ loadBlogs(); },[]);

  const startEdit = (blog) => {
    setEditing(blog._id);
    setEditData({
      title: blog.title,
      category: blog.category,
      author: blog.author,
      description: blog.description,
      imageUrl: ''
    });
  };

  const cancelEdit = ()=>{ setEditing(null); setEditData({ title:'', category:'', author:'', description:'', imageUrl:'' }); };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev=>({...prev,[name]:value}));
  };

  const submitEdit = async (id) => {
    setSubmitting(true);
    const formData = new FormData();
    formData.append('title', editData.title);
    formData.append('category', editData.category);
    formData.append('author', editData.author);
    formData.append('description', editData.description);
    if(editData.imageUrl.trim()) formData.append('imageUrl', editData.imageUrl.trim());
    try {
      const res = await axios.put(`/api/blog?id=${id}`, formData);
      if(res.data.success){
        toast.success('Updated');
        cancelEdit();
        loadBlogs();
      } else {
        toast.error(res.data.msg || 'Update failed');
      }
    } catch(err){
      toast.error('Update failed');
    } finally { setSubmitting(false);}    
  };

  const deleteBlog = async (id) => {
    if(!confirm('Delete this blog?')) return;
    try {
      const res = await axios.delete(`/api/blog?id=${id}`);
      if(res.data.success){
        toast.success('Deleted');
        setBlogs(prev=>prev.filter(b=>b._id!==id));
      } else { toast.error(res.data.msg || 'Delete failed'); }
    } catch(err){
      toast.error('Delete failed');
    }
  };

  return (
    <div className="flex-1 ml-80 mr-10 mt-10 mb-10">
      <div className="bg-gray-900/60 backdrop-blur rounded-xl border border-fuchsia-600/40 shadow-lg p-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-fuchsia-400 to-pink-500 bg-clip-text text-transparent mb-6 flex items-center gap-3">All Blogs <span className="text-xs font-normal text-gray-400">({blogs.length})</span></h1>
        {loading && <div className="text-gray-400 animate-pulse">Loading blogs...</div>}
        {!loading && blogs.length===0 && <div className="text-gray-400">No blogs found.</div>}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {blogs.map(blog=>{
            const isEditing = editing === blog._id;
            return (
              <div key={blog._id} className="group relative bg-gray-800/50 border border-gray-700 rounded-xl p-4 flex flex-col gap-3 hover:border-fuchsia-500/60 transition shadow">
                <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-gray-900/40">
                  {blog.image && (
                    <Image src={blog.image} alt={blog.title} fill className="object-cover group-hover:scale-105 transition duration-500" />
                  )}
                </div>
                {!isEditing && (
                  <>
                    <h2 className="font-semibold text-lg line-clamp-2 text-white">{blog.title}</h2>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded-full bg-fuchsia-600/30 border border-fuchsia-500/40 text-fuchsia-300">{blog.category}</span>
                      <span className="px-2 py-0.5 rounded-full bg-purple-600/30 border border-purple-500/40 text-purple-300">{blog.author}</span>
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-3">{blog.description}</p>
                    <div className="mt-auto flex gap-2 pt-2">
                      <button onClick={()=>startEdit(blog)} className="flex-1 text-xs px-3 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-fuchsia-600 text-white font-medium hover:opacity-90 transition">Edit</button>
                      <button onClick={()=>deleteBlog(blog._id)} className="text-xs px-3 py-2 rounded-md bg-red-600/80 hover:bg-red-600 text-white font-medium transition">Delete</button>
                    </div>
                  </>
                )}
                {isEditing && (
                  <div className="space-y-2 animate-in fade-in">
                    <input name="title" value={editData.title} onChange={handleEditChange} className="w-full text-sm p-2 rounded bg-gray-900 border border-gray-700 focus:border-fuchsia-500 outline-none" />
                    <div className="flex gap-2">
                      <input name="category" value={editData.category} onChange={handleEditChange} className="w-1/2 text-sm p-2 rounded bg-gray-900 border border-gray-700 focus:border-fuchsia-500 outline-none" />
                      <input name="author" value={editData.author} onChange={handleEditChange} className="w-1/2 text-sm p-2 rounded bg-gray-900 border border-gray-700 focus:border-fuchsia-500 outline-none" />
                    </div>
                    <textarea name="description" rows={4} value={editData.description} onChange={handleEditChange} className="w-full text-xs p-2 rounded bg-gray-900 border border-gray-700 focus:border-fuchsia-500 outline-none" />
                    <input name="imageUrl" placeholder="Optional new image URL" value={editData.imageUrl} onChange={handleEditChange} className="w-full text-xs p-2 rounded bg-gray-900 border border-gray-700 focus:border-fuchsia-500 outline-none" />
                    <div className="flex gap-2 pt-1">
                      <button disabled={submitting} onClick={()=>submitEdit(blog._id)} className="flex-1 text-xs px-3 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium transition">{submitting? 'Saving...' : 'Save'}</button>
                      <button disabled={submitting} onClick={cancelEdit} className="text-xs px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-200 transition">Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Bloglist;