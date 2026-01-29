import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-12-15.clover',
});

/**
 * Handles POST requests to create a Stripe Checkout Session.
 * 
 * @param req - NextRequest object containing the cart items
 * @returns NextResponse object with the session ID and URL
 */
export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    /**
     * Transforms cart items into Stripe line item format.
     * 
     * @param item - Cart item object containing product details
     * @returns Transformed line item object for Stripe
     */
    const transformedItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          images: [item.thumbnail],
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects cents
      },
      quantity: item.quantity,
    }));

    /**
     * Creates a Stripe Checkout Session with the transformed line items.
     * 
     * @param session - Stripe Checkout Session object
     * @returns Session ID and URL for redirection
     */
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: transformedItems,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/dashboard/cart/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/dashboard/cart/cancel`,
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
