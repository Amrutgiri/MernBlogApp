import { Link } from "react-router-dom"

export default function PostCard({post}) {
  return (
    <div className="group relative w-full border border-teal-500 hover:border-2 h-[375px] overflow-hidden rounded-lg sm:w-[368px] transition-all">
        <Link to={`/post/${post.slug}`}>
            <img src={post.image} alt="post cover" className="h-[200px] w-full object-cover transition-all duration-500" />
        </Link>
        <div className="flex flex-col gap-2 p-3">
            <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
            <span className="text-sm italic">{post.category}</span>
            <Link to={`/post/${post.slug}`} className="z-10 group-hover:bottom-0 absolute bottom-[-300px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2">Read more</Link>
            
        </div>
    </div>
  )
}
