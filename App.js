import React, { Component } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SegmentedControlIOS,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
} from 'react-native';

import * as Keychain from 'react-native-keychain';

const ACCESS_CONTROL_OPTIONS = ['None', 'Passcode', 'Password'];
const ACCESS_CONTROL_MAP = [null, Keychain.ACCESS_CONTROL.DEVICE_PASSCODE, Keychain.ACCESS_CONTROL.APPLICATION_PASSWORD, Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET]

export default class KeychainExample extends Component {
    state = {
        username: '',
        password: '',
        status: '',
        biometryType: null,
        accessControl: null,
    };

    componentDidMount() {
        Keychain.getSupportedBiometryType().then(biometryType => {
            this.setState({ ... biometryType });
    });
    }

    async save(accessControl) {

        try {
            console.log("access control: ", accessControl)
            console.log("save: ", this.state.password)
            await Keychain.setGenericPassword(
                this.state.username,
                this.state.password
            );
            this.setState({ username: '', password: '', status: 'Credentials saved!' });
        } catch (err) {
            this.setState({ status: 'Could not save credentials, ' + err });
        }
    }

    async load() {
        try {
            const credentials = await Keychain.getGenericPassword();
            if (credentials) {
                this.setState({ ...credentials, status: 'Credentials loaded!' });
                console.log("load: ", this.state.password)
            } else {
                this.setState({ status: 'No credentials stored.' });
            }
        } catch (err) {
            this.setState({ status: 'Could not load credentials. ' + err });
        }
    }

    async reset() {
        try {
            await Keychain.resetGenericPassword();
            this.setState({
                status: 'Credentials Reset!',
                username: 'some_username',
                password: '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',
            });
        } catch (err) {
            this.setState({ status: 'Could not reset credentials, ' + err });
        }
    }

    render() {
        return (
            <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
            >
            <View style={styles.content}>
            <Text style={styles.title}>Keychain Example</Text>
        <View style={styles.field}>
            <Text style={styles.label}>Username</Text>
            <TextInput
        style={styles.input}
        autoFocus={true}
        autoCapitalize="none"
        value={this.state.username}
        onChange={event =>
            this.setState({ username: event.nativeEvent.text })}
        underlineColorAndroid="transparent"
            />
            </View>
            <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <TextInput
        style={styles.input}
        password={true}
        autoCapitalize="none"
        value={this.state.password}
        onChange={event =>
            this.setState({ password: event.nativeEvent.text })}
        underlineColorAndroid="transparent"
            />
            </View>
        {Platform.OS === 'ios' && (
        <View style={styles.field}>
            <Text style={styles.label}>Access Control</Text>
        <SegmentedControlIOS
            selectedIndex={0}
            values={this.state.biometryType ? [...ACCESS_CONTROL_OPTIONS, this.state.biometryType] : ACCESS_CONTROL_OPTIONS}
            onChange={({ nativeEvent }) => {
            this.setState({
                accessControl: ACCESS_CONTROL_MAP[nativeEvent.selectedSegmentIndex],
            });
        }}
            />
            </View>
        )}
        {!!this.state.status && (
        <Text style={styles.status}>{this.state.status}</Text>
        )}

    <View style={styles.buttons}>
            <TouchableHighlight
        onPress={() => this.save()}
        style={styles.button}
            >
            <View style={styles.save}>
            <Text style={styles.buttonText}>Save</Text>
            </View>
            </TouchableHighlight>

            <TouchableHighlight
        onPress={() => this.load()}
        style={styles.button}
            >
            <View style={styles.load}>
            <Text style={styles.buttonText}>Load</Text>
            </View>
            </TouchableHighlight>

            <TouchableHighlight
        onPress={() => this.reset()}
        style={styles.button}
            >
            <View style={styles.reset}>
            <Text style={styles.buttonText}>Reset</Text>
            </View>
            </TouchableHighlight>

            <TouchableHighlight
        onPress={async() => {
            if (Platform.OS !== 'android') {
                alert('android-only feature');
                return;
            }
            const level = await Keychain.getSecurityLevel();
            alert(level)
        }}
        style={styles.button}
            >
            <View style={styles.load}>
            <Text style={styles.buttonText}>Get security level</Text>
        </View>
        </TouchableHighlight>
        </View>
        </View>
        </KeyboardAvoidingView>
    );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
    content: {
        marginHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '200',
        textAlign: 'center',
        marginBottom: 20,
    },
    field: {
        marginVertical: 5,
    },
    label: {
        fontWeight: '500',
        fontSize: 15,
        marginBottom: 5,
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#ccc',
        backgroundColor: 'white',
        height: 32,
        fontSize: 14,
        padding: 8,
    },
    status: {
        color: '#333',
        fontSize: 12,
        marginTop: 15,
    },
    biometryType: {
        color: '#333',
        fontSize: 12,
        marginTop: 15,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        borderRadius: 3,
        overflow: 'hidden',
    },
    save: {
        backgroundColor: '#0c0',
    },
    load: {
        backgroundColor: '#333',
    },
    reset: {
        backgroundColor: '#c00',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
});
