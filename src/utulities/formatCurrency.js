  // currency formatter
  // currency format
 export const formatCurrency = (value) => {
    const formattedValue = new Intl.NumberFormat({
      style: "currency",
      currency: "TZS", // Tanzanian Shillings
      minimumFractionDigits: 0, // Display whole numbers
    }).format(value);

    return `${formattedValue}`; // Concatenate the "TSh" sign
  };