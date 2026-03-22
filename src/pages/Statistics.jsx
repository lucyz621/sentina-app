import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FeatureBar = ({ title, description, onClick }) => (
  <div 
    onClick={onClick} 
    className="w-full max-w-2xl bg-gradient-to-r from-[#E3F2FD] to-[#F1F8FE] hover:from-[#D1E9FF] hover:to-[#E3F2FD] transition-all duration-200 cursor-pointer rounded-2xl p-8 mb-6 shadow-sm border border-blue-50 group hover:scale-[1.02] active:scale-95"
  >
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-2xl font-bold text-[#1F3A5F] group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-gray-500 mt-1">{description}</p>
      </div>
      <span className="text-2xl text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
    </div>
  </div>
);

// Mock data for chat history and repetitive questions
const MOCK_CHAT_DATA = {
  15: [{ id: 1, topic: "The weather today", repetitive: "Is it raining outside?" }, { id: 2, topic: "Breakfast time", repetitive: null }],
  18: [{ id: 3, topic: "Read me a book", repetitive: "Where is my granddaughter?" }],
  22: [{ id: 5, topic: "Daily greeting", repetitive: null }]
};

// Mock data for safety zone incidents
const MOCK_SAFETY_DATA = { 5: 1, 12: 2, 18: 1, 25: 3 };

export default function Statistics() { 
  const navigate = useNavigate(); 
  
  const [subView, setSubView] = useState('main'); 
  const [selectedDay, setSelectedDay] = useState(null);
  const [activeRepetitiveModal, setActiveRepetitiveModal] = useState(null);
  const [safetyModalDay, setSafetyModalDay] = useState(null);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // ==========================================
  // Main Statistics Menu
  // ==========================================
  if (subView === 'main') {
    return (
      <div className="min-h-screen flex flex-col items-center bg-[#FDFBF7] p-6 relative">
        <button onClick={() => navigate('/dashboard')} className="absolute top-8 left-8 text-[#1F3A5F]/60 hover:text-[#1F3A5F] font-medium text-lg transition-colors">← Back to Dashboard</button>
        
        <div className="relative z-10 pt-24 px-6 w-full max-w-3xl flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1F3A5F] mb-8 text-center tracking-widest uppercase">STATISTICS</h1>
          
          <div className="bg-white p-8 rounded-3xl mb-12 shadow-md border border-gray-100 text-center">
            <p className="text-xl text-[#1F3A5F] font-medium italic leading-relaxed">
              "To the guardian: Your love and patience are the greatest comfort. Sentina is here to share the weight, so you can focus on being together."
            </p>
          </div>
          
          <div className="w-full flex flex-col items-center">
            <FeatureBar title="Chat History" description="Review daily conversations and repetitive questions." onClick={() => setSubView('chat_calendar')} />
            <FeatureBar title="Safety Track" description="Monitor out-of-zone incidents and monthly trends." onClick={() => setSubView('safety_calendar')} />
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // Chat History - Calendar View
  // ==========================================
  if (subView === 'chat_calendar') {
    return (
      <div className="min-h-screen flex flex-col items-center bg-[#FDFBF7] p-6 relative">
        <button onClick={() => setSubView('main')} className="absolute top-8 left-8 text-[#1F3A5F]/60 hover:text-[#1F3A5F] font-medium text-lg transition-colors">← Back</button>
        
        <div className="relative z-10 pt-24 px-6 w-full max-w-4xl flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-[#1F3A5F] mb-2 uppercase tracking-widest">Chat History</h1>
          <p className="text-gray-500 mb-10 uppercase tracking-widest font-medium">Select a date to view logs</p>
          
          <div className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100 w-full">
            <div className="grid grid-cols-7 gap-4 text-center mb-4 text-gray-400 font-bold text-sm">
              <div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div><div>SUN</div>
            </div>
            <div className="grid grid-cols-7 gap-4">
              {days.map(day => {
                const hasData = MOCK_CHAT_DATA[day];
                return (
                  <div key={day} className="aspect-square">
                    <button onClick={() => { setSelectedDay(day); setSubView('chat_daily'); }} 
                            className={`w-full h-full rounded-2xl flex items-center justify-center text-xl font-bold transition-all ${
                              hasData 
                                ? 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-110 shadow-md' 
                                : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                            }`}>
                      {day}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // Chat History - Daily Log View
  // ==========================================
  if (subView === 'chat_daily') {
    const dailyChats = MOCK_CHAT_DATA[selectedDay] || [];
    
    return (
      <div className="min-h-screen flex flex-col items-center bg-[#FDFBF7] p-6 relative">
        <button onClick={() => setSubView('chat_calendar')} className="absolute top-8 left-8 text-[#1F3A5F]/60 hover:text-[#1F3A5F] font-medium text-lg transition-colors">← Back</button>
        
        {/* Repetitive Question Modal */}
        {activeRepetitiveModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setActiveRepetitiveModal(null)}></div>
            <div className="bg-white rounded-3xl p-8 max-w-md w-full relative z-10 shadow-2xl">
              <h3 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">Repetitive Question</h3>
              <p className="text-2xl font-medium text-gray-800 mb-8">"{activeRepetitiveModal}"</p>
              <button onClick={() => setActiveRepetitiveModal(null)} className="w-full bg-[#1F3A5F] text-white py-3 rounded-full font-bold hover:bg-blue-900 transition-colors">Close</button>
            </div>
          </div>
        )}
        
        <div className="relative z-10 pt-24 px-6 w-full max-w-3xl flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-[#1F3A5F] mb-2 uppercase tracking-widest">March {selectedDay}</h1>
          <p className="text-gray-500 mb-10 uppercase tracking-widest font-medium">Daily Interaction Log</p>
          
          <div className="w-full space-y-4">
            {dailyChats.length > 0 ? (
              dailyChats.map(chat => (
                <div key={chat.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow">
                  <div className="flex-1">
                    <span className="text-gray-400 text-sm uppercase tracking-wider block mb-1 font-bold">Topic</span>
                    <span className="text-2xl text-[#1F3A5F] font-bold">{chat.topic}</span>
                  </div>
                  {chat.repetitive ? (
                    <button onClick={() => setActiveRepetitiveModal(chat.repetitive)} className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 px-4 py-2 rounded-full font-bold text-sm transition-colors">⚠️ View Repetitive</button>
                  ) : <span className="text-gray-400 italic text-sm">None</span>}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 mt-20 text-xl font-medium">No chat records for this day.</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // Safety Track View
  // ==========================================
  if (subView === 'safety_calendar') {
    const totalIncidents = Object.values(MOCK_SAFETY_DATA).reduce((a, b) => a + b, 0);
    
    let trend = "STEADY";
    let trendColor = "text-yellow-500";
    if (totalIncidents >= 10) { 
      trend = "INCREASE"; 
      trendColor = "text-red-500"; 
    } else if (totalIncidents <= 5) { 
      trend = "DECREASE"; 
      trendColor = "text-green-500"; 
    }

    return (
      <div className="min-h-screen flex flex-col items-center bg-[#FDFBF7] p-6 relative">
        <button onClick={() => setSubView('main')} className="absolute top-8 left-8 text-[#1F3A5F]/60 hover:text-[#1F3A5F] font-medium text-lg transition-colors">← Back</button>
        
        {/* Safety Popup Modal */}
        {safetyModalDay !== null && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSafetyModalDay(null)}></div>
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full relative z-10 text-center shadow-2xl">
              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-2">March {safetyModalDay}</p>
              <p className="text-lg text-gray-800 mb-2">Out of safety zone incidents:</p>
              <p className="text-5xl font-extrabold text-red-500 mb-8">{MOCK_SAFETY_DATA[safetyModalDay] || "None"}</p>
              <button onClick={() => setSafetyModalDay(null)} className="w-full bg-[#1F3A5F] text-white py-3 rounded-full font-bold hover:bg-blue-900 transition-colors">Close</button>
            </div>
          </div>
        )}

        <div className="relative z-10 pt-24 px-6 w-full max-w-4xl flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-[#1F3A5F] mb-2 uppercase tracking-widest">Safety Track</h1>
          <p className="text-gray-500 mb-8 uppercase tracking-widest font-medium">Incident Calendar</p>
          
          <div className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100 w-full mb-8">
            <div className="grid grid-cols-7 gap-4 text-center mb-4 text-gray-400 font-bold text-sm">
              <div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div><div>SUN</div>
            </div>
            <div className="grid grid-cols-7 gap-4">
              {days.map(day => (
                <div key={day} className="aspect-square">
                  <button onClick={() => setSafetyModalDay(day)} 
                          className={`w-full h-full rounded-2xl text-xl font-bold transition-all ${
                            MOCK_SAFETY_DATA[day] 
                              ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 shadow-sm hover:scale-105' 
                              : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                          }`}>
                    {day}
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white w-full rounded-3xl p-8 flex justify-between items-center shadow-md border border-gray-100">
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-1 font-bold">Monthly Trend</p>
              <p className="text-2xl font-bold text-[#1F3A5F]">Total Incidents: {totalIncidents}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-1 font-bold">Status</p>
              <p className={`text-3xl font-extrabold ${trendColor}`}>{trend}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}