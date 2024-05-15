<template>
  <b-input-group key="md" size="md">
    <b-form-input
      v-model="search"
      @keyup.enter="handleSearch"
      placeholder="Search"
      class="search-input"
    />
    <b-input-group-append>
      <b-button class="search-btn" size="md" @click="handleSearch">
        <SvgIconsSearchIcon />
      </b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
export default {
  name: 'SearchInputComp',
  props: {},
  data() {
    return {
      search: '',
    }
  },
  methods: {
    handleSearch() {
      this.$store.dispatch(`search/searchAction`, this.search)
    },
  },
}
</script>