import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ArrowRight, MessageSquare, X } from 'lucide-react';

const WebsiteTourGuide = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const controls = useAnimation();
  const characterRef = useRef(null);

  // Website sections data
  const sections = [
    { id: 'hero', message: "Welcome to our website! Let me show you around!" },
    { id: 'features', message: "Check out these amazing features we offer!" },
    { id: 'projects', message: "Here's some of our best work. Impressive, right?" },
    { id: 'contact', message: "Get in touch with us anytime!" }
  ];

  // Messages and behaviors
  const messages = [
    "Hi there! I'm your tour guide!",
    "This is my favorite website!",
    "Let me show you something cool!",
    "Did you know about this section?",
    "I can get behind elements too! Watch this!",
    "Boo! I popped up again!",
    "Scroll down to see where I'll appear next!"
  ];

  // Random movement and behavior
  useEffect(() => {
    if (!isVisible) return;

    const behaviorInterval = setInterval(() => {
      // Randomly change sections
      if (Math.random() > 0.7) {
        const nextSection = (currentSection + 1) % sections.length;
        setCurrentSection(nextSection);
      }

      // Randomly speak
      if (Math.random() > 0.5) {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        setCurrentMessage(randomMessage);
        setIsSpeaking(true);
        
        setTimeout(() => {
          setIsSpeaking(false);
        }, 3000);
      }

      // Random animations
      const behaviors = ['wave', 'jump', 'spin', 'hideBehind', 'peekOver'];
      const randomBehavior = behaviors[Math.floor(Math.random() * behaviors.length)];
      
      switch(randomBehavior) {
        case 'wave':
          controls.start({
            rotate: [0, 15, -15, 15, -15, 0],
            transition: { duration: 1 }
          });
          break;
        case 'jump':
          controls.start({
            y: [0, -40, 0],
            transition: { duration: 0.7 }
          });
          break;
        case 'spin':
          controls.start({
            rotate: 360,
            transition: { duration: 1 }
          });
          break;
        case 'hideBehind':
          controls.start({
            zIndex: -1,
            opacity: 0.7,
            scale: 0.8,
            transition: { duration: 0.5 }
          });
          setTimeout(() => {
            controls.start({
              zIndex: 50,
              opacity: 1,
              scale: 1,
              transition: { duration: 0.5 }
            });
          }, 2000);
          break;
        case 'peekOver':
          controls.start({
            y: -30,
            transition: { duration: 0.3 }
          });
          setTimeout(() => {
            controls.start({
              y: 0,
              transition: { duration: 0.3 }
            });
          }, 1000);
          break;
      }
    }, 5000);

    return () => clearInterval(behaviorInterval);
  }, [isVisible, currentSection, controls]);

  // Move to current section
  useEffect(() => {
    if (!isVisible) return;
    
    const section = document.getElementById(sections[currentSection].id);
    if (section) {
      const rect = section.getBoundingClientRect();
      setCurrentMessage(sections[currentSection].message);
      setIsSpeaking(true);
      
      setTimeout(() => {
        setIsSpeaking(false);
      }, 3000);

      controls.start({
        x: rect.left + rect.width/2 - 40,
        y: rect.top + rect.height/2 - 40,
        transition: { type: 'spring', stiffness: 100 }
      });
    }
  }, [currentSection, isVisible]);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={characterRef}
            className="fixed z-50 cursor-pointer w-20 h-20"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={controls}
            exit={{ opacity: 0, scale: 0.5 }}
            drag
            dragConstraints={characterRef}
            whileHover={{ scale: 1.1 }}
            onClick={() => {
              setCurrentSection((prev) => (prev + 1) % sections.length);
            }}
          >
            {/* Character - replace with your own design */}
            <div className="relative w-full h-full">
              <div className="absolute w-full h-full bg-purple-600 rounded-full flex items-center justify-center">
                <div className="text-white text-4xl">🧙‍♂️</div>
              </div>
              
              {/* Next section arrow */}
              <motion.div 
                className="absolute -right-2 -top-2 bg-yellow-400 rounded-full p-1 shadow-md"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4 text-white" />
              </motion.div>
            </div>

            {/* Speech bubble */}
            <AnimatePresence>
              {isSpeaking && (
                <motion.div
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 bg-white text-black text-sm px-3 py-2 rounded-lg shadow-lg max-w-xs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-start">
                    <MessageSquare className="w-4 h-4 mt-1 mr-2 text-purple-600 flex-shrink-0" />
                    <p>{currentMessage}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-50 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
      >
        {isVisible ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
      </button>
    </>
  );
};

export default WebsiteTourGuide;