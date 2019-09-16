import axios from '@/assets/js/axios.js'
// import utils from '@/assets/js/utils.js'

let cacheArea = {}

const state = {
  // navName: null,
  userArea: null,
  navRouter: []
}
const getters = {
  navName: state => {
    if (state.navRouter.length > 0) {
      return state.navRouter[state.navRouter.length - 1]
    }
    return {}
  },
  userArea: state => state.userArea || [],
  navRouter: state => state.navRouter
}
const mutations = {
  pushNavRouter(state, area) {
    let item = state.navRouter.find(t => t.name == area.name)
    if (!item) {
      state.navRouter.push(area);
    }
  },
  backNavRouter(state, index) {
    if (state.navRouter.length > index) {
      state.navRouter = state.navRouter.slice(0, index + 1);
    }
  },
  setUserArea(state, userArea) {
    state.userArea = userArea
    if (state.navRouter.length == 0) {
      state.navRouter = [...userArea]
    }
  }
}
const actions = {
  getAreaList(context, {
    parentId = '330300',
    fieldControl = '1'
  }) {
    return new Promise(resolve => {
      let key = `${parentId}_${fieldControl}`
      if (key in cacheArea) {
        resolve(cacheArea[key])
      } else {
        const url = 'a/sys/area/findListByOther.rf'
        axios.postUrl(url, {
          fieldControl,
          'parent.id': parentId
        }).then(rst => {
          if (rst.isok) {
            let list = rst.data
            cacheArea[key] = list
            resolve(list)
          }
        })
      }
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
