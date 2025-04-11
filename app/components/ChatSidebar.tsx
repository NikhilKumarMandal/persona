"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const conversations = [
  {
    id: "1",
    name: "Hitesh",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Hey, how are you doing?",
    time: "2m ago",
    unread: 3,
    persona: "friendly",
  }
]

interface ChatSidebarProps {
  onSelectChat: (chatId: string, persona: string) => void
  activeChat: string | null
}

export default function ChatSidebar({ onSelectChat, activeChat }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const { setOpenMobile } = useSidebar()
  const [personaMap, setPersonaMap] = useState<Record<string, string>>(
    conversations.reduce((acc, c) => {
      acc[c.id] = c.persona || "friendly"
      return acc
    }, {} as Record<string, string>)
  )

  const filteredConversations = conversations.filter((convo) =>
    convo.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelectChat = (chatId: string) => {
    const persona = personaMap[chatId] || "friendly"
    onSelectChat(chatId, persona)
    setOpenMobile(false) // Closes sidebar on mobile
  }

  const handlePersonaChange = (chatId: string, newPersona: string) => {
    setPersonaMap((prev) => ({ ...prev, [chatId]: newPersona }))
    if (chatId === activeChat) {
      onSelectChat(chatId, newPersona)
    }
  }

  return (
    <Sidebar
      variant="sidebar"
      collapsible="offcanvas" // For mobile responsiveness
      className="w-full sm:w-64" // Full width on mobile, fixed on desktop
    >
      <SidebarContent className="h-full">
        <SidebarGroup>
          <SidebarGroupLabel>Recent Conversations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredConversations.map((conversation) => (
                <SidebarMenuItem key={conversation.id}>
                  <SidebarMenuButton
                    isActive={activeChat === conversation.id}
                    onClick={() => handleSelectChat(conversation.id)}
                    className="flex flex-col w-full items-start gap-1"
                  >
                    <div className="flex w-full items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex justify-between items-center">
                          <span className="font-medium truncate">{conversation.name}</span>
                          <span className="text-xs text-muted-foreground">{conversation.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread > 0 && (
                        <div className="ml-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          {conversation.unread}
                        </div>
                      )}
                    </div>
                    <div className="w-full mt-1">
                      <Select
                        value={personaMap[conversation.id]}
                        onValueChange={(value: string) => handlePersonaChange(conversation.id, value)}
                      >
                        <SelectTrigger className="h-8 text-xs mt-1">
                          <SelectValue placeholder="Select persona" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="friendly">Friendly</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="sarcastic">Sarcastic</SelectItem>
                          <SelectItem value="team">Team Player</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
