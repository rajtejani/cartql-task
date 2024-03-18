"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link href={"/"} rel="noreferrer">
              <div
                className={buttonVariants({
                  variant: "ghost",
                })}
              >
                <span className="">Add Items</span>
              </div>
            </Link>
            <Link href={"/view-cart"} rel="noreferrer">
              <div
                className={buttonVariants({
                  variant: "ghost",
                })}
              >
                <span className="">View Cart</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
