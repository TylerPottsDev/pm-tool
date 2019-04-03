<template>
  <nav>
    <v-toolbar>
      <nuxt-link to="/">
        <v-toolbar-title class="primary--text text-uppercase font-weight-black">
          NUXT<span class="white--text font-weight-light">PROJECT</span>
        </v-toolbar-title>
      </nuxt-link>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat @click="projectDialog = !projectDialog" v-if="!isProjectPage">Create Project</v-btn>
        <v-btn flat @click="taskDialog = !taskDialog" v-else>Create Task</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-dialog v-model="projectDialog" width="768">
      <v-card>
        <v-card-title>
          Create a Project
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <v-text-field label="Title" v-model="title"></v-text-field>
          <v-text-field label="Short Description" v-model="desc"></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="projectDialog = false">Close</v-btn>
          <v-btn color="primary" class="grey--text text--darken-3" @click="createProject">Create Project</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="taskDialog" width="768">
      <v-card>
        <v-card-title>
          Create a Task
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <v-text-field label="Task" v-model="task"></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="taskDialog = false">Close</v-btn>
          <v-btn color="primary" class="grey--text text--darken-3" @click="createTask">Create Task</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      isProjectPage: false,
      projectDialog: false,
      taskDialog: false,
      title: '',
      desc: '',
      task: ''
    }
  },
  methods: {
    createProject () {
      let id = Math.random().toString(36).slice(2);
      this.$store.commit('newProject', {
        id: id,
        title: this.title,
        desc: this.desc,
        tasks: []
      })

      this.projectDialog = false;
      this.title = '';
      this.desc = '';
    },
    createTask () {
      this.$store.commit('newTask', {
        id: this.$route.params.id,
        todo: this.task
      })

      this.taskDialog = false;
      this.task = '';
    }
  },
  watch: {
    $route () {
      if (this.$route.name == 'project-id') {
        this.isProjectPage = true;
      } else {
        this.isProjectPage = false;
      }
    }
  }
}
</script>

