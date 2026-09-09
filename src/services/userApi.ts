import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import type { User } from "@/types/user";

// const UserAPI = async () => {
//     const response = await axios.get("https://6a9fe5ab3e0d88d3d7e5250d.mockapi.io/api/v1/users", {
//         timeout: 1000,
//     });
    
//     console.log(response);
// }

const getUsers = async (): Promise<User[]> => {
    const response = await axios.get<User[]>("https://6a9fe5ab3e0d88d3d7e5250d.mockapi.io/api/v1/userszzzzzz", {
        timeout: 5000
    });

    await new Promise(resolve => setTimeout(resolve, 2000));
    return response.data;
}

export default getUsers;