import { Pressable, View, ScrollView } from "react-native"

import { Appbar, Avatar, Text, } from 'react-native-paper'

import { router } from "expo-router"

import { useSettingsStore } from '@/lib/settingsStore'



export function SelectProfile() {

    const { profiles } = useSettingsStore()

    const onProfileButtonPress = (profile: any) => {
        router.push({ pathname: '/viewBalance', params: { id: profile.id } })
    }

    return (
        <>
            <Appbar.Header>
                {/* <Appbar.BackAction onPress={() => {}} /> */}
                <Appbar.Content title="Profiles" />
                <Appbar.Action icon='account-plus' onPress={() => router.push('/addProfile')} />
                <Appbar.Action icon='cog' onPress={() => router.push('/settings')} />
            </Appbar.Header>

            <ScrollView contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                flexGrow: 1
            }}>

                {profiles.length ?
                    (
                        profiles.map((profile) => (
                            <Pressable key={profile.id} onPress={() => onProfileButtonPress(profile)}>
                                <Avatar.Icon size={128} icon="folder" />
                                <Text>{profile.name}</Text>
                            </Pressable>
                        ))
                    )
                    :
                    <Pressable onPress={() => router.push('/addProfile')}>
                        <Avatar.Icon size={128} icon="folder" />
                        <Text style={{ textAlign: 'center' }}>ADD PROFILE</Text>
                    </Pressable>
                }

            </ScrollView>

        </>


    )
}