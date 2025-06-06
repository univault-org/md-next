import { useState } from 'react'

export default function WhiteboardButton({ showOnlyIfRequired = false, whiteboardRequired = false }) {
  const [isOpen, setIsOpen] = useState(false)

  // Don't show button if showOnlyIfRequired is true and whiteboard is not required
  if (showOnlyIfRequired && !whiteboardRequired) {
    return null
  }

  const openWhiteboard = () => {
    const whiteboardWindow = window.open(
      '/whiteboard',
      'pai-whiteboard',
      'width=1200,height=800,scrollbars=no,resizable=yes,toolbar=no,menubar=no,location=no,status=no'
    )
    
    if (whiteboardWindow) {
      setIsOpen(true)
      whiteboardWindow.focus()
      
      // Check if the window is closed
      const checkClosed = setInterval(() => {
        if (whiteboardWindow.closed) {
          setIsOpen(false)
          clearInterval(checkClosed)
        }
      }, 1000)
    } else {
      alert('Please allow popups for this site to use the whiteboard feature!')
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Main Button */}
        <button
          onClick={openWhiteboard}
          className={`group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ${
            whiteboardRequired ? 'animate-pulse' : ''
          }`}
          title={`Open Whiteboard${whiteboardRequired ? ' (Required for this exercise)' : ''}`}
        >
          {isOpen ? (
            <div className="w-6 h-6 flex items-center justify-center">
              <span className="text-lg">📝</span>
            </div>
          ) : (
            <div className="w-6 h-6 flex items-center justify-center">
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
                />
              </svg>
            </div>
          )}
        </button>

        {/* Status indicator */}
        {isOpen && (
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
        )}

        {/* Required badge */}
        {whiteboardRequired && (
          <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Required
          </div>
        )}

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
          <div className="bg-black text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
            {isOpen ? 'Whiteboard is open' : 'Open Whiteboard'}
            {whiteboardRequired && !isOpen && (
              <div className="text-red-300 text-xs mt-1">Required for this exercise</div>
            )}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
          </div>
        </div>
      </div>

      {/* Helpful hint for first-time users */}
      {whiteboardRequired && !isOpen && (
        <div className="absolute bottom-16 right-0 bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-lg shadow-lg max-w-xs">
          <div className="flex items-start space-x-2">
            <span className="text-lg">💡</span>
            <div>
              <p className="font-semibold text-sm">Whiteboard Recommended!</p>
              <p className="text-xs mt-1">
                This exercise works best with visual diagrams and notes. Click to open your whiteboard workspace.
              </p>
            </div>
          </div>
          <div className="absolute bottom-full right-8 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-yellow-200"></div>
        </div>
      )}
    </div>
  )
} 