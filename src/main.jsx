import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '@/layouts/Layout.jsx';
import LecturesPage from '@/pages/Lectures.jsx';
import RecordPage from '@/pages/Record.jsx';
import LectureDetailPage from '@/pages/LectureDetail.jsx';

// Entry point for the React application. Sets up React Router and
// application layout. Routes map page names to components defined in
// the pages directory. The Layout component wraps all pages to provide
// shared navigation and styling.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LecturesPage />} />
          <Route path="/record" element={<RecordPage />} />
          <Route path="/lecture" element={<LectureDetailPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>,
);
