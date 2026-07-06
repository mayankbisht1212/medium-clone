import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = ()=>{
    const { loading, blogs } = useBlogs();
    console.log('Blogs page:', { loading, blogs });
    if(loading){
        return <div> 
            <Appbar/>
            <div className="flex justify-center">
                <div>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                </div>
            </div>
        </div>
    }
    if(!loading && blogs.length === 0){
        return (
            <div>
                <Appbar />
                <div className="flex justify-center">
                    <div className="max-w-xl text-center text-slate-500 mt-8">No blogs yet. Try creating one or sign in with a user that has posts.</div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <Appbar/>
            <div className="flex justify-center">
                
                <div className="max-w-xl">
                    {blogs.map(blog => (
                        <BlogCard
                            id={JSON.stringify(blog.id)}
                            authorName={blog.author.name}
                            title={blog.title}
                            content={blog.content}
                            publishDate={"3rd july 2026"}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
