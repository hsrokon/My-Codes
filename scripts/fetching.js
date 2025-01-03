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
// async function analyzeUserData() {  
//     try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//         const posts = await response.json();
        
//         const userPosts = {};
//         const userCountedPost = document.getElementById('post-container');
//         posts.forEach(post => {
//             userPosts[post.userId] = (userPosts[post.userId] || 0) +1; //checks if the user has any post in our object(if no then by default 0) then adds 1 after each loop count then saves it on our created object in format like:(api's user id : api's post count) and This counts the total number of posts for each userId and stores it in the userPosts object.
//         });
        
//         Object.keys(userPosts).forEach(userId => { //Object.keys(userPosts) recovers an array of all user IDs.
//             const postElement = document.createElement('div');
//             postElement.innerHTML=`
//             <div class="flex justify-evenly">
//             <h2>User Id: ${userId}</h2>
//             <p>Total post: ${userPosts[userId]}</p>
//             </div>
//             `
//             userCountedPost.appendChild(postElement);
//         })
//     } catch (error) {
//         console.error(error);
//     }
// }
// analyzeUserData();


//Pagination of posts
// let currentPage = 1;
// const postPerPage = 10;
// let totalPosts = 0;

// async function paginate(page) {
//     try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//         const posts = await response.json();

//         totalPosts = posts.length;
//         console.log(totalPosts);

//         const start = (page - 1) * postPerPage;
//         const end  = start + postPerPage;
//         const paginatePosts = posts.slice(start, end);

//         const postContainer = document.getElementById('post-container');
//         postContainer.innerHTML='';

//         paginatePosts.forEach(post => {
//             const postElement = document.createElement('div');
//             postElement.innerHTML=`
//                 <h3 class="text-2xl my-2 font-semibold text-green-700">${post.id}. ${post.title}</h3>
//                 <p class="my-2">${post.body}</p>
//                 <hr>
//             `;
//             postContainer.appendChild(postElement);
//         });

//         const pageDisplay = document.getElementById('page-display');
//         const totalPages = Math.ceil(totalPosts / postPerPage);

//         pageDisplay.textContent=`Page ${page} of ${totalPages}`;

//         updateButtonState(page);

//     } catch (error) {
//         console.error(error);
//     }
// }

// function goToPage(direction) {
//     currentPage += direction;
//     paginate(currentPage);
// }

// window.goToPage = goToPage;

// function updateButtonState(page) {
//     const prevButton = document.getElementById('prev-btn');
//     const nextButton = document.getElementById('next-btn');
//     prevButton.disabled = page===1;

//     const totalPages = Math.ceil(totalPosts / postPerPage);
//     //console.log(Math.ceil(4.2)); // Output: 5
//     nextButton.disabled = page >= totalPages;
// }

// paginate(currentPage)


//Post new Data
// async function createPost() {
//     try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
//             method: 'POST',
//             headers: {'Content-Type' : 'application/json'},
//             body: JSON.stringify({
//                 userId: 1,
//                 title: 'Created post 1',
//                 body: 'This is the first created post',
//             }),
//         });
        
//         const createdPost = await response.json()
//         console.log(createdPost);
        
//     } catch (error) {
//         console.error(error);
//     }
// }
// createPost();


//Comments 
let currentPage =1;
const commentsPerPage = 15;
let totalComments = 0;
let allComments = [];

async function commentsFetch() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments');
        allComments = await response.json();
        commentsRender(allComments, currentPage);
    } catch (error) {
        console.error(error);
    }
}

function commentsRender(comments, page) {
        totalComments = comments.length;
        
        const commentContainer = document.getElementById('comment-container');
        commentContainer.innerHTML='';

        const start = (page -1) * commentsPerPage;
        const end = start + commentsPerPage;
        const paginatedComments = comments.slice(start, end);

        paginatedComments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.innerHTML=`
            <div class="border border-green-400 rounded-md my-2 px-2">
            <div class="flex my-2 font-thin italic text-slate-600">
            <h3 class="px-1">User:${comment.postId}</h3>
            <p class="font-semibold px1">${comment.name}</p>
            <p class="px-1">${comment.email}</p>
            <p class="px-1">C. no: ${comment.id}</p>
            </div>
            <p class="my-2 mb-5 text-green-600"><span class="text-black font-semibold">Comment: </span>${comment.body}</p>
            </div>
            `;
            commentContainer.appendChild(commentElement);
        });

        updateButtonStage(page);

        const totalPages = Math.ceil(totalComments / commentsPerPage)
        document.getElementById('page-display').textContent=`${page} of ${totalPages}`;
}

document.getElementById('search-bar').addEventListener('input', ()=> search());
document.getElementById('search-btn').addEventListener('click', ()=> search());

function search() {
    const query = document.getElementById('search-bar').value.toLowerCase();

    const filteredComments = allComments.filter(comment => 
        comment.name.toLowerCase().includes(query) || comment.email.toLowerCase().includes(query)
    )
    currentPage = 1;
    commentsRender(filteredComments, currentPage);
}

function pageChanger(direction) {
    currentPage += direction
    commentsRender(allComments, currentPage)
}

function updateButtonStage(page) {
    const prev = document.getElementById('prev-btn');
    const next = document.getElementById('next-btn');
    prev.disabled = page ===1;
    const totalPages = Math.ceil(totalComments / commentsPerPage);
    next.disabled = page >=totalPages;
}

window.pageChanger = pageChanger;
commentsFetch();