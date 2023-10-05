<template>
  <div class="content-wrapper">
    <section>
      <div class="container">
        <h1 class="ui-title-1">Your notes</h1>
        <input type="text" placeholder="Title" v-model="taskTitle" @keyup.enter="newTask" />
        <textarea type="text" placeholder="What we will watch?" v-model="taskDescription" @keyup.enter="newTask"></textarea>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      taskTitle: '',
      taskDescription: '',
      whatWatch: 'Film'
    }
  },
  methods: {
    newTask () {
      if (this.taskTitle === '') {
        return
      }
      const task = {
        title: this.taskTitle,
        description: this.taskDescription,
        whatWatch: this.whatWatch,
        completed: false,
        editing: false
      }
      this.$store.dispatch('newTask', task)

      console.log(task)
      // Reset
      this.taskTitle = ''
      this.taskDescription = ''
    }
  }
}
</script>

<style scoped>

</style>
