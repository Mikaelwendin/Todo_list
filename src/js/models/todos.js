export class Todos {
    constructor(what, isDone) {
      this.isDone = isDone || false;
      this.what = what;
    }
  }