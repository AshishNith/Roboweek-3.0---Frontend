import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Together from 'together-ai';
import * as pdfjs from 'pdfjs-dist/webpack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDF_PATHS = [
  '/docs/roboweek.pdf',
  '/docs/robosoc_information.pdf'
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Initialize Together AI with error handling
  const together = new Together({
    apiKey: import.meta.env.VITE_TOGETHER_API_KEY
  });

  // PDF text extraction function
  const extractTextFromPDF = async (buffer) => {
    try {
      const pdf = await pdfjs.getDocument(buffer).promise;
      let textContent = '';
      
      for(let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const text = await page.getTextContent();
        textContent += text.items.map(item => item.str).join(' ');
      }
      
      return textContent;
    } catch (error) {
      console.error('PDF extraction error:', error);
      return '';
    }
  };

  // Load and process PDF documents
  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const pdfContents = await Promise.all(
          PDF_PATHS.map(async (path) => {
            const response = await fetch(path);
            if (!response.ok) throw new Error('PDF load failed');
            const buffer = await response.arrayBuffer();
            return await extractTextFromPDF(buffer);
          })
        );
        
        setKnowledgeBase(pdfContents.join('\n\n'));
      } catch (error) {
        console.error('Document loading error:', error);
        setKnowledgeBase(`RoboWeek 3.0 Key Information:
        - Dates: March 22-24, 2025
        - Theme: Rise of the Machines
        - Main Events: AI Workshops, RoboRace Championship, Innovation Expo
        
        Robotics Society Overview:
        - Established in 2018
        - 500+ active members
        - Annual technical workshops and competitions`);
      } finally {
        setIsLoading(false);
      }
    };

    loadDocuments();
  }, []);

  const buildSystemPrompt = () => `**RoboAssistant Guidelines**
  You are the official AI assistant for Robotics Society NITH. Follow these rules:

  1. SOURCE MATERIAL: Use only this information:
  ${knowledgeBase}

  2. RESPONSE STYLE:
  - Enthusiastic, professional tone
  - Use bullet points for event details
  - Include 1 relevant emoji per response
  - Keep responses under 150 words

  3. RESTRICTIONS:
  - Never mention other clubs
  - Redirect policy questions to website
  - Decline comparisons/negative queries

  Example Response:
  "🤖 Exciting updates! RoboWeek 3.0 features:
  - Cutting-edge AI workshops
  - ₹50K prize pool competitions
  - Networking with industry leaders
  Register now at our official portal!"`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = { role: 'user', content: inputMessage };
    const systemMessage = { role: 'system', content: buildSystemPrompt() };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await together.chat.completions.create({
        messages: [systemMessage, ...messages, userMessage],
        model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
      });

      const botMessage = {
        role: 'assistant',
        content: response.choices[0].message.content
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '⚠️ Connection error. Please try again later.'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[1000]">
      <motion.div
        className="relative"
        initial={{ scale: 1.0 }}
        animate={{ scale: isOpen ? 1 : .4 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-pink-500 text-white p-8 md:p-16 rounded-full shadow-lg hover:bg-pink-600 transition-all"
          aria-label="Toggle chatbot"
        >
          <FontAwesomeIcon icon={faRobot} className="text-4xl md:text-8xl" />
        </button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-20 right-0 w-[90vw] max-w-[600px] h-[80vh] max-h-[400px] md:w-[150%] md:h-[32rem] bg-black/90 backdrop-blur-lg rounded-xl border border-pink-500 shadow-xl"
          >
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-pink-500 flex items-center justify-between">
                <h3 className="font-squidFont text-pink-400">RoboWeek 3.0</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                  aria-label="Close chatbot"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {isLoading ? (
                  <div className="text-center text-pink-400 animate-pulse">
                    <i className="ri-robot-line text-2xl mb-2"></i>
                    <p>Initializing RoboKnowledge...</p>
                  </div>
                ) : (
                  <>
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[100%] rounded-lg p-3 ${
                            msg.role === 'user'
                              ? 'bg-pink-500/20 border border-pink-500'
                              : 'bg-gray-800/50 border border-gray-700'
                          }`}
                        >
                          <p className="text-sm text-white/80">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex items-center space-x-2 text-gray-400">
                        <div className="dot-flashing"></div>
                      </div>
                    )}
                  </>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSubmit} className="p-4 border-t border-pink-500">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Excited for Roboweek 3.0?"
                    className="flex-1 bg-black/20 border border-pink-500/50 rounded-lg px-3 py-2 text-sm text-white/80 focus:outline-none focus:border-pink-500"
                    disabled={isLoading || isTyping}
                  />
                  <button
                    type="submit"
                    className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-all disabled:opacity-50"
                    disabled={isLoading || isTyping}
                  >
                    <i className="ri-send-plane-line"></i>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ChatBot;