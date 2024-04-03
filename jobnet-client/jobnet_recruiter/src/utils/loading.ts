import { store } from "../app/store"
import { setLoading } from "../features/loading/loadingSlice"

export function setRCLoad(flag:boolean){
    store.dispatch(setLoading(flag))
}