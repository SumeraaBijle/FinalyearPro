"use client"

import { useState, useRef, useEffect } from "react"
import { Send, X, MessageSquare, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Markdown from "markdown-to-jsx"
import axios from "axios"

interface Message {
  sender: "user" | "ai"
  text: string
}

interface UserData {
  name: string
  occasion: string
  recipient: string
  interests: string
  budget: string
}

const API_KEY = "AIzaSyC6H43qonao9BCjw2n5S2ImP115W-k0P6o";

export default function StationeryGiftChatBot() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>("")
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const endOfMessagesRef = useRef<HTMLDivElement>(null)
  const [stage, setStage] = useState<number>(0)
  const [isEnded, setIsEnded] = useState<boolean>(false)
  const [userData, setUserData] = useState<UserData>({
    name: "",
    occasion: "",
    recipient: "",
    interests: "",
    budget: "",
  })

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeConversation()
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [isOpen])

  const toggleChat = () => {
    setIsOpen((prev) => !prev)
  }

  const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

  const showAiMessageWithDelay = async (text: string): Promise<void> => {
    setIsTyping(true)
    await delay(1000)
    setMessages((prevMessages) => [...prevMessages, { sender: "ai", text }])
    setIsTyping(false)
  }

  const analyzeInput = (inputText: string): string => {
    const normalizedInput = inputText.toLowerCase()

    const occasionKeywords = [
      "birthday",
      "anniversary",
      "wedding",
      "graduation",
      "holiday",
      "christmas",
      "valentine",
      "mother's day",
      "father's day",
      "back to school",
      "teacher's day",
    ]

    const recipientKeywords = [
      "friend",
      "family",
      "partner",
      "spouse",
      "colleague",
      "boss",
      "child",
      "parent",
      "teacher",
      "student",
    ]

    const budgetKeywords = ["low", "medium", "high", "cheap", "expensive", "affordable"]

    if (occasionKeywords.some((keyword) => normalizedInput.includes(keyword))) {
      return "occasion"
    }

    if (recipientKeywords.some((keyword) => normalizedInput.includes(keyword))) {
      return "recipient"
    }

    if (budgetKeywords.some((keyword) => normalizedInput.includes(keyword))) {
      return "budget"
    }

    return "off-topic"
  }

  const initializeConversation = async (): Promise<void> => {
    const initialMessages = [
      "Hi there! 👋 I'm your personal gift advisor, ready to help you find the perfect stationery or novelty gift.",
      "To get started, what's your name?",
    ]

    for (const msg of initialMessages) {
      await showAiMessageWithDelay(msg)
    }

    setStage(0)
    setIsEnded(false)
  }

  const resetChat = () => {
    setMessages([])
    setUserData({
      name: "",
      occasion: "",
      recipient: "",
      interests: "",
      budget: "",
    })
    setStage(0)
    setIsEnded(false)
    initializeConversation()
  }

  const handleSend = async (): Promise<void> => {
    if (input.trim() === "") return

    const userMessage: Message = { sender: "user", text: input }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInput("")

    setIsTyping(true)

    if (stage === 0) {
      setUserData((prevData) => ({ ...prevData, name: input }))
      await showAiMessageWithDelay(`Nice to meet you, ${input}! 😊 What's the occasion you're shopping for?`)
      setStage(1)
    } else if (stage === 1) {
      setUserData((prevData) => ({ ...prevData, occasion: input }))
      await showAiMessageWithDelay("Great choice! Who will be receiving this gift?")
      setStage(2)
    } else if (stage === 2) {
      setUserData((prevData) => ({ ...prevData, recipient: input }))
      await showAiMessageWithDelay("Perfect! What are their interests or hobbies?")
      setStage(3)
    } else if (stage === 3) {
      setUserData((prevData) => ({ ...prevData, interests: input }))
      await showAiMessageWithDelay("Almost there! What's your budget range for the gift? (e.g., ₹500-1000)")
      setStage(4)
    } else if (stage === 4) {
      setUserData((prevData) => ({ ...prevData, budget: input }))
      await showAiMessageWithDelay("Thank you! Let me find some perfect gift suggestions for you... 🎁")

      try {
        const prompt = `As a gift advisor for a stationery and novelty store, suggest 3 specific gift items based on these details:
        Name: ${userData.name}
        Occasion: ${userData.occasion}
        Recipient: ${userData.recipient}
        Interests: ${userData.interests}
        Budget: ${input}

        Format your response as:
        Here are my top 3 recommendations for you:

        1. [Product Name] - ₹[Price]
        [Brief description and why it's perfect]

        2. [Product Name] - ₹[Price]
        [Brief description and why it's perfect]

        3. [Product Name] - ₹[Price]
        [Brief description and why it's perfect]`

        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
          {
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          },
        )

        const suggestions = response.data.candidates[0].content.parts[0].text

        await showAiMessageWithDelay(suggestions)
        await showAiMessageWithDelay(
          "I hope these suggestions help! 🌟 Would you like to see these items in our store? You can click the links above to view them.\n\nFeel free to start a new chat if you need more suggestions!",
        )
        setIsEnded(true)
      } catch (error) {
        console.error("Error generating suggestions:", error)
        await showAiMessageWithDelay(
          "I apologize, but I'm having trouble generating suggestions right now. Please try again later.",
        )
      }
      setStage(5)
    } else if (stage === 5 && !isEnded) {
      const inputCategory = analyzeInput(input)

      if (inputCategory === "off-topic") {
        await showAiMessageWithDelay(
          "I hope you found the suggestions helpful! Feel free to start a new chat if you need more gift ideas. 🎁",
        )
        setIsEnded(true)
      } else {
        try {
          const followUpPrompt = `User has a follow-up question about gift suggestions:
          "${input}"
          
          Previous context:
          Name: ${userData.name}
          Occasion: ${userData.occasion}
          Recipient: ${userData.recipient}
          Interests: ${userData.interests}
          Budget: ${userData.budget}
          
          Provide a helpful response with specific product suggestions if applicable.`

          const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
            {
              contents: [
                {
                  parts: [{ text: followUpPrompt }],
                },
              ],
            },
          )

          const followUpResponse = response.data.candidates[0].content.parts[0].text
          await showAiMessageWithDelay(followUpResponse)
          await showAiMessageWithDelay("Is there anything else you'd like to know about these suggestions? 😊")
        } catch (error) {
          console.error("Error generating follow-up response:", error)
          await showAiMessageWithDelay(
            "I apologize, but I'm having trouble responding right now. Please try again later.",
          )
        }
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={toggleChat}
        className="h-12 w-12 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      {isOpen && (
        <Card className="absolute bottom-16 right-0 w-[380px] overflow-hidden rounded-2xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between border-b bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 p-4 text-white">
            <h2 className="text-lg font-semibold">Gift Assistant</h2>
            <div className="flex gap-2">
              {isEnded && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={resetChat}
                  className="h-8 w-8 rounded-full hover:bg-white/20"
                  title="Start New Chat"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleChat}
                className="h-8 w-8 rounded-full hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="h-[400px] overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  <Markdown>{msg.text}</Markdown>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl bg-gray-100 px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 delay-100"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={endOfMessagesRef} />
          </div>

          <div className="border-t bg-white/50 p-4">
            <div className="flex gap-2">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 bg-white/50 backdrop-blur-sm"
              />
              <Button
                onClick={handleSend}
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 text-white hover:opacity-90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

