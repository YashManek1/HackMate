import React, { useState } from "react";
import "../Styles/Sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiBarChart,
  FiChevronDown,
  FiChevronsRight,
  FiDollarSign,
  FiHome,
  FiMonitor,
  FiShoppingCart,
  FiTag,
  FiUsers,
} from "react-icons/fi";
import { motion } from "framer-motion";

export const Sidebar = () => {
  return (
    <div className="flex bg-[#f6ebff]">
      <SidebarLeft />
    </div>
  );
};

const SidebarLeft = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();
  
  // Default to 'dashboard' if on root dashboard route
  const [selected, setSelected] = useState(
    currentPath === 'dashboard' ? 'Dashboard' : 
    currentPath.charAt(0).toUpperCase() + currentPath.slice(1) || 'Dashboard'
  );

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-[#b6cbff] bg-white p-2"
      style={{
        width: open ? "225px" : "fit-content",
        fontFamily: "var(--font-poppins)",
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-1">
        <Option
          Icon={FiHome}
          title="Dashboard"
          path="/dashboard"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={FiUsers}
          title="Community"
          path="/dashboard/community"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={FiDollarSign}
          title="Sales"
          path="/dashboard/sales"
          selected={selected}
          setSelected={setSelected}
          open={open}
          notifs={3}
        />
        <Option
          Icon={FiMonitor}
          title="View Site"
          path="/dashboard/view"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={FiShoppingCart}
          title="Products"
          path="/dashboard/products"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={FiTag}
          title="Tags"
          path="/dashboard/tags"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={FiBarChart}
          title="Analytics"
          path="/dashboard/analytics"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({ Icon, title, path, selected, setSelected, open, notifs }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    setSelected(title);
    navigate(path);
  };
  
  return (
    <motion.button
      layout
      onClick={handleClick}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors font-medium ${
        selected === title 
          ? "bg-[#f6ebff] text-[#340062]" 
          : "text-[#11014c] hover:bg-[#f6ebff] hover:bg-opacity-50"
      }`}
      style={{ fontFamily: "var(--font-dmsans)" }}
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs"
        >
          {title}
        </motion.span>
      )}

      {notifs && open && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          style={{ y: "-50%" }}
          transition={{ delay: 0.5 }}
          className="absolute right-2 top-1/2 size-4 rounded bg-[#340062] text-xs text-white"
        >
          {notifs}
        </motion.span>
      )}
    </motion.button>
  );
};

const TitleSection = ({ open }) => {
  return (
    <div className="mb-3 border-b border-[#b6cbff] pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-[#f6ebff] hover:bg-opacity-50">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              <span className="block text-xs font-semibold text-[#340062]">TomIsLoading</span>
              <span className="block text-xs text-[#11014c]">Pro Plan</span>
            </motion.div>
          )}
        </div>
        {open && <FiChevronDown className="mr-2 text-[#340062]" />}
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md bg-[#340062]"
    >
      <svg
        width="24"
        height="auto"
        viewBox="0 0 50 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-white"
      >
        <path
          d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
          stopColor="#000000"
        ></path>
        <path
          d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
          stopColor="#000000"
        ></path>
      </svg>
    </motion.div>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-[#b6cbff] transition-colors hover:bg-[#f6ebff] hover:bg-opacity-50"
      style={{ fontFamily: "var(--font-dmsans)" }}
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg text-[#340062]"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium text-[#340062]"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};