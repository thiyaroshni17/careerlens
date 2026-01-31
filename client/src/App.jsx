import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Onboarding from './pages/Onboarding'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import CustomCursor from './components/CustomCursor'
import Path from './pages/Path'
import ResumeAnalyzer from './pages/ResumeAnalyzer'
import SkillAnalyzer from './pages/SkillAnalyzer'
import UserDetails from './pages/UserDetails'
import Dashboard from './pages/Dashboard'
import Analysis from './pages/Analysis'
import HabitTracker from './pages/HabitTracker'
import Tasks from './pages/Tasks'
import CareerGuide from './pages/CareerGuide'

const App = () => {
  return (
    <div>
      <CustomCursor />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/onboarding' element={<Onboarding />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/path' element={<Path />} />
        <Route path='/details' element={<UserDetails />} />
        <Route path='/resume-analyzer' element={<ResumeAnalyzer />} />
        <Route path='/skill-analysis' element={<SkillAnalyzer />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/analysis' element={<Analysis />} />
        <Route path='/habit-tracker' element={<HabitTracker />} />
        <Route path='/tasks' element={<Tasks />} />
        <Route path='/career-guide' element={<CareerGuide />} />
      </Routes>
    </div>
  )
}

export default App