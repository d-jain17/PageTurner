import React from 'react'

import SingleBooksCard from './SingleBooksCard';

function BooksCard({books}) {
  return (
    <div>
        {books.map((book)=>(
             <SingleBooksCard item={book} key={book._id}/>
        ))}
       
    </div>
  )
}

export default BooksCard