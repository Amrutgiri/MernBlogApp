import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import CallToAction from '../components/CallToAction'
import PostCard from '../components/PostCard'
export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getposts');
      const data = await res.json();  
      setPosts(data.posts);
    }
    fetchPosts();
  },[])

  return (
    <div>
      <div className='flex flex-col max-w-6xl gap-6 px-3 mx-auto p-28'>
          <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my blog</h1>
          <p className='text-xs text-gray-500 sm:text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate fuga vitae, minima amet esse enim a iste facilis sapiente asperiores animi nesciunt blanditiis illum similique cum harum, sint magnam distinctio!</p>
      <Link to={'/search'} className='text-xs font-bold text-teal-500 sm:text-sm hover:underline'>View All Posts
      </Link>
      </div>

      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>

      <div className='flex flex-col max-w-6xl gap-8 p-3 mx-auto py-7'>
        {
          posts && posts.length > 0 && (
            <div className='flex flex-col gap-6'>
              <h2 className='mb-8 text-2xl font-semibold text-center'>Recent Post</h2>
              <div className='flex flex-wrap gap-3'>
                {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))
                }
              </div>
              <Link to={'/search'} className='text-lg text-center text-teal-500 hover:underline '>
              View All Post
              </Link>
            </div>
          )
        }
      </div>

    </div>
  )
}
