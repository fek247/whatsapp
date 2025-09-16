"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function FloatingInput({ id, label, className, ...props }: FloatingInputProps) {
  return (
    <div className="relative w-full">
      <Input
        id={id}
        placeholder=" "
        className={`
          peer block w-full border-0 border-b border-gray-300 bg-transparent 
          px-1 pt-4 pb-2 text-sm text-gray-900
          focus:border-blue-500 focus:ring-0 focus-visible:ring-0
          ${className || ""}
        `}
        {...props}
      />
      <Label
        htmlFor={id}
        className="absolute left-1 top-[-6] text-gray-500 text-sm transition-all
                   peer-placeholder-shown:top-2  
                   peer-placeholder-shown:text-base
                   peer-focus:top-[-6] peer-focus:text-sm"
      >
        {label}
      </Label>
    </div>
  )
}
