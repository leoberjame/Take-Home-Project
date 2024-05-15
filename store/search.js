const state = () => ({
    searchText: null,
    searchResults: [],
});
const getters = {
    getSearchText: (state) => state.searchText,
    getSearchResults: (state) => state.searchResults,
};
const actions = {
    async searchAction({ commit, state }, value) {
        commit("SET_SEARCH_VALUE", value)
        commit("SET_SEARCH_RESULTS", [])
        const apiKey = process.env.apiKey
        return await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${state.searchText}&type=video&maxResults=20&key=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(err.error.message);
                    });
                }
                return response.json();
            })
            .then(data => {
                const results = [...data?.items];
                if (results?.length > 0) commit("SET_SEARCH_RESULTS", results);
                return state.searchResults;
            })
            .catch(error => {
                console.error(error);
            });
    },
    async searchMostPopularAction({ commit, state }) {
        commit("SET_SEARCH_RESULTS", [])
        const apiKey = process.env.apiKey
        return await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&key=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(err.error.message);
                    });
                }
                return response.json();
            })
            .then(data => {
                const results = [...data?.items];
                if (results?.length > 0) {
                    commit("SET_SEARCH_RESULTS", results);
                }
                return state.searchResults;
            })
            .catch(error => {
                console.error(error);
            });
    },
};
const mutations = {
    SET_SEARCH_VALUE(state, value) {
        state.searchText = value;
    },
    SET_SEARCH_RESULTS(state, value) {
        state.searchResults = [...value];
    }
};
export default {
    state,
    getters,
    actions,
    mutations,
};