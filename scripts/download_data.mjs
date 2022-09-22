#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */

import inquirer from 'inquirer'
import chalk from 'chalk'
import figlet from 'figlet'
// import shell from 'shelljs'
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
// import appconfig from '../src/config'

const init = () => {
  console.log(
    chalk.green(
      figlet.textSync('SMILE.', {
        font: 'big',
        horizontalLayout: 'default',
        verticalLayout: 'default',
      })
    )
  )
  console.log(chalk.green('your data is almost here.'))
}

const askQuestions = () => {
  const questions = [
    {
      type: 'list',
      name: 'TYPE',
      message: 'What type of data do you want?',
      choices: ['testing', 'real'],
    },
    {
      type: 'list',
      name: 'COMPLETE_ONLY',
      message: 'Do you want all the data or just that was marked complete?',
      choices: ['all', 'complete_only'],
    },
    {
      type: 'input',
      name: 'FILENAME',
      message: 'What is the name of the file without extension?',
      default: 'data',
    },
  ]
  return inquirer.prompt(questions)
}

const storeData = async (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}

const getData = async (path, completeOnly, filename) => {
  const localenv = dotenv.config({ path: 'env/.env.local' })
  const firebaseConfig = {
    apiKey: localenv.parsed.VITE_FIREBASE_APIKEY,
    authDomain: localenv.parsed.VITE_FIREBASE_AUTHDOMAIN,
    projectId: localenv.parsed.VITE_FIREBASE_PROJECTID,
    storageBucket: localenv.parsed.VITE_FIREBASE_STORAGEBUCKET,
    messagingSenderId: localenv.parsed.VITE_FIREBASE_MESSAGINGSENDERID,
    appId: localenv.parsed.VITE_FIREBASE_APPID,
  }
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  let querySnapshot = null

  if (completeOnly == 'all') {
    querySnapshot = await getDocs(collection(db, path))
  } else {
    const q = query(collection(db, path), where('complete', '==', true))
    querySnapshot = await getDocs(q)
  }
  const data = []
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, data: doc.data() })
  })

  await storeData(data, `data/${filename}.json`)
}

const success = (filename) => {
  console.log(
    chalk.green(`your data has been exported to 'data/${filename}.json'.`)
  )
}

const run = async () => {
  // show script introduction
  init()
  const env = dotenv.config({ path: 'env/.env.git.local' })
  const project_ref = `${env.parsed.VITE_GIT_OWNER}-${env.parsed.VITE_PROJECT_NAME}-${env.parsed.VITE_GIT_BRANCH_NAME}`

  // ask questions
  const answers = await askQuestions()
  const { TYPE, COMPLETE_ONLY, FILENAME } = answers

  // create the file
  const path = `${TYPE}/${project_ref}/data`
  await getData(path, COMPLETE_ONLY, `${TYPE}-${COMPLETE_ONLY}-${FILENAME}`)

  // show success message
  success(`${TYPE}-${COMPLETE_ONLY}-${FILENAME}`)
}

run()
