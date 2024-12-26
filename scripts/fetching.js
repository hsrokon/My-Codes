// async function fetchTest () {
//     try {
//        const response = await fetch('https://jsonplaceholder.typicode.com/posts') 
//        const posts = await response.json()
//        const postContainer = document.getElementById('post-container');

//        posts.forEach(post => {
//         const postElement = document.createElement('div');
//         postElement.classList.add('text-blue-800', "my-2", 'border','border-red-600', 'p-3', 'rounded-md')
//         postElement.innerHTML=`
//         <h1 class="font-bold, text-3xl">${post.id}</h1>
//         <h1 class="font-bold, text-2xl">${post.title}</h1>
//         <hr class="h-[.15rem] bg-slate-700">
//         <h1>${post.body}</h1>
//         `
//         postContainer.appendChild(postElement);
//        });
//     } catch (error) {
//         console.error(error);
//     }
// }
// fetchTest();

//Filtering data
// async function filterFetchTest () {
//     try {
//         const response =  await fetch('https://jsonplaceholder.typicode.com/posts');
//         const posts= await response.json();
//         const filteredPosts = posts.filter(post => post.userId ===2);
        
//         console.log(filteredPosts);
//         const postContainer = document.getElementById('post-container');

//         filteredPosts.forEach(somePosts => {
//             const createdDiv = document.createElement('div');
//             createdDiv.innerHTML=`
//             <h1>${somePosts.title}</h1>
//             `
//             postContainer.appendChild(createdDiv);
//         })
//     } catch (error) {
//         console.error(error);
//     }
// }
// filterFetchTest();

//Count and analyze user data
async function analyzeUserData() {  
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();
        
        const userPosts = {};
        const userCountedPost = document.getElementById('post-container');
        posts.forEach(post => {
            userPosts[post.userId] = (userPosts[post.userId] || 0) +1; //checks if the user has any post in our object(if no then by default 0) then adds 1 after each loop count then saves it on our created object in format like:(api's user id : api's post count) and This counts the total number of posts for each userId and stores it in the userPosts object.
        });
        
        Object.keys(userPosts).forEach(userId => { //Object.keys(userPosts) recovers an array of all user IDs.
            const postElement = document.createElement('div');
            postElement.innerHTML=`
            <div class="flex justify-evenly">
            <h2>User Id: ${userId}</h2>
            <p>Total post: ${userPosts[userId]}</p>
            </div>
            `
            userCountedPost.appendChild(postElement);
        })
    } catch (error) {
        console.error(error);
    }
}
analyzeUserData();
