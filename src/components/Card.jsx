import React from 'react';

function Card({ name, sprite }) {
  return (
    <div className="text-center shadow-xl border-black border rounded-3xl  hover:cursor-pointer hover:scale-105 transition-all active:scale-100">
      <img src={sprite} alt="" className="h-36" />
      <h3 className="text-2xl pb-1">{name}</h3>
    </div>
  );
}

export default Card;
