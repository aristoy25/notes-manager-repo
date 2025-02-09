import  { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import NewProject from './components/NewProject.jsx';
import NoProjectSelected from './components/NoProjectSelected.jsx';
import ProjectsSidebar from './components/ProjectsSidebar.jsx';
import SelectedProject from './components/SelectedProject.jsx';

import { useDispatch } from 'react-redux';
import { notesActions } from './store/noteSlice.js';

import { getProjects } from './controller/methods.js';
function App() {

  const projectsState = useSelector(state => state.notes);

  const dispatch = useDispatch();
  
  // Avoid duplicate fetches in Strict Mode by tracking completion
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    getProjects().then(response => {
        response.forEach(project => {
          dispatch(notesActions.addProject(project));
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, [ dispatch ]);

  let content = (
    <SelectedProject />
  );

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar />
      {content}
    </main>
  );
}

export default App;