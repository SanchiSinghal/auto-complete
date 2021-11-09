export const debounce = (callback, wait = 500) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

export const generateList = (searchedData, searchTerm) => {
  return (
    <ul>
      {
        searchedData
          .map((data, key) => {
            const regEx = new RegExp(searchTerm, 'gi');
            const marked = data.title.replace(regEx, `<mark>${searchTerm}</mark>`);
            return <li key={key} dangerouslySetInnerHTML={{ __html: marked }} />
          })
      }
    </ul>
  )
}

