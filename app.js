const form = document.querySelector('#searchForm');
const clearButton = document.querySelector('#clearButton');
const messageDiv = document.querySelector('#message');

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const searchTerm = form.elements.query.value;
  const config = { params: { q: searchTerm }, headers: {} };

  try {
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);

    if (Array.isArray(res.data)) {
      console.log(res.data[0]?.show?.image?.medium);
      makeImages(res.data);
    } else {
      throw new Error('Invalid response data');
    }

    form.elements.query.value = '';
  } catch (error) {
    console.error(error);
  }
});

clearButton.addEventListener('click', function () {
  form.elements.query.value = '';
  removeAllImages();
  showMessage('');
});

const makeImages = (shows) => {
  if (shows.length === 0) {
    showMessage('No matches found.');
    return;
  }

  showMessage('');

  for (let result of shows) {
    if (result.show && result.show.image) {
      const img = document.createElement('img');
      img.src = result.show.image.medium;
      document.body.append(img);
    }
  }
};

const removeAllImages = () => {
  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    img.remove();
  });
};

const showMessage = (text) => {
  messageDiv.textContent = text;
};
