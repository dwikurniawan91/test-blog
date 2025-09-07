import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface BlogPost {
	id: string;
	title: string;
	content: string;
	createdAt: string;
	author: string;
	category: string;
	summary: string;
	isPublished: boolean;
	imageUrl: string;
}

interface BlogState {
	posts: BlogPost[];
	currentStep: number;
	formData: Omit<BlogPost, "id" | "createdAt">;
	setField: (field: keyof BlogState["formData"], value: string) => void;
	nextStep: () => void;
	prevStep: () => void;
	goToStep: (step: number) => void;
	addPost: () => void;
	resetForm: () => void;
}

export const useBlogStore = create<BlogState>()(
	persist(
		(set, get) => ({
			posts: [],
			currentStep: 1,
			formData: {
				title: "",
				content: "",
				author: "",
				category: "",
				summary: "",
				isPublished: false,
				imageUrl: "",
			},
			setField: (field, value) => {
				set({ formData: { ...get().formData, [field]: value } });
			},
			nextStep: () => {
				set(state => ({ currentStep: Math.min(state.currentStep + 1, 4) }));
			},
			prevStep: () => {
				set(state => ({ currentStep: Math.max(state.currentStep - 1, 1) }));
			},
			goToStep: step => {
				set({ currentStep: step });
			},
			addPost: () => {
				const { formData, posts } = get();
				const newPost: BlogPost = {
					...formData,
					id: crypto.randomUUID(),
					createdAt: new Date().toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					}),
				};
				set({ posts: [newPost, ...posts] });
			},
			resetForm: () => {
				set({
					currentStep: 1,
					formData: {
						title: "",
						content: "",
						author: "",
						category: "",
						summary: "",
						isPublished: false,
						imageUrl: "",
					},
				});
			},
		}),
		{
			name: "blog-store",
			storage: createJSONStorage(() => localStorage),
			partialize: state => ({ posts: state.posts }),
			skipHydration: false,
		}
	)
);
