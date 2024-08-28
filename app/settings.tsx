import { View, ScrollView } from "react-native"

import { router } from 'expo-router'

import { Appbar, Card, Text, TextInput, Button, Switch } from 'react-native-paper'

import { useSettingsStore } from '@/lib/settingsStore'


export default function Index() {

    const { appMode, updateAppMode, clearState } = useSettingsStore()

    const appModeSelectValue = appMode === 'PARENT' || false

    const onAppModeToggleSwitch = () => {
        updateAppMode(appMode === 'PARENT' ? 'KID' : 'PARENT')
    }

    return (
        <View style={{ flex: 1 }}>

            <Appbar.Header>
                <Appbar.BackAction onPress={() => { router.back() }} />
                <Appbar.Content title="App Settings" />
            </Appbar.Header>

            <ScrollView style={{ flex: 1 }}>

                <Card style={{ margin: 10, marginBottom: 20 }}>
                    <Card.Content style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 10
                    }}>
                        <Text variant="titleMedium">Parent Mode</Text>
                        <Switch value={appModeSelectValue} onValueChange={onAppModeToggleSwitch} />
                    </Card.Content>

                </Card>

                <Button mode="contained" onPress={() => clearState()}>Clear State</Button>

            </ScrollView>

        </View>
    )
}

