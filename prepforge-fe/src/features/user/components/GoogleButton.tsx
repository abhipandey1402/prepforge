
const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" className="mr-2">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-1 7.28-2.69l-3.57-2.77c-.99.69-2.26 1.1-3.71 1.1-2.87 0-5.3-1.94-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.11c-.22-.69-.35-1.43-.35-2.11s.13-1.42.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l3.66-2.84z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.46 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.86-2.59 3.29-4.51 6.16-4.51z" />
    </svg>
);

const GoogleButton = () => {
    const handleGoogleAuth = () => {
        console.log('Google Authentication Initiated');
    };

    return (
        <>
        <div className="w-full py-2 bg-blue-950 text-white flex-row justify-items-center text-sm font-semibold rounded-md cursor-pointer " style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem"}} onClick={handleGoogleAuth}>
            <GoogleIcon />
            Continue with Google
        </div>
        </>
    );
};

export default GoogleButton;
