import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from 'react-native'


interface Profile {
    id: number,
    date: number,
    balance: number,
    budgetPerMonth: number,
    name: string,
}

type State = {
    appMode: 'PARENT' | 'KID' | ''
    profiles: Profile[]
    currentProfileName: string

    _hasHydrated: boolean
}

type Action = {
    updateAppMode: (appMode: State['appMode']) => void
    updateCurrentProfileName: (name: string) => void

    addProfile: (profile: Profile) => void,
    updateProfile: (profile: Profile) => void,
    deleteProfile: (profile: Profile) => void

    // Utility functions
    setHasHydrated: (state: boolean) => void
    getState: () => State
    clearState: () => void
}


export const useSettingsStore = create<State & Action>()(
    persist(
        (set, get) => ({
            appMode: '',
            updateAppMode: (appMode) => set(() => ({ appMode: appMode })),

            profiles: [],
            currentProfileName: '',
            updateCurrentProfileName: (name) => set(() => ({ currentProfileName: name })),

            addProfile: (profile: Profile) =>
                set((state) => ({
                    ...state,
                    profiles: [...state.profiles, profile]
                })),
        
            updateProfile: (profile: Profile) =>
                set((state) => {
                    const index = state.profiles.findIndex((p) => p.id === profile.id)
                    if (index === -1) {
                        return state
                    }
                    return {
                        ...state,
                        profiles: [
                            ...state.profiles.slice(0, index),
                            profile,
                            ...state.profiles.slice(index + 1)
                        ]
                    }
                }),
        
            deleteProfile: (profile: Profile) =>
                set((state) => {
                    const index = state.profiles.findIndex((p) => p.id === profile.id)
                    if (index === -1) {
                        return state
                    }
                    return {
                        ...state,
                        profiles: [
                            ...state.profiles.slice(0, index),
                            ...state.profiles.slice(index + 1)
                        ]
                    }
                }
            ),
            
            // Utility functions

            _hasHydrated: false,
            setHasHydrated: (state) => {
                set({
                    _hasHydrated: state
                })
            },

            getState: () => get(),

            clearState: async () => {
                console.log('clearState')
                useSettingsStore.persist.clearStorage()

            }
        }),
        {
            name: 'settings-store',
            storage: createJSONStorage(() => Platform.OS === "web" ? localStorage : AsyncStorage),
            onRehydrateStorage: (state) => {
                console.log('onRehydrateStorage')
                return () => state.setHasHydrated(true)
            }
        }
    )
)


