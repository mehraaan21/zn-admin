// lib/utils.js
export const truncateDescription = (htmlContent, wordLimit = 50) => {
  if (!htmlContent) return "";
  const plainText = htmlContent.replace(/<[^>]*>/g, ""); // HTML tags hatane ke liye
  const words = plainText.trim().split(/\s+/);

  if (words.length <= wordLimit) return plainText;
  return words.slice(0, wordLimit).join(" ") + "...";
};