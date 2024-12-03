// You can add JavaScript code here if you want to enhance functionality like sorting the table or dynamically adding rows.
document.addEventListener('DOMContentLoaded', () => {
  // Example function to show how you might dynamically update the crop timelines.
  updateCropTimeline();
});

// This function could dynamically adjust timeline bars based on dates or other logic.
function updateCropTimeline() {
  const timelineElements = document.querySelectorAll('.timeline');
  
  // Example dynamic adjustment, this can be based on the date range or other data.
  timelineElements.forEach(timeline => {
    if (timeline.classList.contains('corn')) {
      timeline.style.width = '70%'; // Adjust width for Corn
    } else if (timeline.classList.contains('wheat')) {
      timeline.style.width = '60%'; // Adjust width for Wheat
    } else if (timeline.classList.contains('soy')) {
      timeline.style.width = '80%'; // Adjust width for Soy
    }
  });
}
