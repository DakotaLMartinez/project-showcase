import React     from 'react'
// import PropTypes from 'prop-types'
import { Routes,Route } from 'react-router-dom'

const ProjectsContainer = ({ args }) => {

  return (
    <Routes>
      Working 
      <Route 
        path="/"
        element={<div>Working on home</div>}
      />
      <Route 
        path="/projects/new"
        element={<div>Working on Projects/new</div>}
      />
    </Routes>
  )
}

// ProjectsContainer.propTypes = {
  
// }

export default ProjectsContainer