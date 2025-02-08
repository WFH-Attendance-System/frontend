import { createContext, useEffect, useState } from "react";

export const TitleContext = createContext({
    title: "WFH Attendance App",
    setTitle: () => {},
});

export const TitleProvider = ({ children }) => {
    const [title, setTitle] = useState("WFH Attendance App");
    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <TitleContext.Provider value={{ title, setTitle }}>
            {children}
        </TitleContext.Provider>
    );
};

export default TitleProvider;
