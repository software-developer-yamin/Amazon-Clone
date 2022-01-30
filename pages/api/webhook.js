const admin = require('firebase-admin');
const { buffer } = require('micro');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


//secure a connection to firebase
const serviceAccount = require("../../permissions.json");

const app = !admin.apps.length
     ? admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
     })
     : admin.app();

//connect to stripe
const endpointSecret = process.env.STRIPE_SECRET_WEBHOOK;

const fullfillOrder = async (session) => {
     try {
          return app
               .firestore()
               .collection("users")
               .doc(session.metadata.email)
               .collection("orders")
               .doc(session.id)
               .set({
                    amount: session.amount_total / 100,
                    amount_shipping: session.total_details.amount_shipping / 100,
                    images: JSON.parse(session.metadata.images),
                    timestamp: admin.firestore.FieldValue.serverTimestamp(),
               })
               .then(() => {
                    console.log(`SUCCESS : Order ${session.id} has been added to DB.`);
               });
     } catch (error) {
          console.error(error);
     }
};

export default async (req, res) => {

     if (req.method === "POST") {
          const requestBuffer = await buffer(req);
          const payload = requestBuffer.toString();
          const sig = req.headers["stripe-signature"]

          let event;

          //verify that event posted from stripe
          try {
               event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
          } catch (err) {
               return res.status(400).send(`Webhook error : ${err.message}`);
          }

          //Handle checkout session completed event
          try {
               if (event.type === "checkout.session.completed") {
                    const session = event.data.object;

                    return fullfillOrder(session)
                         .then(() => res.status(200))
                         .catch((err) =>
                              res.status(400).send(`Webhook Error :${err.message}`)
                         );
               }
          } catch (error) {
               console.log("🚀 ~ file: webhook.js ~ line 56 ~ error", error);
          }
     }
};

export const config = {
     api: {
          bodyParser: false,
          externalResolver: true,
     },
};

// stripe listen --forward-to localhost:3000/api/webhook