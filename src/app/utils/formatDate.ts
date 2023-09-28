export function formatDate(_date : Date) {

  const date = new Date(_date);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];


  const month = months[date.getUTCMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  let hours = date.getHours().toString();
  let minutes = date.getMinutes().toString();

  if(hours.length == 1)hours = '0' + hours;
  if(minutes.length == 1)minutes = '0' + minutes;

  const formattedDate = `${month} ${day}, ${year}, ${hours}:${minutes}`;

  return formattedDate;
}
