import { useState } from 'react'
import { Button, Card, Modal, Portal, Text, TextInput, } from 'react-native-paper'


type modalInputProps = {
    message: string,
    visible: boolean,
    defaultValue: string,
    secureTextEntry?: boolean,
    onModalCancel: () => void,
    onModalSetInput: (newInputValue: string) => void
}

const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10
}

export function ModalInput(props: Readonly<modalInputProps>) {

    const [text, setText] = useState(props.defaultValue ?? '')

    
    const onModalSetInput = (newInputValue: string) => () => {
        props.onModalSetInput(newInputValue)
    }

    return (
        <Portal>
            <Modal visible={props.visible} onDismiss={props.onModalCancel} contentContainerStyle={containerStyle}>
                <Text variant="titleLarge">{props.message}</Text>

                <TextInput
                    value={text}
                    onChangeText={text => setText(text.replace(/,/g, '.'))}
                    keyboardType="number-pad"
                    secureTextEntry={props.secureTextEntry}
                    mode="outlined"
                />

                <Card.Actions>
                    {/* <Button style={{ marginTop: 30 }} onPress={props.onModalCancel}>
                        Cancel
                    </Button> */}

                    <Button mode='contained' style={{ marginTop: 30 }} onPress={onModalSetInput(text)}>
                        Set
                    </Button>
                </Card.Actions>
            </Modal>
        </Portal>
    )
}