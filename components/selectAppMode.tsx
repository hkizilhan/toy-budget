import { Pressable, View } from "react-native"

import { Avatar, Text, } from 'react-native-paper'

import { useSettingsStore } from '@/lib/settingsStore'

export function SelectAppMode() {

    const { updateAppMode } = useSettingsStore()

    return (

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", margin: 20 }}>
            <Text style={{ marginBottom: 20 }}>Select Application Mode</Text>

            <Pressable onPress={() => updateAppMode('PARENT')}>
                <Avatar.Icon size={128} icon="folder" />
                <Text>PARENT Mode</Text>
            </Pressable>

            <Pressable onPress={() => updateAppMode('KID')}>
                <Avatar.Icon size={128} icon="folder" />
                <Text>KID Mode</Text>
            </Pressable>
        </View>
    )
}