import { Appbar } from "./Appbar"
import {type Blog} from "../hooks"
import { Avatar } from "./BlogCard"

export const FullBlog=({blog}: {blog: Blog})=>{

    return <div>
            <Appbar/>  
            <div className="flex justify-center">  
            <div className="grid grid-cols-12 w-full px-10 max-w-screen-2xl pt-12">
                
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-600 pt-2">
                        Posted on 4th july
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-slate-600 text-lg ">
                        Author
                    </div>
                    <div className="flex">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size="big" name={blog.author.name}/>
                        </div>
                        <div >
                            <div className="text-xl font-bold">
                                {blog.author.name || "anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                authore details are displayed here like his works and etc
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni voluptates repellat id,
                                amet magnam dolor rem accusamus ducimus nobis eligendi qui tempora iure impedit,
                                commodi, minus fugit doloremque deleniti facere?
                            </div>
                        </div>
                    </div>
                    
                </div>
                </div>
            </div>
        </div>
}