"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Menu, X } from "lucide-react";
import CustButton from "./custom-components/CustButton";
import Image from "next/image";
import cypress from "../../public/ferriera.png";

const menuItems = [
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Join",
    href: "#join",
  },
  {
    name: "Contact Us",
    href: "#contact",
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative w-full bg-white rounded-2xl">
      <div className="mx-auto flex max-w-8xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <Image src={cypress} alt="logo" width={50} height={50} />
          </span>
          <span className="font-bold">Fr. Ferrier</span>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-md font-semibold text-gray-800 hover:text-gray-900"
                >
                  {/* {item.name} */}
                  <CustButton label={item.name} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:block">
          <a href="https://www.justdial.com/Agra/Fr-Ferreira-Yoga-and-Nature-Care-Institute-Opposite-Bhuvaneshwari-Kela-Devi-Mandir-Dayal-Bagh/0562PX562-X562-160415113829-M3I9_BZDET">
            <CustButton label="learn-more" />
          </a>
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-5 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span>
                        <Image
                          src={cypress}
                          alt="logo"
                          width={50}
                          height={50}
                        />
                    </span>
                    <span className="font-bold">Ferriera</span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>
                {/* <button
                  className="relative px-4 py-1 mt-4 font-small m-2 rounded-lg bg-indigo-500 text-white w-fit transition shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
                >
                  Save image
                </button> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
