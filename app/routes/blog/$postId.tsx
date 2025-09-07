import  { Button } from "~/components/ui/button";
import  { Navbar, NavbarBrand, NavbarTitle, NavbarActions } from "~/components/ui/navbar";
import type { Route } from "./+types/$postId";
import { useNavigate, useParams } from "react-router";
import { useBlogStore } from "~/store/blogStore";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Blog Post ${params.postId}` },
    { name: "description", content: `Read blog post ${params.postId}` },
  ];
}

export default function BlogPost() {
  const { postId } = useParams();
  const navigate = useNavigate()
  const post  = useBlogStore((state) => state.posts.find((post) => post.id === postId))
  const handleCreatePost = () => {
    navigate('/blog/create-post');
  };
  const handleBack = () => {
    navigate('/');
  };
  const handleEdit = () => {
    navigate('/blog/create-post');
  };
  if (!post) {
    return (
        <div className="text-center py-16">
            <h2 className="text-2xl font-bold">Post Not Found</h2>
            <p className="text-gray-500 mt-4">Sorry, we couldn't find the post you're looking for.</p>
            <Button onClick={handleBack} className="mt-6">
               Back to All Posts
            </Button>
        </div>
    );
}
  return (
    <>
      <Navbar variant="colored">
        <NavbarBrand>
        <Button variant="outline" onClick={handleBack}>Back To All Posts</Button>
        </NavbarBrand>
        <NavbarActions>
          <Button onClick={handleCreatePost}>Create New Post</Button>
        </NavbarActions>
      </Navbar>

      <div className="container mx-auto px-4 py-8">
        <article className="prose max-w-none">
              <div className="mb-8 border-b border-gray-200 py-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{post.category}</span>
                  <h1 className="text-4xl font-extrabold tracking-tight mt-2">{post.title}</h1>
                  <p className="text-lg text-gray-500">By {post.author} on {post.createdAt}</p>
              </div>
             
              <div className="whitespace-pre-wrap">
                  {post.content}
              </div>
          </article>
      </div>
    </>
  );
}
