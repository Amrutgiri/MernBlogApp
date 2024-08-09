import React, { useEffect, useState } from 'react'
import moment from 'moment';
import {FaThumbsUp} from 'react-icons/fa';
import { useSelector } from 'react-redux';
export default function Comment({comment, onLike}) {
    const [user,setUser]=useState({});
   const {currentUser} = useSelector((state) => state.user);
    useEffect(() => {
        const getUser = async () => {
            try {
                const res =await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                
                if(res.ok){
                    setUser(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        getUser();
    },[comment])

  return (
    <div className='flex p-4 text-sm border-b dark:border-gray-700'>
        <div className='flex-shrink-0 mr-3'>
            <img className='w-10 h-10 bg-gray-200 rounded-full' src={user.profilePicture} alt="" />
        </div>
        <div className="flex-1">
            <div className='flex items-center mb-1'>
                <span className='mr-1 text-xs font-bold truncate'>{user ? `@${user.username}`:'anonymous user'}</span>
                <span className='text-xs text-gray-500'>
                    {moment(comment.createdAt).fromNow()}
                </span>
            </div>
            <p className='pb-2 text-gray-600'>{comment.content}</p>
            <div className='flex items-center gap-2 pt-2 text-xs border-t dark:border-gray-700 max-w-fit'>
                <button  
                type='button' 
                onClick={() => onLike(comment._id)} 
                className={`text-gray-400 hover:text-blue-500 
                    ${
                        currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500' 
                    }`
                }>
                    <FaThumbsUp className='mr-1 text-sm' />
                    {/* <span className='text-xs'>{comment.likes}</span> */}
                </button>
                <p className='ml-2 text-gray-400'>{
                    comment.numberOfLikes > 0 && comment.numberOfLikes + " "+(comment.numberOfLikes > 1 ? 'likes' : 'like')
                }</p>
            </div>
        </div>
    </div>
  )
}
