<template>
  <div class="c-filters">
    <SelectField @change="$emit('getTag', $event)" defaultOptionHide :options="filters" />
    <SelectField @change="$emit('getUserId', $event)" defaultOptionHide :options="__getUsersIds" />
    <TextField placeholder="Search..." v-model="search" @input="$emit('getSearch', search)" />
  </div>
</template>

<script>
import TextField from "./TextField";
import SelectField from "./SelectField";
import Api from '../api'
export default {
  name: "Filters",
  components: {SelectField, TextField},
  data() {
    return {
      search: '',
      filters: [
        { label: 'All', value: 'all' },
        { label: 'Completed', value: 'completed' },
        { label: 'Uncompleted', value: 'uncompleted' },
        { label: 'Favorites', value: 'favorites' },
      ],
      users: [],
    }
  },
  computed: {
    __getUsersIds() {
      return this.users.map(user =>  ({ label: user.id, value: user.id }));
    }
  },
  async created() {
    this.users = await Api.getUsersList()
  }
}
</script>

<style lang="scss">
.c-filters {
  display: grid;
  grid-template-columns: 1fr 1fr 3fr;
  grid-gap: 10px;
  margin-bottom: 10px;
  @media screen and (max-width: 1100px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
