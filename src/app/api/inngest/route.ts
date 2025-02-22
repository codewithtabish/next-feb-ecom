import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { checkSaveAndSendUpdateEmailToUser, generateNotesForChapters } from "@/inngest/functions";

// export const runtime='edge'

// export const runtime = 'edge'; // Ensure edge runtime is enabled

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  streaming:'allow',
  functions: [
    checkSaveAndSendUpdateEmailToUser,
    generateNotesForChapters
    /* your functions will be passed here later! */
  ],
});
