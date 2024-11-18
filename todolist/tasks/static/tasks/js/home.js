function createTask() {
  console.log("createTask");
  document.getElementById("taskModal").style.display = "block";
}

function closeModal() {
  document.getElementById("taskModal").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  const statusOptions = ["Pendente", "Concluída"];
  const taskElements = document.querySelectorAll("#taskStatusUpdate");

  taskElements.forEach(function (taskElement) {
    statusOptions.forEach(function (status) {
      const option = document.createElement("option");
      option.value = status;
      option.text = status;
      if (taskElement.getAttribute("value") === status) {
        option.selected = true;
      }
      taskElement.appendChild(option);
    });
  });
});
