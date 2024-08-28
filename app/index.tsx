import { useEffect, useState } from "react"

import { View, Pressable } from "react-native"

import { Link, router } from 'expo-router'

import { Appbar, Avatar, Text, Button } from 'react-native-paper'

// import { useSettingContext } from '@/lib/settingsContext'
import { useSettingsStore } from '@/lib/settingsStore'
import { SelectAppMode } from '@/components/selectAppMode'
import { SelectProfile } from '@/components/selectProfile'

export default function Index() {

    // const { state } = useSettingContext()



    const { _hasHydrated, getState, appMode } = useSettingsStore()

    console.log('INDEX RENDER')
    console.log(getState())


    return (
        <View style={{ flex: 1 }}>
            {_hasHydrated ?

                <>
                    {appMode === '' ?
                        <SelectAppMode />
                        :
                        <SelectProfile />
                    }
                </>

                : (
                    <Text>Loading...</Text>
                )
            }
        </View>

    )
}

