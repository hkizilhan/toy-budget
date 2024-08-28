import { Stack } from 'expo-router'
import { PaperProvider } from 'react-native-paper'

export default function RootLayout() {
    return (
        <PaperProvider>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#bbbb00',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerShown: false,

                }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="settings" />
                <Stack.Screen name="addProfile" />
                <Stack.Screen name="viewBalance" />
            </Stack>
        </PaperProvider>

    )
}
