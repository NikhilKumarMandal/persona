"use client"

import React from "react"
import ChatArea from "../components/ChatArea"

export default function PiyushPage() {
  const activeChatId = "piyush123"

  return (
    <main className="flex h-screen">
      <ChatArea activeChatId={activeChatId} />
    </main>
  )
}