

function reducer(state:{name:string}, action:{type:string}){
  switch(action.type){
    case 'ADD':
      return {...state, name:'hello'}
  }
  return {...state};
}

export {reducer};