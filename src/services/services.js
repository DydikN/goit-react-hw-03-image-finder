import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const getImages = async (nextRequest, prevPage) => {
  const { data } = await axios.get('https://pixabay.com/api/', {
    params: {
      q: nextRequest,
      page: prevPage,
      key: '31933978-b406cd24640809c2ceddbdca7',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });

  return data;
};

export default getImages;
