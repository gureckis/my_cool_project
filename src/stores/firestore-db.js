import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  Timestamp,
  runTransaction
} from 'firebase/firestore'
import appconfig from '@/config'

// initialize firebase connection
// since this is a module these will run once at the start
const firebaseApp = initializeApp(appconfig.firebaseConfig)
const db = getFirestore(firebaseApp)
let mode = 'real'
if (appconfig.mode === 'development') {
  mode = 'testing'
}

export const fsnow = () => Timestamp.now()

// create a collection
export const updateSubjectDataRecord = (data, docid) => {
  // is it weird to have a aync method that doesn't return anything?
  try {
    const docRef = doc(db, `${mode}/${appconfig.project_ref}/data/`, docid)
    setDoc(docRef, data, {
      merge: true,
    })
  } catch (e) {
    console.error('Error updating document', e)
  }
}

export const loadDoc = async (docid) => {
  const docRef = doc(db, `${mode}/${appconfig.project_ref}/data/`, docid)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const data = docSnap.data()
    // console.log('Document data:', data)
    return data
  }
  // doc.data() will be undefined in this case
  console.log('No such document!')
  return undefined
}

export const createDoc = async (data) => {
  try {
    const expRef = doc(db, mode, appconfig.project_ref)
    await setDoc(
      expRef,
      {
        project_name: appconfig.project_name,
        project_ref: appconfig.project_ref,
        code_name: appconfig.code_name,
        code_name_url: appconfig.code_name_url,
      },
      { merge: true }
    )
    console.log(
      'Document written with ID: ',
      `${mode}/${appconfig.project_ref}`
    )

    // Add a new document with a generated id.
    const docRef = await addDoc(
      collection(db, `${mode}/${appconfig.project_ref}/data`),
      data
    )
    console.log('Document written with ID: ', docRef.id)
    return docRef.id
  } catch (e) {
    console.error('Error adding document: ', e)
    return null
  }
}

export const updateExperimentCounter = async (counter) => {
  const docRef = doc(db, `${mode}/${appconfig.project_ref}/counters/`, counter)

  let newCounter = null;
    try {
      await runTransaction(db, async (transaction) => {
        const docSnap = await transaction.get(docRef);
        if (!docSnap.exists()) {
          newCounter = 0
        } else{
          newCounter = docSnap.data().n + 1;
        }
        transaction.set(docRef, { n: newCounter }, {merge: true});
      });
      console.log("New participant number is: ", newCounter);
      return newCounter
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
}

// export default createDoc
export default db

// const db_type = collection(db, mode) // or should this be collection?

// first get mode (development or live)
// next try to see if a document exists in that collection or not
// if not create one with the name of the experiment
// add code name to the document as well

// setDoc - write if document doesn’t exist, or replace if there is one at that name
// updateDoc - only overwrite fields you specify but error if doesn’t exist
// setDoc(,,{merge: true}) - create document if doesn’t exist, or update if it does
// each as async away or .then()
// addDoc gives you a random reference
// getDoc to read in with document snamshop
//   async function readASingleDocument() {
//     const mySnapshot = await getDoc(specialofthedata)
//     if (mydoc.exists()) {  // if it exists
//         const mydata = mydown.data() // method
//     }
// }
