import React from 'react'
import { selector } from '../hook';

type RoleGuardProps = {
    allowedRoles: ("admin" | "user")[];
    children : React.ReactNode;
}

const RoleGuard = ({allowedRoles, children}: RoleGuardProps) => {
    const user = selector((state) => state.auth.user)

    if(!user || !allowedRoles.includes(user.role)){
        return(
            <div className="bg-red-100 border border-red-900 p-4 rounded-lg text-center shadow">
            {/* <p className=" text-red-600 font-semibold dark:text-red-300">
                🚫 Access Denied: you don't have permission to view this content 
            </p> */}
            </div>
        );
    }
  return <> {children}</> ;
};

export default RoleGuard;
