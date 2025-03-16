import React, { useState, useEffect } from "react";
import { BiShow, BiUserCircle } from "react-icons/bi";
import { PiBookOpenTextLight } from "react-icons/pi";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import BookModal from "./BookModal";
import axios from "axios";

function SingleCartCard({ item }) {
  const [showModal, setShowModal] = useState(false);
  const [book, setBook] = useState(null);
  const [quantity, setQuantity]= useState(item.quantity)
  useEffect(() => {
    if (!item.productId) return;

    axios
      .get(`http://localhost:5555/books/${item.productId}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
      });
  }, [item.productId]);

  return (
    <div className="border-2 border-gray-500 w-lg rounded-lg px-4 py-2 m-4 relative hover:shadow-xl">
      {/* Conditional Rendering to avoid null errors */}
      {book ? (
        <>
          <h2 className="absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg">
            {book.publishYear}
          </h2>
          <h4 className="my-2 text-gray-500">{item.productId}</h4>
          <div className="flex justify-start items-center gap-x-2">
            <PiBookOpenTextLight className="text-red-200 text-2xl" />
            <h2 className="my-1">{book.title}</h2>
          </div>
          <div className="flex justify-start items-center gap-x-2">
            <BiUserCircle className="text-red-300 text-2xl" />
            <h2 className="my-1">{item.author}</h2>
          </div>
        </>
      ) : (
        <p>Loading book details...</p>
      )}

      <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
       <h3>Quantity: {quantity}</h3>
       <div className="flex justify-between gap-2">
        <button className="bg-blue-500 p-3 cursor-pointer text-white rounded-lg hover:bg-blue-300">
        <CiSquarePlus onClick={() => setQuantity((prevQtty) => prevQtty + 1)} />
        </button>
        <button className="bg-blue-500 p-3 cursor-pointer text-white rounded-lg hover:bg-blue-300">
        <CiSquareMinus onClick={() => setQuantity((prevQtty) => prevQtty - 1)}/>
        </button>
        </div>
      </div>
      

    </div>
  );
}

export default SingleCartCard;
