import { child, get, push, ref, update } from 'firebase/database';
import { database } from '../firebaseService';
import { Schedule, ScheduleTitles, UnsavedSchedule } from '../types';

const SCHEDULE_DB_KEY = 'schedule';

export async function fetchScheduleTitles() {
  const snapshot = await get(child(ref(database), SCHEDULE_DB_KEY));
  const data: Record<string, UnsavedSchedule> = snapshot.val() || {};

  const scheduleTitles: ScheduleTitles = Object.entries(data).reduce(
    (titles: ScheduleTitles, [id, schedule]) => [
      ...titles,
      { id, title: schedule.title },
    ],
    [],
  );

  return scheduleTitles;
}

export async function fetchSchedule(id: string) {
  const snapshot = await get(child(ref(database), `${SCHEDULE_DB_KEY}/${id}`));
  const data: Schedule = snapshot.val();

  if (!data) return undefined;

  return { ...data, id };
}

export async function addSchedule(schedule: UnsavedSchedule) {
  const id = push(child(ref(database), SCHEDULE_DB_KEY)).key;

  await update(ref(database), {
    [`${SCHEDULE_DB_KEY}/${id}`]: { ...schedule, id },
  });

  return id;
}

export async function updateSchedule(schedule: Schedule) {
  await update(ref(database), {
    [`${SCHEDULE_DB_KEY}/${schedule.id}`]: schedule,
  });

  return schedule.id;
}

export async function removeSchedule(id: string) {
  return update(ref(database), {
    [`${SCHEDULE_DB_KEY}/${id}`]: null,
  });
}
