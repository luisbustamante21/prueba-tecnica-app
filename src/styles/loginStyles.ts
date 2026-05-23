import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    logoText: {
        fontSize: 48,
        fontWeight: '900',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 30,
        letterSpacing: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 32,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 16,
    },
    inputWrapper: {
        flexDirection: 'row', // Clave para que input y ojo estén en la misma línea
        alignItems: 'center', // Centra verticalmente el input y el icono
        backgroundColor: 'rgba(255, 255, 255, 0.15)', // Fondo semitransparente
        borderRadius: 12,
        height: 56, // Altura fija para evitar problemas por dentro del div
        paddingHorizontal: 16,
    },
    input: {
        flex: 1, // Toma todo el espacio disponible dejando el resto al ojo
        height: '100%',
        fontSize: 15,
        color: '#FFFFFF',
    },
    eyeIcon: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    eyeText: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.7)',
    },
    inputError: {
        borderWidth: 1,
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
    },
    errorText: {
        color: '#FCA5A5',
        fontSize: 12,
        marginTop: 6,
        paddingLeft: 4,
    },
    globalErrorText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        padding: 12,
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderRadius: 8,
    },
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 18,
        height: 18,
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    checkboxChecked: {
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
    },
    checkmark: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    checkboxLabel: {
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.9)',
    },
    forgotPasswordText: {
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.9)',
    },
    button: {
        backgroundColor: '#2563eb', // Azul claro distintivo del botón
        borderRadius: 12,
        height: 56, // Misma altura de los inputs para consistencia visual
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonDisabled: {
        backgroundColor: 'rgba(37, 99, 235, 0.5)',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerContainer: {
        marginTop: 24, // Esto lo acerca al botón Iniciar sesión en lugar de mandarlo al fondo
        alignItems: 'center',
    },
    registerText: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    registerTextBold: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});