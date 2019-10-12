import { createStore } from 'redux'

import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web

const persistConfig = {
	key: "root",
	storage
}

import reducers from './reducers'
import initState from './initState'

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(persistedReducer, initState)
export const persistor = persistStore(store)