import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Markdown from "markdown-to-jsx";
import "../../styles/ChatBot.css";

// Define interfaces for type safety
interface Message {
  sender: "user" | "ai";
  text: string;
}

interface UserData {
  name: string;
  occasion: string;
  recipient: string;
  interests: string;
  budget: string;
}

const API_KEY = "AIzaSyC6H43qonao9BCjw2n5S2ImP115W-k0P6o"; // Exposed API key (not recommended for production)

function StationeryGiftChatBot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<number>(0);
  const [userData, setUserData] = useState<UserData>({
    name: "",
    occasion: "",
    recipient: "",
    interests: "",
    budget: "",
  });

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeConversation();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const delay = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const showAiMessageWithDelay = async (text: string): Promise<void> => {
    setIsTyping(true);
    await delay(1000);
    setMessages((prevMessages) => [...prevMessages, { sender: "ai", text }]);
    setIsTyping(false);
  };

  const initializeConversation = async (): Promise<void> => {
    const initialMessages = [
      "Hi there! Let's find the perfect stationery or novelty gift for your loved one.",
      "What's your name?",
    ];

    for (const msg of initialMessages) {
      await showAiMessageWithDelay(msg);
    }

    setStage(0);
  };

  const analyzeInput = (inputText: string): string => {
    const normalizedInput = inputText.toLowerCase();

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
    ];

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
    ];

    const budgetKeywords = [
      "low",
      "medium",
      "high",
      "cheap",
      "expensive",
      "affordable",
    ];

    if (occasionKeywords.some((keyword) => normalizedInput.includes(keyword))) {
      return "occasion";
    }

    if (recipientKeywords.some((keyword) => normalizedInput.includes(keyword))) {
      return "recipient";
    }

    if (budgetKeywords.some((keyword) => normalizedInput.includes(keyword))) {
      return "budget";
    }

    return "off-topic";
  };

  const handleSend = async (): Promise<void> => {
    if (input.trim() === "") return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    setIsTyping(true);

    const inputCategory = analyzeInput(input);

    if (stage === 0) {
      setUserData((prevData) => ({ ...prevData, name: input }));
      await showAiMessageWithDelay("Nice to meet you! What's the occasion?");
      setStage(1);
    } else if (stage === 1) {
      setUserData((prevData) => ({ ...prevData, occasion: input }));
      await showAiMessageWithDelay("Great! Who is this gift for?");
      setStage(2);
    } else if (stage === 2) {
      setUserData((prevData) => ({ ...prevData, recipient: input }));
      await showAiMessageWithDelay("What are their interests or hobbies?");
      setStage(3);
    } else if (stage === 3) {
      setUserData((prevData) => ({ ...prevData, interests: input }));
      await showAiMessageWithDelay("What's your budget for the gift?");
      setStage(4);
    } else if (stage === 4) {
      setUserData((prevData) => ({ ...prevData, budget: input }));

      const prompt = `User Details:
Name: ${userData.name}
Occasion: ${userData.occasion}
Recipient: ${userData.recipient}
Interests: ${userData.interests}
Budget: ${input}

Suggest a stationery or novelty gift based on this information. Focus on items like personalized notebooks, pens, planners, desk organizers, quirky stationery sets, or unique novelty gifts.`;

      try {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
          {
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const aiResponse = response.data.candidates[0].content.parts[0].text;
        await showAiMessageWithDelay(aiResponse);
        await showAiMessageWithDelay(
          "If you need more suggestions or have any questions, feel free to ask!"
        );
        setStage(5);
      } catch (error) {
        console.error("Error communicating with AI:", error);
        await showAiMessageWithDelay("Sorry, I couldn't process your request.");
      }
    } else if (stage === 5) {
      if (inputCategory === "off-topic") {
        await showAiMessageWithDelay(
          "I'm here to assist with stationery and novelty gift suggestions. If you need more ideas, let me know!"
        );
      } else {
        const additionalPrompt = `User wants to ask a follow-up:
${input}

Provide an appropriate response considering the Occasion, Recipient, Interests, and Budget fields.`;

        const prompt = `User Details:
Name: ${userData.name}
Occasion: ${userData.occasion}
Recipient: ${userData.recipient}
Interests: ${userData.interests}
Budget: ${userData.budget}
Follow-up: ${additionalPrompt}`;

        try {
          const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
            {
              contents: [
                {
                  parts: [{ text: prompt }],
                },
              ],
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const followUpResponse =
            response.data.candidates[0].content.parts[0].text;
          await showAiMessageWithDelay(followUpResponse);
        } catch (error) {
          console.error("Error communicating with AI:", error);
          await showAiMessageWithDelay(
            "Sorry, I couldn't process your request."
          );
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div>
      <div className="chatbot-icon" onClick={toggleChat}>
        <img
          src="images/chat.png"
          width="50px"
          height="50px"
          alt="Chatbot Icon"
        />
      </div>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span className="chat-header-name">Stationery & Gift Bot</span>
            <button className="close-btn" onClick={toggleChat}>
              <img
                src="images/close.png"
                width="25px"
                height="25px"
                alt=""
              />
            </button>
          </div>
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <Markdown>{msg.text}</Markdown>
              </div>
            ))}
            {isTyping && (
              <div className="message ai typing">
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
              </div>
            )}
            <div ref={endOfMessagesRef} />
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StationeryGiftChatBot;