export const Status = {
    BACKLOG: 'backlog',
    PROCESSING: 'in-progress',
    DONE: 'done',
    TRASH: 'trash',
  };
  
  export const StatusLabel = {
    [Status.BACKLOG]: 'Бэклог',
    [Status.PROCESSING]: 'В процессе',
    [Status.DONE]: 'Готово',
    [Status.TRASH]: 'Корзина',
  };
  
 export const UserAction = {
    UPDATE_TASK: 'UPDATE_TASK',
    ADD_TASK: 'ADD_TASK',
    DELETE_TASK: 'DELETE_TASK'
  }

  export const UpdateType = {
    PATCH: 'PATCH',
    MINOR: 'MINOR',
    MAJOR: 'MAJOR',
    INIT: 'INIT'
  }
  