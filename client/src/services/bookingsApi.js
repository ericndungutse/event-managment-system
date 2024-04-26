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
