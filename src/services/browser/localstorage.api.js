
export function addItemToList(listName, item){
  let list =  JSON.parse(localStorage.getItem(listName)) || [];
  let id = list.length ? Math.max(...list.map(({id}) => id)) + 1 : 1;

  list.push({id, ...item});
  
  console.log('storage',listName)
  localStorage.setItem(listName, JSON.stringify(list));
}

export function getList(listName){
  return JSON.parse(localStorage.getItem(listName));
}

export function deleteListItem(listName, id){

}