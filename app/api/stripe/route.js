import Stripe from "stripe";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.text();
    const sig = request.headers.get("stripe-signature");

    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
    const handlePaymentIntent = async (paymentId, isPaid) => {
      const session = await stripe.checkout.sessions.list({
        payment_intent: paymentId,
      });
      const { orderIds, userId, appId } = session.data[0].metadata;
      if (appId !== "gocart") {
        return NextResponse.json({ received: true, message: "Invalid App Id" });
      }

      const orderIdsArray = orderIds.split(",");
      if (isPaid) {
        //mark order as paid
        await Promise.all(
          orderIdsArray.map(async (orderId) => {
            await prisma.order.update({
              where: { id: orderId },
              data: { isPaid: true },
            });
          }),
        );
        //delete cart from user
        await prisma.user.update({
          where: { id: userId },
          data: { cart: {} },
        });
      } else {
        //delete order from database
        await Promise.all(
          orderIdsArray.map(async (orderId) => {
            await prisma.order.delete({
              where: { id: orderId },
            });
          }),
        );
      }
    };

    switch (event.type) {
      case "payment_intent.succeeded":
        {
          await handlePaymentIntent(event.data.object.id, true);
        }
        break;
      case "payment_intent.payment_failed":
        {
          await handlePaymentIntent(event.data.object.id, false);
        }
        break;

      default:

        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.code || error.message },
      { status: 400 },
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
