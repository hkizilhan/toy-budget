import { Pressable, View, ScrollView } from "react-native"
import { useEffect, useState } from "react"
import { router, useLocalSearchParams } from "expo-router"

import { Appbar, Modal, Portal, Text, } from 'react-native-paper'

import { useSettingsStore, Profile } from '@/lib/settingsStore'
import { calculateNewBalance } from "@/lib/balance"
import { ModalInput } from '@/components/modalInput'


export default function ViewProfileBalance() {

    const { profiles, updateProfile, appMode } = useSettingsStore()
    const routeParams = useLocalSearchParams<{ id: string }>()

    let profile: Profile | undefined
    const profileId = parseInt(routeParams.id) ?? null

    if (profileId) {
        profile = profiles.find((profile) => profile.id === profileId)
    }

    if (!profile) {
        return null
    }

    const [calculatedValue, setCalculatedValue] = useState(0)
    const [modalVisible, setModalVisible] = useState(false)

    const updateBalance = () => {
        // console.log('updating balance')
        setCalculatedValue(calculateNewBalance(profile.balance, profile.date, profile.budgetPerMonth))
    }

    const formattedBalance = () => {
        return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(
            calculateNewBalance(profile.balance, profile.date, profile.budgetPerMonth),
        )
    }


    useEffect(() => {

        updateBalance()
        // set update timer
        const timerId = setInterval(updateBalance, 1000)

        // clear update timer
        return () => {
            clearTimeout(timerId)
        }

    }, [profile])


    const onProfileEditPress = () => {
        router.push({ pathname: '/addProfile', params: { id: profile.id } })
    }

    const onModalCancel = () => {
        console.log('onModalCancel')
        setModalVisible(false)

    }

    const onModalSetInput = (newInputValue: string) => {
        console.log('onModalSetInput')
        console.log(parseFloat(newInputValue))
        setModalVisible(false)

        const newBalance = parseFloat(newInputValue)

        if (!isNaN(newBalance)) {

            const newProfile = { ...profile }

            newProfile.balance = newBalance
            newProfile.date = Date.now()

            updateProfile(newProfile)
        }
    }

    const onSetBalancePress = () => {
        setModalVisible(true)
    }

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => { router.back() }} />
                <Appbar.Content title={profile.name} />
                {appMode === 'PARENT' &&
                    <>
                        <Appbar.Action icon='account-cash' onPress={onSetBalancePress} />
                        <Appbar.Action icon='account-edit' onPress={onProfileEditPress} />
                    </>
                }
            </Appbar.Header>

            {modalVisible &&
                <ModalInput
                    message="Enter New Balance"
                    visible={modalVisible}
                    defaultValue={calculateNewBalance(profile.balance, profile.date, profile.budgetPerMonth).toFixed(2)}
                    onModalCancel={onModalCancel}
                    onModalSetInput={onModalSetInput}
                />
            }

            <ScrollView contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                flexGrow: 1
            }}>

                {/* <Text variant="titleMedium">Profile Balance:</Text>
                <Text variant="titleLarge">{profile.balance}</Text>


                <Text variant="titleMedium" style={{ marginTop: 40, marginBottom: 20 }}>--------</Text>
                <Text variant="titleMedium">RAW BALANCE:</Text>
                <Text variant="titleLarge">{calculatedValue}</Text> */}



                <Text variant="displaySmall" style={{ marginTop: 80, marginBottom: 20 }}>
                    TOPLAM:    {new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(
                        calculatedValue,
                    )}
                </Text>

            </ScrollView>

        </>


    )
}