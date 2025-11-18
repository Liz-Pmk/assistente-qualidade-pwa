import React, { useState } from 'react'
import Home from './screens/Home'
import Login from './screens/Login'
import Dashboard from './screens/Dashboard'
import SelectContext from './screens/SelectContext'
import Checklist from './screens/Checklist'
import ChecklistRun from './screens/ChecklistRun'
import Summary from './screens/Summary'
import History from './screens/History'
import SupportWidget from './components/SupportWidget'

const SCREENS = {
  HOME: 'HOME',
  LOGIN: 'LOGIN',
  DASHBOARD: 'DASHBOARD',
  SELECT_CONTEXT: 'SELECT_CONTEXT',
  CHECKLIST_LIST: 'CHECKLIST_LIST',
  CHECKLIST_RUN: 'CHECKLIST_RUN',
  SUMMARY: 'SUMMARY',
  HISTORY: 'HISTORY'
}

export default function App() {
  const [screen, setScreen] = useState(SCREENS.HOME)
  const [selectedChecklist, setSelectedChecklist] = useState(null)
  const [checklistResult, setChecklistResult] = useState(null)

  const goTo = (next) => setScreen(next)

  const handleStartFromHome = () => {
    goTo(SCREENS.LOGIN)
  }

  const handleLoginSuccess = () => {
    goTo(SCREENS.DASHBOARD)
  }

  const handleNewChecklistFlow = () => {
    goTo(SCREENS.SELECT_CONTEXT)
  }

  const handleContextSelected = () => {
    goTo(SCREENS.CHECKLIST_LIST)
  }

  const handleChecklistSelected = (checklist) => {
    setSelectedChecklist(checklist)
    goTo(SCREENS.CHECKLIST_RUN)
  }

  const handleChecklistCompleted = (result) => {
    setChecklistResult(result)
    goTo(SCREENS.SUMMARY)
  }

  const handleViewHistory = () => {
    goTo(SCREENS.HISTORY)
  }

  const handleBackToDashboard = () => {
    goTo(SCREENS.DASHBOARD)
  }

  const renderScreen = () => {
    switch (screen) {
      case SCREENS.HOME:
        return (
          <Home
            onStartChecklist={handleStartFromHome}
            onViewHistory={handleViewHistory}
          />
        )
      case SCREENS.LOGIN:
        return <Login onLoginSuccess={handleLoginSuccess} />
      case SCREENS.DASHBOARD:
        return (
          <Dashboard
            onNewChecklist={handleNewChecklistFlow}
            onHistory={handleViewHistory}
          />
        )
      case SCREENS.SELECT_CONTEXT:
        return (
          <SelectContext
            onBack={handleBackToDashboard}
            onConfirm={handleContextSelected}
          />
        )
      case SCREENS.CHECKLIST_LIST:
        return (
          <Checklist
            onBack={handleBackToDashboard}
            onSelectChecklist={handleChecklistSelected}
          />
        )
      case SCREENS.CHECKLIST_RUN:
        return (
          <ChecklistRun
            checklist={selectedChecklist}
            onBack={handleBackToDashboard}
            onComplete={handleChecklistCompleted}
          />
        )
      case SCREENS.SUMMARY:
        return (
          <Summary
            result={checklistResult}
            onBackToDashboard={handleBackToDashboard}
          />
        )
      case SCREENS.HISTORY:
        return <History onBack={handleBackToDashboard} />
      default:
        return null
    }
  }

  return (
    <div className="app-shell">
      {renderScreen()}
      <SupportWidget />
    </div>
  )
}
