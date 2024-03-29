export const mockTasks = [
  {
    id: "task-1",
    text: "Go Shopping",
    description: "this is desc",
    completed: true,
    type: "task",
    subtasks: [
      {
        id: "subtask-1-1",
        text: "Get Bananas",
        completed: true,
        type: "subtask",
      },
      {
        id: "subtask-1-2",
        text: "Buy water",
        completed: true,
        type: "subtask",
      },
    ],
  },
  {
    id: "task-2",
    text: "Complete Homework",
    description: "Finish all assigned tasks for the week",
    completed: false,
    type: "task",
    subtasks: [
      {
        id: "subtask-2-1",
        text: "Math exercises",
        completed: true,
        type: "subtask",
      },
      {
        id: "subtask-2-2",
        text: "Science project",
        completed: true,
        type: "subtask",
      },
    ],
  },
  {
    id: "task-3",
    text: "House Cleaning",
    description: "General cleaning and organizing the house",
    completed: false,
    type: "task",
    subtasks: [
      {
        id: "subtask-3-1",
        text: "Vacuum living room",
        completed: false,
        type: "subtask",
      },
      {
        id: "subtask-3-2",
        text: "Clean windows",
        completed: false,
        type: "subtask",
      },
      {
        id: "subtask-3-3",
        text: "Organize bookshelf",
        completed: true,
        type: "subtask",
      },
    ],
  },
  {
    id: "task-4",
    text: "Prepare Dinner",
    description: "Cook a healthy meal for the family",
    completed: false,
    type: "task",
    subtasks: [
      {
        id: "subtask-4-1",
        text: "Chop vegetables",
        completed: true,
        type: "subtask",
      },
      {
        id: "subtask-4-2",
        text: "Marinate chicken",
        completed: false,
        type: "subtask",
      },
      {
        id: "subtask-4-3",
        text: "Set the table",
        completed: false,
        type: "subtask",
      },
    ],
  },
  {
    id: "task-5",
    text: "Morning Routine",
    description: "Start the day with productive habits",
    completed: false,
    type: "task",
    subtasks: [
      {
        id: "subtask-5-1",
        text: "Meditation",
        completed: false,
        type: "subtask",
      },
      {
        id: "subtask-5-2",
        text: "Journaling",
        completed: true,
        type: "subtask",
      },
      {
        id: "subtask-5-3",
        text: "Exercise",
        completed: false,
        type: "subtask",
      },
    ],
  },
  {
    id: "task-6",
    text: "Office Work",
    description: "Complete daily work assignments",
    completed: false,
    type: "task",
    subtasks: [
      {
        id: "subtask-6-1",
        text: "Check emails",
        completed: true,
        type: "subtask",
      },
      {
        id: "subtask-6-2",
        text: "Team meeting",
        completed: false,
        type: "subtask",
      },
      {
        id: "subtask-6-3",
        text: "Project development",
        completed: false,
        type: "subtask",
      },
    ],
  },
  {
    id: "task-7",
    text: "Learning Guitar",
    description: "Practice guitar for 30 minutes",
    completed: false,
    type: "task",
    subtasks: [
      {
        id: "subtask-7-1",
        text: "Tuning",
        completed: false,
        type: "subtask",
      },
      {
        id: "subtask-7-2",
        text: "Scale practice",
        completed: false,
        type: "subtask",
      },
      {
        id: "subtask-7-3",
        text: "Learn new song",
        completed: false,
        type: "subtask",
      },
    ],
  },
];
