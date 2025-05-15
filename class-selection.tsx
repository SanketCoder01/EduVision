"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import type { Class } from "@/types/assignment"

interface ClassSelectionProps {
  classes: Class[]
  onSelect: (cls: Class) => void
}

export default function ClassSelection({ classes, onSelect }: ClassSelectionProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
      <h2 className="text-2xl font-bold">Select Class</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {classes.map((cls) => (
          <motion.div key={cls.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onSelect(cls)}>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-purple-600 font-bold">{cls.name.split(" ")[0]}</span>
                </div>
                <h3 className="font-medium text-lg mb-1">{cls.name}</h3>
                <p className="text-gray-500 text-sm">{cls.assignments} assignments</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
