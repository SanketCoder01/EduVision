"use client"

import type React from "react"

import { useRef } from "react"
import { Upload, FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface FileUploaderProps {
  onFilesAdded: (files: File[]) => void
  files: File[]
  onFileRemove: (index: number) => void
}

export default function FileUploader({ onFilesAdded, files, onFileRemove }: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files)
      onFilesAdded(filesArray)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-700 mb-1">Upload Files</h4>
          <p className="text-gray-500 text-sm mb-4">PDF, DOCX, Images</p>
          <Button variant="outline" size="sm">
            Browse Files
          </Button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple />
        </div>

        {files.length > 0 && (
          <div className="mt-6">
            <h4 className="font-medium mb-2">Uploaded Files:</h4>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm truncate max-w-xs">{file.name}</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => onFileRemove(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
