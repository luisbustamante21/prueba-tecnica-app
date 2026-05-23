import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ProfileScreen() {
    const authContext = useContext(AuthContext);

    const handleLogout = () => {
        Alert.alert(
            "Cerrar sesión",
            "¿Estás seguro que deseas salir?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Salir", onPress: () => authContext?.logout(), style: "destructive" }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil</Text>
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{authContext?.user?.firstName} {authContext?.user?.lastName}</Text>
                <Text style={styles.userEmail}>{authContext?.user?.email}</Text>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <FontAwesome5 name="sign-out-alt" size={18} color="#EF4444" />
                <Text style={styles.logoutText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#FFF' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    userInfo: { marginBottom: 30 },
    userName: { fontSize: 18, fontWeight: '600' },
    userEmail: { color: '#6B7280', marginTop: 5 },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEE2E2',
        padding: 15,
        borderRadius: 10
    },
    logoutText: { color: '#EF4444', marginLeft: 10, fontWeight: 'bold' }
});