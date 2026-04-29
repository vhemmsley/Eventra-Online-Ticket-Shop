import { db } from '@/firebase'
import {
  doc,
  getDoc,
  addDoc,
  collection,
  updateDoc,
  increment,
  serverTimestamp,
} from 'firebase/firestore'

export default {
  async purchaseTickets({ commit }, { eventId, userId, quantity, totalPrice, serviceFee }) {
    await addDoc(collection(db, 'orders'), {
      eventId,
      userId,
      quantity,
      totalPrice,
      serviceFee,
      buyer,
      createdAt: serverTimestamp(),
    })

    await updateDoc(doc(db, 'events', eventId), {
      ticketsLeft: increment(-quantity),
      attendees: increment(quantity),
    })

    // ✅ RETURN SUCCESS
    return true
  },
}
