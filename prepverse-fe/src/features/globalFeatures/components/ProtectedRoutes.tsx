import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { persistor, RootState } from "../../../store";
import { toast } from "react-toastify";
import useTokenExpiry from "../hooks/useTokenExpiry";
import { logout } from "@/features/user/slices/authSlice";
import SessionExpiredModal from "./SessionExpiredModal";

const ProtectedRoutes: React.FC = () => {
    const { error } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const accessToken = useSelector((state: RootState) => state.auth?.userData?.accessToken);
    const { isSessionExpired } = useTokenExpiry(accessToken);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        setIsModalVisible(isSessionExpired);
    }, [isSessionExpired]);

    const handleLogout = () => {
        setIsModalVisible(false);
        persistor.purge();
        dispatch(logout())
        navigate("/auth", { replace: true, state: { isFixed: true } });
    };

    useEffect(() => {
        if (!accessToken || error) {
            toast.warn("Please login to access this resource");
            navigate("/auth");
        }
    }, [accessToken, error, navigate]);

    return (
        <>
            {isModalVisible && <SessionExpiredModal handleLogout={handleLogout} />}
            <Outlet />
        </>
    );
};

export default ProtectedRoutes;
