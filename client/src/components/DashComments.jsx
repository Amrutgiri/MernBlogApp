import  { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {Button, Modal, Table, TableBody} from 'flowbite-react'
import {Link} from 'react-router-dom'
import { HiOutlineExclamationCircle, } from "react-icons/hi";
import {FaCheckCircle, FaTimesCircle} from 'react-icons/fa'
export default function DashComments() {
  const {currentUser} = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete,setCommentIdToDelete]=useState('');
 
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        
        if(res.ok){
          setComments(data.comments);
          if(data.comments.length <9){
            setShowMore(false);
          }
        } 
      } catch (error) {
        console.log(error.message);
      }
    }
    if(currentUser.isAdmin){
        fetchComments();
    }
  },[currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok){
        setComments((prev)=>[...prev, ...data.comments]);
        if(data.comments.length <9){
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteComment = async()=>{
    setShowModal(false);
    try {
      const res = await fetch(`/api/comment/deletecomment/${commentIdToDelete}`,{
        method: 'DELETE',
      });
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      }else {
        setComments((prev)=>prev.filter((comment)=>comment._id !== commentIdToDelete));
        setShowModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className='p-3 overflow-x-scroll table-auto md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && comments.length>0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Comment Content</Table.HeadCell>
              <Table.HeadCell>Number of Likes</Table.HeadCell>
              <Table.HeadCell>Post ID</Table.HeadCell>
              <Table.HeadCell>User ID</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {comments.map((comment) => (
              <Table.Body className='divide-y' key={comment._id}>
                <Table.Row className='bg-white dark:bg-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{new Date(comment.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                     {comment.content}
                  </Table.Cell>
                 
                  <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  <Table.Cell><span className='text-lg font-semibold'>{comment.postId}</span></Table.Cell>
                  <Table.Cell><span className='text-lg font-semibold'>{comment.userId}</span></Table.Cell>
                  <Table.Cell>
                    <span onClick={()=>{
                      setShowModal(true);
                      setCommentIdToDelete(comment._id);
                    }} className='font-medium text-red-500 cursor-pointer hover:underline'>Delete</span>
                  </Table.Cell>
                  
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {
            showMore && (
              <button className='self-center w-full mt-4 text-sm text-teal-500 hover:underline py-7' onClick={handleShowMore}>Show More</button>
            )
          }
        </>
      ):(
        <p>No Comments Available</p>
      )}
       <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size={"md"}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-400" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteComment}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No,Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
