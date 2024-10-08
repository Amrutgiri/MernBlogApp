import  { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {Button, Modal, Table, TableBody} from 'flowbite-react'
import {Link} from 'react-router-dom'
import { HiOutlineExclamationCircle } from "react-icons/hi";
export default function DashPosts() {
  const {currentUser} = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete,setPostIdToDelete]=useState(null);
 
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        
        if(res.ok){
          setUserPosts(data.posts);
          if(data.posts.length <9){
            setShowMore(false);
          }
        } 
      } catch (error) {
        console.log(error.message);
      }
    }
    if(currentUser.isAdmin){
      fetchPosts();
    }
  },[currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok){
        setUserPosts((prev)=>[...prev, ...data.posts]);
        if(data.posts.length <9){
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeletePost = async()=>{
    setShowModal(false);
    try {
      const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,{
        method: 'DELETE',
      });
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      }else {
        setUserPosts((prev)=>prev.filter((post)=>post._id !== postIdToDelete));
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className='p-3 overflow-x-scroll table-auto md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userPosts.length>0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>
               Date Updated
              </Table.HeadCell>
              <Table.HeadCell>
                Post Image
              </Table.HeadCell>
              <Table.HeadCell>
                Post Title
              </Table.HeadCell>
              <Table.HeadCell>
               Category
              </Table.HeadCell>
              <Table.HeadCell>
                Delete
              </Table.HeadCell>
              <Table.HeadCell>
               <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body className='divide-y' key={post._id}>
                <Table.Row className='bg-white dark:bg-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img src={post.image} alt={post.title} className='object-cover w-20 h-20' />
                    </Link>
                  </Table.Cell>
                 
                  <Table.Cell>
                    <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>{post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                  <span className='text-lg font-semibold'>{post.category}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span onClick={()=>{
                      setShowModal(true);
                      setPostIdToDelete(post._id);
                    }} className='font-medium text-red-500 cursor-pointer hover:underline'>Delete</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className='text-teal-500 hover:underline' to={`/update-post/${post._id}`}>
                    <span>Edit</span>
                    </Link>
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
        <p>No Post Available</p>
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
              Are you sure you want to delete this post ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
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
