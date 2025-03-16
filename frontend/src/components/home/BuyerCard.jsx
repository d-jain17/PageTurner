import React from 'react'

import SingleBuyerCard from '../home/SingleBuyerCard'

function BooksCard({books}) {
  return (
    <div className="flex flex-wrap gap-4">
        {books.map((book)=>(
             <SingleBuyerCard item={book} key={book._id}/>
        ))}
       
    </div>
  )
}

export default BooksCard