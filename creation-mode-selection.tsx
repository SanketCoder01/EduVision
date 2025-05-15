"use client"

import { motion } from "framer-motion"
import { FileText, Brain } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Class } from "@/types/assignment"

interface CreationModeSelectionProps {
  selectedClass: Class
  onSelect: (mode: "manual" | "ai") => void
}

export default function CreationModeSelection({ selectedClass, onSelect }: CreationModeSelectionProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
      <h2 className="text-2xl font-bold">{selectedClass.name}</h2>
      <p className="text-gray-500 mb-6">Choose how you want to create your assignment</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Card className="cursor-pointer hover:shadow-md transition-shadow h-full" onClick={() => onSelect("manual")}>
            <CardContent className="p-6 flex flex-col items-center text-center h-full justify-center py-12">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-medium text-xl mb-2">Create Manually</h3>
              <p className="text-gray-500">Write your own assignment instructions</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Card
            className="cursor-pointer hover:shadow-md transition-shadow h-full bg-gradient-to-br from-purple-50 to-white"
            onClick={() => onSelect("ai")}
          >
            <CardContent className="p-6 flex flex-col items-center text-center h-full justify-center py-12">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-medium text-xl mb-2">Generate with AI</h3>
              <p className="text-gray-500">Let AI create assignment based on your materials</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
