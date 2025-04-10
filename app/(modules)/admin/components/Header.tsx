"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";

const Header = () => {
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    toast.success("Logged out successfully");
    window.location.href = "/auth/admin/login";
  };

  const user = session?.user;

  // Extract the ternary logic into a variable
  let userContent;

  if (status === "loading") {
    userContent = <span className="text-sm text-gray-500">Loading...</span>;
  } else if (user) {
    userContent = (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user.image ?? "/placeholder-avatar.jpg"}
                alt={user.name ?? "User"}
              />
              <AvatarFallback>
                {user.name?.slice(0, 2).toUpperCase() ?? "??"}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">{user.name ?? "User"}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else {
    userContent = <span className="text-sm text-gray-500">Not signed in</span>;
  }

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b bg-white">
      <div className="relative w-72"></div>

      <div className="flex items-center space-x-4">{userContent}</div>
    </header>
  );
};

export default Header;
