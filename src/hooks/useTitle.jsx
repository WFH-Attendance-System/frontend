import { useContext } from "react";
import { TitleContext } from "@/contexts/TitleProvider";

const useTitle = () => {
    const context = useContext(TitleContext);
    if (!context) {
        throw new Error("useTitle must be used within a TitleProvider");
    }

    return {
        title: context.title,
        setTitle: context.setTitle,
    };
};

export default useTitle;
