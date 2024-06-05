"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { MdMenu } from "react-icons/md";
import Image from "next/image";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(".sidebar") &&
        !event.target.closest(".menu-button") &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div
        className={`fixed z-50 inset-y-0 left-0 bg-gray-800 text-white w-64 p-4 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out md:translate-x-0 sidebar`}
      >
        <div className="mb-8">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={200}
            height={200}
            className="w-full rounded-lg"
          />
          <h2 className="text-2xl font-bold mb-2 text-center">
            Country Explorer
          </h2>
        </div>
        <hr className="border-gray-600 mb-4" />
        <nav className="space-y-4">
          <Link
            href="/"
            className="block px-4 py-2 rounded hover:bg-gray-500"
            onClick={handleLinkClick}
          >
            Home
          </Link>
          <Link
            href="/vista-1"
            className="block px-4 py-2 rounded hover:bg-gray-500"
            onClick={handleLinkClick}
          >
            Vista 1
          </Link>
          <Link
            href="/vista-2"
            className="block px-4 py-2 rounded hover:bg-gray-500"
            onClick={handleLinkClick}
          >
            Vista 2
          </Link>
        </nav>
      </div>
      {isOpen && (
        <button
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-label="Close sidebar"
        ></button>
      )}
      <div
        className={`fixed md:hidden z-20 inset-x-0 top-0 bg-gray-800 text-white h-16 p-3`}
      >
        <button
          className="fixed md:hidden text-white rounded p-1 z-30 m-auto menu-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open menu"
          onKeyDown={handleKeyDown}
        >
          <MdMenu className="w-8 h-8" />
        </button>
      </div>
    </>
  );
};

export default Sidebar;
