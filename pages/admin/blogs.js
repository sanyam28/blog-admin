import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dbConnect from '../../middleware/mongoose';
import Blog from "../../models/Blog";
import Link from 'next/link';
import Head from 'next/head';

const DBlogs = ({ blogs, totalblogs }) => {
  const router = useRouter()

  useEffect(() => {
    const checkuser = JSON.parse(localStorage.getItem('token'))
    if (!checkuser) {
      router.push('/admin/login')
    }
  }, [])
  return (
    <div className='admin-container'>
      <Head>
        <title>Blogs-Admin</title>
      </Head>
      <section>
        <div className="container">
          <h1 className='blog-heading'>Projects <span>({totalblogs})</span></h1>
          <div className="blogs">
            {blogs.map((blog) => (
              <div className="blog" key={blog._id}>
                <div className="img"><img src={blog.image} alt="" />
                </div>
                <div className="vblog-content">
                  <div className="content">
                    <div className="info">
                      <h1 className="space">{blog.title}</h1>
                      <p className="space">{blog.description}</p>
                    </div>
                    <div>
                      <Link href={`/blogs/${blog.slug}`}><button className="btn blog-btn">View Blog</button></Link>
                      <Link href={`/admin/blog/edit/${blog.slug}`}><button className="btn blog-btn">Edit Blog</button></Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>
    </div>
  )
}

export default DBlogs

export async function getServerSideProps() {
  await dbConnect();
  let blogs = (await Blog.find().sort("-createdAt"));
  let totalblogs = blogs.length;

  return {
    props: { blogs: JSON.parse(JSON.stringify(blogs)), totalblogs }
  }
}