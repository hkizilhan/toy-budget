import { Pressable, View, ScrollView } from "react-native"
import { useEffect, useState } from "react"
import { router, useLocalSearchParams } from "expo-router"

import { Appbar, Avatar, Text, } from 'react-native-paper'

import { useSettingsStore } from '@/lib/settingsStore'
import { calculateNewBalance } from "@/lib/balance"


export default function ViewProfileBalance() {

    const { profiles } = useSettingsStore()
    const routeParams = useLocalSearchParams<{ id: string }>()
    
    let profile = null
    const profileId = parseInt(routeParams.id) ?? null

    if (profileId) {
        profile = profiles.find((profile) => profile.id === profileId)
    }

    if (!profile) {
        return null
    }

    const [calculatedValue, setCalculatedValue] = useState(0)

    const updateBalance = () => {
        console.log('updating balance');
        setCalculatedValue(calculateNewBalance(profile.balance, profile.date, profile.budgetPerMonth))
    }

    useEffect(() => {

        updateBalance()
        // set update timer
        const timerId = setInterval(updateBalance, 1000)

        // clear update timer
        return () => {
            clearTimeout(timerId)
        }

    }, [])


    const onProfileEditPress = () => {
        router.push({ pathname: '/addProfile', params: { id: profile.id } })
    }
    
    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => { router.back() }} />
                <Appbar.Content title={profile.name} />
                <Appbar.Action icon='account-edit' onPress={onProfileEditPress} />
            </Appbar.Header>

            <ScrollView contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                flexGrow: 1
            }}>

            <Text variant="titleMedium">Profile Balance:</Text>
            <Text variant="titleLarge">{profile.balance}</Text>
            

            <Text variant="titleMedium" style={{ marginTop: 40, marginBottom: 20 }}>--------</Text>
            <Text variant="titleMedium">RAW BALANCE:</Text>
            <Text variant="titleLarge">{calculatedValue}</Text>

            

            <Text variant="titleLarge" style={{ marginTop: 80, marginBottom: 20 }}>
                BALANCE: {new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(
                    calculatedValue,
                )}
            </Text>

            </ScrollView>

        </>


    )
}