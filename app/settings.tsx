import { useState } from "react"
import { View, ScrollView } from "react-native"

import { router } from 'expo-router'

import { Appbar, Card, Text, TextInput, Button, Switch } from 'react-native-paper'

import { ModalInput } from '@/components/modalInput'
import { useSettingsStore } from '@/lib/settingsStore'


export default function Index() {

    const { appMode, updateAppMode, clearState, parentPassword, updateParentPassword } = useSettingsStore()
    const [modalVisible, setModalVisible] = useState(false)
    
    const appModeSelectValue = appMode === 'PARENT' || false

    const onAppModeToggleSwitch = () => {
        setModalVisible(true)
    }


    const onModalCancel = () => {
        setModalVisible(false)        
    }


    const onModalSetInput = (inputPassword: string) => {
        
        const newMode = appMode === 'PARENT' ? 'KID' : 'PARENT'
        
        if (newMode === 'PARENT') {
            
            if (inputPassword === parentPassword) {
                updateAppMode(newMode)
            }
            
        }else {
            updateParentPassword(inputPassword)
            updateAppMode(newMode)
        }
        
        setModalVisible(false)
    }

    return (
        <View style={{ flex: 1 }}>

            <Appbar.Header>
                <Appbar.BackAction onPress={() => { router.back() }} />
                <Appbar.Content title="App Settings" />
            </Appbar.Header>

            {modalVisible &&
                <ModalInput
                    message="Enter Parent password"
                    visible={modalVisible}
                    defaultValue={''}
                    secureTextEntry={true}
                    onModalCancel={onModalCancel}
                    onModalSetInput={onModalSetInput}
                />
            }

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

