import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CollectionsArchive from './Pages/CollectionsArchive';
import HomepageSearch from './Pages/HomepageSearch';
import PaperDetails from './Pages/PaperDetails';
import ResearcherLogin from './Pages/ResearcherLogin';
import ResearcherProfile from './Pages/ResearcherProfile';
import ResearcherRegistration from './Pages/ResearcherRegistration';
import SearchResults from './Pages/SearchResults';
import SubmitManuscript from './Pages/SubmitManuscript';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomepageSearch />} />
        <Route path="/collections" element={<CollectionsArchive />} />
        <Route path="/collections/archive" element={<CollectionsArchive />} />
        <Route path="/collections/institutions" element={<CollectionsArchive />} />
        <Route path="/collections/curations" element={<CollectionsArchive />} />
        <Route path="/journals" element={<PaperDetails />} />
        <Route path="/paper/:id" element={<PaperDetails />} />
        <Route path="/login" element={<ResearcherLogin />} />
        <Route path="/profile" element={<ResearcherProfile />} />
        <Route path="/register" element={<ResearcherRegistration />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/submit" element={<SubmitManuscript />} />
      </Routes>
    </Router>
  );
}

export default App;
