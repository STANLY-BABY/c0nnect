import React from "react";
const stories = [
  {
    name: 'hahaaaaaaaaaaaaaaa',
    img: "https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg",
  },
  {
    name: 'user_Name',
    img: "https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg",
  }, 
  {
    name: 'user_Name',
    img: "https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg",
  }, 
  {
    name: 'user_Name',
    img: "https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg",
  },
  {
    name: 'user_Name',
    img: "https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg",
  },
  {
    name: 'user_Name',
    img: "https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg",
  },
  {
    name: 'user_Name',
    img: "https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg",
  },
  {
    name: 'user_Name',
    img: "https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg",
  },  {
    name: 'user_Name',
    img: "https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg",
  }, 
  {
    name: 'user_Name',
    img: "https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg",
  }, 


];
// function Statusbar() {
//   return <div className="bg-white rounded-xl h-[122px] w-[55rem] flex justify-start overflow-x-auto  ">
//     {
//       stories.map((data)=>{
//         return <div className="mx-2.5  ">
//           <img className="w-16 rounded-full border-2 border-cyan-400  mt-4" src={data.img} alt="" />
//           <p className="text-sm whitespace-nowrap overflow-hidden text-overflow-ellipsis  mt-3">{data.name}</p>
          
//         </div>
//       })
//     }
//   </div>;
// }

function Statusbar() {
  return (
    <div className="bg-white rounded-xl h-[122px] w-[55rem] flex justify-start overflow-x-auto shadow-md shadow-grey-500/40 ">
      {stories.map((data) => (
        <div className="mx-3 text-overflow-ellipsis max-w-[70px]">
          <img
            className="w-16 rounded-full border-2 border-cyan-400 mt-4"
            src={data.img}
            alt=""
          />
          <p className="text-sm whitespace-nowrap overflow-hidden max-w-xs text-overflow-ellipsis truncate ">
            {data.name}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Statusbar;
