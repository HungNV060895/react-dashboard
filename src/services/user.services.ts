import type { UserFormValues } from "@schemas/user.schema";


export const createUser = async (data: UserFormValues) => {

    await new Promise(
        resolve => setTimeout(resolve, 1000)
    );


    if (data.email === "admin@gmail.com") {

        //Đưa error vào trong catch của React Hook Form
        throw new Error(
            "Email đã tồn tại"
        );
    }


    return {
        id: Date.now(),
        ...data
    };
};

