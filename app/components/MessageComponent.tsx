"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: string
  content: string
  timestamp: string
  sender: string
}

interface MessageComponentProps {
  message: Message
  isGroupChat?: boolean
  currentUserName: string
}

export default function MessageComponent({
  message,
  isGroupChat = false,
  currentUserName,
}: MessageComponentProps) {
  const isMe = message.sender === currentUserName

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} px-2 sm:px-4 py-1`}>
      <div
        className={`flex ${
          isMe ? "flex-row-reverse" : "flex-row"
        } w-full max-w-[90%] sm:max-w-[75%] gap-2`}
      >
        {!isMe && (
          <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>{message.sender.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        )}
        <div className="flex flex-col space-y-1 w-full">
          {isGroupChat && !isMe && (
            <p className="text-[10px] sm:text-xs font-medium text-muted-foreground ml-1">
              {message.sender}
            </p>
          )}
          <div
            className={`rounded-lg p-2 sm:p-3 break-words ${
              isMe
                ? "bg-primary text-primary-foreground self-end"
                : "bg-muted text-foreground self-start"
            }`}
          >
            <p className="text-sm sm:text-base">{message.content}</p>
          </div>
          <p
            className={`text-[10px] sm:text-xs text-muted-foreground ${
              isMe ? "text-right" : "text-left"
            }`}
          >
            {message.timestamp}
          </p>
        </div>
      </div>
    </div>
  )
}
