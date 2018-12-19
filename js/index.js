// this condition could also be: "if (navigator.serviceWorker) {...}"
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
  .then((response) => {
    console.log('%c SW Register... Success!', 'background-color: black; color: lightblue;', response)
  })
  .catch((error) => {
    console.warn('%c SW Register... Failed.', 'background-color: black; color: lightblue;', error)
  });
}