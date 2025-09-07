import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader } from "~/components/ui/card"
import { Navbar, NavbarBrand, NavbarActions, NavbarTitle } from "~/components/ui/navbar"
import { Step1Metadata, Step2SummaryCategory, Step3Content, Step4Review } from "~/components/ui/step"
import { useBlogStore } from "~/store/blogStore"

export default function CreatePostPage() {
  const { currentStep } = useBlogStore()
  const [isHydrated, setIsHydrated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const steps = [
    { number: 1, title: "Blog Metadata" },
    { number: 2, title: "Summary & Category" },
    { number: 3, title: "Content" },
    { number: 4, title: "Review & Submit" },
  ]
  const currentStepInfo = steps.find((step) => step.number === currentStep)
  const onFinish = () => {
    toast.success("Post created successfully")
    setTimeout(() => {
      navigate("/")
    }, 500)
  }

  // Show loading state during hydration
  if (!isHydrated) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
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
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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
              <motion.p
                className="text-sm font-semibold text-gray-900"
                key={currentStep}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1 }}
              >
                Step {currentStepInfo?.number} of {steps.length}: {currentStepInfo?.title}
              </motion.p>
              <div className="mt-2 flex items-center space-x-1">
                {steps.map((step) => (
                  <motion.div
                    key={step.number}
                    className={`flex-1 h-2 rounded-full ${currentStep >= step.number ? "bg-gray-900" : "bg-gray-200"}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 0.1,
                      delay: step.number * 0.1,
                      ease: "easeOut",
                    }}
                    style={{ originX: 0 }}
                  />
                ))}
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden sm:flex sm:space-x-2">
              {steps.map((step) => (
                <motion.div
                  key={step.number}
                  className="flex-1 text-center text-sm"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: step.number * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <motion.div
                    className={`py-2 border-b-4 transition-colors duration-300 ${currentStep >= step.number ? "border-gray-900" : "border-gray-200"}`}
                    animate={{
                      borderColor: currentStep >= step.number ? "#111827" : "#e5e7eb",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.span
                      className={`font-semibold transition-colors duration-300 ${currentStep >= step.number ? "text-gray-900" : "text-gray-400"}`}
                      animate={{
                        color: currentStep >= step.number ? "#111827" : "#9ca3af",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      Step {step.number}
                    </motion.span>
                    <p className="text-xs text-gray-500">{step.title}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
            >
              {currentStep === 1 && <Step1Metadata />}
              {currentStep === 2 && <Step2SummaryCategory />}
              {currentStep === 3 && <Step3Content />}
              {currentStep === 4 && <Step4Review onFinish={onFinish} />}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}
