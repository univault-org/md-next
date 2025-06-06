import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'

// Dynamically import Excalidraw with CSS to avoid SSR issues
const Excalidraw = dynamic(
  async () => {
    // Import CSS first
    await import('@excalidraw/excalidraw/index.css')
    // Then import the component
    const { Excalidraw } = await import('@excalidraw/excalidraw')
    return { default: Excalidraw }
  },
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Whiteboard...</p>
        </div>
      </div>
    )
  }
)

export default function Whiteboard() {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null)
  const [isClient, setIsClient] = useState(false)
  const [showQuickTips, setShowQuickTips] = useState(true)

  useEffect(() => {
    setIsClient(true)
    
    // Check if user has dismissed tips before
    const tipsShown = localStorage.getItem('pai-whiteboard-tips-shown')
    if (tipsShown === 'false') {
      setShowQuickTips(false)
    }
    
    // Set up auto-save to localStorage
    const interval = setInterval(() => {
      if (excalidrawAPI) {
        const elements = excalidrawAPI.getSceneElements()
        const appState = excalidrawAPI.getAppState()
        
        localStorage.setItem('pai-whiteboard-elements', JSON.stringify(elements))
        localStorage.setItem('pai-whiteboard-appstate', JSON.stringify({
          viewBackgroundColor: appState.viewBackgroundColor,
          currentItemStrokeColor: appState.currentItemStrokeColor,
          currentItemBackgroundColor: appState.currentItemBackgroundColor,
          currentItemFillStyle: appState.currentItemFillStyle,
          currentItemStrokeWidth: appState.currentItemStrokeWidth,
          currentItemStrokeStyle: appState.currentItemStrokeStyle,
          currentItemRoughness: appState.currentItemRoughness,
          currentItemOpacity: appState.currentItemOpacity,
          currentItemFontFamily: appState.currentItemFontFamily,
          currentItemFontSize: appState.currentItemFontSize,
          currentItemTextAlign: appState.currentItemTextAlign,
          currentItemStartArrowhead: appState.currentItemStartArrowhead,
          currentItemEndArrowhead: appState.currentItemEndArrowhead,
        }))
      }
    }, 5000) // Auto-save every 5 seconds

    return () => clearInterval(interval)
  }, [excalidrawAPI])

  // Load saved data on mount
  const getInitialData = () => {
    if (typeof window === 'undefined') return { elements: [], appState: {} }
    
    try {
      const savedElements = localStorage.getItem('pai-whiteboard-elements')
      const savedAppState = localStorage.getItem('pai-whiteboard-appstate')
      
      return {
        elements: savedElements ? JSON.parse(savedElements) : [],
        appState: savedAppState ? JSON.parse(savedAppState) : {
          viewBackgroundColor: "#ffffff",
          currentItemStrokeColor: "#1e1e1e",
          currentItemBackgroundColor: "transparent",
          currentItemFillStyle: "hachure",
          currentItemStrokeWidth: 1,
          currentItemStrokeStyle: "solid",
          currentItemRoughness: 1,
          currentItemOpacity: 100,
          currentItemFontFamily: 1,
          currentItemFontSize: 20,
          currentItemTextAlign: "left",
          currentItemStartArrowhead: null,
          currentItemEndArrowhead: "arrow",
        }
      }
    } catch (error) {
      console.error('Error loading whiteboard data:', error)
      return { elements: [], appState: {} }
    }
  }

  const clearWhiteboard = () => {
    if (excalidrawAPI) {
      excalidrawAPI.updateScene({ elements: [] })
      localStorage.removeItem('pai-whiteboard-elements')
      localStorage.removeItem('pai-whiteboard-appstate')
    }
  }

  const downloadWhiteboard = () => {
    if (excalidrawAPI) {
      const elements = excalidrawAPI.getSceneElements()
      const dataStr = JSON.stringify(elements, null, 2)
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
      
      const exportFileDefaultName = `pai-whiteboard-${new Date().toISOString().split('T')[0]}.json`
      
      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', exportFileDefaultName)
      linkElement.click()
    }
  }

  const dismissQuickTips = () => {
    setShowQuickTips(false)
    localStorage.setItem('pai-whiteboard-tips-shown', 'false')
  }

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Whiteboard...</p>
        </div>
      </div>
    )
  }

  const initialData = getInitialData()

  return (
    <>
      <Head>
        <title>PAI Training Whiteboard</title>
        <meta name="description" content="Visual whiteboard for PAI training notes and diagrams" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Custom styles for whiteboard */}
      <style jsx global>{`
        /* Ensure Excalidraw takes full height */
        .excalidraw-wrapper {
          height: 100%;
          width: 100%;
        }
        
        /* Fix any z-index issues */
        .excalidraw .App-menu {
          z-index: 1000;
        }
        
        /* Ensure proper canvas sizing */
        .excalidraw .excalidraw-container {
          height: 100% !important;
          width: 100% !important;
        }
        
        /* Style the header buttons better */
        .whiteboard-header-btn {
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
          font-weight: 500;
        }
        
        .whiteboard-header-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        
        /* Quick tips close button animation */
        .quick-tips-close-btn {
          transition: all 0.2s ease;
        }
        
        .quick-tips-close-btn:hover {
          transform: scale(1.1);
          background-color: rgba(220, 38, 38, 0.1);
        }
      `}</style>

      <div className="h-screen flex flex-col bg-white overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 flex items-center justify-between shadow-lg flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <span className="text-blue-600 font-bold text-lg">🧠</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">PAI Training Whiteboard</h1>
              <p className="text-blue-100 text-sm">Visual learning workspace</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {!showQuickTips && (
              <button
                onClick={() => setShowQuickTips(true)}
                className="whiteboard-header-btn bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium"
                title="Show quick tips"
              >
                💡 Tips
              </button>
            )}
            <button
              onClick={clearWhiteboard}
              className="whiteboard-header-btn bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium"
              title="Clear whiteboard"
            >
              🗑️ Clear
            </button>
            <button
              onClick={downloadWhiteboard}
              className="whiteboard-header-btn bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm font-medium"
              title="Download whiteboard"
            >
              💾 Save
            </button>
            <button
              onClick={() => window.close()}
              className="whiteboard-header-btn bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm font-medium"
              title="Close whiteboard"
            >
              ✕ Close
            </button>
          </div>
        </div>

        {/* Excalidraw Canvas */}
        <div className="flex-1 relative overflow-hidden">
          <div className="excalidraw-wrapper">
            <Excalidraw
              excalidrawAPI={(api) => setExcalidrawAPI(api)}
              initialData={{
                elements: initialData.elements,
                appState: {
                  ...initialData.appState,
                  zenModeEnabled: false,
                  gridSize: null,
                  theme: "light"
                }
              }}
            />
          </div>
          
          {/* Closable Quick Tips overlay */}
          {showQuickTips && initialData.elements.length === 0 && (
            <div className="absolute top-6 left-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-5 max-w-sm shadow-lg z-50 animate-fadeIn">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-blue-800 text-lg">💡 Quick Tips</h3>
                <button
                  onClick={dismissQuickTips}
                  className="quick-tips-close-btn ml-2 text-red-500 hover:text-red-700 p-1 rounded-full"
                  title="Close tips"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <ul className="text-sm text-blue-700 space-y-2">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span>Draw neural network diagrams</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span>Take visual notes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span>Sketch learning concepts</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Auto-saves every 5 seconds</span>
                </li>
              </ul>
              <div className="mt-3 text-xs text-blue-600 italic">
                This overlay won't show next time you open the whiteboard.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-100 border-t px-6 py-3 text-center text-sm text-gray-600 flex-shrink-0">
          <div className="flex items-center justify-center space-x-4">
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Auto-saving</span>
            </span>
            <span>•</span>
            <span>Keep this window open while learning</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <span>📝</span>
              <span>Perfect for visual learners!</span>
            </span>
          </div>
        </div>
      </div>
    </>
  )
} 