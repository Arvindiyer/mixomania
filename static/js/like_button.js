// const slug = "{{ .File.BaseFileName }}"; 
// console.log("Current page slug:", slug);

// document.addEventListener('DOMContentLoaded', function() {
//     // Get the post ID from the current page URL or data attribute
//     //const postId = document.querySelector('article').dataset.postId || window.location.pathname.replace(/\/$/, '').split('/').pop();
   
//     console.log("Current page slug:", slug);
//     const likeButton = document.getElementById('like-button');
//     const likeCount = document.getElementById('like-count');
    
//     if (likeButton && likeCount) {
//       // Generate a persistent client ID if not already created
//       let clientId = localStorage.getItem('clientId');
//       if (!clientId) {
//         clientId = generateUUID();
//         localStorage.setItem('clientId', clientId);
//       }
      
//       // Load current like count and check if user has already liked
//       fetchLikeStatus();
      
//       // Add event listener to the like button
//       likeButton.addEventListener('click', function() {
//         if (!likeButton.classList.contains('liked')) {
//           incrementLike();
//         }
//       });
//     }
    
//     // Generate a UUID for client identification
//     function generateUUID() {
//       return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//         const r = Math.random() * 16 | 0;
//         const v = c === 'x' ? r : (r & 0x3 | 0x8);
//         return v.toString(16);
//       });
//     }
    
//     // Fetch the current like count and user's like status
//     function fetchLikeStatus() {
//       const clientId = localStorage.getItem('clientId');
      
//       fetch(`https://api.arvindkiyer.com/api/likes/${encodeURIComponent(postId)}?client_id=${encodeURIComponent(clientId)}`)
//         .then(response => response.json())
//         .then(data => {
//           likeCount.textContent = data.likes;
          
//           if (data.liked_by_user) {
//             likeButton.classList.add('liked');
//           }
//         })
//         .catch(error => {
//           console.error('Error fetching like status:', error);
//         });
//     }
    
//     // Increment the like count
//     function incrementLike() {
//       const clientId = localStorage.getItem('clientId');
      
//       // Add debouncing to prevent rapid clicks
//       likeButton.disabled = true;
      
//       fetch(`https://api.arvindkiyer.com/api/likes/${encodeURIComponent(postId)}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ client_id: clientId })
//       })
//       .then(response => {
//         if (response.status === 429) {
//           throw new Error('Rate limited - Please wait before trying again');
//         }
//         return response.json();
//       })
//       .then(data => {
//         likeCount.textContent = data.likes;
        
//         if (data.liked_by_user) {
//           likeButton.classList.add('liked');
//         }
        
//         // Re-enable button after a short delay
//         setTimeout(() => {
//           likeButton.disabled = false;
//         }, 500);
//       })
//       .catch(error => {
//         console.error('Error incrementing like count:', error);
//         // Re-enable button after error
//         setTimeout(() => {
//           likeButton.disabled = false;
//         }, 1000);
//       });
//     }
//   });