import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";

const Sidebar = ({ menus, initialOpen = true }) => {
  const [open, setOpen] = useState(initialOpen);

  return (
    <div className="flex">
      <div
        className={`bg-[#0286a7] min-h-screen ${
          open ? "w-60" : "w-20"
        } duration-500 text-gray-100 px-4 fixed top-0 left-0 h-full`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      <div
        className={`transition-all duration-500 flex-1 p-4 ${
          open ? "ml-72" : "ml-20"
        }`}
      >
        {/* Conteúdo principal aqui */}
      </div>
    </div>
  );
};

export default Sidebar;
