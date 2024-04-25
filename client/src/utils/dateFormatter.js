const dateFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  year: '2-digit',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export default dateFormatter;
