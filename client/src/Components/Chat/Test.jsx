import React, { useEffect, useState } from "react";
function CarProfile({name,price}) {
  return <span>
    {name}
    {price}
  </span>;
}
let car = [
  { name: "bmw", price: "1000" },
  { name: "alto", price: "2000" },
  { name: "benz", price: "3000" },
];

function Test() {
    console.log(car);
    
  const [cars, setCars] = useState(null);
  useEffect(() => {
    setCars(car);
  }, []);

  return (
    <div className="bg-white">
        <h1 className="text-black">hiiiiiiiiiiiii</h1>
        {cars.map((item)=>{
            return(
            <CarProfile name={item.name} price={item.price}/>)
        })}
        hiiiiii
    </div>
  );
}

export default Test;
