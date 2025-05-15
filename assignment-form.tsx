"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Check, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import type { Class } from "@/types/assignment"
import RichTextEditor from "@/components/rich-text-editor"
import DateTimePicker from "@/components/date-time-picker"
import FileUploader from "@/components/file-uploader"

interface AssignmentFormProps {
  selectedClass: Class
  creationMode: "manual" | "ai"
  onSubmitSuccess: () => void
}

export default function AssignmentForm({ selectedClass, creationMode, onSubmitSuccess }: AssignmentFormProps) {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [files, setFiles] = useState<File[]>([])
  const [assignmentText, setAssignmentText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  // Basic details
  const [title, setTitle] = useState("")
  const [assignmentType, setAssignmentType] = useState("file")
  const [allowedFileTypes, setAllowedFileTypes] = useState(["pdf", "docx"])
  const [wordLimit, setWordLimit] = useState("")

  // Deadline settings
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date(new Date().setDate(new Date().getDate() + 7)))
  const [allowExtension, setAllowExtension] = useState(false)
  const [visibilityToggle, setVisibilityToggle] = useState(true)

  // Submission settings
  const [allowLateSubmission, setAllowLateSubmission] = useState(false)
  const [allowMultipleAttempts, setAllowMultipleAttempts] = useState(false)
  const [enablePlagiarismCheck, setEnablePlagiarismCheck] = useState(false)
  const [allowGroupSubmission, setAllowGroupSubmission] = useState(false)

  // Notification settings
  const [remindDeadlines, setRemindDeadlines] = useState(true)
  const [notifyMissing, setNotifyMissing] = useState(true)
  const [notifyFeedback, setNotifyFeedback] = useState(true)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (newFiles: File[]) => {
    setFiles([...files, ...newFiles])
    toast({
      title: "Files Uploaded",
      description: `${newFiles.length} file(s) uploaded successfully.`,
    })
  }

  const removeFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }

  const processWithAI = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please upload files first",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate AI processing with different responses based on file names
    setTimeout(() => {
      let generatedText = ""

      if (files.some((file) => file.name.toLowerCase().includes("data structure"))) {
        generatedText =
          "# Data Structures Assignment\n\n" +
          "## Part 1: Theoretical Questions\n\n" +
          "1. Explain the difference between an AVL tree and a Red-Black tree. Provide examples of when you would choose one over the other.\n" +
          "2. Analyze the time complexity of insertion, deletion, and search operations in a B-tree. How does the degree of the B-tree affect these operations?\n" +
          "3. Compare and contrast hash tables with binary search trees. Discuss scenarios where each would be the optimal choice.\n\n" +
          "## Part 2: Programming Exercises\n\n" +
          "1. Implement a priority queue using a binary heap. Your implementation should include the following operations:\n" +
          "   - insert(element, priority)\n" +
          "   - extractMax()\n" +
          "   - peek()\n" +
          "   - increaseKey(element, newPriority)\n\n" +
          "2. Implement a graph using an adjacency list and write algorithms for:\n" +
          "   - Depth-First Search (DFS)\n" +
          "   - Breadth-First Search (BFS)\n" +
          "   - Detecting cycles in the graph\n\n" +
          "3. Design and implement an efficient algorithm to find the shortest path between two nodes in a weighted graph."
      } else if (files.some((file) => file.name.toLowerCase().includes("database"))) {
        generatedText =
          "# Database Management Systems Assignment\n\n" +
          "## Part 1: SQL Queries\n\n" +
          "1. Write SQL queries to create the following tables with appropriate constraints:\n" +
          "   - Students (student_id, name, email, date_of_birth, department_id)\n" +
          "   - Departments (department_id, department_name, hod_name)\n" +
          "   - Courses (course_id, course_name, credits, department_id)\n" +
          "   - Enrollments (enrollment_id, student_id, course_id, semester, grade)\n\n" +
          "2. Write SQL queries to perform the following operations:\n" +
          "   - List all students enrolled in a specific course\n" +
          "   - Find the average grade for each course\n" +
          "   - Identify students who have not enrolled in any course\n" +
          "   - List departments along with the number of courses offered\n\n" +
          "## Part 2: Normalization\n\n" +
          "1. Consider the following relation: R(A, B, C, D, E) with functional dependencies:\n" +
          "   - A → B\n" +
          "   - B → C\n" +
          "   - D → E\n" +
          "   - A → D\n\n" +
          "   Decompose this relation into 3NF and BCNF. Show all steps.\n\n" +
          "## Part 3: Transaction Management\n\n" +
          "1. Explain the ACID properties with examples.\n" +
          "2. Describe how two-phase locking ensures serializability."
      } else {
        generatedText =
          "# Programming Assignment\n\n" +
          "## Part 1: Object-Oriented Programming\n\n" +
          "1. Design and implement a class hierarchy for a library management system with the following classes:\n" +
          "   - LibraryItem (abstract class)\n" +
          "   - Book (extends LibraryItem)\n" +
          "   - Magazine (extends LibraryItem)\n" +
          "   - DVD (extends LibraryItem)\n" +
          "   - Library (contains a collection of LibraryItems)\n\n" +
          "2. Implement appropriate methods for:\n" +
          "   - Adding items to the library\n" +
          "   - Removing items from the library\n" +
          "   - Checking out items\n" +
          "   - Returning items\n" +
          "   - Searching for items by title, author, or category\n\n" +
          "## Part 2: Exception Handling\n\n" +
          "1. Implement proper exception handling for your library system, including:\n" +
          "   - Custom exceptions for different error scenarios\n" +
          "   - Try-catch blocks in appropriate places\n" +
          "   - Proper error messages for users\n\n" +
          "## Part 3: File I/O\n\n" +
          "1. Extend your library system to:\n" +
          "   - Save the library data to a file\n" +
          "   - Load the library data from a file\n" +
          "   - Generate reports on library usage"
      }

      setAssignmentText(generatedText)
      setTitle(files[0]?.name.split(".")[0] || "New Assignment")
      setIsProcessing(false)
      toast({
        title: "Success",
        description: "Questions generated successfully!",
      })
    }, 3000)
  }

  const handleSubmit = () => {
    if (!title) {
      toast({
        title: "Error",
        description: "Please enter a title for the assignment",
        variant: "destructive",
      })
      return
    }

    if (!assignmentText) {
      toast({
        title: "Error",
        description: "Please enter assignment instructions",
        variant: "destructive",
      })
      return
    }

    if (!dueDate) {
      toast({
        title: "Error",
        description: "Please set a due date",
        variant: "destructive",
      })
      return
    }

    onSubmitSuccess()
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
      <h2 className="text-2xl font-bold">{creationMode === "ai" ? "AI-Assisted Assignment" : "Manual Assignment"}</h2>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full ${currentStep >= step ? "bg-purple-600" : "bg-gray-200"}`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-500">Step {currentStep} of 3</div>
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Basic Details</h3>

                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter assignment title"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="assignment-type">Assignment Type</Label>
                      <Select value={assignmentType} onValueChange={setAssignmentType}>
                        <SelectTrigger id="assignment-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="file">File Upload</SelectItem>
                          <SelectItem value="text">Text-based</SelectItem>
                          <SelectItem value="quiz">Quiz</SelectItem>
                          <SelectItem value="coding">Coding</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {assignmentType === "file" && (
                      <div className="space-y-2">
                        <Label>Allowed File Types</Label>
                        <div className="flex flex-wrap gap-2">
                          {["pdf", "docx", "zip", "jpg", "png"].map((type) => (
                            <Button
                              key={type}
                              variant={allowedFileTypes.includes(type) ? "default" : "outline"}
                              size="sm"
                              onClick={() => {
                                if (allowedFileTypes.includes(type)) {
                                  setAllowedFileTypes(allowedFileTypes.filter((t) => t !== type))
                                } else {
                                  setAllowedFileTypes([...allowedFileTypes, type])
                                }
                              }}
                            >
                              {type.toUpperCase()}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="word-limit">Word/Page Limit (Optional)</Label>
                      <Input
                        id="word-limit"
                        value={wordLimit}
                        onChange={(e) => setWordLimit(e.target.value)}
                        placeholder="e.g., 500 words or 5 pages"
                      />
                    </div>
                  </div>

                  {creationMode === "ai" && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Upload Materials</h3>
                      <FileUploader onFilesAdded={handleFileUpload} files={files} onFileRemove={removeFile} />
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex justify-end pt-4">
                <Button onClick={() => setCurrentStep(2)}>
                  Continue <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      {creationMode === "ai" ? "Generate Assignment" : "Write Assignment"}
                    </h3>

                    {creationMode === "ai" && (
                      <div className="mb-6">
                        <Button
                          className="w-full"
                          onClick={processWithAI}
                          disabled={isProcessing || files.length === 0}
                        >
                          {isProcessing ? (
                            <>
                              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              Generating...
                            </>
                          ) : (
                            <>
                              <Brain className="mr-2 h-4 w-4" />
                              Generate Questions
                            </>
                          )}
                        </Button>
                      </div>
                    )}

                    <div className="min-h-[300px]">
                      <RichTextEditor
                        value={assignmentText}
                        onChange={setAssignmentText}
                        placeholder={
                          creationMode === "ai"
                            ? "AI will generate assignment instructions..."
                            : "Enter assignment instructions..."
                        }
                        disabled={isProcessing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={() => setCurrentStep(3)} disabled={!assignmentText.trim()}>
                  Continue <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Tabs defaultValue="deadline">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="deadline">Deadline & Visibility</TabsTrigger>
                  <TabsTrigger value="submission">Submission Settings</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>

                <TabsContent value="deadline" className="space-y-4 mt-4">
                  <Card>
                    <CardContent className="p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <DateTimePicker date={startDate} setDate={setStartDate} />
                        </div>

                        <div className="space-y-2">
                          <Label>Due Date</Label>
                          <DateTimePicker date={dueDate} setDate={setDueDate} />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="allow-extension">Allow Deadline Extension</Label>
                            <p className="text-sm text-gray-500">Students can request an extension</p>
                          </div>
                          <Switch id="allow-extension" checked={allowExtension} onCheckedChange={setAllowExtension} />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="visibility-toggle">Visibility</Label>
                            <p className="text-sm text-gray-500">Make assignment visible to students</p>
                          </div>
                          <Switch
                            id="visibility-toggle"
                            checked={visibilityToggle}
                            onCheckedChange={setVisibilityToggle}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="submission" className="space-y-4 mt-4">
                  <Card>
                    <CardContent className="p-6 space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="late-submission">Allow Late Submission</Label>
                            <p className="text-sm text-gray-500">Students can submit after the deadline</p>
                          </div>
                          <Switch
                            id="late-submission"
                            checked={allowLateSubmission}
                            onCheckedChange={setAllowLateSubmission}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="multiple-attempts">Allow Multiple Attempts</Label>
                            <p className="text-sm text-gray-500">Students can resubmit their work</p>
                          </div>
                          <Switch
                            id="multiple-attempts"
                            checked={allowMultipleAttempts}
                            onCheckedChange={setAllowMultipleAttempts}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="plagiarism-check">Enable Plagiarism Check</Label>
                            <p className="text-sm text-gray-500">Check submissions for plagiarism</p>
                          </div>
                          <Switch
                            id="plagiarism-check"
                            checked={enablePlagiarismCheck}
                            onCheckedChange={setEnablePlagiarismCheck}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="group-submission">Allow Group Submission</Label>
                            <p className="text-sm text-gray-500">Students can submit as a group</p>
                          </div>
                          <Switch
                            id="group-submission"
                            checked={allowGroupSubmission}
                            onCheckedChange={setAllowGroupSubmission}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-4 mt-4">
                  <Card>
                    <CardContent className="p-6 space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="remind-deadlines">Remind About Deadlines</Label>
                            <p className="text-sm text-gray-500">Send reminders about upcoming deadlines</p>
                          </div>
                          <Switch
                            id="remind-deadlines"
                            checked={remindDeadlines}
                            onCheckedChange={setRemindDeadlines}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="notify-missing">Notify Missing Submissions</Label>
                            <p className="text-sm text-gray-500">Alert students who haven't submitted</p>
                          </div>
                          <Switch id="notify-missing" checked={notifyMissing} onCheckedChange={setNotifyMissing} />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="notify-feedback">Notify About Feedback</Label>
                            <p className="text-sm text-gray-500">Alert students when feedback is available</p>
                          </div>
                          <Switch id="notify-feedback" checked={notifyFeedback} onCheckedChange={setNotifyFeedback} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Review Assignment</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Title</h4>
                        <p className="font-medium">{title || "Untitled Assignment"}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Class</h4>
                        <p className="font-medium">{selectedClass?.name}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Assignment Type</h4>
                        <p className="font-medium capitalize">{assignmentType}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Due Date</h4>
                        <p className="font-medium">{dueDate?.toLocaleString()}</p>
                      </div>
                    </div>

                    {files.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Attached Resources</h4>
                        <p className="font-medium">{files.length} file(s)</p>
                      </div>
                    )}

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Assignment Content Preview</h4>
                      <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap text-sm mt-2 max-h-40 overflow-y-auto">
                        {assignmentText}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={handleSubmit}>
                  <Check className="mr-2 h-4 w-4" /> Create Assignment
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
