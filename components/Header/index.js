"use client";
import Link from "next/link";
import route from "@/route/index";
import { useRouter, usePathname } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/context/auth/authContext";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { BASE_URL } from "@/service/path";
import { color } from "framer-motion";
import { red } from "@material-tailwind/html/theme/base/colors";

const NavItem = ({  href,
  text,
  selected,
  submenuItems,
  isSubmenuOpen,
  setOpenSubmenu,
  closeSubmenu,
  openNestedSubmenu,
  setOpenNestedSubmenu }) => {


  return (
   <div
      className={`relative p-[8px] ${selected ? 'text-[#000000]' : 'text-[#050514]'} hover:text-[#FD3D80]`}
      onMouseEnter={setOpenSubmenu}
      onMouseLeave={closeSubmenu}
    >
      <Link href={href}>
        <div className={`text-[17px] font-[500] leading-[24px] flex ${selected ? 'font-bold text-blue-500' : ''}`}>
    {text}
  </div>
      </Link>

      {/* Main Dropdown submenu */}
      {submenuItems && isSubmenuOpen && (
        <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <ul>
            {submenuItems.map((item) => (
              <li
                key={item.href}
                className="px-4 py-2 hover:bg-gray-100 relative"
                onMouseEnter={() => item.submenuItems && setOpenNestedSubmenu(item.href)}
                onMouseLeave={() => item.submenuItems && setOpenNestedSubmenu(null)}
              >
                <Link href={item.href}>{item.text}</Link>
                {/* Nested submenu */}
                {item.submenuItems && openNestedSubmenu === item.href && (
                  <div className="absolute left-full top-0 mt-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul>
                      {item.submenuItems.map((subItem) => (
                        <li key={subItem.href} className="px-4 py-2 hover:bg-gray-100">
                          <Link href={subItem.href}>{subItem.text}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const Index = () => {
  const [isHover, setIsHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [openNestedSubmenu, setOpenNestedSubmenu] = useState(null);
  const [selectedNavItem, setSelectedNavItem] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const {
    authState: { isLoggedIn, user },
    authFunc: { logOut },
  } = useContext(AuthContext);

  useEffect(() => {
    setSelectedNavItem(path);
    setIsDropdownOpen(false);
  }, [path]);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handlePopover = () => {
    setIsOpen(!isOpen); // toggles the visibility of the popover
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <header className="bg-[#ffffff] w-[100%] fixed z-[999] flex items-center justify-center">
      <nav
        className="flex h-[72px] items-center w-[1380px] justify-between max-xl:w-[80%]"
        aria-label="Global">
        <div className="w-[154px] h-[44px] cursor-pointer max-xl:hidden">
          <img
            src="/assets/icons/mainLogo.svg"
            alt="LOGO"
            width={154}
            onClick={() => router.push(route.home)}
          />
        </div>
        <div className="flex gap-x-8 max-lg:hidden">
          <NavItem
            href={route.campaigns}
            text="Campaigns"
            selected={selectedNavItem === route.campaigns}
          />
          <NavItem
            href={route.news}
            text="News"
            selected={selectedNavItem === route.news}
          />
          <NavItem
            href={route.agency}
            text="Agencies"
            selected={selectedNavItem === route.agency}
          />

          {/* Channels NavItem with Submenu */}
          <NavItem
            href={route.channels}
            text="Traditional Channels"
            selected={selectedNavItem === route.channels}
            submenuItems={[
              { href: "/tv", text: "TV" },
              { href: "/fm", text: "FM" },
              {
                href: "/ooh",
                text: "OOH",
                submenuItems: [
                  { href: "/ooh/way", text: "Зам дагуу" },
                  { href: "/ooh/led", text: "LEDS" },
                  { href: "/ooh/liftboard", text: "LIFTBOARDS" },
                  { href: "/ooh/bus", text: "Autobus" },
                  { href: "/ooh/taxi", text: "Taxi" },
                ],
              },
              {
                href: "/prints",
                text: "Prints",
                submenuItems: [
                  { href: "/prints/newspaper", text: "Гадны хаяг" },
                  { href: "/prints/led", text: "Хэвлэл" },
                  { href: "/prints/liftboard", text: "Сонин" },
                  { href: "/prints/bus", text: "Сэтгүүл" },
                  { href: "/prints/taxi", text: "Сав баглаа" },
                ],
              },
            ]}
            isSubmenuOpen={openSubmenu === "channels"}
            setOpenSubmenu={() => setOpenSubmenu("channels")}
            closeSubmenu={() => setOpenSubmenu(null)}
            openNestedSubmenu={openNestedSubmenu}
            setOpenNestedSubmenu={setOpenNestedSubmenu}
          />

          <NavItem
            href={route.influencers}
            text="Digital Channels"
            selected={selectedNavItem === route.influencers}
          />
          <NavItem
            href={route.resources}
            text="Resources"
            selected={selectedNavItem === route.resources}
          />
          <NavItem
            href={route.events}
            text="Events"
            selected={selectedNavItem === route.events}
          />
          <NavItem
            href="https://www.modash.io/find-influencers/mongolia"
            text="Marketers"
            selected={selectedNavItem === route.marketers}
            target="_blank"
          />
        </div>
        <button
          id="dropdownNavbarLink"
          data-dropdown-toggle="dropdownNavbar"
          className="flex items-center w-full px-3 py-2 text-gray-900 rounded lg:hidden"
          onClick={handleDropdownToggle}>
          Menu
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        <div
          id="dropdownNavbar"
          className={`z-10 ${
            isDropdownOpen ? "" : "hidden"
          } font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute top-[50px]`}>
          <ul className="py-2 text-sm" aria-labelledby="dropdownNavbarLink">
            <NavItem
              href={route.campaigns}
              text="Campaigns"
              selected={selectedNavItem === route.campaigns}
            />
            <NavItem
              href={route.news}
              text="News"
              selected={selectedNavItem === route.news}
            />
            <NavItem
              href={route.agency}
              text="Agencies"
              selected={selectedNavItem === route.agency}
            />
            <NavItem
              href={route.channels}
              text="Channels"
              selected={selectedNavItem === route.channels}
            />
            <NavItem
              href={route.influencers}
              text="Influencers"
              selected={selectedNavItem === route.influencers}
            />
            <NavItem
              href={route.resources}
              text="Resources"
              selected={selectedNavItem === route.resources}
            />
            <NavItem
              href={route.events}
              text="Events"
              selected={selectedNavItem === route.events}
            />
            <NavItem
              href={route.marketers}
              text="Marketers"
              selected={selectedNavItem === route.marketers}
            />
          </ul>
        </div>

        <div className="flex gap-x-[16px]">
          {isLoggedIn ? (
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  onClick={handlePopover}
                  name={user?.name?.substring(0, 1)}
                  src={`${BASE_URL}/file/${
                    user?.photo1?.file_name || user?.photo2?.file_name || ""
                  }`}
                  size="md"
                  isBordered
                  as="button"
                  className="text-[20px] font-serif bg-[#FD3D80] border-[#FD3D80] text-[#FFFFFF] cursor-pointer transition-transform"
                />
              </DropdownTrigger>
              <DropdownMenu
                variant="faded"
                aria-label="Dropdown menu with icons">
                <DropdownItem key="profile" className="gap-2 h-14">
                  <p className="font-semibold text-[10px]">Signed in as</p>
                  <p className="font-semibold text-[10px]">{user?.name}</p>
                </DropdownItem>
                <DropdownItem
                  onClick={() => router.replace(`/${route.myAccount}`)}>
                  My account
                </DropdownItem>
                <DropdownItem onClick={logOut}>Log Out</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <div
              className={`px-[16px] py-[10px] h-[40px] transition-all duration-300 cursor-pointer ${
                isHover ? "bg-[#f7f1f1]" : "bg-[#FD3D80]"
              }`}
              onClick={() => router.push(route.signIn)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
              <p
                className={`text-[14px] font-[600] leading-[20px] ${
                  isHover ? "text-[#FD3D80]" : "text-[#FFFFFF]"
                }`}>
                Sign In
              </p>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Index;
