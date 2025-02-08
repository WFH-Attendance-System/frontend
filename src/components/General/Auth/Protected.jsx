// import useAuth from '@/hooks/useAuth';

function Protected({ children }) {
    // const { isAuthenticated } = useAuth();
    /* if (!isAuthenticated) {
        return <Navigate to="/login" replace={true} />;
    } else {
        return children;
    } */
    return children;
}

export default Protected;
