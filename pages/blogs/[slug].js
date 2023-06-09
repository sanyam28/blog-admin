import React from 'react';
import Blog from '../../models/Blog';
import connectDb from "../../middleware/mongoose";
import Head from 'next/head';

const BlogS = ({ blog }) => {

  return (
    <div>
      <Head>
        <title>{blog.title} - Sanyam Bucha</title>
      </Head>
      <div className="blog-view-container">
        <h1 style={{color:"blue"}}>{blog.title}</h1>
        <div dangerouslySetInnerHTML={{__html: blog.body}} className='blog-content'></div>
      </div>
      </div>
  )
}

export default BlogS

export async function getServerSideProps(context) {
  await connectDb();

  let blogres = await Blog.findOne({ slug: context.query.slug });
  let blog = JSON.parse(JSON.stringify(blogres))

  if (!blog) {
    return {
      notFound: true,
    }
  }

  return {
    props: { blog }
  }
}