'use client'
import * as React from "react"

import { SearchForm } from "@/components/search-form"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { LayoutDashboardIcon, Shield, User } from "lucide-react"
import SidebarBottom from "./SidebarBottom"
// import { useRouter } from "next/router"

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          isActive: true,
          icon:LayoutDashboardIcon

        },
        {
          title: "Upgrade",
          url: "/dashboard/upgrade",
          icon:Shield

        },
        {
          title: "Profile",
          url: "/dashboard/profile",
          icon:User

        },
      ],
    },
   
  ],
}

export default function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    // const navi=useLo
    // console.log(router.pathname)
    const pathName=usePathname()
  return (
    <SidebarProvider>

    <Sidebar {...props}
    // className="bg-gray-800"
    >
      <SidebarHeader>
      <Link href="/">
          <Image
            src={"/logo.png"}
            alt="Sensai Logo"
            width={200}
            height={60}
            className="h-12 py-1 w-auto object-contain"
          />
        </Link>
        {/* <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        /> */}
        <SearchForm />
      </SidebarHeader>
      <SidebarContent
      className="p-6"
      >
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathName==item.url}>
                        <Link href={item.url}
                        className="md:my-2"
                        >
                        <item.icon className="w-6 h-6"/>
                        {/* {item.icon} */}
                        {item.title}
                        {/* {router?.pathname} */}
                        </Link>
                      {/* <a href={item.url}>{item.title}</a> */}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <SidebarFooter
        className=" absolute bottom-5">
          <SidebarBottom/>
        </SidebarFooter>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
    </SidebarProvider>
  )
}
