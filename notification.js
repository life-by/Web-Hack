// notification.js

document.addEventListener("DOMContentLoaded", function() {
    // আপনার ইউজারনেম এবং রিপোজিটরির নাম এখানে দেওয়া আছে
    const GITHUB_USERNAME = "life-by";
    const REPO_NAME = "Web-Hack";
    
    // jsDelivr ব্যবহার করে JSON ফাইল লোড করা হচ্ছে
    const NOTIFICATION_URL = `https://cdn.jsdelivr.net/gh/${GITHUB_USERNAME}/${REPO_NAME}/notifications.json`;

    // Cache-busting এর জন্য ইউআরএলে বর্তমান সময় যোগ করা হয়েছে, যাতে নতুন নোটিফিকেশন দ্রুত লোড হয়
    fetch(NOTIFICATION_URL + '?v=' + new Date().getTime()) 
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data && data.active) {
                // নোটিফিকেশন দেখানোর জন্য একটি div তৈরি করা হচ্ছে
                const notificationBar = document.createElement('div');
                notificationBar.id = 'custom-notification-bar-id';
                
                // নোটিফিকেশনের মেসেজ
                const messageP = document.createElement('p');
                messageP.innerHTML = data.message;
                
                // নোটিফিকেশন বন্ধ করার বাটন
                const closeButton = document.createElement('button');
                closeButton.innerHTML = '&times;'; // 'x' চিহ্ন
                closeButton.onclick = function() {
                    notificationBar.style.display = 'none';
                };
                
                notificationBar.appendChild(messageP);
                notificationBar.appendChild(closeButton);
                
                // ওয়েবসাইটের শুরুতে নোটিফিকেশন বার যুক্ত করা
                document.body.insertBefore(notificationBar, document.body.firstChild);
                
                // নোটিফিকেশন বারের জন্য স্টাইল
                const styles = `
                    #custom-notification-bar-id {
                        position: sticky;
                        top: 0;
                        left: 0;
                        width: 100%;
                        background-color: #007bff;
                        color: white;
                        padding: 12px 20px;
                        text-align: center;
                        z-index: 10000;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        box-sizing: border-box;
                        font-family: Arial, sans-serif;
                        font-size: 16px;
                    }
                    #custom-notification-bar-id p {
                        margin: 0;
                        padding-right: 20px;
                    }
                    #custom-notification-bar-id button {
                        background: none;
                        border: none;
                        color: white;
                        font-size: 24px;
                        cursor: pointer;
                        line-height: 1;
                    }
                `;
                
                const styleSheet = document.createElement("style");
                styleSheet.type = "text/css";
                styleSheet.innerText = styles;
                document.head.appendChild(styleSheet);
            }
        })
        .catch(error => console.error('Error fetching notification:', error));

});

