"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import ClassSelection from "@/components/class-selection"
import CreationModeSelection from "@/components/creation-mode-selection"
import AssignmentForm from "@/components/assignment-form"
import SuccessScreen from "@/components/success-screen"
import type { Class } from "@/types/assignment"

// Mock data for classes
const classes = [
  { id: 1, name: "DSY CSE", assignments: 5 },
  { id: 2, name: "FY CSE", assignments: 3 },
  { id: 3, name: "DSY CY", assignments: 4 },
  { id: 4, name: "TY IT", assignments: 2 },
  { id: 5, name: "FY ME", assignments: 6 },
  { id: 6, name: "DSY EE", assignments: 3 },
]

export default function AssignmentPage() {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)
  const [creationMode, setCreationMode] = useState<"manual" | "ai" | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleBackNavigation = () => {
    if (isSubmitted) {
      setIsSubmitted(false)
      setCreationMode(null)
      return
    }
    if (creationMode) {
      setCreationMode(null)
      return
    }
    if (selectedClass) {
      setSelectedClass(null)
      return
    }
  }

  const handleSubmitSuccess = () => {
    setIsSubmitted(true)
  }

  const handleReset = () => {
    setSelectedClass(null)
    setCreationMode(null)
    setIsSubmitted(false)
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          {(selectedClass || creationMode || isSubmitted) && (
            <Button variant="ghost" size="icon" className="mr-2" onClick={handleBackNavigation}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-2xl font-bold">Assignments</h1>
        </div>
      </div>

      {!selectedClass && <ClassSelection classes={classes} onSelect={setSelectedClass} />}

      {selectedClass && !creationMode && !isSubmitted && (
        <CreationModeSelection selectedClass={selectedClass} onSelect={setCreationMode} />
      )}

      {selectedClass && creationMode && !isSubmitted && (
        <AssignmentForm
          selectedClass={selectedClass}
          creationMode={creationMode}
          onSubmitSuccess={handleSubmitSuccess}
        />
      )}

      {isSubmitted && <SuccessScreen selectedClass={selectedClass} onCreateAnother={handleReset} />}
    </div>
  )
}
