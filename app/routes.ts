import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/blog/index.tsx"),
	route("blog/:postId", "routes/blog/$postId.tsx"),
	route("blog/create-post", "routes/blog/create-post.tsx"),
] satisfies RouteConfig;
