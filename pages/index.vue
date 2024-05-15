<template>
  <div class="home-page">
    <header class="container">
      <img draggable="false" alt="" src="~/assets/images/logo.png" />
      <InputsSearch />
    </header>
    <main class="container-fluid">
      <section>
        <!-- video list section -->
        <div
          :class="[`video-list`, { 'd-none': selectedVideoId }]"
          v-if="getSearchResults.length"
        >
          <!-- video item section -->
          <b-card
            v-for="video in getSearchResults"
            @click="playVideo(whichVideoId(video))"
            :key="whichVideoId(video)"
            no-body
            class="video-card text-left mr-2"
          >
            <b-media class="d-flex flex-column">
              <template #aside>
                <b-img
                  class="w-100"
                  :src="video.snippet.thumbnails.medium.url"
                  :alt="video.snippet.title"
                />
              </template>
              <h5 class="mt-0">
                {{ `${video.snippet.title.slice(0, 50)}...` }}
              </h5>
              {{ `${video.snippet.description.slice(0, 80)}...` }}
            </b-media>
          </b-card>
        </div>

        <!-- Loading section -->
        <div
          v-else
          class="w-100 vh-100 d-flex justify-content-center align-items-center"
        >
          Loading...
        </div>

        <!-- video player section -->
        <div class="container my-4" v-if="selectedVideoId">
          <b-button variant="outline-dark" @click="playVideo(null)">
            Back
          </b-button>
          <div class="video-player">
            <div class="video-wrapper">
              <iframe
                :src="`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              >
              </iframe>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'IndexPage',
  data() {
    return {
      selectedVideoId: null,
    }
  },
  computed: {
    ...mapGetters({
      getSearchText: 'search/getSearchText',
      getSearchResults: 'search/getSearchResults',
    }),
  },
  methods: {
    ...mapActions({
      searchMostPopularAction: 'search/searchMostPopularAction',
    }),
    playVideo(videoId) {
      this.selectedVideoId = videoId
    },
    whichVideoId(data) {
      return !this.getSearchText ? data.id : data.id.videoId
    },
  },
  mounted() {
    this.searchMostPopularAction()
  },
}
</script>
