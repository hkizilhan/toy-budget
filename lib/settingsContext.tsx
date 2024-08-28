// TaskContext.js
import React, { createContext, useContext, useEffect, useReducer } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { calculateNewBalance } from './balance'


export enum SettingsActions {
    LOAD_SETTINGS = 'LOAD_SETTINGS',
    SAVE_SETTINGS = 'SAVE_SETTINGS',
    UPDATE_DATE = 'UPDATE_DATE',
    UPDATE_BALANCE = 'UPDATE_BALANCE',
    UPDATE_BUDGET_PER_MONTH = 'UPDATE_BUDGET_PER_MONTH',
}

interface SettingsAction {
    type: SettingsActions
    payload: any
}

interface SettingsState {
    date: number,
    balance: number,
    budgetPerMonth: number,
}



const initialState: SettingsState = {
    date: 0,
    balance: 0,
    budgetPerMonth: 0,
    
}

interface SettingContext {
    state: SettingsState,
    dispatch: React.Dispatch<SettingsAction>
}

const settingContext = createContext<SettingContext>({state: initialState, dispatch: () => {}})

export type SettingsReducer = (state: SettingsState, action: SettingsAction) => SettingsState


const settingsReducer: SettingsReducer = (state, action) => {
    switch (action.type) {
        case SettingsActions.UPDATE_DATE:
            return {
                ...state,
                date: action.payload
            }
        case SettingsActions.UPDATE_BALANCE:
            return {
                ...state,
                date : Date.now(),
                balance: action.payload
            }
        case SettingsActions.UPDATE_BUDGET_PER_MONTH: {
            
            const budgetPerMonth = action.payload
            const date = Date.now()
            const balance = calculateNewBalance(state.balance, state.date, budgetPerMonth)

            return {
                ...state,
                budgetPerMonth: action.payload,
                date,
                balance
            }
        }
            
        case SettingsActions.LOAD_SETTINGS:
            return {...action.payload}
        
        
        default:
            return state
    }
}

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer<SettingsReducer, SettingsState>(settingsReducer, initialState, initialState => initialState)

    
    
    useEffect(() => {
        const loadSettings = async () => {
            const settings = await AsyncStorage.getItem('settings')
            if (settings) {
                dispatch({ type: SettingsActions.LOAD_SETTINGS, payload: JSON.parse(settings) })
            }
        }
        
        loadSettings()
        
    }, [])

    
    useEffect(() => {
        const saveSettings = async () => {
            await AsyncStorage.setItem('settings', JSON.stringify(state))
        }
        
        saveSettings()
        
    }, [state])
    
    
    return (
        <settingContext.Provider value={{ state, dispatch }}>
            {children}
        </settingContext.Provider>
    )
}

export const useSettingContext = (): SettingContext => {
    
    const { state, dispatch } = useContext<SettingContext>(settingContext)
    
    return { state, dispatch }

    
}
