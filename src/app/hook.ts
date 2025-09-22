import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { appDispatch, RootState } from "./store";


export const dispatch: () => appDispatch = useDispatch;
export const selector: TypedUseSelectorHook<RootState> = useSelector