const initialState = {
  users: [],
  loginUsers: [],
  loggedInUser: [],
  books: [
    {
      id: 1,
      name: "The power of your subconscious mind",
      quantity: 2,
    },
    {
      id: 2,
      name: "The Monk who sold his ferrari",
      quantity: 2,
    },
    {
      id: 3,
      name: "The Alchemist",
      quantity: 2,
    },
    {
      id: 4,
      name: "The Invisible Man",
      quantity: 2,
    },
    {
      id: 5,
      name: "The Great treasure",
      quantity: 2,
    },
    {
      id: 6,
      name: "The Holy Shit",
      quantity: 2,
    },
  ],
  userBookList: {

  },
  UserRecord: [


  ]


};

const bookReducer = (state = initialState, action) => {

  switch (action.type) {
   
    case "Register":
      return {
        ...state,
        users: [...state.users, action.payload],
      }
      break;
    case "login":
      console.log(action)
      state.userBookList[`${action.payload.username}`] = state.userBookList[`${action.payload.username}`]?.length ? [...state.userBookList[`${action.payload.username}`]] : []
      console.log(state.userBookList[`${action.payload.username}`])
      return {
        ...state,
        loginUsers: [...state.loginUsers, action.payload],
        loggedInUser: action.payload,
        userBookList: {
          ...state.userBookList,
          [`${action.payload.username}`]:
            state.userBookList[`${action.payload.username}`]

        }

      };
      break;
    case "logout":
      return {
        ...state,
        loggedInUser: [],



      };
      break;
    case "BUY1":
      const index1 = state.books.findIndex((book) => book.id === action.payload.data[0].id)
      // console.log(action.payload.data.id)
      // console.log(index1)
      let d = new Date()
      const time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      // console.log(time)
      // console.log({...state.UserRecord})
      const newArr = [...state.books];
      newArr[index1].quantity = newArr[index1].quantity - 1;
      return {
        ...state,
        userBookList: {
          ...state.userBookList,
          [`${state.loggedInUser.username}`]: [
            ...state.userBookList[[`${state.loggedInUser.username}`]],
            action.payload.data[0].name
          ]
        },
        UserRecord: [
          ...state.UserRecord, {

            books: action.payload.data[0].name,
            username: state.loggedInUser.username,
            IssuedAt: time,
            DepositedAt: ''
          }]
      }
      break;
    case "BOOKRETURN":

      const index3 = state.books.findIndex((book) => book.id === action.payload.data[0].id)



      function bookFind(book) {
        return book === action.payload.data[0].name

      }

      const newBookIndex = state.userBookList[[`${state.loggedInUser.username}`]].findIndex(bookFind)

      const booksAfter = [...state.userBookList[[`${state.loggedInUser.username}`]]]
      booksAfter.splice(newBookIndex, 1)

      let d1 = new Date()
      const time1 = d1.getHours() + ':' + d1.getMinutes() + ':' + d1.getSeconds()



      var result = state.UserRecord.find(obj => {
        return obj.username === state.loggedInUser.username && obj.books === action.payload.data[0].name && obj.DepositedAt === ''
      })
      result.DepositedAt = time1
      console.log(action.payload.fine);
      result.Fine = action.payload.fine
      const newArr1 = [...state.books];
      newArr1[index3].quantity = newArr1[index3].quantity + 1;
      return {
        ...state,

        userBookList: {
          ...state.userBookList,
          [`${state.loggedInUser.username}`]:
            booksAfter

        },
        UserRecord: [
          ...state.UserRecord,

        ]
      };
     default:
      return state;
  }
}
export default bookReducer;