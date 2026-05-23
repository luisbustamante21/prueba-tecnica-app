import React, { useState, useContext, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Image
} from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/loginStyles';
import { FontAwesome5 } from '@expo/vector-icons';

export default function LoginScreen() {
    const authContext = useContext(AuthContext);

    // Estados de los campos
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    // Estados de errores locales
    const [errors, setErrors] = useState({ username: '', password: '', global: '' });

    // Validaciones en tiempo real
    useEffect(() => {
        if (username) setErrors(prev => ({ ...prev, username: '', global: '' }));
    }, [username]);

    useEffect(() => {
        if (password) setErrors(prev => ({ ...prev, password: '', global: '' }));
    }, [password]);

    const validateForm = () => {
        let isValid = true;
        let newErrors = { username: '', password: '', global: '' };

        const trimmedUsername = username.trim();
        if (!trimmedUsername) {
            newErrors.username = 'El usuario es obligatorio.';
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'La contraseña es obligatoria.';
            isValid = false;
        } else if (password.length < 8) {
            newErrors.password = 'Mínimo 8 caracteres.';
            isValid = false;
        } else if (/\s/.test(password)) {
            newErrors.password = 'No debe contener espacios.';
            isValid = false;
        } else if (/[^a-zA-Z0-9]/.test(password)) {
            newErrors.password = 'No debe tener caracteres especiales.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const loginMutation = useMutation({
        mutationFn: async () => {
            await authContext?.login(username.trim(), password, remember);
        },
        onError: (error) => {
            setErrors(prev => ({ ...prev, global: authContext?.authError || 'Error de conexión' }));
        }
    });

    const handleLogin = () => {
        if (!validateForm()) return;

        if (username.trim() !== 'user001' || password !== 'user001pass') {
            setErrors(prev => ({ ...prev, global: 'Credenciales inválidas' }));
            return;
        }

        loginMutation.mutate();
    };

    const isFormEmpty = !username.trim() || !password;

    return (
        <LinearGradient
            colors={['#2563eb', '#1e3a8a', '#0f172a']}
            style={styles.gradientContainer}
        >
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.innerContainer}>
                    {/* Logo de SIPY */}
                    <Text style={styles.logoText}>SIPY</Text>

                    <Text style={styles.title}>¡Bienvenido!</Text>
                    <Text style={styles.subtitle}>Ingresa a tu cuenta</Text>

                    {/* Error general */}
                    {(errors.global || authContext?.authError) ? (
                        <Text style={styles.globalErrorText}>{errors.global || authContext?.authError}</Text>
                    ) : null}

                    {/* Input Email */}
                    <View style={styles.inputGroup}>
                        <View style={[styles.inputWrapper, errors.username ? styles.inputError : null]}>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                                autoCorrect={false}
                                editable={!loginMutation.isPending}
                            />
                        </View>
                        {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
                    </View>

                    {/* Input Contraseña con Ojo alineado */}
                    <View style={styles.inputGroup}>
                        <View style={[styles.inputWrapper, errors.password ? styles.inputError : null]}>
                            <TextInput
                                style={styles.input}
                                placeholder="Contraseña"
                                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={secureTextEntry}
                                autoCapitalize="none"
                                editable={!loginMutation.isPending}
                            />
                            <TouchableOpacity
                                onPress={() => setSecureTextEntry(!secureTextEntry)}
                                style={styles.eyeIcon}
                                activeOpacity={0.7}
                            >
                                <FontAwesome5
                                    name={secureTextEntry ? 'eye-slash' : 'eye'}
                                    size={18}
                                    color="rgba(255, 255, 255, 0.7)"
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                    </View>

                    {/* Recordar sesión y Olvidaste tu contraseña */}
                    <View style={styles.optionsRow}>
                        <TouchableOpacity
                            style={styles.checkboxContainer}
                            onPress={() => setRemember(!remember)}
                            disabled={loginMutation.isPending}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.checkbox, remember && styles.checkboxChecked]}>
                                {remember && <Text style={styles.checkmark}>✓</Text>}
                            </View>
                            <Text style={styles.checkboxLabel}>Recordar sesión</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.7}>
                            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Botón de Iniciar sesión */}
                    <TouchableOpacity
                        style={[
                            styles.button,
                            (isFormEmpty || loginMutation.isPending) && styles.buttonDisabled
                        ]}
                        onPress={handleLogin}
                        disabled={isFormEmpty || loginMutation.isPending}
                    >
                        {loginMutation.isPending ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.buttonText}>Iniciar sesión</Text>
                        )}
                    </TouchableOpacity>

                    {/* Texto de registro más cerca del botón */}
                    <TouchableOpacity style={styles.registerContainer} activeOpacity={0.7}>
                        <Text style={styles.registerText}>
                            ¿No tienes cuenta? <Text style={styles.registerTextBold}>Regístrate</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}