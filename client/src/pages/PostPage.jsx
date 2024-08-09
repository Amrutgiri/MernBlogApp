import { Button, Spinner } from "flowbite-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import CallToAction from "../components/CallToAction"

export default function PostPage() {

    const {postSlug} = useParams()
    const [loading, setLoading] = useState(true)
    const [error,setError] = useState(false)
    const [post, setPost] = useState(null)
    useEffect(() => {
        const fetchPost = async()=>{
            try {
                setLoading(true)
                const response = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await response.json();
                if(!response.ok){
                    setError(true);
                    setLoading(false);
                    return;
                }
                if(response.ok){
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        
        fetchPost();
    },[postSlug]);

    if(loading) return(
        <div className="flex items-center justify-center min-h-screen">
            <Spinner size={'xl'}/>
        </div>
    );

  return (
    <main className="flex flex-col max-w-6xl min-h-screen p-3 mx-auto">
        
        <h1 className="max-w-2xl p-3 mx-auto mt-10 font-serif text-3xl text-center lg:text-4xl">{post && post.title}</h1>

        <Link to={`/search?category=${post && post.category}`} className="self-center mt-5">
            <Button color={'gray'} pill size={'xs'}>{post && post.category}</Button>
        </Link>

        <img src={post && post.image} className="mt-10 p-3 max-h-[600px] w-full object-cover" alt={post && post.image} />

        <div className="flex justify-between w-full max-w-2xl p-3 mx-auto text-xs border-b border-slate-500">
            <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="italic">{post && (post.content.length/1000).toFixed(0)} min read</span>
        </div>

        <div className="w-full max-w-2xl p-3 mx-auto post-content" dangerouslySetInnerHTML={{__html: post && post.content}}></div>

        <div className="w-full max-w-4xl mx-auto">
            <CallToAction/>
        </div>
    </main>
  )
}
