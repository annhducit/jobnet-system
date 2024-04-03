import { store } from "../app/store"
import { setLoading } from "../features/loading/loadingSlice"

export function setADLoad(flag:boolean){
    store.dispatch(setLoading(flag))
}