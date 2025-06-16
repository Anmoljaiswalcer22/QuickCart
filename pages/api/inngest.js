import { serve } from "inngest/next";
import { inngest, syncUserCreation, syncUserUpdate, syncUserDeletion } from "../../config/inngest";

export default serve(inngest, [syncUserCreation, syncUserUpdate, syncUserDeletion]); 