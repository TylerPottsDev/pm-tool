export const state = () => ({
  projects: [
    {
      id: '0',
      title: 'Project 1',
      desc: 'This is Project 1',
      tasks: []
    },
    {
      id: '1',
      title: 'Project 2',
      desc: 'This is Project 2',
      tasks: []
    }
  ]
});

export const mutations = {
  newProject (state, project) {
    state.projects.push(project);
  },
  newTask (state, payload) {
    state.projects.map(project => {
      if (project.id == payload.id) {
        let id = Math.random().toString(36).slice(2);
        project.tasks.push({
          id: id,
          todo: payload.todo,
          done: false,
          weight: project.tasks.length +1
        });
      }
    })
  },
  toggleDone (state, payload) {
    state.projects.map(project => {
      if (project.id == payload.id) {
        project.tasks.map(task => {
          if (task.id == payload.task.id) {
            task.done = !task.done;
          }
        })
      }
    })
  },
  removeTask (state, payload) {
    state.projects.map(project => {
      if (project.id == payload.id) {
        project.tasks = project.tasks.filter(task => {
          if (task.id != payload.task.id) {
            if (task.weight > payload.task.weight) {
              task.weight--;
            }
            return task;
          }
        })
      }
    })
  },
  weightUp (state, payload) {
    state.projects.map(project => {
      if (project.id === payload.id) {
        project.tasks.map(task => {
          if (task.id === payload.task.id) {
            if (task.weight > 1) {
              task.weight--;
            }
          } else if (task.weight === payload.task.weight - 1) {
            if (task.weight < project.tasks.length) {
              task.weight++;
            }
          }
        })
      }
    })
  },
  weightDown (state, payload) {
    state.projects.map(project => {
      if (project.id === payload.id) {
        project.tasks.map(task => {
          if (task.id === payload.task.id) {
            if (task.weight < project.tasks.length) {
              task.weight++;
            }
          } else if (task.weight === payload.task.weight) {
            if (task.weight > 1) {
              task.weight--;
            }
          }
        })
      }
    })
  },
  sortByWeight (state, id) {
    state.projects.map(project => {
      if (project.id === id) {
        if (project.tasks.length > 1) {
          project.tasks.sort(function (a, b) {
            return a.weight - b.weight;
          })
        }
      }
    })
  }
}