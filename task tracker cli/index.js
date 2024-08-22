#!/usr/bin/env node
import fs from 'node:fs/promises'
import path from 'node:path'

const command = process.argv[2]
const generateId = function () {
  return Date.now()
}

console.log(command)
console.log(generateId())
const filePath = path.join('./', 'tasks.json')

// console.log(filePath)

// const serializedTasks = await fs.readFile(filePath, 'utf-8')

// console.log(serializedTasks)

const serializedTasks = await fs.readFile(filePath, 'utf-8')

const tasks = JSON.parse(serializedTasks)
switch (command) {
  case 'add': {
    const id = generateId()
    await fs.writeFile(
      filePath,
      JSON.stringify({
        ...tasks,
        [id]: {
          task: process.argv[3],
          status: 'todo',
        },
      }),
      'utf-8'
    )
    console.log(`Task added successfully (ID: ${id})`)
    break
  }
  case 'delete': {
    delete tasks[process.argv[3]]

    await fs.writeFile(filePath, JSON.stringify(tasks), 'utf-8')
    console.log(`Deleted task with (ID: ${process.argv[3]})`)
    break
  }
  case 'update': {
    tasks[process.argv[3]].task = process.argv[4]

    await fs.writeFile(filePath, JSON.stringify(tasks), 'utf-8')
    console.log(`Updated task with (ID: ${process.argv[3]})`)
    break
  }
  case 'mark-in-progress': {
    tasks[process.argv[3]].status = 'in-progress'

    await fs.writeFile(filePath, JSON.stringify(tasks), 'utf-8')
    console.log(`Task with (ID: ${process.argv[3]}) is now in progress`)
    break
  }
  case 'mark-done': {
    tasks[process.argv[3]].status = 'done'

    await fs.writeFile(filePath, JSON.stringify(tasks), 'utf-8')
    console.log(`Task with (ID: ${process.argv[3]}) is done`)
    break
  }
  case 'list': {
    if (!process.argv[3]) {
      console.log(tasks)
      break
    }

    const filteredTasks = {}
    for (const taskKey in tasks) {
      const task = tasks[taskKey]
      if (task.status === process.argv[3].trim().toLowerCase()) {
        filteredTasks[taskKey] = task
      }
    }
    console.log(filteredTasks)
    break
  }
}
