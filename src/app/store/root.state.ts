import { State } from '@ngxs/store';

export class AppModel {
}

@State<AppModel[]>({
    name: 'app',
    defaults: []
  })
  export class AppState {}
