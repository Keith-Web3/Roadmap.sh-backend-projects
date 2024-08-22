## To run the cli, follow the steps below:

- Clone the repo by running the code below in your terminal:

```bash
git clone git@github.com:Keith-Web3/Roadmap.sh-backend-projects.git
```

- Create a global symlink by running

```bash
npm link
```

- Run the cli using the command `task-cli`

## Command Examples:

### Adding a new task

task-cli add "Buy groceries"

### Output: Task added successfully (ID: 1)

### Updating and deleting tasks

task-cli update 1 "Buy groceries and cook dinner"
task-cli delete 1

### Marking a task as in progress or done

task-cli mark-in-progress 1
task-cli mark-done 1

### Listing all tasks

task-cli list

### Listing tasks by status

task-cli list done
task-cli list todo
task-cli list in-progress
