import './App.css'
import { NavLink } from 'react-router-dom';
import ProjectsContainer from './projects/ProjectsContainer';

function App() {

  return (
    <>
      <nav className="bg-slate-50 py-4 flex items-center">
        <h4 className="px-4 text-slate-800">
          Project Showcase
        </h4>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/projects/new">New Project</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      <ProjectsContainer />
    </>
  )
}

export default App
