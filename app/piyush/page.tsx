"use client"

import React from "react"
import InputArea from "../components/InputArea"

export default function PiyushPage() {
  const activeChatId = "piyush123"

  return (
    <main className="flex h-screen">
      <InputArea activeChatId={activeChatId} />
    </main>
  )
}