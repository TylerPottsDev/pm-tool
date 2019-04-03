<template>
  <v-layout>
    <v-flex>
      <h2 class="display-1 text-uppercase">{{project.title}}</h2>
      <p>{{project.desc}}</p>
      <h3 class="headline">Tasks</h3>
      <v-list two-line>
        <v-list-tile v-for="task in project.tasks" :key="task.id" class="item">
          <v-list-tile-action>
            <v-btn fab small @click="weightUp(task)">
              <v-icon>keyboard_arrow_up</v-icon>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-action>
            <v-btn fab small @click="weightDown(task)">
              <v-icon>keyboard_arrow_down</v-icon>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title :class="(task.done) ? 'done' : ''" @click="toggleDone(task.id)">
              {{ task.todo }}
            </v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn flat color="warning" @click="removeTask(task)">Remove</v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    project () {
      this.$store.commit('sortByWeight', this.$route.params.id);
      return this.$store.state.projects.find(p => p.id === this.$route.params.id);
    }
  },
  methods: {
    toggleDone (id) {
      this.$store.commit('toggleDone', {
        id: this.$route.params.id,
        task: {
          id: id
        }
      })
    },
    removeTask (task) {
      this.$store.commit('removeTask', {
        id: this.$route.params.id,
        task: task
      })
    },
    weightUp (task) {
      this.$store.commit('weightUp', {
        id: this.$route.params.id,
        task: task
      })
    },
    weightDown (task) {
      this.$store.commit('weightDown', {
        id: this.$route.params.id,
        task: task
      })
    }
  }
}
</script>

<style>
.done {
  text-decoration: line-through;
}

.item {
  border-bottom: 1px solid #555;
  animation: fadeIn 1s linear;
}
.item:last-of-type {
  border-bottom: none;
}

@keyframes fadeIn {
  from { background-color: rgba(255, 204, 0, 1) }
  to { background-color: rgba(255, 204, 0, 0) }
}
</style>

