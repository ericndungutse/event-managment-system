import axios from 'axios';

export async function fetchBookings(token) {
  try {
    const res = await axios({
      url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/bookings`,
      method: 'GET',

      headers: {
        'content-type': 'application/json',
        Authorization: token
          ? `Bearer ${token}`
          : `Bearer ${token}`,
      },
    });

    return res.data.bookings;
  } catch (error) {
    throw new Error('Error Fetching bookings');
  }
}

export async function bookTickets(
  event,
  token,
  numberOfTickets
) {
  try {
    console.log(event, numberOfTickets);
    const res = await axios({
      url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/bookings`,
      method: 'POST',
      data: {
        event: event,
        nummberOfTickets: numberOfTickets,
      },

      headers: {
        'content-type': 'application/json',
        Authorization: token
          ? `Bearer ${token}`
          : `Bearer ${token}`,
      },
    });

    return res.data.bookings;
  } catch (error) {
    throw new Error('Error Fetching bookings');
  }
}

export async function cancelBooking(id, token) {
  try {
    await axios({
      url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/bookings/${id}/cancel-booking`,
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        Authorization: token
          ? `Bearer ${token}`
          : `Bearer ${token}`,
      },
    });

    return 'Booking canceled.';
  } catch (error) {
    throw new Error('Error Canceling booking');
  }
}
