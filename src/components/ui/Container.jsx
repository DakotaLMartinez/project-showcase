import React from 'react'

function Container({children}) {
  return (
    <section className="max-w-6xl mx-auto pt-16 pb-4 sm:py-8 mt-6">{children}</section>
  );
}

export default Container