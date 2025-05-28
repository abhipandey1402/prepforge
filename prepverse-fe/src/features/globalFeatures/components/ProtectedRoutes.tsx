import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, persistor, RootState } from "../../../store";
import { toast } from "react-toastify";
import useTokenExpiry from "../hooks/useTokenExpiry";
import { performLogout } from "@/features/user/slices/authSlice";
import SessionExpiredModal from "./SessionExpiredModal";

const ProtectedRoutes: React.FC = () => {
    const { error } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const accessToken = useSelector((state: RootState) => state.auth?.userData?.accessToken);
    const { isSessionExpired } = useTokenExpiry(accessToken);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        setIsModalVisible(isSessionExpired);
    }, [isSessionExpired]);

    const handleLogout = async () => {
        setIsModalVisible(false);
        persistor.purge();
        await dispatch(performLogout())
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
