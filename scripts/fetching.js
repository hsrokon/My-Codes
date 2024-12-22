async function fetchTest () {
    try {
       const response = await fetch('https://jsonplaceholder.typicode.com/posts') 
       const posts = await response.json()
       const postContainer = document.getElementById('post-container');

       posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('text-blue-800', "my-2", 'border','border-red-600', 'p-3', 'rounded-md')
        postElement.innerHTML=`
        <h1 class="font-bold, text-3xl">${post.id}</h1>
        <h1 class="font-bold, text-2xl">${post.title}</h1>
        <hr class="h-[.15rem] bg-slate-700">
        <h1>${post.body}</h1>
        `
        postContainer.appendChild(postElement);
       });
    } catch (error) {
        console.error(error);
    }
}
fetchTest();