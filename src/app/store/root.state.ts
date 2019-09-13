import { State } from '@ngxs/store';

export class AppStateModel {
}

@State<AppStateModel>({
    name: 'app',
    defaults: {}
  })
  export class AppState {}
