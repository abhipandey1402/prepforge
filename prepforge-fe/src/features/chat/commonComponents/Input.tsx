import React, { useState } from "react";
import { classNames } from "../utils/index";

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
    props
) => {
    const [isDarkMode] = useState(false);

    return (
        <input
            {...props}
            className={classNames(
                "block w-full rounded-xl outline outline-zinc-400 border-0 py-4 px-5 bg-transparent ",
                props.className || "",
                isDarkMode ? 'text-white font-light placeholder:text-white/70' : 'text-gray-800 font-light placeholder:text-gray-800/70'
            )}
        />
    );
};

export default Input;
