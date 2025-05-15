"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Class } from "@/types/assignment"

interface SuccessScreenProps {
  selectedClass: Class | null
  onCreateAnother: () => void
}

export default function SuccessScreen({ selectedClass, onCreateAnother }: SuccessScreenProps) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="h-10 w-10 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Assignment Created!</h2>
      <p className="text-gray-600 mb-8">Your assignment for {selectedClass?.name} has been created successfully.</p>

      <Button onClick={onCreateAnother}>Create Another Assignment</Button>
    </motion.div>
  )
}
