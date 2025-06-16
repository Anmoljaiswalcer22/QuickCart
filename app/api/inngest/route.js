import { Inngest } from "inngest";
import dbConnect from '@/config/db';
import User from '@/models/user';

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quick-cart" });

// Inngest function to save your user data to database 
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const {
      id, first_name, last_name, email_addresses, image_url
    } = event.data;
    // Here you would typically call your database to create a user
    const user = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      imageUrl: image_url
    }

    await dbConnect()
    await User.create(user)
  }
)

//Ingest function to update a user creation
export const syncUserUpdate = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const {
      id, first_name, last_name, email_addresses, image_url
    } = event.data;
    const user = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      imageUrl: image_url
    }
    await dbConnect()
    await User.findByIdAndUpdate(id, user)
  }
)

//Inngest function to delete a user creation
export const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data   
    // Here you would typically call your database to delete a user
    await dbConnect()
    await User.findByIdAndDelete(id);
  }
)

// Export the handler
export const { GET, POST, PUT } = inngest.createHandler({
  functions: [syncUserCreation, syncUserUpdate, syncUserDeletion]
}); 