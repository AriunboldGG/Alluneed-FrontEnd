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
import Image from "next/image";
import { useBag } from '@/context/BagContext';
import BagModal from './BagModal';

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
        <div className={`text-[15px] font-[500] leading-[24px] flex cursor-pointer ${selected ? 'font-bold text-blue-500' : ''}`}>
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
                {item.text === "OOH" && item.submenuItems ? (
                  <span className="text-[15px] font-[500] leading-[24px] flex cursor-default select-none opacity-70">{item.text}</span>
                ) : (
                  <Link href={item.href}>{item.text}</Link>
                )}
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
  const [isBagModalOpen, setIsBagModalOpen] = useState(false);

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { bag } = useBag();

  // Debug authentication state
  console.log('Header - isLoggedIn:', isLoggedIn);
  console.log('Header - user:', user);
  console.log('Header - authState:', { isLoggedIn, user });

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
    <header className="bg-[#ffffff] w-full fixed z-[999] flex items-center justify-center shadow-sm">
      <nav className="flex h-[72px] items-center w-full max-w-screen-2xl justify-between px-2 sm:px-4 md:px-8">
        <div className="w-[154px] h-[44px] cursor-pointer flex-shrink-0">
          <Image
            src="/assets/icons/mainLogo.svg"
            alt="LOGO"
            width={154}
            height={44}
            priority
            style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
            onClick={() => router.push(route.home)}
          />
        </div>
        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-x-4 items-center flex-1">
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
          <div
            className={`relative p-[8px] text-[#050514] hover:text-[#FD3D80]`}
            onMouseEnter={() => setOpenSubmenu("channels")}
            onMouseLeave={() => setOpenSubmenu(null)}
          >
            <div className="text-[15px] font-[500] leading-[24px] flex cursor-default select-none">
              Traditional Channels
            </div>
            {openSubmenu === "channels" && (
              <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <ul>
                  {[{ href: "/tv", text: "TV" }, { href: "/fm", text: "FM" }, {
                    href: "/ooh",
                    text: "OOH",
                    submenuItems: [
                      { href: "/ooh/way", text: "Зам дагуу" },
                      { href: "/ooh/led", text: "LEDS" },
                      { href: "/ooh/liftboard", text: "LIFTBOARDS" },
                      { href: "/ooh/bus", text: "Autobus" },
                      { href: "/ooh/taxi", text: "Taxi" },
                    ],
                  }, {
                    href: "/prints",
                    text: "Prints",
                    submenuItems: [
                      { href: "/prints/newspaper", text: "Гадны хаяг" },
                      { href: "/prints/led", text: "Хэвлэл" },
                      { href: "/prints/liftboard", text: "Сонин" },
                      { href: "/prints/bus", text: "Сэтгүүл" },
                      { href: "/prints/taxi", text: "Сав баглаа" },
                    ],
                  }].map((item) => (
                    <li
                      key={item.href}
                      className="px-4 py-2 hover:bg-gray-100 relative"
                      onMouseEnter={() => item.submenuItems && setOpenNestedSubmenu(item.href)}
                      onMouseLeave={() => item.submenuItems && setOpenNestedSubmenu(null)}
                    >
                      {item.text === "OOH" && item.submenuItems ? (
                        <span className="text-[15px] font-[500] leading-[24px] flex cursor-default select-none opacity-70">{item.text}</span>
                      ) : (
                        <Link href={item.href}>{item.text}</Link>
                      )}
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
          <NavItem
            href="/ai-tools"
            text="AI Tools"
            selected={selectedNavItem === "/ai-tools"}
          />
        </div>
        {/* Bag Icon/Button */}
        <button
          className="relative ml-4 flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition"
          aria-label="Open bag"
          onClick={() => setIsBagModalOpen(true)}
        >
          {/* Bag SVG icon */}
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-gray-700">
            <path d="M6 7V6a6 6 0 1 1 12 0v1" />
            <rect width="18" height="13" x="3" y="7" rx="2" />
          </svg>
          {/* Badge */}
          {bag.length > 0 && (
            <span className="absolute top-1 right-1 bg-pink-600 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">
              {bag.length}
            </span>
          )}
        </button>
        {/* Desktop Sign In/User */}
        <div className="hidden lg:flex items-center ml-4">
          {isLoggedIn ? (
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  onClick={handlePopover}
                  name={user?.name?.substring(0, 1)}
                  src={`${BASE_URL}/file/${user?.photo1?.file_name || user?.photo2?.file_name || ""}`}
                  size="md"
                  isBordered
                  as="button"
                  className="text-[20px] font-serif bg-[#FD3D80] border-[#FD3D80] text-[#FFFFFF] cursor-pointer transition-transform"
                />
              </DropdownTrigger>
              <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
                <DropdownItem key="profile" className="gap-2 h-14">
                  <p className="font-semibold text-[10px]">Signed in as</p>
                  <p className="font-semibold text-[10px]">{user?.name}</p>
                </DropdownItem>
                <DropdownItem onClick={(e) => { e.stopPropagation(); router.replace(route.myAccount); }}>
                  My account
                </DropdownItem>
                <DropdownItem key="divider" className="h-px bg-gray-200 my-1" disabled />
                <DropdownItem onClick={logOut} className="text-danger" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <button
              className="px-6 py-2 bg-[#FD3D80] text-white font-semibold rounded-lg hover:bg-[#e13c6e] transition"
              onClick={() => router.push(route.signIn)}
            >
              Sign In
            </button>
          )}
        </div>
        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex items-center px-3 py-2 border rounded text-[#8557F4] border-[#8557F4]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Open main menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </nav>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-white shadow-md absolute top-[72px] left-0 z-50">
          <div className="flex flex-col gap-4 p-4">
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
            <NavItem
              href="/ai-tools"
              text="AI Tools"
              selected={selectedNavItem === "/ai-tools"}
            />
            {!isLoggedIn && (
              <button
                className="mt-4 px-6 py-2 bg-[#FD3D80] text-white font-semibold rounded-lg hover:bg-[#e13c6e] transition"
                onClick={() => { setMobileMenuOpen(false); router.push(route.signIn); }}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
      {/* Bag Modal */}
      <BagModal 
        isOpen={isBagModalOpen} 
        onClose={() => setIsBagModalOpen(false)} 
      />
    </header>
  );
};
export default Index;
