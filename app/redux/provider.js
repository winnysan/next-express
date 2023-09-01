'use client'
import { Provider } from 'react-redux'
import { persistStore } from 'reduxjs-toolkit-persist'
import { store } from './store'

persistStore(store)

const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
