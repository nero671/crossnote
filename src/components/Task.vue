<template>
  <div class="content-wrapper">
    <section>
      <div class="container">
        <h1 class="ui-title-1">Tasks</h1>
        <div class="task-list__header">
          <div class="buttons-list">
            <div class="button button--round button-default" @click="filter = 'active'">
              Active
            </div>
            <div class="button button--round button-default" @click="filter = 'completed'">
              Completed
            </div>
            <div class="button button--round button-default" @click="filter = 'all'">
              All
            </div>
          </div>
        </div>
        <div class="task-list">
          <div class="task-item" v-for="task in tasksFilter" :key="task.id" :class="{ completed: task.completed }">
            <div class="ui-card ui-card--shadow">
              <div class="task-item__info">
                <!-- Заголововк -->
                <span class="button-close" @click="deleteTask(task.id)"></span>
              </div>
              <div class="task-item__content">
                <div class="task-item__header">
                  <div class="ui-checkbox-wrapper">
                    <input class="ui-checkbox" type="checkbox" v-model="task.completed" />
                  </div>
                  <span class="ui-title-3">{{ task.title }}</span>
                </div>
                <div class="task-item__body">
                  <p class="ui-text-regular">{{ task.description }}</p>  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>    
    </section>
    <div class="ui-messageBox__wrapper" v-if="editingPopup" @click="cancelTaskEdit" :class="{active: editingPopup}">
      <div class="ui-messageBox fadeInDown" @click.stop="">
        <div class="ui-messageBox__header"><span class="messageBox-title">{{ titleEditing }}</span><span class="button-close" @click="cancelTaskEdit"></span></div>
        <div class="ui-messageBox__content">
          <p>Title</p>
          <input type="text" v-model="titleEditing" @keyup.esc="cancelTaskEdit" />
          <p>Description</p>
          <textarea type="text" v-model="desrEditing" @keyup.esc="cancelTaskEdit"></textarea>
        </div>
        <div class="ui-messageBox__footer">
          <div class="button button-light" @click="cancelTaskEdit">Cancel</div>
          <div class="button button-primary" @click="finishTaskEdit">OK</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filter: 'active',
      // Editing
      editingPopup: false,
      titleEditing: '',
      desrEditing: '',
      taskId: null
    }
  },
  methods: {
    // Completed
    taskCompleted (id, completed) {
      completed ? completed = false : completed = true

      this.$store.dispatch('completedTask', {
        id,
        completed
      })
        .then(() => {
          console.log(completed)
          // this.$store.dispatch('loadTasks')
        })
    },
    // Edit
    taskEdit (id, title, description) {
      this.editingPopup = !this.editingPopup
      // console.log({id, title, description})
      this.taskId = id
      this.titleEditing = title
      this.desrEditing = description
    },

    // Cancel button (POPUP)
    cancelTaskEdit () {
      this.editingPopup = !this.editingPopup

      // Reset
      this.taskId = null
      this.titleEditing = ''
      this.desrEditing = ''
    },

    // Done button
    finishTaskEdit () {
      // console.log(this.titleEditing)
      this.$store.dispatch('editTask', {
        id: this.taskId,
        title: this.titleEditing,
        description: this.desrEditing
      })
      this.editingPopup = !this.editingPopup
    },

    // Delete button
    deleteTask (id) {
      this.$store.dispatch('deleteTask', id)
        .then(() => {
          console.log('task deleted')
          this.$store.dispatch('loadTasks')
        })
    }
  },
  computed: {
    // Filter buttons
    tasksFilter () {
      if (this.filter === 'active') {
        return this.$store.getters.taskNotCompleted
      } else if (this.filter === 'completed') {
        return this.$store.getters.taskCompleted
      } else if (this.filter === 'all') {
        return this.$store.getters.tasks
      }
      return this.filter === 'active'
    }
  }
}
</script>

<style>
  .task-item {
    margin-bottom: 20px;
  }
  .task-item__info {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .button-close {
    width: 20px;
    height: 20px;
  }
  .task-item__header {
    display: flex;
    align-items: center;
  }
  .ui-title-3 {
    margin-left: 15px;
    margin-top: 5px;
  }
  .task-list__header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 30px;
  }
  .ui-messageBox__wrapper:active {
    display: flex;
  }
</style>