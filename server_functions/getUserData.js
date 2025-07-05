"use server";

import { connectToDb } from "./mongodb/connect";
import { currentUser } from "@clerk/nextjs/server";
import short_url from "@/models/short_url";

export const getUserData = async () => {
    const user = await currentUser();
    await connectToDb();
    try {
        const getLinks = await short_url.find({ author: user.emailAddresses[0].emailAddress });
        let allClicks = 0;
        for (let i = 0; i < getLinks.length; i++) {
            allClicks += getLinks[i].clicks;
        }
        let allLinks = getLinks;
        const topLinks = await short_url.find({ author: user.emailAddresses[0].emailAddress }).sort({ clicks: -1 }).limit(5);
        console.log("Returning from getUserData (success):", allClicks, topLinks, allLinks);
        return [allClicks, JSON.stringify(topLinks), JSON.stringify(allLinks)];
    }
    catch (err) {
        console.log("Error in getUserData:", err);
        // Always return an array, even if it's empty or has default values
        return [0, "[]", "[]"];
    }
};