'use client'

import { useState } from 'react'
import { Button } from "./button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Label } from "./label"

const questions = [
  {
    question: "What's the occasion?",
    options: ["Birthday", "Anniversary", "Graduation", "Just Because"]
  },
  {
    question: "What's your budget?",
    options: ["Under ₹500", "₹500 - ₹1000", "₹1000 - ₹2000", "Over ₹2000"]
  },
  {
    question: "What's the recipient's age group?",
    options: ["Child", "Teenager", "Adult", "Senior"]
  }
]

export function GiftFinderQuiz() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      alert("Thank you for completing the quiz! We'll find the perfect gift for you.")
      setIsOpen(false)
      setCurrentQuestion(0)
      setAnswers([])
    }
  }

  if (!isOpen) {
    return (
      <Button
        className="fixed bottom-4 right-4 z-50 bg-pink-500 hover:bg-pink-600 text-white"
        onClick={() => setIsOpen(true)}
      >
        Find the Perfect Gift
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50 shadow-lg">
      <CardHeader>
        <CardTitle>Gift Finder Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{questions[currentQuestion].question}</p>
        <RadioGroup onValueChange={handleAnswer}>
          {questions[currentQuestion].options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}

