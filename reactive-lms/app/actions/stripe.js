"use server"
import { headers } from "next/headers";
const CURRENCY = "USD";
import { formatAmountForStripe } from "@/lib/stripe-helpers";
import { stripe } from "@/lib/stripe";
import { getCourseDetails } from "@/queries/courses";
/**
 * Creates a Stripe Checkout Session for purchasing a course.
 *
 * Flow:
 * 1. Get the request origin (current website URL).
 * 2. Read the selected course ID from the submitted form data.
 * 3. Fetch the course details from the database.
 * 4. If the course doesn't exist, stop the process.
 * 5. Create a Stripe Checkout Session with the course information.
 * 6. Configure success and cancel URLs.
 * 7. Return the checkout URL and client secret to the frontend.
 */
export async function createCheckoutSession(data) {

    // Stripe supports different checkout UIs.
    // "hosted_page" redirects the customer to Stripe's secure checkout page.
    // Other options include "embedded" and "custom".
    const ui_mode = "hosted_page";

    // Get the origin (protocol + domain) of the current request.
    // Example:
    // https://mycourseapp.com
    //
    // This is used to build the success and cancel redirect URLs.
    const origin = (await headers()).get("origin");

    // Read the course ID from the submitted FormData.
    // Example:
    // data = { courseId: "course_123" }
    const courseId = data.get("courseId");

    // Fetch course information from the database.
    // This typically includes:
    // - title
    // - price
    // - description
    // - image
    // etc.
    const course = await getCourseDetails(courseId);

    // If no course exists with the provided ID,
    // stop the checkout process.
    if (!course) return new Error(`Course not found`);

    // Extract only the information needed by Stripe.
    const courseName = course.title;
    const coursePrice = course.price;

    // Create a new Stripe Checkout Session.
    //
    // A Checkout Session represents one payment attempt.
    // Stripe generates a secure hosted payment page for this session.
    const checkoutSession = await stripe.checkout.sessions.create({

        // Payment mode means this is a one-time purchase.
        //
        // Other possible modes:
        // - subscription
        // - setup
        mode: "payment",

        // Controls the text shown on the payment button.
        // "auto" lets Stripe decide the most appropriate label.
        submit_type: "auto",

        // List of products the customer is purchasing.
        line_items: [
            {
                // Customer is buying one copy of the course.
                quantity: 1,

                // Price information for this item.
                price_data: {

                    // Currency code (e.g. "usd", "inr")
                    currency: CURRENCY,

                    // Product details displayed on Stripe Checkout.
                    product_data: {
                        name: courseName,
                    },

                    // Stripe expects the amount in the smallest currency unit.
                    //
                    // USD:
                    // $25.99 -> 2599 cents
                    //
                    // INR:
                    // ₹999 -> 99900? (depends on helper implementation)
                    //
                    // formatAmountForStripe() converts your application's
                    // price format into the format Stripe expects.
                    unit_amount: formatAmountForStripe(
                        coursePrice,
                        CURRENCY
                    ),
                },
            },
        ],

        // Only include redirect URLs when using Stripe's hosted checkout page.
        ...(ui_mode === "hosted_page" && {

            // Stripe redirects the user here after successful payment.
            //
            // {CHECKOUT_SESSION_ID} is automatically replaced by Stripe
            // with the real Checkout Session ID.
            //
            // Example:
            // https://myapp.com/enroll-success?session_id=cs_test_123&courseId=abc
            success_url:
                `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&courseId=${courseId}`,

            // Redirect here if the user cancels payment.
            cancel_url: `${origin}/courses`,
        }),

        // Specify which checkout UI Stripe should use.
        ui_mode,
    });

    // Return the values the frontend may need.
    //
    // url:
    // Redirect the customer to this Stripe-hosted payment page.
    //
    // client_secret:
    // Used only with embedded/custom checkout flows.
    // For hosted checkout it is usually not required,
    // but returning it doesn't hurt if your frontend supports multiple UI modes.
    return {
        client_secret: checkoutSession.client_secret,
        url: checkoutSession.url,
    };
}

/// End Method 
/**
 * Creates a Stripe Payment Intent.
 *
 * A Payment Intent represents a single payment that Stripe will process.
 * Unlike Checkout Sessions (hosted by Stripe), Payment Intents are used
 * when you build your own custom payment form using Stripe Elements
 * or Embedded Checkout.
 *
 * Flow:
 * 1. Calculate the payment amount.
 * 2. Create a Payment Intent on Stripe.
 * 3. Enable Stripe's automatic payment methods.
 * 4. Return the client secret to the frontend.
 */
export async function createPaymentIntent(data) {

    // Create a new Payment Intent.
    //
    // A Payment Intent is Stripe's object that tracks the lifecycle
    // of a payment—from creation, authentication, confirmation,
    // to completion.
    const paymentIntent = await stripe.paymentIntents.create({

        // Amount to charge.
        //
        // Stripe expects the amount in the smallest currency unit.
        //
        // Examples:
        // USD:
        // $49.99 -> 4999
        //
        // INR:
        // ₹999 -> 99900? (depends on your helper implementation)
        //
        // formatAmountForStripe() converts your application's
        // price into the format Stripe requires.
        amount: formatAmountForStripe(
            coursePrice,
            CURRENCY
        ),

        // Let Stripe automatically determine which payment methods
        // should be available for this payment.
        //
        // Depending on:
        // - Customer's country
        // - Currency
        // - Merchant account settings
        //
        // Stripe may show:
        // - Cards
        // - Apple Pay
        // - Google Pay
        // - Link
        // - Bank payments
        // etc.
        automatic_payment_methods: {
            enabled: true
        },

        // Currency code for the payment.
        //
        // Examples:
        // "usd"
        // "eur"
        // "inr"
        currency: CURRENCY
    });

    // Return the client secret.
    //
    // The client_secret is NOT a payment confirmation.
    //
    // Instead, it's a temporary secret that allows the frontend
    // to securely complete the payment using Stripe.js.
    //
    // Example flow:
    //
    // Backend
    //    │
    //    ▼
    // Create Payment Intent
    //    │
    //    ▼
    // Return client_secret
    //    │
    //    ▼
    // Frontend calls:
    // stripe.confirmPayment({
    //     clientSecret
    // })
    //
    return {
        client_secret: paymentIntent.client_secret
    };

}