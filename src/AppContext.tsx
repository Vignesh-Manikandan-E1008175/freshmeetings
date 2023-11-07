import { createContext } from "react";
import { AppContextType } from "./Constants/types";

const AppContext = createContext<AppContextType | undefined>(undefined)

export default AppContext;
