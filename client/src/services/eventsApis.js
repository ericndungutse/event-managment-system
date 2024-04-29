import axios from 'axios';

export async function fetchEvents() {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/events`
    );

    return res.data.events;
  } catch (error) {
    console.error(error);
    // TODO: HANDLE ERROR
    return [];
  }
}

export async function fetchEvent(id) {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/events/${id}`
    );

    return res.data;
  } catch (error) {
    console.error(error);
    // TODO: HANDLE ERROR
    return [];
  }
}

export async function addEventApi(eventData, token) {
  try {
    const res = await axios({
      url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/events`,
      method: 'POST',
      data: {
        ...eventData,
      },
      headers: {
        'content-type': 'application/json',
        Authorization: token
          ? `Bearer ${token}`
          : `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
    if (error.response.status >= 400)
      throw new Error(error.response.data.message);
    else
      throw new Error(
        'Something went wrong! Please try again'
      );
  }
}

export async function updateApi(eventData, id, token) {
  try {
    const res = await axios({
      url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/events/${id}`,
      method: 'PUT',
      data: {
        ...eventData,
      },
      headers: {
        'content-type': 'application/json',
        Authorization: token
          ? `Bearer ${token}`
          : `Bearer ${token}`,
      },
    });

    console.log(res);

    return res.data;
  } catch (error) {
    console.error(error);
    if (error.response.status >= 400)
      throw new Error(error.response.data.message);
    else
      throw new Error(
        'Something went wrong! Please try again'
      );
  }
}

export async function deleteEventApi(id, token) {
  try {
    const res = await axios({
      url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/events/${id}`,
      method: 'DELETE',

      headers: {
        'content-type': 'application/json',
        Authorization: token
          ? `Bearer ${token}`
          : `Bearer ${token}`,
      },
    });

    console.log(res);

    // return res.data.bookings;
  } catch (error) {
    throw new Error('Error Deleting event');
  }
}
