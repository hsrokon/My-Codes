const albumsContainer = document.getElementById('albums-container');
const photosContainer = document.getElementById('photos-container');
const userIdInput = document.getElementById('user-id-input');
const filterBtn = document.getElementById('filter-btn');
const newAlbumForm = document.getElementById('new-album-form');

async function fetchAlbums(userId = null) {
    try {
        const url = userId
        ?`https://jsonplaceholder.typicode.com/albums?userId=${userId}` : 'https://jsonplaceholder.typicode.com/albums';
        const response = await fetch(url);
        const albums = await response.json();
        renderAlbums(albums);
    } catch (error) {
        console.error(error);
    }
}

function renderAlbums(albums) {
    albumsContainer.innerHTML='';
    photosContainer.innerHTML='';

    albums.forEach(album => {
        const albumElement = document.createElement('div');
        albumElement.classList.add('border', 'p-4', 'my-2', 'rounded', 'cursor-pointer', 'hover:bg-gray-100');
        albumElement.innerHTML=`
            <h3 class="text-xl font-bold">${album.title}</h3>
            <p class="text-sm text-gray-500">User Id: ${album.userId}</p>
        `;
        albumElement.addEventListener('click', ()=> fetchAndRenderPhotos(album.id));
        albumsContainer.appendChild(albumElement);
    });
};

async function fetchAndRenderPhotos(albumId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
        const photos = await response.json();
        renderPhotos(photos);
        console.log(photos);
        
    } catch (error) {
        console.error(error);
    }
}

function renderPhotos(photos) {
    photosContainer.innerHTML='';
    console.log(photos);
    
    photos.forEach(photo => {
        const photoElement = document.createElement('div');
        photoElement.classList.add('border', 'p-2', 'my-2', 'rounded', 'flex', 'items-center');
        photoElement.innerHTML = `
            <img src="${photo.thumbnailUrl}" alt="${photo.title}" class="w-16 h-16 mr-4 rounded" onerror="this.onerror=null; this.src='fallback-image-url.jpg';">
            <p>${photo.title}</p>
        `;
        photosContainer.appendChild(photoElement);
    });
}

async function addNewAlbum(userId, title) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({userId, title}),
        });
        const newAlbum = await response.json();
        alert(`New album created with ID: ${newAlbum.id}`);
        fetchAlbums();
    } catch (error) {
        console.error(error);
    }
}

filterBtn.addEventListener('click', ()=> {
    const userId = userIdInput.value.trim();
    if (userId) fetchAlbums(userId);
    else fetchAlbums();
});

newAlbumForm.addEventListener('submit', (event)=> {
    event.preventDefault();
    const userId = document.getElementById('new-album-user-id').value.trim();
    const title = document.getElementById('new-album-title').value.trim();
    if (userId && title) {
        addNewAlbum(userId, title);
        newAlbumForm.reset();
    }
});

fetchAlbums();