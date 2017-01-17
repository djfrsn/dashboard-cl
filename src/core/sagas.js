import { authSagas } from './auth';
import { notificationsSagas } from './notifications';
import { taskSagas } from './tasks';


export default function* sagas() {
  yield [
    ...authSagas,
    ...notificationsSagas,
    ...taskSagas
  ];
}
