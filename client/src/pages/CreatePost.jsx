import React, { useState } from "react";
import { app } from "../firebase";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getStorage,ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from "react-router-dom";
export default function CreatePost() {

  const [file, setFile]=useState(null);
  const [imageUploadProgress,setImageUploadProgress]=useState(null);
  const [imageUploadError,setImageUploadError]=useState(null);
  const [formData, setFormData] = useState({});
  const [publishedError,setPublishedError]=useState(null);
  
  const navigate = useNavigate();
  const handleUploadImage = async()=>{
    try {
      if(!file){
        setImageUploadError("Please select a file");
        return;
      }
      setImageUploadError(null);
      const storage =getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          console.log(error);
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({...formData, image:downloadURL});
          });
        }
      )
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(!res.ok){
        setPublishedError(data.message);
        return;
      }
      // if(data.success == false){
      //   setPublishedError(data.message);
      //   return;
      // }
      if(res.ok){
        setPublishedError(null);
        navigate(`/post/${data.slug}`);
      }
        
      
    } catch (error) {
      setPublishedError(null);
      
    }
  }

  return (
    <div className="max-w-3xl min-h-screen p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Create A Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e)=>setFormData({...formData, title:e.target.value})}
          />
          <Select 
            onChange={(e)=>setFormData({...formData, category:e.target.value})}
          >
            <option value="unCategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="php">PHP</option>
            <option value="nodejs">Node JS</option>
            <option value="reactjs">React JS</option>
            <option value="mongodb">MongoDB</option>
          </Select>
        </div>
        <div className="flex items-center justify-between gap-4 p-3 border-4 border-teal-500 border-dotted">
          <FileInput type="file" accept="image/*" onChange={(e)=>setFile(e.target.files[0])}/>
          <Button
            type="button"
            gradientDuoTone={"purpleToBlue"}
            size={"sm"}
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? 
            (<div className="w-16 h-16">
                <CircularProgressbar  value={imageUploadProgress} text={`${imageUploadProgress || 0}%`}/>
            </div>)
            :(' Upload Image'
            )}
           
          </Button>
        </div>
        {
          imageUploadError && <Alert color={'failure'}>
            {imageUploadError}
          </Alert>
        }
        {
          formData.image && <img src={formData.image} alt="" className="object-cover w-full h-48 rounded-md" />
        }
        <ReactQuill theme="snow" placeholder="Write someting....." className="mb-12 h-72" required  onChange={(value)=>setFormData({...formData, content:value})}/>
        <Button type="submit" gradientDuoTone={"purpleToPink"}>
          Publish
        </Button>
        {
          publishedError && <Alert className="mt-5" color={'failure'}>
            {publishedError}
          </Alert>
        
        }
      </form>
    </div>
  );
}
