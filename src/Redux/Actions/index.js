export const buyBook=(book)=>{
    return {
      type:'buy',
      payload:book
      }
  }
  export const buyBook1=(user)=>{
    return{
      type:'BUY1',
      payload:user
    }
  }
  
  export const returnBook=(book)=>{
      return {
       type:'return',
       payload:book
      }
  }
  export const returnBook1=(user)=>{
      return {
       type:'BOOKRETURN',
       payload:user
      }
  }
  export const logout=(user)=>{
    return{
      type:'logout',
      payload:user
    }
  }