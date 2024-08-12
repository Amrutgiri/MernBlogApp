import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup} from 'react-icons/hi';
import {Button, Table} from 'flowbite-react';
import {Link} from 'react-router-dom';
export default function DashboardComp() {
    const [users,setUsers]=useState([]);
    const [comments, setComments]=useState([]);
    const [posts, setPosts]=useState([]);
    const [totalUsers, setTotalUsers]=useState(0);
    const [totalPosts, setTotalPosts]=useState(0);
    const [totalComments, setTotalComments]=useState(0);
    const [lastMonthUsers, setLastMonthUsers]=useState(0);
    const [lastMonthPosts, setLastMonthPosts]=useState(0);
    const [lastMonthComments, setLastMonthComments]=useState(0);
    const {currentUser} = useSelector(state => state.user)

    useEffect(() =>{
        const fetchUsers = async () => {
            try {
                const res = await fetch(`/api/user/getusers?=limit=5`)
                const data = await res.json();
                if(res.ok){
                    setUsers(data.users);
                    setTotalUsers(data.totalUsers);
                    setLastMonthUsers(data.lastMonthUsers);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/post/getposts?=limit=5`)
                const data = await res.json();
                if(res.ok){
                    setPosts(data.posts);
                    setTotalPosts(data.totalPosts);
                    setLastMonthPosts(data.lastMonthPosts);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        const fetchComments = async () => {
            try {
                const res = await fetch(`/api/comment/getcomments?=limit=5`)
                const data = await res.json();
                if(res.ok)
                {
                    setComments(data.comments);
                    setTotalComments(data.totalComments);
                    setLastMonthComments(data.lastMonthComments);
                }
                
            } catch (error) {
                console.log(error.message);
            }
        }
        if(currentUser.isAdmin){
            fetchUsers();
            fetchPosts();
            fetchComments();
        }
    },[currentUser])

  return (
    <div className='p-3 md:mx-auto'>
      <div className='flex flex-wrap justify-center gap-4'>
            <div className='flex flex-col w-full gap-4 p-3 rounded-md shadow-md dark:bg-slate-600 md:w-72'>
                    <div className='flex justify-between'>
                        <div className=''>
                            <h3 className='text-gray-500 uppercase text-md'>Total Users</h3>
                            <p className='text-2xl'>{totalUsers}</p>
                        </div>
                            <HiOutlineUserGroup className='p-2 text-5xl text-white bg-teal-500 rounded-full shadow-lg'/>
                    </div>
                        <div className='flex gap-2 text-sm'>
                            <span className='flex items-center text-green-500'>
                                <HiArrowNarrowUp/>
                                {lastMonthUsers}
                            </span>
                            <div className='text-gray-500'>Last Month</div>
                        </div>
            </div>

            <div className='flex flex-col w-full gap-4 p-3 rounded-md shadow-md dark:bg-slate-600 md:w-72'>
                <div className='flex justify-between'>
                    <div className=''>
                        <h3 className='text-gray-500 uppercase text-md'>Total Comments</h3>
                        <p className='text-2xl'>{totalComments}</p>
                    </div>
                        <HiAnnotation className='p-2 text-5xl text-white bg-indigo-500 rounded-full shadow-lg'/>
                </div>
                    <div className='flex gap-2 text-sm'>
                        <span className='flex items-center text-green-500'>
                            <HiArrowNarrowUp/>
                            {lastMonthComments}
                        </span>
                        <div className='text-gray-500'>Last Month</div>
                    </div>
            </div>

            <div className='flex flex-col w-full gap-4 p-3 rounded-md shadow-md dark:bg-slate-600 md:w-72'>
                <div className='flex justify-between'>
                    <div className=''>
                        <h3 className='text-gray-500 uppercase text-md'>Total Posts</h3>
                        <p className='text-2xl'>{totalPosts}</p>
                    </div>
                        <HiDocumentText className='p-2 text-5xl text-white rounded-full shadow-lg bg-lime-500'/>
                </div>
                    <div className='flex gap-2 text-sm'>
                        <span className='flex items-center text-green-500'>
                            <HiArrowNarrowUp/>
                            {lastMonthPosts}
                        </span>
                        <div className='text-gray-500'>Last Month</div>
                    </div>
            </div>
      </div>
      <div className='flex flex-wrap justify-center gap-4 py-3 mx-auto'>
            <div className='flex flex-col w-full p-2 rounded-md shadow-md md:w-auto dark:bg-slate-600'>
                <div className='flex justify-between p-3 text-sm font-semibold'>
                    <h1 className='p-2 text-center'>Recent Users</h1>
                    <Button outline gradientDuoTone={'purpleToPink'}>
                        <Link to={'/dashboard?tab=users'}>
                        See All
                        </Link>
                    </Button>
                </div>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>User Image</Table.HeadCell>
                        <Table.HeadCell>Username</Table.HeadCell>
                    </Table.Head>
                    {users.map((user) => (
                        <Table.Body key={user._id} className=''>
                            <Table.Cell>
                                <img src={user.profilePicture} alt="user" className='w-10 h-10 bg-gray-500 rounded-full' />
                            </Table.Cell>
                            <Table.Cell>
                                {user.username}
                            </Table.Cell>
                        </Table.Body>  
                    ))
                    }
                </Table>
            </div>

            <div className='flex flex-col w-full p-2 rounded-md shadow-md md:w-auto dark:bg-slate-600'>
                <div className='flex justify-between p-3 text-sm font-semibold'>
                    <h1 className='p-2 text-center'>Recent Comments</h1>
                    <Button outline gradientDuoTone={'purpleToPink'}>
                        <Link to={'/dashboard?tab=comments'}>
                        See All
                        </Link>
                    </Button>
                </div>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Comment Content</Table.HeadCell>
                        <Table.HeadCell>Likes</Table.HeadCell>
                    </Table.Head>
                    {comments.map((comment) => (
                        <Table.Body key={comment._id} className=''>
                            <Table.Cell className='w-96'>
                                <p className='line-clamp-2'>{comment.content}</p>
                            </Table.Cell>
                            <Table.Cell>
                                {comment.numberOfLikes}
                            </Table.Cell>
                        </Table.Body>  
                    ))
                    }
                </Table>
            </div>

            <div className='flex flex-col w-full p-2 rounded-md shadow-md md:w-auto dark:bg-slate-600'>
                <div className='flex justify-between p-3 text-sm font-semibold'>
                    <h1 className='p-2 text-center'>Recent Posts</h1>
                    <Button outline gradientDuoTone={'purpleToPink'}>
                        <Link to={'/dashboard?tab=posts'}>
                        See All
                        </Link>
                    </Button>
                </div>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Post Image</Table.HeadCell>
                        <Table.HeadCell>Post Title</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>
                    </Table.Head>
                    {posts.map((post) => (
                        <Table.Body key={post._id} className=''>
                            <Table.Cell>
                                <img src={post.image} alt="post" className='h-10 bg-gray-500 rounded-md w-14' />
                            </Table.Cell>
                            <Table.Cell className='w-96'>
                                {post.title}
                            </Table.Cell>
                            <Table.Cell className='w-5'>
                                {post.category}
                            </Table.Cell>
                        </Table.Body>  
                    ))
                    }
                </Table>
            </div>
      </div>
    </div>
  )
}
