import { http } from "./http";


export interface DashboardData {
    messageText : string;
};

export const getDashboardMessage = async (): Promise<DashboardData> => {
    const { data } = await http.get<DashboardData>('bank/dashboardMessage')
    return data;
}


