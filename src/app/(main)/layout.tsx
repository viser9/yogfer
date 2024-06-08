import Header from "@/components/Header"
import React from "react";

const HomePageLayout = ({children} : {children: React.ReactNode}) => {
    return (
        <>
            <div className="p-2 px-4">
            <Header />  
            </div>
            {children}
        </>
    )
}

export default HomePageLayout;