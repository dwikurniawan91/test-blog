import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { motion } from "framer-motion";
import {
	Card,
	CardContent,
} from "~/components/ui/card";
import {
	Navbar,
	NavbarBrand,
	NavbarActions,
	NavbarTitle,
} from "~/components/ui/navbar";
import { useBlogStore } from "~/store/blogStore";
import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Blog" },
		{ name: "description", content: "All blog posts" },
	];
}

export default function BlogIndex() {
	const [isHydrated, setIsHydrated] = useState(false);

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	const posts = useBlogStore(state => state.posts);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const cardVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
			},
		},
	};

	// Show loading state during hydration
	if (!isHydrated) {
		return (
			<>
				<Navbar variant="colored">
					<NavbarBrand>
						<NavbarTitle>Blog Wizard</NavbarTitle>
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
					<NavbarTitle>Blog Wizard</NavbarTitle>
				</NavbarBrand>
				<NavbarActions>
					<Link to="/blog/create-post">
						<Button>Create New Post</Button>
					</Link>
				</NavbarActions>
			</Navbar>
			<div className="grid gap-4 py-8 px-4 overflow-scroll">
				{posts.length === 0 ? (
					<div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg">
						<h2 className="text-xl font-medium text-gray-700">No posts yet!</h2>
						<p className="text-gray-500 mt-2">
							Click "Create New Post" to get started.
						</p>
					</div>
				) : (
					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
					>
						{posts.map(post => (
							<motion.div
								key={post.id}
								variants={cardVariants}
								layoutId={`card-${post.id}`}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<Link to={`/blog/${post.id}`}>
									<Card className="overflow-hidden h-full hover:shadow-lg transition-shadow cursor-pointer">
										<motion.div layoutId={`image-${post.id}`}>
											<img
												src={post.imageUrl || "/placeholder.svg"}
												alt={post.title}
												className="w-full h-48 object-cover"
											/>
										</motion.div>
										<CardContent className="p-6">
											<motion.div layoutId={`category-${post.id}`}>
												<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-200 text-blue-600 mb-3">
													{post.category}
												</span>
											</motion.div>
											<motion.h3
												layoutId={`title-${post.id}`}
												className="text-xl font-semibold mb-2 text-balance"
											>
												{post.title}
											</motion.h3>
											<motion.p
												layoutId={`description-${post.id}`}
												className="text-muted-foreground text-sm text-pretty"
											>
												{post.summary}
											</motion.p>
											<motion.div
												layoutId={`meta-${post.id}`}
												className="flex items-center gap-2 mt-4 text-xs text-muted-foreground"
											>
												<span>{post.author}</span>
												<span>•</span>
												<span>{post.createdAt}</span>
											</motion.div>
										</CardContent>
									</Card>
								</Link>
							</motion.div>
						))}
					</motion.div>
				)}
			</div>
		</>
	);
}
