import React, { useState, useRef, useEffect } from 'react'
import { PencilIcon } from 'lucide-react'

interface EditableTextProps {
  children: React.ReactNode
  id: string
}

export function EditableText({ children, id }: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [showEditIcon, setShowEditIcon] = useState(false)
  const [text, setText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleDoubleClick = () => {
    setIsEditing(true)
    setText(String(children))
  }

  const handleEdit = () => {
    setIsEditing(true)
    setText(String(children))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false)
      onEdit(text)
    }
  }

  const onEdit = (newText: string) => {
    
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowEditIcon(true)}
      onMouseLeave={() => setShowEditIcon(false)}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
          style={{ width: `${text.length}ch` }}
        />
      ) : (
        <>
          {children}
          {showEditIcon && (
            <button
              onClick={handleEdit}
              className="absolute -top-4 -right-4 p-1 bg-gray-100 rounded-full shadow-md"
            >
              <PencilIcon className="w-4 h-4 text-gray-600" />
            </button>
          )}
        </>
      )}
    </div>
  )
}