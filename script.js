
const users = JSON.parse(localStorage.getItem('users')) || [];
const followings = JSON.parse(localStorage.getItem('followings')) || [];
let notifications = [];

document.getElementById('signupButton').addEventListener('click', function() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    if (username && password) {
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Signup successful!');
        showLoginForm();
    } else {
        alert('Please fill in all fields.');
    }
});

document.getElementById('loginButton').addEventListener('click', function() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        alert('Login successful!');
        document.getElementById('authSection').classList.add('d-none');
        document.getElementById('mainApp').classList.remove('d-none');
    } else {
        alert('Invalid credentials.');
    }
});

document.getElementById('showSignup').addEventListener('click', showSignupForm);
document.getElementById('showLogin').addEventListener('click', showLoginForm);

function showSignupForm() {
    document.getElementById('loginForm').classList.add('d-none');
    document.getElementById('signupForm').classList.remove('d-none');
}

function showLoginForm() {
    document.getElementById('signupForm').classList.add('d-none');
    document.getElementById('loginForm').classList.remove('d-none');
}

document.getElementById('tweetButton').addEventListener('click', function() {
    const tweetText = document.getElementById('tweetInput').value;

    if (tweetText.trim() === '') {
        alert('Please enter a tweet.');
        return;
    }

    const tweetFeed = document.getElementById('tweetFeed');

    const tweet = document.createElement('div');
    tweet.className = 'tweet';

    tweet.innerHTML = `
        <p class="tweet-text">${tweetText}</p>
        <div class="tweet-actions">
            <button class="like-btn">Like</button>
            <button class="retweet-btn">Retweet</button>
            <button class="reply-btn">Reply</button>
        </div>
    `;

    tweetFeed.prepend(tweet);

    document.getElementById('tweetInput').value = '';

    // Add action listeners
    const likeBtn = tweet.querySelector('.like-btn');
    likeBtn.addEventListener('click', function() {
        alert('Liked!');
        addNotification('Someone liked your tweet!');
    });

    const retweetBtn = tweet.querySelector('.retweet-btn');
    retweetBtn.addEventListener('click', function() {
        alert('Retweeted!');
        addNotification('Someone retweeted your tweet!');
    });

    const replyBtn = tweet.querySelector('.reply-btn');
    replyBtn.addEventListener('click', function() {
        alert('Replied!');
        addNotification('Someone replied to your tweet!');
    });
});

function addNotification(message) {
    notifications.push(message);
    document.getElementById('notificationCount').innerText = notifications.length;
    updateNotificationsPanel();
}

function updateNotificationsPanel() {
    const panel = document.getElementById('notificationsPanel');
    panel.classList.remove('d-none');

    const notificationsList = notifications.map(n => `<p>${n}</p>`).join('');
    panel.querySelector('.card-body').innerHTML = notificationsList;
}

// Simulate real-time updates
setInterval(function() {
    const newTweet = document.createElement('div');
    newTweet.className = 'tweet';
    newTweet.innerHTML = `<p class="tweet-text">New Tweet from someone you follow</p>`;
    document.getElementById('tweetFeed').prepend(newTweet);
}, 10000);
