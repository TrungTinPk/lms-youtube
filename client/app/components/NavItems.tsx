import Link from "next/link";
import React from "react";
type Props = {
    activeItem: number;
    isMobile: boolean;
};

export const navItemsData = [
    {
        id: 1,
        name: "Home",
        url: "/",
    },
    {
        id: 2,
        name: "Courses",
        url: "/courses",
    },
    {
        id: 3,
        name: "About",
        url: "/about",
    },
    {
        id: 4,
        name: "Policy",
        url: "/policy",
    },
    {
        id: 5,
        name: "FAQ",
        url: "/faq"
    }
];


const NavItems: React.FC<Props> = ({activeItem, isMobile}) => {
  return (
    <>
        <div className="hidden 800px:flex">
            {
                navItemsData && navItemsData.map((item, index) => (
                    <Link href={item.url} key={index} passHref>
                        <span className={`${ activeItem === item.id ? "dark:text-[#37a39a] text-[crimson]" : "dark:text-white dark:text-black"} text-[18px] px-6 font-Poppins font-[400]`}>
                            {item.name}
                        </span>
                    </Link>
                ))
            }
        </div>
        {
            isMobile && (
                <div className="flex 800px:hidden mt-5">
                    {
                        <div className="w-full text-center py-6">
                            {
                                navItemsData && navItemsData.map((item, index) => (
                                    <Link href={"/"} passHref>
                                        <span className={`${ activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : "dark:text-white dark:text-black"} text-[18px] px-6 font-Poppins font-[400]`}>
                                        </span>
                                    </Link>
                                ))
                            }
                        </div>
                    }
                </div>
            )
        }
    </>
    );
}

export default NavItems;