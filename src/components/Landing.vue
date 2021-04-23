<template>
  <div class="landing wrapper">
    <div class="head">
      <h2 class="app-title">TODO</h2>
      <img 
        @click="switchTheme" 
        v-show="dark"
        class="theme-switcher" 
        src="../assets/images/icon-moon.svg"
      >
      <img 
        @click="switchTheme" 
        v-show="!dark"
        class="theme-switcher" 
        src="../assets/images/icon-sun.svg"
      >
    </div>
    <div class="container">
      <input v-model="newTodo" @keypress.enter="createTodo" class="box input" type="text" placeholder="Create a new todo...">
      <div class="box">
        <div class="actions" v-show="todoList.length > 0">
          <div class="items-left">{{ actives + ' items left' }}</div>
          <div class="button-group filters">
            <button @click="filterKey = 'all'" :class="{'active-filter' : filterKey === 'all'}">
              All
            </button>
            <button @click="filterKey = 'active'" :class="{'active-filter' : filterKey === 'active'}">
              Active
            </button>
            <button @click="filterKey = 'completed'" :class="{'active-filter' : filterKey === 'completed'}">
              Completed
            </button>
          </div>
          <div class="button-group">
            <button @click="clearCompleted">Clear completed</button>
          </div>
        </div>
        <div @click="item.done = !item.done" class="item" 
          :class="{'completed-item' : item.done}"
          v-for="(item, index) in filterdTodoList" :key="index" 
        >
          <button class="select" :class="{'completed-check' : item.done}">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9" class="check"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
            <span v-show="!item.done" class="fill-button"></span>
          </button>
          {{ item.title }}
          <button class="cross" @click="removeItem(index)">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    dark: true,
    newTodo: '',
    filterKey: 'all',
    todoList: [],
    actives: 0
  }),
  computed: {
    filterdTodoList() {
      this.actives = 0;
      return this.todoList.filter(
        e => {
          if (this.filterKey === 'active' && e.done) return false
          if (this.filterKey === 'completed' && !e.done) return false
          if(!e.done) this.actives++;
          return true
        }
      )
    }
  },
  methods: {
    switchTheme() {
      if (this.dark) {
        this.$store.commit('switchTheme', 'dark')
        if (window.innerWidth > 550) document.getElementById('app').style.backgroundImage = 'url(img/bg-desktop-dark.02105f02.jpg)'
        else  document.getElementById('app').style.backgroundImage = 'url(img/bg-mobile-dark.b0112ea5.jpg)'
      } else {
        this.$store.commit('switchTheme', 'light')
        if (window.innerWidth > 550) document.getElementById('app').style.backgroundImage = 'url(img/bg-desktop-light.988cb74c.jpg)'
        else document.getElementById('app').style.backgroundImage = 'url(img/bg-mobile-light.266f20c7.jpg)'
      }
      this.dark = !this.dark
    },
    createTodo() {
      this.todoList.push({
        title: this.newTodo,
        done: false
      })
      this.activeList.push({
        title: this.newTodo,
        done: false
      })
      this.newTodo = '';
    },
    removeItem(index) {
      this.todoList.splice(index, 1)
    },
    clearCompleted() {
      this.todoList = this.todoList.filter(
        e => e.done === false
      )
    }
  },
  mounted() {
    this.actives = this.todoList.length;
  }
}
</script>

<style>
#app {
  background-image: url(../assets/images/bg-desktop-light.jpg);
  background-size: contain;
  background-position: center 0;
  background-repeat: no-repeat;
}

@media screen and (max-width: 550px) {
  #app {
    background-image: url(../assets/images/bg-mobile-light.jpg);
  }
}
</style>

<style lang="scss" scoped>
.landing {
  width: 40vw;
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @include respond(tab-port) {
    width: 89vw;
    margin: 4rem auto;
  }

  & .head {
    display: flex;
    width: 100%;
    justify-content: space-between;
 
    & .app-title {
      color: white;
      font-weight: 700;
      font-size: 30px;
      letter-spacing: 18px;
      margin: 0;
    }

    & .theme-switcher {
      height: 23px;

      &:hover {
        cursor: pointer;
      }
    }
  }

  & .container {
    width: 100%;

    & .box {
      background-color: var(--secondary);
      width: 100%;
      margin-top: 30px;
      border: none;
      border-radius: 4px;
      display: flex;
      flex-direction: column-reverse;
    }

    & .input {
      padding: 17px;
      width: calc(100% - 34px);

      &::placeholder {
        color: var(--dark-grayish-blue);
      }
    }

    & .item {
      padding: 17px;
      border-bottom: 1px solid var(--border);
      color: var(--text);
      display: flex;
      align-items: center;  
      position: relative;

      &:hover {
        cursor: pointer;
      }

      & .select {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        margin: 0 17px 0 8px;
        position: relative;
        background: var(--border);

        &:hover {
          background: #58DDFF;
          background: -webkit-linear-gradient(top left, #58DDFF, #C058F3);
          background: -moz-linear-gradient(top left, #58DDFF, #C058F3);
          background: linear-gradient(to bottom right, #58DDFF, #C058F3);
          border: 1px solid linear-gradient(to bottom right, #58DDFF, #C058F3);
        }
      }

      & .completed-check {
        background: #58DDFF;
        background: -webkit-linear-gradient(top left, #58DDFF, #C058F3);
        background: -moz-linear-gradient(top left, #58DDFF, #C058F3);
        background: linear-gradient(to bottom right, #58DDFF, #C058F3);
        border: 1px solid linear-gradient(to bottom right, #58DDFF, #C058F3);
      }

      & .fill-button {
        position: absolute;
        width: 20px;
        height: 20px;
        top: 1px;
        border-radius: 50%;
        left: 1px;
        background-color: var(--secondary);
      }

      & .check {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      & .cross {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        background: none;

        & path {
          fill: var(--border);
        }
      }
    }

    & .completed-item {
      text-decoration: line-through;
      color: var(--dark-grayish-blue);
    }

    & .actions {
      padding: 17px;
      display: flex;
      font-size: 13px;
      align-items: baseline;
      justify-content: space-between;

      & .items-left {
        color: var(--dark-grayish-blue);
        font-size: 13px;
      }

      & .button-group {
      
        & button {
          color: var(--dark-grayish-blue);
          font-size: 13px;
          background: none;

          &:hover {
            color: var(--hover);
          }
        }

        & .active-filter {
          color: var(--bright-blue);
        }
      }

      & .filters {

        @include respond(normal-phone) {
          position: absolute;
          left: 5.25vw;
          margin-top: 65px;
          display: flex;
          justify-content: space-evenly;
          width: calc(89vw - 34px);
          padding: 17px;
          background-color: var(--secondary);
          border: none;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>