import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import {
	Navbar,
	NavbarBrand,
	NavbarActions,
	NavbarTitle,
} from "~/components/ui/navbar";
import {
	Step1Metadata,
	Step2SummaryCategory,
	Step3Content,
	Step4Review,
} from "~/components/ui/step";
import { useBlogStore } from "~/store/blogStore";

export default function CreatePostPage() {
	const { currentStep } = useBlogStore();
	const [showSuccess, setShowSuccess] = useState(false);
	const [isHydrated, setIsHydrated] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	const steps = [
		{ number: 1, title: "Blog Metadata" },
		{ number: 2, title: "Summary & Category" },
		{ number: 3, title: "Content" },
		{ number: 4, title: "Review & Submit" },
	];
	const currentStepInfo = steps.find(step => step.number === currentStep);
	const onFinish = () => {
		setShowSuccess(true);
		navigate("/");
	};

	// Show loading state during hydration
	if (!isHydrated) {
		return (
			<>
				<Navbar variant="default">
					<NavbarBrand>
						<NavbarTitle>Create New Blog Post</NavbarTitle>
					</NavbarBrand>
					<NavbarActions>
						<Button variant="ghost" disabled>
							Cancel
						</Button>
					</NavbarActions>
				</Navbar>
				<Card>
					<CardContent>
						<div className="text-center py-8">
							<p className="text-gray-500">Loading...</p>
						</div>
					</CardContent>
				</Card>
			</>
		);
	}

	return (
		<>
			<Navbar variant="default">
				<NavbarBrand>
					<NavbarTitle>Create New Blog Post</NavbarTitle>
				</NavbarBrand>
				<NavbarActions>
					<Button variant="ghost" onClick={() => navigate("/")}>
						Cancel
					</Button>
				</NavbarActions>
			</Navbar>
			<Card>
				<CardHeader>
					<div className="mt-4">
						{/* Mobile */}
						<div className="sm:hidden text-center">
							<p className="text-sm font-semibold text-gray-900 dark:text-gray-50">
								Step {currentStepInfo?.number} of {steps.length}:{" "}
								{currentStepInfo?.title}
							</p>
							<div className="mt-2 flex items-center space-x-1">
								{steps.map(step => (
									<div
										key={step.number}
										className={`flex-1 h-2 rounded-full ${currentStep >= step.number ? "bg-gray-900 dark:bg-gray-50" : "bg-gray-200 dark:bg-gray-700"}`}
									></div>
								))}
							</div>
						</div>

						{/* Desktop */}
						<div className="hidden sm:flex sm:space-x-2">
							{steps.map(step => (
								<div key={step.number} className="flex-1 text-center text-sm">
									<div
										className={`py-2 border-b-4 transition-colors duration-300 ${currentStep >= step.number ? "border-gray-900 dark:border-gray-50" : "border-gray-200 dark:border-gray-700"}`}
									>
										<span
											className={`font-semibold transition-colors duration-300 ${currentStep >= step.number ? "text-gray-900 dark:text-gray-50" : "text-gray-400"}`}
										>
											Step {step.number}
										</span>
										<p className="text-xs text-gray-500">{step.title}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</CardHeader>
				<CardContent>
					{currentStep === 1 && <Step1Metadata />}
					{currentStep === 2 && <Step2SummaryCategory />}
					{currentStep === 3 && <Step3Content />}
					{currentStep === 4 && <Step4Review onFinish={onFinish} />}
				</CardContent>
			</Card>
		</>
	);
}
