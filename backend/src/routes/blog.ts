import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono"
import { verify } from "hono/jwt";
import {createBlogInput , updateBlogInput} from "@mayankbisht12/medium-common"

export const blogRouter = new Hono<{
  Bindings:{
    DATABASE_URL: string
    JWT_SECRET: string
  },
  Variables:{
    userId: string;
  }
}>();

blogRouter.use("/*" , async (c , next)=>{
  const header = c.req.header("Authorization") || "";
  const token = header.split(" ")[1];
  //@ts-ignore
  const response = await verify(
  token,
  c.env.JWT_SECRET,
  "HS256"
) as {
    id: string
}
  //@ts-ignore
  console.log(response);
  if(response){
    c.set("userId" , response.id);
    await next();
  }
  else{
    c.status(403);
    return c.json({
      error: "unauthorized"
    })
  }

})

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);
        if(!success){
            c.status(411);
            return c.json({
                message: "Inputs not correct"
            })
        }
        const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const authorId = c.get("userId");
        
        const blog = await prisma.post.create({
            data:{
                title: body.title,
                content: body.content,
                authorId: authorId
            }
        })
        return c.json({
            id: blog.id
        })
    }catch(e){
        c.status(403)
        return c.text("invalid")
    }
})
blogRouter.put('/' , async (c)=>{
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);
        if(!success){
            c.status(411);
            return c.json({
                message: "Inputs not correct"
            })
        }
        const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const blog = await prisma.post.update({
        where:{
            id: body.id
        },
        data:{
            title: body.title,
            content: body.content,
        }
    })
    return c.json({
        id: blog.id
    })
})

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs = await prisma.post.findMany({
        select:{
            content:true,
            title: true,
            id: true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });
    return c.json(
        blogs
    )

})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id")
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
            const blog = await prisma.post.findFirst({
                where:{
                    id: id
                },
                select:{
                    title: true,
                    content: true,
                    id: true,
                    author:{
                        select:{
                            name:true
                        }
                    }
                }
            })
            return c.json({
                blog
            })
    }
    catch(e){
        c.status(411);
        return c.json({
            message: "error while fetching blog post"
        })
    }
   
})
