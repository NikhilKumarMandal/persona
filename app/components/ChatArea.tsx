"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, Paperclip, Smile } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MessageComponent from "./MessageComponent"
import { SidebarTrigger } from "@/components/ui/sidebar"

interface ChatAreaProps {
  activeChatId: string | null
}

export default function ChatArea({ activeChatId }: ChatAreaProps) {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<any[]>([])
  const [chatMeta, setChatMeta] = useState<any>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!activeChatId) return

    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/chat/`)
        const data = await res.json()

        setMessages(data.messages || [])
        setChatMeta(data.meta || null)
      } catch (err) {
        console.error("Error fetching chat:", err)
        setMessages([])
        setChatMeta(null)
      }
    }

    fetchMessages()
  }, [activeChatId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !activeChatId) return

    const newMessage = {
      id: Date.now().toString(),
      content: input,
      sender: "me",
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId: activeChatId, message: input }),
      })

      const data = await res.json()

      const aiMessage = {
        id: Date.now().toString() + "-ai",
        content: data.response,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-err",
          content: "Something went wrong!",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  if (!activeChatId) {
    return (
      <div className="flex-1 flex flex-col h-full">
        <div className="border-b p-3 flex items-center">
          <SidebarTrigger className="md:hidden mr-2" />
          <h2 className="font-semibold text-base sm:text-lg">Chat App</h2>
        </div>
        <div className="flex-1 flex items-center justify-center bg-muted/10 px-4 text-center">
          <div className="p-4 max-w-md">
            <h3 className="text-lg sm:text-xl font-medium">Select a conversation</h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Choose a conversation from the sidebar to start chatting
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="border-b p-3 flex items-center">
        <SidebarTrigger className="md:hidden mr-2" />
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={chatMeta?.avatar} />
          <AvatarFallback>{chatMeta?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium text-base sm:text-lg">{chatMeta?.name || "Hitesh"}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <span
              className={`h-2 w-2 rounded-full mr-1 ${
                chatMeta?.status === "online"
                  ? "bg-green-500"
                  : chatMeta?.status === "away"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            />
            <span className="text-xs sm:text-sm">{chatMeta?.status || "online"}</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-2 space-y-4">
        {messages.map((msg) => (
          <MessageComponent
            key={msg.id}
            message={msg}
            isGroupChat={false}
            currentUserName={"me"}
          />
        ))}
        {loading && (
          <MessageComponent
            message={{ id: "typing", content: "Typing...", sender: "bot", timestamp: "" }}
            isGroupChat={false}
            currentUserName={"me"}
          />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-2 sm:p-3">
        <form className="flex items-center gap-2" onSubmit={handleAsk}>
          <Button type="button" size="icon" variant="ghost" className="hidden sm:flex">
            <Paperclip className="h-5 w-5" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 text-sm sm:text-base"
          />
          <Button type="button" size="icon" variant="ghost" className="hidden sm:flex">
            <Smile className="h-5 w-5" />
            <span className="sr-only">Insert emoji</span>
          </Button>
          <Button type="submit" size="icon" disabled={!input.trim()}>
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
}

