import { onValue, push, ref, set, update } from "firebase/database";
import { db } from "../firebase/firebase";

export const subscribeToCourses = (callback) => {
  const coursesRef = ref(db, "courses");
  return onValue(coursesRef, (snapshot) => {
    const data = snapshot.val() || {};
    callback(Object.entries(data).map(([id, value]) => ({ id, ...value })));
  });
};

export const subscribeToTrainers = (callback) => {
  const trainersRef = ref(db, "trainers");
  return onValue(trainersRef, (snapshot) => {
    const data = snapshot.val() || {};
    callback(Object.entries(data).map(([id, value]) => ({ id, ...value })));
  });
};

export const createBooking = async ({ uid, courseId, courseName, memberName }) => {
  const bookingRef = push(ref(db, "bookings"));
  await set(bookingRef, {
    uid, courseId, courseName, memberName,
    status: "pending",
    createdAt: Date.now()
  });
  return bookingRef.key;
};

export const saveContactMessage = async (message) => {
  const messageRef = push(ref(db, "contactMessages"));
  await set(messageRef, { ...message, createdAt: Date.now(), status: "new" });
  return messageRef.key;
};

export const subscribeToUserBookings = (uid, callback) => {
  return onValue(ref(db, "bookings"), (snapshot) => {
    const data = snapshot.val() || {};
    callback(
      Object.entries(data)
        .map(([id, value]) => ({ id, ...value }))
        .filter((booking) => booking.uid === uid)
        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    );
  });
};
