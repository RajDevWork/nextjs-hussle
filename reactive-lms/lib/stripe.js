import "server-only";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY,{
    apiVersion: "2026-05-27.dahlia",
    
    appInfo: {
        name: "ReactiveLearning",
    }

})