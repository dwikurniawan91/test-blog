"use client";
import { type ReactNode, useState } from "react";
import { useBlogStore } from "~/store/blogStore";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Textarea } from "./textarea";

type ValidationRule = (value: string) => string;
type ValidationSchema = Record<string, ValidationRule>;
type FormData = Record<string, string | boolean>;

const validateFields = (
  formData: FormData,
  schema: ValidationSchema,
): Record<string, string> => {
  const errors: Record<string, string> = {};
  for (const field in schema) {
    const rule = schema[field];
    const errorMessage = rule(String(formData[field] || ""));
    if (errorMessage) {
      errors[field] = errorMessage;
    }
  }
  return errors;
};


const Step1Metadata = () => {
  const { formData, setField, nextStep } = useBlogStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    const validationSchema: ValidationSchema = {
      title: (value) => (value.trim() ? "" : "Blog title is required."),
      author: (value) => (value.trim() ? "" : "Author name is required."),
    };
    const validationErrors = validateFields(formData, validationSchema);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      nextStep();
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-2">
        <Label htmlFor="title">Blog Title</Label>
        <Input
          id="title"
          placeholder="e.g., My First Next.js App"
          value={formData.title}
          onChange={(e) => setField("title", e.target.value)}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="author">Author Name</Label>
        <Input
          id="author"
          placeholder="e.g., John Doe"
          value={formData.author}
          onChange={(e) => setField("author", e.target.value)}
        />
        {errors.author && (
          <p className="text-red-500 text-sm mt-1">{errors.author}</p>
        )}
      </div>
      <div className="flex justify-end">
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

const Step2SummaryCategory = () => {
  const { formData, setField, nextStep, prevStep } = useBlogStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const categories = ["Tech", "Lifestyle", "Business", "Travel", "Food"];

  const handleNext = () => {
    const validationSchema: ValidationSchema = {
      summary: (value) => (value.trim() ? "" : "Blog summary is required."),
    };
    const validationErrors = validateFields(formData, validationSchema);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      nextStep();
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-2">
        <Label htmlFor="summary">Blog Summary</Label>
        <Textarea
          id="summary"
          placeholder="A short and engaging summary of your post..."
          value={formData.summary}
          onChange={(e) => setField("summary", e.target.value)}
        />
        {errors.summary && (
          <p className="text-red-500 text-sm mt-1">{errors.summary}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="category">Blog Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => setField("category", value)}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-between">
        <Button onClick={prevStep} variant="outline">
          Back
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

const Step3Content = () => {
  const { formData, setField, nextStep, prevStep } = useBlogStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    const validationSchema: ValidationSchema = {
      content: (value) =>
        value.trim().length >= 50
          ? ""
          : "Content is required and must be at least 50 characters long.",
    };
    const validationErrors = validateFields(formData, validationSchema);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      nextStep();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="content">Blog Content</Label>
        <Textarea
          id="content"
          placeholder="Write your full blog post here. Supports Markdown..."
          value={formData.content}
          onChange={(e) => setField("content", e.target.value)}
          rows={15}
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content}</p>
        )}
      </div>
      <div className="flex justify-between">
        <Button onClick={prevStep} variant="outline">
          Back
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

const Step4Review = ({ onFinish }: { onFinish: () => void }) => {
  const { formData, prevStep, addPost, resetForm } = useBlogStore();

  const handleSubmit = () => {
    addPost();
    onFinish(); // This will trigger navigation and show success message
    // Defer reset to allow success message to show
    setTimeout(resetForm, 500);
  };

  const ReviewItem = ({
    label,
    value,
  }: {
    label: string;
    value: string | ReactNode;
  }) => (
    <div className="grid grid-cols-3 gap-4 items-start py-2">
      <dt className="font-semibold text-gray-600 dark:text-gray-400">
        {label}
      </dt>
      <dd className="col-span-2 text-gray-800 dark:text-gray-200">{value}</dd>
    </div>
  );

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Review Your Post</h3>
      <dl className="divide-y divide-gray-200 dark:divide-gray-700">
        <ReviewItem label="Title" value={formData.title} />
        <ReviewItem label="Author" value={formData.author} />
        <ReviewItem
          label="Category"
          value={
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
              {formData.category}
            </span>
          }
        />
        <ReviewItem label="Summary" value={formData.summary} />
        <ReviewItem
          label="Content"
          value={
            <p className="whitespace-pre-wrap max-h-40 overflow-y-auto p-2 border rounded-md bg-gray-50 dark:bg-gray-800">
              {formData.content}
            </p>
          }
        />
      </dl>
      <div className="flex justify-between">
        <Button onClick={prevStep} variant="outline">
          Back
        </Button>
        <Button onClick={handleSubmit}>Submit Post</Button>
      </div>
    </div>
  );
};

export { Step1Metadata, Step2SummaryCategory, Step3Content, Step4Review };
