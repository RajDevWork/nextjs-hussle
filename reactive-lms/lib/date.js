export const formatMyDate = (date) => {

    if (!date) return "Invalid Date"; // Handle null or undefined values gracefully 
    const parsedDate = new Date(date); // Convert to Date Object
    if (isNaN(parsedDate)) return "Invalid date";  // Check if the date is invalid


    let options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    // const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
    // return formattedDate;
    return new Intl.DateTimeFormat("en-US", options).format(parsedDate);
  }