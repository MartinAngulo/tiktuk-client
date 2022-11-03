import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LayoutContainer } from '../../theme';
import Header from './Header';
import Footer from './Footer';


export default function Layout(props) {
  return (
    <LayoutContainer>
      <nav>
        <Routes>
          <Route path='/videos' element={<nav></nav>} />
          <Route path='/users/login' element={<nav></nav>} />
          <Route path='/users/signup' element={<nav></nav>} />
          <Route path='*' element={<Header />} />
        </Routes>
      </nav>
      <main>
        {props.children}
      </main>
      <Footer />
    </LayoutContainer>
  )
}
