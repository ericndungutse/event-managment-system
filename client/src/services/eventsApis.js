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
