import {createStore, action, thunk, computed} from 'easy-peasy'
import {MODES} from './App'

export default createStore({

    users: [],
    setUsers: action((state, payload) => {
        state.users = payload
    }),
    firstName: '',
    setFirstName: action((state, payload) => {
        state.firstName = payload
    }),
    lastName: '',
    setLastName: action((state, payload) => {
        state.lastName = payload
    }),
    user: '',
    setUser: action((state, payload) => {
        state.user = payload
    }),
    mode: 'CREATE_MODE',
    setMode: action((state, payload) => {
        state.mode = payload
    }), 
    userCount: computed((state) => state.users.length),
    getUserById: computed((state) => {
        return (id) => state.users.find(user => (user.id).toString() === id)
    }),
    reset: thunk((actions) => {
        actions.setFirstName('')
        actions.setLastName('')
        actions.setMode(MODES.CREATE)
    }),
    saveUser: thunk((actions, newUser, helpers) => {
        const { users } = helpers.getState()
        const newUsers = [...users, newUser]
        actions.setUsers(newUsers)
        actions.reset()
    }),
    deleteUser: thunk((actions, dUser, helpers) => {
        const { users } = helpers.getState()
        const { id } = dUser
        actions.setUsers(users.filter(user => user.id !== id))
        actions.reset()
    }),
    activeUser: thunk((actions, selectedUser) => {
        actions.setUser(selectedUser)
        actions.setFirstName(selectedUser.firstName)
        actions.setLastName(selectedUser.lastName)
        actions.setMode(MODES.EDIT)
    }),
    editUser: thunk((actions, updatedUser, helpers) => {
        const { users } = helpers.getState()
        const { id } = updatedUser
        const newUsers = users.map(user => user.id === id ? updatedUser : user)
        actions.setUsers(newUsers)
        actions.reset()
    }),

})