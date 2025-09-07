import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import  { Button } from "~/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "~/components/ui/card";
import { Navbar, NavbarBrand, NavbarActions, NavbarTitle } from "~/components/ui/navbar";
import { useBlogStore } from "~/store/blogStore";
import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Blog" },
    { name: "description", content: "All blog posts" },
  ];
}

export default function BlogIndex() {
  const navigate = useNavigate();
  const [isHydrated, setIsHydrated] = useState(false);
  
  useEffect(() => {
    // Let Zustand handle rehydration automatically
    setIsHydrated(true);
  }, []);

  const posts = useBlogStore((state) => state.posts);

  const handlePostClick = (postId: string) => {
    navigate(`/blog/${postId}`);
  };

  const handleCreatePost = () => {
    navigate('/blog/create-post');
  };



  // Show loading state during hydration
  if (!isHydrated) {
    return (
      <>
        <Navbar variant="colored">
          <NavbarBrand>
            <NavbarTitle>Wizard Blog</NavbarTitle>
          </NavbarBrand>
          <NavbarActions>
            <Button disabled>Create New Post</Button>
          </NavbarActions>
        </Navbar>
        <div className="grid gap-4 py-8 px-4">
          <div className="text-center py-16">
            <p className="text-gray-500">Loading...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar variant="colored">
        <NavbarBrand>
          <NavbarTitle>Wizard Blog</NavbarTitle>
        </NavbarBrand>
        <NavbarActions>
          <Button onClick={handleCreatePost}>Create New Post</Button>
        </NavbarActions>
      </Navbar>
      <div className="grid gap-4 py-8 px-4 overflow-scroll">
      {posts.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
          <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300">
            No posts yet!
          </h2>
          <p className="text-gray-500 mt-2">
            Click "Create New Post" to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handlePostClick(post.id)}
            >
              <CardHeader>
                <h3 className="text-lg font-semibold line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mt-2 space-x-4">
                  <span>{post.author}</span>
                  <span className="text-gray-300 dark:text-gray-600">|</span>
                  <span>{post.createdAt}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                  {post.summary}
                </p>
              </CardContent>
              <CardFooter>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  {post.category}
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
    </>
  );
}
