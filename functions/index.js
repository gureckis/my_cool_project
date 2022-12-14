// The Cloud Functions for Firebase SDK to create Cloud Functions
// and set up triggers.
import { https, logger, firestore } from 'firebase-functions'

// The Firebase Admin SDK to access Firestore.
import { initializeApp, firestore as _firestore } from 'firebase-admin'
initializeApp()

export const helloWorld = https.onRequest((request, response) => {
  logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase!')
})

export const addMessage = https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await _firestore()
    .collection('messages')
    .add({ original: original })
  // Send back a message that we've successfully written the message
  res.json({ result: `Message with ID: ${writeResult.id} added.` })
})

export const makeUppercase = firestore
  .document('/messages/{documentId}')
  .onCreate((snap, context) => {
    // Grab the current value of what was written to Firestore.
    const original = snap.data().original

    // Access the parameter `{documentId}` with `context.params`
    logger.log('Uppercasing', context.params.documentId, original)

    const uppercase = original.toUpperCase()

    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to Firestore.
    // Setting an 'uppercase' field in Firestore document returns a Promise.
    return snap.ref.set({ uppercase }, { merge: true })
  })
