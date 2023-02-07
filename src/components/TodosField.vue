<template>
  <div class="c-todos-field">
    <Loader v-show="loading" />
    <div class="c-todos-field__filters">
      <Filters
          @getTag="setFilter('tag', $event)"
          @getUserId="setFilter('userId', $event)"
          @getSearch="setFilter('search', $event)"
      />
    </div>
    <TodoItem
        v-for="todo of currentTodos"
        :key="todo.id"
        :todo="todo"
        @click.native="addToFav(todo)"
    >
      <template>
        <svg v-show="isFavourite(todo)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <g data-name="474-Bookmark" id="_474-Bookmark">
            <polygon class="bookmark" points="6 1 6 23 6 31 16 23 26 31 26 23 26 1 6 1"/>
            <polyline class="bookmark" points="11 12 14 15 22 7"/>
          </g>
        </svg>
        <svg v-show="!isFavourite(todo)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <g data-name="474-Bookmark" id="_474-Bookmark">
            <polygon class="bookmark" points="6 1 6 23 6 31 16 23 26 31 26 23 26 1 6 1"/>
          </g>
        </svg>
      </template>
    </TodoItem>
    <div class="c-todos-field_pagination">
      <div
          :key="page"
          v-for="page of pageNumbers"
          :class="{'c-todos-field_pagination-item--active': page === currentPage}"
          class="c-todos-field_pagination-item"
          @click="setCurrentPage(page)"
      >
        {{ page }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import TodoItem from "./TodoItem";
import Api from "../api";
import TextField from "./TextField";
import Filters from "./Filters";
import Loader from "./Loader";

export default {
  name: "TodosField",
  components: {Loader, Filters, TextField, TodoItem},
  data() {
    return {
      currentPage: 1,
      loading: false,
      postsPerPage: 20,
      todosList: [],
      initialTodosList: [],
      favIds: [],
      filters: {
        tag: '',
        userId: '',
        search: ''
      },
    }
  },
  computed: {
    ...mapState(['todos']),
    indexOfLastPost() {
      return this.currentPage * this.postsPerPage;
    },
    indexOfFirstPost() {
      return this.indexOfLastPost - this.postsPerPage;
    },
    currentTodos() {
      return this.todos.todos.slice(this.indexOfFirstPost, this.indexOfLastPost);
    },
    pageNumbers() {
      const pageNumbers = []
      for (let i = 1; i <= Math.ceil(this.todos.todos.length / this.postsPerPage); i++) {
        pageNumbers.push(i);
      }

      return pageNumbers;
    },
  },
  methods: {
    ...mapMutations(['SET_TODOS']),
    setFilter(filter, value) {
      this.filters[filter] = value;
      this.submitFilters();
    },
    submitFilters() {
      const filteredData = this.initialTodosList
        .map(todo => {
          if (!this.filters.tag || this.filters.tag === 'all') {
            return todo
          }

          switch (this.filters.tag) {
            case 'completed': {
              if (todo.completed) return todo
            }
            break
            case 'uncompleted': {
              if (!todo.completed) return todo
            }
            break
            case 'favorites': {
              if (this.isFavourite(todo)) return todo
            }
            break;

            default: return todo
          }
      })
      .filter(item => item)
      .map(todo => {
        if (!this.filters.userId) {
          return todo
        }

        if (todo.userId === +this.filters.userId)
          return todo
      })
      .filter((item) => item)
      .map((todo) => {
        if (!this.filters.search) {
          return todo;
        }

        if (todo.title.toLowerCase().indexOf(this.filters.search.toLowerCase()) > -1) {
          return todo;
        }
      })
      .filter((item) => item);
      this.SET_TODOS(filteredData)
    },
    isFavourite(todo) {
      if (localStorage.getItem('favourites')) {
        return this.favIds.split(' ').includes(todo.id.toString());
      }
      return false;
    },
    setCurrentPage(page) {
      this.currentPage = page
    },
    addToFav(todo) {
      this.loading = true;
      setTimeout(() => {
        let favList = localStorage.getItem('favourites')
        if (favList) {
          const isExist = favList.split(' ').find(item => +item === +todo.id);
          if (isExist) {
            favList = favList
                .split(' ')
                .filter(value => +value !== +todo.id)
                .toString()
                .replaceAll(',',' ')
            localStorage.setItem('favourites', `${favList}`);
          } else {
            const updatedList = favList.toString()+' '+todo.id+' ';
            localStorage.setItem('favourites', `${updatedList.replaceAll(',',' ')}`);
          }
        } else {
          localStorage.setItem('favourites', `${todo.id} `);
        }
        window.dispatchEvent(new CustomEvent('favourites-localstorage-changed', {
          detail: {
            storage: localStorage.getItem('favourites')
          }
        }));
        this.loading = false;
      }, 500);
      clearTimeout();
    }
  },
  async created() {
    this.initialTodosList = await Api.getTodoList();
  },
  mounted() {
    window.addEventListener('favourites-localstorage-changed', (event) => {
      this.favIds = event.detail.storage;
    });
    window.dispatchEvent(new CustomEvent('favourites-localstorage-changed', {
      detail: {
        storage: localStorage.getItem('favourites')
      }
    }));
  },
}
</script>

<style lang="scss">
.c-todos-field {
  &_pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--light-blue);
      border-radius: 50%;
      width: 30px;
      height: 30px;
      cursor: pointer;
      transition: all 0.3s;
      @media screen and (max-width: 500px) {
        width: 25px;
        height: 25px;
      }
      &:hover {
        opacity: .75;
      }
      &--active {
        background: var(--light-blue);
        color: var(--white);
      }
    }
  }
}
</style>
