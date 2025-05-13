import React from 'react';

export const LayoutContainer = ({ children, isDarkMode }: { children: React.ReactNode; isDarkMode: boolean }) => {
    return (
        <div className={` ${isDarkMode ? 'transparent' : 'transparent'} transition-colors duration-300`}>
            {children}
        </div>
    );
};