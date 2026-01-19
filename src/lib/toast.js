export function toast(message, type = "success") {
  const div = document.createElement("div");
  div.innerText = message;

  div.className = `
    fixed top-5 right-5 z-50 px-4 py-2 rounded text-white
    ${type === "success" ? "bg-green-600" : "bg-red-600"}
  `;

  document.body.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 3000);
}
