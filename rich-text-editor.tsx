"use client"

import { useState } from "react"
import { Bold, Italic, List, ListOrdered, Link, ImageIcon, Code } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

export default function RichTextEditor({ value, onChange, placeholder, disabled = false }: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<string>("write")

  const insertMarkdown = (prefix: string, suffix = "") => {
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)

    const newText = value.substring(0, start) + prefix + selectedText + suffix + value.substring(end)

    onChange(newText)

    // Set cursor position after the operation
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + prefix.length, end + prefix.length)
    }, 0)
  }

  return (
    <div className="border rounded-md">
      <div className="flex items-center gap-1 p-2 border-b bg-gray-50">
        <Button variant="ghost" size="icon" onClick={() => insertMarkdown("**", "**")} disabled={disabled}>
          <Bold className="h-4 w-4" />
          <span className="sr-only">Bold</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertMarkdown("*", "*")} disabled={disabled}>
          <Italic className="h-4 w-4" />
          <span className="sr-only">Italic</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertMarkdown("\n- ")} disabled={disabled}>
          <List className="h-4 w-4" />
          <span className="sr-only">Bullet List</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertMarkdown("\n1. ")} disabled={disabled}>
          <ListOrdered className="h-4 w-4" />
          <span className="sr-only">Numbered List</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertMarkdown("[", "](url)")} disabled={disabled}>
          <Link className="h-4 w-4" />
          <span className="sr-only">Link</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertMarkdown("![alt text](", ")")} disabled={disabled}>
          <ImageIcon className="h-4 w-4" />
          <span className="sr-only">Image</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertMarkdown("`", "`")} disabled={disabled}>
          <Code className="h-4 w-4" />
          <span className="sr-only">Code</span>
        </Button>
      </div>

      <Tabs defaultValue="write" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 bg-gray-50 border-b rounded-none">
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="write" className="p-0 m-0">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[200px] border-0 rounded-none focus-visible:ring-0 resize-y"
            disabled={disabled}
          />
        </TabsContent>

        <TabsContent value="preview" className="p-4 m-0 min-h-[200px] prose prose-sm max-w-none">
          {value ? (
            <div className="whitespace-pre-wrap">{value}</div>
          ) : (
            <div className="text-gray-400 italic">No content to preview</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
