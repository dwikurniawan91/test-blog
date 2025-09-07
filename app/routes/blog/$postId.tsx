import { Button } from "~/components/ui/button";
import type { Route } from "./+types/$postId";
import { Link, useNavigate, useParams } from "react-router";
import { useBlogStore } from "~/store/blogStore";
import { motion, type Transition } from "framer-motion";
import { ArrowLeft, Heart, Share2, Bookmark } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";

const pageVariants = {
	initial: { opacity: 0, y: 20 },
	in: { opacity: 1, y: 0 },
	out: { opacity: 0, y: -20 },
};

const pageTransition = {
	type: "tween",
	ease: "anticipate",
	duration: 0.5,
};
export function meta({ params }: Route.MetaArgs) {
	return [
		{ title: `Blog Post ${params.postId}` },
		{ name: "description", content: `Read blog post ${params.postId}` },
	];
}

export default function BlogPost() {
	const { postId } = useParams();
	const navigate = useNavigate();
	const post = useBlogStore(state =>
		state.posts.find(post => post.id === postId)
	);

	if (!post) {
		return (
			<div className="text-center py-16">
				<h2 className="text-2xl font-bold">Post Not Found</h2>
				<p className="text-gray-500 mt-4">
					Sorry, we couldn't find the post you're looking for.
				</p>
			</div>
		);
	}
	return (
		<>
			<motion.div
				initial="initial"
				animate="in"
				exit="out"
				variants={pageVariants}
				transition={pageTransition as Transition}
				className="min-h-screen bg-background"
			>
				<div className="max-w-4xl mx-auto p-6">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.2 }}
						className="mb-6"
					>
						<Link to="/">
							<Button variant="ghost" className="gap-2">
								<ArrowLeft className="h-4 w-4" />
								Back to Posts
							</Button>
						</Link>
					</motion.div>

					<motion.div layoutId={`card-${post.id}`}>
						<Card className="overflow-hidden">
							<motion.div layoutId={`image-${post.id}`} className="relative">
								<img
									src={post.imageUrl}
									alt={post.title}
									className="w-full h-64 md:h-80 object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
							</motion.div>

							<CardContent className="p-6 md:p-8">
								<div className="mb-6">
									<motion.div layoutId={`category-${post.id}`} className="mb-3">
										<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-200 text-blue-600">
											{post.category}
										</span>
									</motion.div>
									<motion.h1
										layoutId={`title-${post.id}`}
										className="text-3xl md:text-4xl font-bold mb-4 text-balance"
									>
										{post.title}
									</motion.h1>
									<motion.p
										layoutId={`description-${post.id}`}
										className="text-lg text-muted-foreground mb-6 text-pretty"
									>
										{post.summary}
									</motion.p>
								</div>

								<motion.div
									layoutId={`meta-${post.id}`}
									className="flex items-center gap-4 mb-6 pb-6 border-b"
								>
									<div className="flex items-center gap-2">
										<div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
											<span className="text-sm font-medium text-primary">
												{post.author
													.split(" ")
													.map(n => n[0])
													.join("")}
											</span>
										</div>
										<div>
											<p className="font-medium">{post.author}</p>
											<p className="text-sm text-muted-foreground">
												{post.createdAt}
											</p>
										</div>
									</div>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.3 }}
									className="prose prose-neutral dark:prose-invert max-w-none mb-8"
								>
									<p className="text-pretty leading-relaxed">{post.content}</p>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.4 }}
									className="flex items-center gap-2 pt-6 border-t"
								>
									<Button variant="outline" size="sm">
										<Heart className="h-4 w-4 mr-2" />
										Like
									</Button>
									<Button variant="outline" size="sm">
										<Share2 className="h-4 w-4 mr-2" />
										Share
									</Button>
									<Button variant="outline" size="sm">
										<Bookmark className="h-4 w-4 mr-2" />
										Save
									</Button>
								</motion.div>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</motion.div>
		</>
	);
}
