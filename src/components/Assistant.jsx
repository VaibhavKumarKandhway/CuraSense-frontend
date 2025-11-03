import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../providers/ThemeProvider';

const LightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const DarkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const SystemIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function Assistant(){
  const [question, setQuestion] = useState('');
  const { theme, setTheme } = useTheme();

  const ThemeToggle = () => (
    <div className="theme-toggle">
      <button 
        className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
        onClick={() => setTheme('light')}
      >
        <LightIcon />
      </button>
      <button 
        className={`theme-btn ${theme === 'system' ? 'active' : ''}`}
        onClick={() => setTheme('system')}
      >
        <SystemIcon />
      </button>
      <button 
        className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
        onClick={() => setTheme('dark')}
      >
        <DarkIcon />
      </button>
    </div>
  );

  return (
    <aside className="assistant">
      <div className="assistant-box">
        <div className="assistant-header">
          <h4>Assistant</h4>
          <ThemeToggle />
        </div>
        <div className="chat">
          <div className="bubble question">
            Is Paracetamol safe with Warfarin?
          </div>
          <div className="bubble answer">
            Paracetamol is generally preferred, but keep total dose under 2–3 g/day and consult your doctor.
          </div>
        </div>
        <div className="input-container">
          <input 
            placeholder="Type your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && question.trim() && setQuestion('')}
          />
          <button 
            className={`send-button ${question.trim() ? 'active' : ''}`}
            onClick={() => question.trim() && setQuestion('')}
          >
            <SendIcon />
          </button>
        </div>
        <div className="recent-reports">
          <h5>Recent Reports</h5>
          <ul>
            <li>
              <UserIcon />
              <div className="report-info">
                <span className="report-title">John D. - Pain Management</span>
                <span className="date">Created 2 days ago</span>
              </div>
            </li>
            <li>
              <UserIcon />
              <div className="report-info">
                <span className="report-title">Sara K. - Fever</span>
                <span className="date">Created 3 days ago</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
