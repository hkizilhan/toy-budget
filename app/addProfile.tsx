import { ScrollView } from "react-native"
import { useState } from "react"
import { router, useLocalSearchParams } from "expo-router"

import { Appbar, Card, Text, TextInput, Button } from 'react-native-paper'

import { useSettingsStore } from '@/lib/settingsStore'
import {calculateNewBalance} from '@/lib/balance'

export default function AddProfile() {

    const { profiles, addProfile, deleteProfile, updateProfile } = useSettingsStore()
    
    const routeParams = useLocalSearchParams<{ id: string }>()
    // if editing
    let editingProfile = null
    const editingProfileId = parseInt(routeParams.id) ?? null

    if (editingProfileId) {
        editingProfile = profiles.find((profile) => profile.id === editingProfileId)
    }
    
    
    const [profileName, setProfileName] = useState(editingProfile?.name ?? '')
    const [budgetPerMonth, setBudgetPerMonth] = useState(editingProfile?.budgetPerMonth ?? 0)


    const onSaveProfile = () => {
        
        if (editingProfile) {
            
            // first, calculate balance with old budgetPerMonth
            editingProfile.balance = calculateNewBalance(
                editingProfile.balance, editingProfile.date, editingProfile.budgetPerMonth
            )
            // update date
            editingProfile.date = Date.now()
            //  update rest
            editingProfile.name = profileName
            editingProfile.budgetPerMonth = budgetPerMonth

            updateProfile(editingProfile)

        } else {
            let maxId = 0
            profiles.map((profile) => {
                if (profile.id > maxId) {
                    maxId = profile.id
                }
            })
            maxId++

            const newProfileObject = {
                id: maxId,
                date: Date.now(),
                balance: 0,
                budgetPerMonth: budgetPerMonth,
                name: profileName
            }

            addProfile(newProfileObject)
        }

        router.dismiss()
    }

    const onDeleteProfile = () => {
        if (editingProfile) {
            deleteProfile(editingProfile as any)
            router.dismissAll()
        }
    }

    return (

        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => { router.back() }} />
                <Appbar.Content title={ editingProfileId ? 'Edit Profile' : 'Add Profile' } />
                <Appbar.Action icon='delete' onPress={onDeleteProfile} />
            </Appbar.Header>

            <ScrollView contentContainerStyle={{
                justifyContent: 'center',
                flexGrow: 1
            }}>

                <Card style={{ margin: 10, marginBottom: 20 }}>
                    <Card.Content >
                        <Text variant="titleMedium">Profile Name</Text>
                        <TextInput
                            placeholder=""
                            mode="outlined"
                            value={profileName}
                            onChangeText={(text) => setProfileName(text)}
                        />
                    </Card.Content>

                    <Card.Content>
                        <Text variant="titleMedium">Budget per Month</Text>
                        <TextInput
                            placeholder="0.00"
                            keyboardType="numeric"
                            mode="outlined"
                            value={budgetPerMonth.toString()}
                            onChangeText={(text) => setBudgetPerMonth(parseFloat(text) || 0)}
                        />
                    </Card.Content>
                </Card>

                <Button mode="contained" onPress={onSaveProfile}>Save</Button>

            </ScrollView>

        </>
    )
}