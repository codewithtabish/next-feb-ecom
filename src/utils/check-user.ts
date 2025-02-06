'use server'
import { inngest } from "@/inngest/client"
import { currentUser } from "@clerk/nextjs/server"

export const checkUser = async () => {
    console.log("checkUser function called");

    const user = await currentUser();
    if (!user) {
        console.log("No user found, exiting.");
        return;
    }

    console.log("Sending event to Inngest...");
    const result = await inngest.send({
        name: "user.checkSaveAndSendUpdateEmailToUser",
        data: { user },
    });

    console.log("Inngest event sent:", result);
};
