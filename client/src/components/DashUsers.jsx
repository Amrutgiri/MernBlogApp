import  { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {Button, Modal, Table, TableBody} from 'flowbite-react'
import {Link} from 'react-router-dom'
import { HiOutlineExclamationCircle, } from "react-icons/hi";
import {FaCheckCircle, FaTimesCircle} from 'react-icons/fa'
export default function DashUsers() {
  const {currentUser} = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete,setUserIdToDelete]=useState(null);
 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        
        if(res.ok){
          setUsers(data.users);
          if(data.users.length <9){
            setShowMore(false);
          }
        } 
      } catch (error) {
        console.log(error.message);
      }
    }
    if(currentUser.isAdmin){
        fetchUsers();
    }
  },[currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok){
        setUsers((prev)=>[...prev, ...data.users]);
        if(data.users.length <9){
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteUser = async()=>{
    setShowModal(false);
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`,{
        method: 'DELETE',
      });
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      }else {
        setUsers((prev)=>prev.filter((user)=>user._id !== userIdToDelete));
        setShowModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className='p-3 overflow-x-scroll table-auto md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && users.length>0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Is Admin ?</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <Table.Body className='divide-y' key={user._id}>
                <Table.Row className='bg-white dark:bg-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                      <img src={user.profilePicture} alt={user.username} className='object-cover w-10 h-10 rounded-full' />
                  </Table.Cell>
                 
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell><span className='text-lg font-semibold'>{user.email}</span></Table.Cell>
                  <Table.Cell><span className='text-lg font-semibold'>{user.isAdmin ? (<FaCheckCircle className='text-green-500' />) : (<FaTimesCircle className='text-red-500' />)}</span></Table.Cell>
                  <Table.Cell>
                    <span onClick={()=>{
                      setShowModal(true);
                      setUserIdToDelete(user._id);
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
        <p>No User Available</p>
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
              Are you sure you want to delete this user ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
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
