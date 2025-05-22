import authService from "@services/authService";

export const useInfo = () => {
    const userInfo = authService.getUserInfo();
    const userRole = userInfo?.rol || '';

    return { userInfo, userRole };
}