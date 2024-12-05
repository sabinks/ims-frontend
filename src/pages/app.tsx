import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  HomeIcon,
  MenuAlt2Icon,
  XIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { Fragment, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PageRoutes } from "../enums/routes.enum";
import { classNames } from "../utils";

export default function MainApp() {
  const APP_NAME = import.meta.env.VITE_APP_NAME;
  const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

  const navigation = [
    {
      name: "Dashboard",
      href: PageRoutes.DASHBOARD,
      icon: HomeIcon,
    },
  ];

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  return (
    <>
      <div onClick={() => setQuery("")}>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-primary">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <p className="font-extrabold text-white px-3 text-sm text-center">
                    {APP_NAME}
                  </p>
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {navigation.map((item: any) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          classNames(
                            isActive
                              ? "bg-secondary text-white font-semibold"
                              : " text-green-50  hover:font-semibold",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )
                        }
                        onClick={(e: any) => setSidebarOpen(false)}
                      >
                        <item.icon
                          className="mr-4 flex-shrink-0 h-6 w-6  "
                          aria-hidden="true"
                        />
                        {item.name}
                      </NavLink>
                    ))}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-10 xl:w-56 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow pt-5 bg-primary overflow-y-auto">
            <a
              href={FRONTEND_URL}
              className="flex flex-col items-start flex-shrink-0 px-2 just space-y-2"
            >
              <p className="font-semibold text-white text-md hidden xl:block">
                {APP_NAME}
              </p>
            </a>
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-1 pb-2 space-y-1">
                {navigation.map((item: any) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? "bg-secondary text-white font-semibold "
                          : "hover:text-white text-green-50 hover:bg-secondary hover:font-semibold",
                        "group flex items-center px-1 py-1.5 text-base rounded-md"
                      )
                    }
                  >
                    <item.icon
                      className="mr-3 flex-shrink-0 h-5 w-5  hover:text-white "
                      aria-hidden="true"
                    />
                    <span className="hidden xl:block">{item.name}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="md:pl-10 xl:pl-56 flex flex-col">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-12 bg-white shadow">
            <div className="flex-1 px-1 flex justify-between items-center border">
              <div className="flex-1 flex"></div>
              <div className="ml-4 flex items-center md:ml-6"></div>
            </div>
          </div>

          <main>
            <div className="">
              <div className="max-w-full sm:px-6 md:px-2 py-2 bg-slate-100 min-h-screen">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
