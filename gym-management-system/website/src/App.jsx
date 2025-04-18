import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import './App.css'

import isAuthenticated from './auth/isAuthenticated'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Common
import Header from './Components/Common/Header'
import Auth from './Components/Common/Auth'
import Profile from './Components/Common/Profile'
import Help from './Components/Common/Help'

import EmployeeList from './Components/V1/EmployeesList'
import Protected from './Components/Common/Protected'
import SubmitAvailabilityForm from './Components/V1/SubmitAvailabilityForm'
import AssignWork from './Components/V1/AssignWork'

function App() {
    const PrivateWrapper = () => {
        return isAuthenticated() ? <Outlet /> : <Navigate to='/auth' />
    }
    return (
        <BrowserRouter>
            <div>
                <Header />
                <ToastContainer />
                <Routes>
                    {/* Common */}
                    <Route exact path='/' element={<Auth />} />
                    <Route exact path='/home' element={<EmployeeList />} />
                    <Route exact path='/help' element={<Help />} />
                    <Route exact path='/profile' element={<Profile />} />

                    {/* Protected */}
                    <Route element={<PrivateWrapper />}>
                        <Route exact path='/protected' element={<Protected />} />
                    </Route>

                    {/* V2 */}
                    <Route exact path='/submit-availability' element={<SubmitAvailabilityForm />} />
                    <Route exact path='/assign-work' element={<AssignWork />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
